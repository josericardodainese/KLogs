const { ProvidePlugin } = require('webpack');
module.exports = {
  resolve: {
    fallback: { "path": false }
  },
  plugins: [
    new ProvidePlugin({ process: 'process/browser' }), // util requires this internally
  ],
};
