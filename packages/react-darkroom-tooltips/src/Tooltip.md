Tooltips wrap a single node, commonly a `button`.

### Default tooltip:
    <section>
      <Tooltip label="hello thar"><button>hover me...</button></Tooltip>
    </section>

### Positional tooltips:
You can set the position of any tooltip by using the `position` prop
Hover the text in **bold** below:

    <p>
      Lorem ipsum dolor sit 
      <Tooltip position="nw" label="foo bar"><b>amet</b></Tooltip>, consectetur 
      <Tooltip position="n" label="foo bar"><b>adipiscing</b></Tooltip> elit. Phasellus eget enim sit amet ipsum lobortis 
      <Tooltip position="ne" label="foo bar"><b>ultricies</b></Tooltip>. Etiam dictum arcu eget porta sagittis. Mauris tempus  
      <Tooltip position="e" label="foo bar"><b>volutpat</b></Tooltip> tellus vel pulvinar. 
      <Tooltip position="se" label="foo bar"><b>In</b></Tooltip> laoreet non libero vel accumsan. 
      <Tooltip position="s" label="foo bar"><b>Maecenas</b></Tooltip> tristique tortor id lacus tempor, 
      <Tooltip position="sw" label="foo bar"><b>eget</b></Tooltip> tincidunt risus bibendum. Ut vel rutrum lorem, sit amet vestibulum turpis. 
      <Tooltip position="w" label="foo bar"><b>Donec</b></Tooltip> feugiat auctor nunc, id suscipit quam luctus at. 
    </p>

### Customizing tooltips:
*advanced feature*

You can customize the appearance of tooltips by using the `TooltipFactory`

    // import { TooltipFactory } from 'react-darkroom-tooltips' // es6
    const TooltipFactory = require('./Tooltip').TooltipFactory; // es5

    // configure your tooltip with ToolTipFactory
    const MyTooltip = TooltipFactory({
      radius: '0.9em',
      color: '#ba4333',
      arrowSize: '0.5em',
    })
    
    // In your components, you can now use your tooltip the same way, but it
    // now has your new style settings!
    class Example extends React.Component {
      render() {
        return (
          <div>
            <MyTooltip position="e" label="niiice">Hover me...</MyTooltip>
          </div>
        );
      }
    }

    <Example/>
    
