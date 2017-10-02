#### Canvas usage
The primary purpose of the `<Canvas>` is to be wrapped by higher order components (such as cropping), and to display an image.

```js

initialState = {
  src: 'https://i.imgur.com/Xb2azNr.jpg',
  angle: 0
};

<div>
  <Canvas angle={state.angle} src={ state.src } width={320} height={240} />
  <p>
    <button onClick={() => setState({ angle: state.angle-90 })}>Rotate Left</button>
    <button onClick={() => setState({ angle: state.angle+90 })}>Rotate Right</button>
  </p>
</div>
```