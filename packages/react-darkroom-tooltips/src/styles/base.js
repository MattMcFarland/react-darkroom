
export default {
  '&:before, &:after': {
    fontSize: 12,
    lineHeight: '18px',
  },
  '&[disabled]': {
    '&:before, &:after': {
      display: 'none',
    },
  },
  lineHeight: 1.125,
};
