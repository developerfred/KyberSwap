const path = require('path');

module.exports = {
  entry: './winit-torus.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'winit-torus-bundled.js'
  }
};