
export default class Utils {
  static clearCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  }
  static rotateImage (ctx, angle) {
    var canvas = ctx.canvas;
    ctx.translate(canvas.width* .5, canvas.height* .5);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-canvas.width*.5, -canvas.height*.5);
    ctx.save();
  }
  static renderImage (ctx, img) {
    var
      canvas = ctx.canvas,
      hRatio = canvas.width / img.width,
      vRatio = canvas.height / img.height,
      ratio  = Math.min(hRatio, vRatio),
      x      = (canvas.width - img.width*ratio) * .5,
      y      = (canvas.height - img.height*ratio) * .5;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
      x,y,img.width*ratio, img.height*ratio);
    ctx.restore();
  }
}
