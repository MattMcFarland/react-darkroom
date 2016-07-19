
class Handle {

  constructor(context) {
    this.ctx = context;
    this.render = (ctx) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(this.x - 3, this.y - 3, 6, 6);
    };
    this.isHover = (x, y) => {
      let xx = this.x;
      let yy = this.y;
      return x > xx - 6 && x < xx + 6 && y > yy - 3 && y < yy + 3;
    };
  }
  set coords(xy) {
    this.x = xy[0];
    this.y = xy[1];
  }
  get coords() {
    return {
      x: this.x,
      y: this.y
    };
  }
}
export class CropBox {

  constructor(args) {


    this.x = args.x || 0;
    this.y = args.y || 0;
    this.width = 50;
    this.height = 50;
    this.dragging = false;
    this.canvas = args.canvas;
    this.ctx = args.ctx;

    this.selectionHandles = [];

    for (var i = 0; i < 8; i++) {
      var rect = new Handle(this.ctx);
      this.selectionHandles.push(rect);
    }


    this.isInDraggableArea = (x, y) => {
      return x > this.x + 3 && x < this.x - 3 + this.width && y > this.y + 3 && y < this.height + this.y - 3;
    };
    this.isInResizeArea = (x, y) => {
      let result = -1;
      this.selectionHandles.forEach((handle, j) => {
        if (handle.isHover(x, y)) {
          result = j;
        }
      });
      return result;
    };
    this.canvas.addEventListener('mousedown', e => {

      let pointer = e;
      let mx = pointer.offsetX;
      let my = pointer.offsetY;

      if (!this.hasFocus) {
        this.dragX = mx - this.x;
        this.dragY = my - this.y;
        this.x = mx;
        this.y = my;
      }

      if (this.isInDraggableArea(mx, my)) {
        if (this.hasFocus) {
          this.dragX = mx - this.x;
          this.dragY = my - this.y;
          this.dragging = true;
        }
      } else {
        this.dragging = false;
        this.expectResize = this.isInResizeArea(mx, my);
        if (this.expectResize > -1 && this.hasFocus) {
          this.resizing = true;
        }
      }

      this.hasFocus = true;


    }, true);

    this.canvas.addEventListener('mousemove', e => {
      let pointer = e;
      let mx = pointer.offsetX;
      let my = pointer.offsetY;

      if (this.dragging) {
        this.canvas.style.cursor = 'move';

        let tx = mx - this.dragX;
        let ty = my - this.dragY;
        let maxX = this.canvas.width - this.width;
        let maxY = this.canvas.height - this.height;

        this.x = tx < 0 ? 0 : tx > maxX ? maxX : tx;
        this.y = ty < 0 ? 0 : ty > maxY ? maxY : ty;

      } else if (this.resizing) {
        var oldx = this.x;
        var oldy = this.y;

        let cursors = [
          'nwse-resize',
          'ns-resize',
          'nesw-resize',
          'ew-resize',
          'nwse-resize',
          'ns-resize',
          'nesw-resize',
          'ew-resize'
        ];

        switch (this.expectResize) {
          case 0:
            this.x = mx;
            this.y = my;
            this.width += oldx - mx;
            this.height += oldy - my;
            break;
          case 1:
            this.y = my;
            this.height += oldy - my;
            break;
          case 2:
            this.y = my;
            this.width = mx - oldx;
            this.height += oldy - my;
            break;
          case 7:
            this.x = mx;
            this.width += oldx - mx;
            break;
          case 3:
            this.width = mx - oldx;
            break;
          case 6:
            this.x = mx;
            this.width += oldx - mx;
            this.height = my - oldy;
            break;
          case 5:
            this.height = my - oldy;
            break;
          case 4:
            this.width = mx - oldx;
            this.height = my - oldy;
            break;
        }
        // 0 1 2
        // 7   3
        // 6 5 4
        if (this.width < 0) {
          this.width = 0;
          if (this.expectResize === 2) {
            this.expectResize = 0;
          } else if (this.expectResize === 0) {
            this.expectResize = 2;
          } else if (this.expectResize === 3) {
            this.expectResize = 7;
          } else if (this.expectResize === 7) {
            this.expectResize = 3;
          } else if (this.expectResize === 4) {
            this.expectResize = 6;
          } else if (this.expectResize === 6) {
            this.expectResize = 4;
          }
        } else if (this.height < 0) {
          this.height = 0;
          if (this.expectResize === 0) {
            this.expectResize = 6;
          } else if (this.expectResize === 6) {
            this.expectResize = 0;
          } else if (this.expectResize === 1) {
            this.expectResize = 5;
          } else if (this.expectResize === 5) {
            this.expectResize = 1;
          } else if (this.expectResize === 2) {
            this.expectResize = 4;
          } else if (this.expectResize === 4) {
            this.expectResize = 2;
          }
        }
        this.canvas.style.cursor = cursors[this.expectResize];
        if (this.width < 0 || this.height < 0) {
          console.log(this.width, this.height);
        }

      } else if (this.isInDraggableArea(mx, my)) {
        this.canvas.style.cursor = 'move';
      } else {
        this.canvas.style.cursor = 'crosshair';
        this.selectionHandles.forEach((handle, j) => {

          let cursors = [
            'nwse-resize',
            'ns-resize',
            'nesw-resize',
            'ew-resize',
            'nwse-resize',
            'ns-resize',
            'nesw-resize',
            'ew-resize'
          ];
          if (handle.isHover(mx, my)) {
            this.canvas.style.cursor = cursors[j];
          }

        });
      }

    }, true);

    this.canvas.addEventListener('mouseup', () => {
      this.dragging = false;
      this.resizing = false;
      this.expectResize = false;
    }, true);

    this.render = this.render.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getTop = this.getTop.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.setTop = this.setTop.bind(this);


    this.remove = () => {
      this.canvas.removeEventListener('mouseup');
      this.canvas.removeEventListener('mousedown');
      this.canvas.removeEventListener('mousemove');
    };




  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getScaleX() {
    return this.scaleX;
  }
  getScaleY() {
    return this.scaleY;
  }
  getLeft() {
    return this.x;
  }
  getTop() {
    return this.y;
  }
  setWidth(value) {
    this.lastWidth = Object.assign({}, this.width);
    this.width = value;
  }
  setHeight(value) {
    this.lastHeight = Object.assign({}, this.height);
    this.height = value;
  }
  setLeft(value) {
    this.lastLeft = Object.assign({}, this.x);
    this.x = value;
  }
  setTop(value) {
    this.lastTop = Object.assign({}, this.y);
    this.y = value;
  }
  setScaleX(value) {
    this.lastScaleX = Object.assign({}, this.scaleX);
    this.scaleX = value;
  }
  setScaleY(value) {
    this.lastScaleY = Object.assign({}, this.scaleY);
    this.scaleY = value;
  }

  render() {
    var flipX = this.flipX ? -1 : 1;
    var flipY = this.flipY ? -1 : 1;
    var scaleX = flipX / this.scaleX;
    var scaleY = flipY / this.scaleY;

    if (this.hasFocus) {
      let ctx = this.ctx;
      let dashWidth = 7;

      ctx.scale(scaleX, scaleY);
      // Overlay rendering
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';

      // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.renderOverlay(ctx);

      // Set dashed borders
      if (ctx.setLineDash !== undefined) {
        ctx.setLineDash([dashWidth, dashWidth]);
      } else if (ctx.mozDash !== undefined) {
        ctx.mozDash = [dashWidth, dashWidth];
      }

      // First lines rendering with black
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      this.renderBorders(ctx);
      this.renderGrid(ctx);

      // Re render lines in white
      ctx.lineDashOffset = dashWidth;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      this.renderBorders(ctx);
      this.renderGrid(ctx);
      this.renderHandles(ctx);
      // Reset scale
      ctx.scale(1 / scaleX, 1 / scaleY);

    }
  }

  renderOverlay(ctx) {
    var canvas = ctx.canvas;

    //
    //    x0    x1        x2      x3
    // y0 +------------------------+
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    // y1 +------+---------+-------+
    //    |\\\\\\|         |\\\\\\\|
    //    |\\\\\\|    0    |\\\\\\\|
    //    |\\\\\\|         |\\\\\\\|
    // y2 +------+---------+-------+
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    // y3 +------------------------+
    //

    var x0 = 0;
    var x1 = this.x;
    var x2 = this.x + this.width;
    var x3 = canvas.width;

    var y0 = 0;
    var y1 = this.y;
    var y2 = this.y + this.height;
    var y3 = canvas.height;

    ctx.beginPath();

    // Draw outer rectangle.
    // Numbers are +/-1 so that overlay edges don't get blurry.
    ctx.moveTo(x0 - 1, y0 - 1);
    ctx.lineTo(x3 + 1, y0 - 1);
    ctx.lineTo(x3 + 1, y3 + 1);
    ctx.lineTo(x0 - 1, y3 - 1);
    ctx.lineTo(x0 - 1, y0 - 1);
    ctx.closePath();

    // Draw inner rectangle.
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x1, y1);

    ctx.closePath();
    ctx.fill();
    ctx.moveTo(0,0);
  }

