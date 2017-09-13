#### Canvas usage
The primary purpose of the `<Canvas>` is to be wrapped by higher order components (such as cropping), and to display an image.

```js
const randomImage = () => 'http://lorempixel.com/320/240/cats?' + Math.random().toString(36).substring(4);

<div>
  <Canvas src={ state.src || randomImage() } width={320} height={240} />
  <p><button onClick={() => setState({ src: randomImage() })}>Random Image</button></p>
</div>
```