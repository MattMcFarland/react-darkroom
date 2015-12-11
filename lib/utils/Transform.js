export default class Transform {
  static constrainProportions (from, to) {

    let minRatio = Math.min(to.height / from.height, to.width / from.width);
    return {
      width: from.width  > to.width ? from.width  * minRatio : from.width,
      height: from.height > to.height ? from.height * minRatio : from.height
    }

  }
  static centerRect (rect, container) {
    return {
      x:  (container.width * 0.5)  - (rect.width  * 0.5),
      y: (container.height * 0.5)  - (rect.height * 0.5)
    }
  }
  static clearCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  }
  static rotateImage (ctx, angle) {
    var canvas = ctx.canvas;
    ctx.translate(canvas.width* .5, canvas.height* .5);
    ctx.rotate((angle) * Math.PI / 180);
    ctx.translate(-canvas.width*.5, -canvas.height*.5);
  }
  static renderImage (ctx, img, position, boundRect) {

    ctx.drawImage(img, position.x, position.y, boundRect.width, boundRect.height);
    ctx.restore();
  }
}
