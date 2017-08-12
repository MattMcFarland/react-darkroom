import merge from 'deepmerge';
import CARDINAL_DIRECTIONS from '../constants';

const { NW, N, NE, E, SE, S, SW, W } = CARDINAL_DIRECTIONS;

const positionStyles = {
  [NW]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        top: '-15%',
      },
      '&:after': {
        bottom: '115%',
      },
    },
    '&:before': {
      borderTopColor: `${color}`,
      top: '-35%',
      right: '60%',
    },
    '&:after': {
      bottom: '135%',
      right: '50%',
    },
  }),
  [N]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        top: '-15%',
      },
      '&:after': {
        bottom: '115%',
      },
    },
    '&:before, &:after': {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&:before': {
      borderTopColor: `${color}`,
      top: '-35%',
    },
    '&:after': {
      bottom: '135%',
    },
  }),
  [NE]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        top: '-15%',
      },
      '&:after': {
        bottom: '115%',
      },
    },
    '&:before': {
      borderTopColor: `${color}`,
      top: '-35%',
      left: '60%',
    },
    '&:after': {
      bottom: '135%',
      left: '50%',
    },
  }),
  [E]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        right: '-15%',
      },
      '&:after': {
        left: '115%',
      },
    },
    '&:before, &:after': {
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&:before': {
      borderRightColor: `${color}`,
      right: '-35%',
    },
    '&:after': {
      left: '135%',
    },
  }),
  [SE]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        bottom: '-15%',
      },
      '&:after': {
        top: '115%',
      },
    },
    '&:before': {
      borderBottomColor: `${color}`,
      left: '60%',
      bottom: '-35%',
    },
    '&:after': {
      left: '50%',
      top: '135%',
    },
  }),
  [S]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        bottom: '-15%',
      },
      '&:after': {
        top: '115%',
      },
    },
    '&:before, &:after': {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&:before': {
      borderBottomColor: `${color}`,
      bottom: '-35%',
    },
    '&:after': {
      top: '135%',
    },
  }),
  [SW]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        bottom: '-15%',
      },
      '&:after': {
        top: '115%',
      },
    },
    '&:before': {
      borderBottomColor: `${color}`,
      right: '60%',
      bottom: '-35%',
    },
    '&:after': {
      right: '50%',
      top: '135%',
    },
  }),
  [W]: color => ({
    '&:hover, &:focus': {
      '&:before': {
        left: '-15%',
      },
      '&:after': {
        right: '115%',
      },
    },
    '&:before, &:after': {
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '&:before': {
      borderLeftColor: `${color}`,
      left: '-35%',
    },
    '&:after': {
      right: '125%',
    },
  }),
};

const allStyles = (color, arrowSize, radius) => ({
  position: 'relative',
  display: 'inline-block',
  '&:hover, &:focus': {
    '&:before, &:after': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  '&:before, &:after': {
    position: 'absolute',
    visibility: 'hidden',
    opacity: 0,
    zIndex: 1000000,
    pointerEvents: 'none',
    transform: 'translate3d (0, 0, 0)',
    transition: '250ms ease-in-out',
  },
  '&:before': {
    content: '""',
    border: `${arrowSize} solid transparent`,
    bottom: 0,
    zIndex: 1000001,
  },
  '&:after': {
    content: 'attr(data-label)',
    backgroundColor: `${color}`,
    borderRadius: `${radius}`,
    color: 'white',
    textShadow: '0 -1px 0 rgba(0, 0, 0, .2)',
    padding: '5px 10px',
    whiteSpace: 'nowrap',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, .2)',
  },
});

const createTooltipStyle = (
  position,
  color,
  arrowSize,
  radius,
) => {
  const withAllStyles = allStyles(color, arrowSize, radius);
  const withDirectionalStyles = positionStyles[position](color);
  return merge(withAllStyles, withDirectionalStyles);
};

export default createTooltipStyle;
