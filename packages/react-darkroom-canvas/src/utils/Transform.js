/* global Image, document */
export default class Transform {
  static constrainProportions(from, to) {
    const minRatio = Math.min(to.height / from.height, to.width / from.width);
    return {
      width: from.width > to.width ? from.width * minRatio : from.width,
      height: from.height > to.height ? from.height * minRatio : from.height,
    };
  }
  static centerRect(rect, container) {
    return {
      x: (container.width * 0.5) - (rect.width * 0.5),
      y: (container.height * 0.5) - (rect.height * 0.5),
    };
  }
  static clearCanvas(canvas, ctx) {
    if (!canvas || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  }
  static rotateImage(ctx, angle) {
    if (!ctx) {
      return;
    }
    const canvas = ctx.canvas;
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.rotate((angle) * (Math.PI / 180));
    ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);
  }
  static renderImage(ctx, img, position, boundRect) {
    ctx.drawImage(img, position.x, position.y, boundRect.width, boundRect.height);
    ctx.restore();
  }

  static loadBitmapData(source) {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          resolve(img);
        };
        img.src = Object.assign(source);
      } catch (er) {
        reject(er);
      }
    });
  }

  static renderCentered(ctx, image, imgRect, boundRect) {
    const scaledRect = Transform.constrainProportions(imgRect, boundRect);
    const position = Transform.centerRect(scaledRect, boundRect);

    Transform.renderImage(ctx, image, position, scaledRect);
  }

  static getRealDimensions(cropRect, imgRect) {
    return {
      x: (cropRect.x - imgRect.x) / imgRect.width,
      y: (cropRect.y - imgRect.y) / imgRect.height,
      width: cropRect.width / imgRect.width,
      height: cropRect.height / imgRect.height,
    };
  }


  /**
   * Crop an image and return the new image object
   * @param image {Image}
   * @param cropRect  {Object}
   * @param     cropRect.x {number}
   * @param     cropRect.y {number}
   * @param     cropRect.width {number}
   * @param     cropRect.height {number}
   * @param boundRect {Object}
   * @param     boundRect.width {number}
   * @param     boundRect.height {number}
   * @param angle {number}
   * @returns {Promise}
   */
  static cropImage(image, cropRect, boundRect, angle) {
    return new Promise((resolve) => {
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = boundRect.width;
      scaledCanvas.height = boundRect.height;
      const sctx = scaledCanvas.getContext('2d');

      Transform.loadBitmapData(image)
        .then((img) => {
          Transform.rotateImage(sctx, angle);
          Transform.renderCentered(sctx, img, img, boundRect);
          const scaledImage = new Image();
          scaledImage.onload = () => {
            const croppedCanvas = document.createElement('canvas');
            const ctx = croppedCanvas.getContext('2d');

            croppedCanvas.width = boundRect.width;
            croppedCanvas.height = boundRect.height;


            ctx.drawImage(
              scaledImage,
              cropRect.x,
              cropRect.y,
              cropRect.width,
              cropRect.height,
              0,
              0,
              boundRect.width,
              boundRect.height,
            );

            resolve(croppedCanvas.toDataURL('image/png'));
          };
          scaledImage.src = scaledCanvas.toDataURL('image/png');
        });
    });
  }
}
