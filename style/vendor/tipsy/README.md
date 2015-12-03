# Tipsy.sass
A mixin tooltip CSS using Sass. It currently support Internet Explorer 9+, Chrome, Firefox, Safari and Opera

## Installation
* Clone ``git@github.com:dangvanthanh/tipsy.sass.git``
* [Download the latest version](https://github.com/dangvanthanh/tipsy.sass/archive/master.zip)

## Getting Started

### You need import Tipsy.sass in your stylesheet

```scss
@import "tipsy";
```

### Tipsy.sass have 4 parameters allow you can customize

**SCSS**

```scss
@mixin tipsy($gravity, $bgcolor, $bordersize, $radius) {...}
```

**SASS**

```scss
+tipsy($gravity, $bgcolor, $bordersize, $radius)
```

**PARAMETERS**

```
// Position of tooltip
$gravity: nw | n | ne | e | se | s | sw | w
// Background color of tooltip
$bgcolor  : HEX, RGB, RGBA, HSL
// Arrow size of tooltip
$bordersize : px, em, rem
// Border radius of tooltip
$radius : px, em, rem
```

### How to use

#### HTML

```html
<span className="tipsy" data-tipsy="Simple Tipsy">Simple Tipsy</span>
```

#### SCSS

```scss
.tipsy--nw { @include tipsy(nw, #34495e, 5px, 0);  }
.tipsy--n  { @include tipsy(n, #2ecc71, 5px, 3px); }
.tipsy--ne { @include tipsy(ne, #3498db, 5px, 0);  }
.tipsy--e  { @include tipsy(e, #9b59b6, 5px, 3px); }
.tipsy--se { @include tipsy(se, #f39c12, 5px, 0);  }
.tipsy--s  { @include tipsy(s, #d35400, 5px, 3px); }
.tipsy--sw { @include tipsy(sw, #c0392b, 5px, 0);  }
.tipsy--w  { @include tipsy(w, #8e44ad, 5px, 3px); }
```

#### SASS

```sass
.tipsy--nw
  +tipsy(nw, #34495e, 5px, 0)
.tipsy--n
  +tipsy(n, #2ecc71, 5px, 3px)
.tipsy--ne
  +tipsy(ne, #3498db, 5px, 0)
.tipsy--e
  +tipsy(e, #9b59b6, 5px, 3px)
.tipsy--se
  +tipsy(se, #f39c12, 5px, 0)
.tipsy--s
  +tipsy(s, #d35400, 5px, 3px)
.tipsy--sw
  +tipsy(sw, #c0392b, 5px, 0)
.tipsy--w
  +tipsy(w, #8e44ad, 5px, 3px)
```

### Issues
- Version 1.0.5: Change background variable and added arrow border size of tooltip
- Version 1.0.4: Fix reversed tipsy. Thank you [@esteinborn](https://github.com/esteinborn)