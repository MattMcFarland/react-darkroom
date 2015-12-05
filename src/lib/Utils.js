
export default class Utils {
  static prevAngle = 0;


  static getRotatedBoundingRect({width, height}, angle) {
    const { abs, sin, cos, PI } = Math;
    /**
     * this.w = Math.sin(this.angulo) * rotador.h + Math.cos(this.angulo) * rotador.w;
     this.h = Math.sin(this.angulo) * rotador.w + Math.cos(this.angulo) * rotador.h;
     */
    let radians = angle * PI / 180;

    return {
      width: abs(width * cos(radians) + height * sin(radians)),
      height: abs(width * sin(radians) + height * cos(radians))
    }

  }

  /**
   * Constrain proportions to rect while considering its angle
   * @param from {{width: number, height: number}}
   * @param to {{width: number, height: number}}
   * @returns {{width: number, height: number}}
   */
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
    if (angle !== Utils.prevAngle) {
      ctx.translate(canvas.width* .5, canvas.height* .5);
      ctx.rotate((angle) * Math.PI / 180);
      ctx.translate(-canvas.width*.5, -canvas.height*.5);
      Utils.prevAngle = angle;
    }
  }

  static renderImage (ctx, img, position, boundRect) {

    ctx.drawImage(img, position.x, position.y, boundRect.width, boundRect.height);

  }
}

