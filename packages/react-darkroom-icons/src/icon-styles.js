import { iconKinds } from './constants';
import fonticon from './fonts/icomoon.woff';

const icon = unicode => ({
  fontFamily: 'darkroom-icons',
  speak: 'none',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontVariant: 'normal',
  textTransform: 'none',
  lineHeight: 1,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  '&:before': { content: `"\\${unicode}"` },
});

export default {
  '@font-face': {
    fontFamily: 'darkroom-icons',
    src: `url("${fonticon}") format("woff")`,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  [iconKinds.FLOPPYDISK]: icon('e900'),
  [iconKinds.UNDO]: icon('e901'),
  [iconKinds.UNDO2]: icon('e902'),
  [iconKinds.REDO]: icon('e903'),
  [iconKinds.REDO2]: icon('e904'),
  [iconKinds.CROP]: icon('e905'),
  [iconKinds.IMAGE]: icon('e906'),
  [iconKinds.CROSS]: icon('e907'),
  [iconKinds.CHECKMARK]: icon('e908'),
};