  renderBorders(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y); // upper left
    ctx.lineTo(this.x + this.width, this.y); // upper right
    ctx.lineTo(this.x + this.width, this.y + this.height); // down right
    ctx.lineTo(this.x, this.y + this.height); // down left
    ctx.lineTo(this.x, this.y); // upper left
    ctx.stroke();
  }

  renderHandles(ctx) {

    this.selectionHandles.forEach((handle, i) => {
      let top = this.y;
      let left = this.x;
      let centerX = this.x + this.width / 2;
      let centerY = this.y + this.height / 2;
      let right = this.x + this.width;
      let bottom = this.y + this.height;
      let setCoords = [
          [left, top],
          [centerX, top],
          [right, top],
          [right, centerY],
          [right, bottom],
          [centerX, bottom],
          [left, bottom],
          [left, centerY]
        ];

      handle.coords = setCoords[i];
      handle.render(ctx);

    });
  }

  renderGrid(ctx) {


    ctx.beginPath();
    ctx.moveTo(this.x + 1 / 3 * this.width, this.y);
    ctx.lineTo(this.x + 1 / 3 * this.width, this.y + this.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 2 / 3 * this.width, this.y);
    ctx.lineTo(this.x + 2 / 3 * this.width, this.y + this.height);
    ctx.stroke();
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 1 / 3 * this.height);
    ctx.lineTo(this.x + this.width, this.y + 1 / 3 * this.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 2 / 3 * this.height);
    ctx.lineTo(this.x + this.width, this.y + 2 / 3 * this.height);
    ctx.stroke();
  }

}
