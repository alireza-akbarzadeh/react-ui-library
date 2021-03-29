const fontSizes = {
  'font-size-xxs': '9px',
  'font-size-xs': '10px',
  'font-size-s': '11px',
  'font-size-m': '12px',
  'font-size-l': '13px',
  'font-size-xl': '16px',
  'font-size-xxl': '18px',
  'font-size-xxxl': '20px',
  'font-size-xxxxl': '24px',
};

const layout = {
  'layout-grid-base': '4px',

  // anything that should show over the docz nav should be >= 1000
  'layout-z-index-side-panel': 500,
  'layout-z-index-stack-panel': 600,
  'layout-z-index-global-header': 700,
  'layout-z-index-loader': 800,
  'layout-z-index-popover': 1000,
  'layout-z-index-modal': 1100,
  'layout-z-index-toast': 1200,

  'border-radius-s': '2px',
  'border-radius-m': '3px',
  'border-radius-l': '4px',

  'scrollbar-small-width': '4px',
  'scrollbar-small-border-radius': 0,
  'scrollbar-small-min-height': '32px',
  'scrollbar-small-offset': 0,

  'scrollbar-xsmall-width': '2px',
  'scrollbar-xsmall-border-radius': 0,
  'scrollbar-xsmall-min-height': '32px',
  'scrollbar-xsmall-offset': 0,
};

module.exports = {
  ...fontSizes,
  ...layout,
};
