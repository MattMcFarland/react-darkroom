import CARDINAL_DIRECTIONS from './constants';

const { NW, N, NE, E, SE, S, SW, W } = CARDINAL_DIRECTIONS;

export const positionStyles = {
  [NW]: {
    '&:hover, &:focus': {
      '&:before': {
        top: '-15%',
      },
      '&:after': {
        bottom: '115%',
      },
    },
    '&:before': {
      borderTopColor: ({ backgroundColor }) => `${backgroundColor}`,
      top: '-35%',
      right: '60%',
    },
    '&:after': {
      bottom: '135%',
      right: '50%',
    },
  },
  [N]: {
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
      borderTopColor: ({ backgroundColor }) => `${backgroundColor}`,
      top: '-35%',
    },
    '&:after': {
      bottom: '135%',
    },
  },
  [NE]: {
    '&:hover, &:focus': {
      '&:before': {
        top: '-15%',
      },
      '&:after': {
        bottom: '115%',
      },
    },
    '&:before': {
      borderTopColor: ({ backgroundColor }) => `${backgroundColor}`,
      top: '-35%',
      left: '60%',
    },
    '&:after': {
      bottom: '135%',
      left: '50%',
    },
  },
  [E]: {
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
      borderRightColor: ({ backgroundColor }) => `${backgroundColor}`,
      right: '-35%',
    },
    '&:after': {
      left: '135%',
    },
  },
  [SE]: {
    '&:hover, &:focus': {
      '&:before': {
        bottom: '-15%',
      },
      '&:after': {
        top: '115%',
      },
    },
    '&:before': {
      borderBottomColor: ({ backgroundColor }) => `${backgroundColor}`,
      left: '60%',
      bottom: '-35%',
    },
    '&:after': {
      left: '50%',
      top: '135%',
    },
  },
  [S]: {
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
      borderBottomColor: ({ backgroundColor }) => `${backgroundColor}`,
      bottom: '-35%',
    },
    '&:after': {
      top: '135%',
    },
  },
  [SW]: {
    '&:hover, &:focus': {
      '&:before': {
        bottom: '-15%',
      },
      '&:after': {
        top: '115%',
      },
    },
    '&:before': {
      borderBottomColor: ({ backgroundColor }) => `${backgroundColor}`,
      right: '60%',
      bottom: '-35%',
    },
    '&:after': {
      right: '50%',
      top: '135%',
    },
  },
  [W]: {
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
      borderLeftColor: ({ backgroundColor }) => `${backgroundColor}`,
      left: '-35%',
    },
    '&:after': {
      right: '125%',
    },
  },
};

export const base = {
  position: 'relative',
  display: 'inline-block',
  lineHeight: 1.125,
  '&:hover, &:focus': {
    '&:before, &:after': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  '&[disabled]': {
    '&:before, &:after': {
      display: 'none',
    },
  },
  '&:before, &:after': {
    fontSize: 12,
    lineHeight: '18px',
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
    border: ({ arrowSize }) => `${arrowSize} solid transparent`,
    bottom: 0,
    zIndex: 1000001,
  },
  '&:after': {
    content: 'attr(data-label)',
    backgroundColor: ({ backgroundColor }) => `${backgroundColor}`,
    borderRadius: ({ radius }) => `${radius}`,
    color: 'white',
    textShadow: '0 -1px 0 rgba(0, 0, 0, .2)',
    padding: '5px 10px',
    whiteSpace: 'nowrap',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, .2)',
  },
};

export default Object.values(CARDINAL_DIRECTIONS).reduce((acc, direction) =>
  Object.assign(acc, {
    [`tooltip-${direction}`]: positionStyles[direction],
  }), {
  base,
});
