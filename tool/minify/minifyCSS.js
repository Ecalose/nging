//css: npm install clean-css -g
//查询node_modules文件夹位置: npm root -g
var cleanCSS = require('clean-css');
var process = require('process');
var fs = require('fs')

function cssMinifier(flieIn, fileOut) {
   var flieIn = Array.isArray(flieIn) ? flieIn : [flieIn];
   var origCode, finalCode = '';
   var clean = new cleanCSS({})
   for (var i = 0; i < flieIn.length; i++) {
      origCode = fs.readFileSync(flieIn[i], 'utf8');
      finalCode += clean.minify(origCode).styles;
   }
   fs.writeFileSync(fileOut, finalCode, 'utf8');
}
var arguments = process.argv.splice(2); //node ./minifyCSS.js src.css min.css
if (arguments.length == 1) {
   var srcFile = arguments[0];
   var pos = srcFile.lastIndexOf('.');
   arguments.push(srcFile.substring(0, pos)+'.min'+srcFile.substring(pos))
}
cssMinifier(arguments[0], arguments[1]);  //单个文件压缩
//cssMinifier(['./file-src/index_20120913.css','./file-src/indexw_20120913.css'], './file-smin/index.css');