var compressor=require("node-minify");new compressor.minify({type:"gcc",fileIn:"linq.js",fileOut:"linq.min.js",callback:function(err,min){}});