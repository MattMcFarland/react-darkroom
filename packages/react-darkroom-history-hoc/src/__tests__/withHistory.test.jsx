import React from 'react'
import { shallow, mount, render } from 'enzyme';
import withHistory, { moveIndex, updateThread, clamp } from '../withHistory';

const { describe, test, expect } = global;

const HistoryTest = ({
  counter,
  go,
  pushHistory,  
  undo,
  backward,
  redo,
  forward,
  index,
  thread,
  goByAmount
}) => (
  <div>
    <h1>HistoryTest</h1>
    <p><span>Count:</span><num>{counter}</num></p>
    <button increment onClick={() => pushHistory({counter: counter + 1})}>increment</button>
    <button decrement onClick={() => pushHistory({counter: counter - 1})}>decrement</button>
    <button undo onClick={undo}>Undo</button>
    <button redo onClick={redo}>Redo</button>
    <button backward onClick={backward}>Back</button>
    <button forward onClick={forward}>Forward</button>
    <button go onClick={() => go(goByAmount)}></button>
  </div>
)
const initialState = { counter: 1 };
const TestHistory = withHistory(initialState)(HistoryTest);

const runSimulationOnAttributes = props => (...attributes) => {
  const simulatedWrapper = attributes.reduce((wrapper, attribute) => {
    wrapper.find(`button[${attribute}]`).simulate('click')
    return wrapper 
  }, shallow(<TestHistory {...props}/>))
  // creating snapshots to make it easier to see results, might remove later.
  expect(simulatedWrapper.state()).toMatchSnapshot();
  return simulatedWrapper;
}

describe('withHistory higher order component', () => {
  describe('thread', () => {
    test('thread starts with initalState', () => {
      const wrapper = shallow(<TestHistory/>);
      expect(wrapper.state().thread).toEqual([{ counter: 1 }]);
    })
    test('root state contains data stored in the thread by index', () => {
      const state = runSimulationOnAttributes()('increment', 'decrement', 'undo').state();
      expect(state.counter).toEqual(state.thread[state.index].counter);
    })
  })

  describe('pushHistory()', () => {
    test('pushHistory adds actions called to thread', () => {
      // increment, decrement use pushHistory in this test.
      const state = runSimulationOnAttributes()('increment', 'decrement', 'increment').state();
      expect(state.thread.length).toEqual(4);
    })  
  })

  describe('undo/backward', () => {
    test('subtracts the index, but not the length', () => {
      const state = runSimulationOnAttributes()('increment', 'decrement', 'increment', 'undo', 'backward').state();
      expect(state.thread.length).toEqual(4);
      expect(state.index).toEqual(1)
    })
    test('prevents index from going out of range', () => {
      const state = runSimulationOnAttributes()('undo', 'backward').state();
      expect(state.thread.length).toEqual(1);
      expect(state.index).toEqual(0)      
    })
    test('whenever a new action follows an undo, the thread is cut to the index of the new action', () => {
      const state = runSimulationOnAttributes()('increment', 'increment', 'increment', 'undo', 'undo', 'decrement').state();
      expect(state.index).toEqual(state.thread.length - 1);
    })
  })

  describe('redo/forward', () => {
    test('raises the index when it is less than the length', () => {
      const state = runSimulationOnAttributes()('increment', 'decrement', 'undo', 'redo', 'backward', 'forward').state();
      expect(state.thread.length).toEqual(3);
      expect(state.index).toEqual(2)
    })
    test('prevents index from going out of range', () => {
      const state = runSimulationOnAttributes()('redo', 'forward').state();
      expect(state.thread.length).toEqual(1);
      expect(state.index).toEqual(0)      
    })    
  })
  describe('go() relatively adds the index to change the state', () => {
    test('up', () => {      
      const state = runSimulationOnAttributes({goByAmount: 2})
        (
          'increment', 
          'increment', 
          'increment', 
          'increment',
          'undo',
          'undo',
          'go',
        ).state();      
        expect(state.thread.length).toEqual(5);
        expect(state.index).toEqual(4)           
    })
    test('down', () => {
      const state = runSimulationOnAttributes({goByAmount: -2})
      (
        'increment', 
        'increment', 
        'increment', 
        'increment',
        'go',
      ).state();     
      expect(state.thread.length).toEqual(5);
      expect(state.index).toEqual(2)    
    })

  })
});
