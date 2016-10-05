//命令是 node rollup.config.dev.js
/*var rollup = require( 'rollup' );
var babel = require('rollup-plugin-babel');
 
rollup.rollup({
    entry: 'src/jquery.js',
    plugins: [ babel() ]
}).then( function ( bundle ) {
    bundle.write({
        format: 'umd',
        moduleName: 'jQuery', //umd或iife模式下，若入口文件含 export，必须加上该属性
        dest: 'bundle.js',
        sourceMap: true 
    });
});*/


//命令是 rollup -c rollup.config.dev.js
// import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/jquery.js',
  format: 'umd',
  moduleName: 'jQuery',
  plugins: [babel() ],
  dest: 'bundle.js',
};