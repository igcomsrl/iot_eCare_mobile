angular.module("ngCordova.plugins.inAppBrowser",[]).provider("$cordovaInAppBrowser",[function(){var ref,defaultOptions=this.defaultOptions={};this.setDefaultOptions=function(config){defaultOptions=angular.extend(defaultOptions,config)},this.$get=["$rootScope","$q","$window","$timeout",function($rootScope,$q,$window,$timeout){return{open:function(url,target,requestOptions){var q=$q.defer();if(requestOptions&&!angular.isObject(requestOptions))return q.reject("options must be an object"),q.promise;var options=angular.extend({},defaultOptions,requestOptions),opt=[];angular.forEach(options,function(value,key){opt.push(key+"="+value)});var optionsString=opt.join();return(ref=$window.open(url,target,optionsString)).addEventListener("loadstart",function(event){$timeout(function(){$rootScope.$broadcast("$cordovaInAppBrowser:loadstart",event)})},!1),ref.addEventListener("loadstop",function(event){q.resolve(event),$timeout(function(){$rootScope.$broadcast("$cordovaInAppBrowser:loadstop",event)})},!1),ref.addEventListener("loaderror",function(event){q.reject(event),$timeout(function(){$rootScope.$broadcast("$cordovaInAppBrowser:loaderror",event)})},!1),ref.addEventListener("exit",function(event){$timeout(function(){$rootScope.$broadcast("$cordovaInAppBrowser:exit",event)})},!1),q.promise},close:function(){ref.close(),ref=null},show:function(){ref.show()},executeScript:function(details){var q=$q.defer();return ref.executeScript(details,function(result){q.resolve(result)}),q.promise},insertCSS:function(details){var q=$q.defer();return ref.insertCSS(details,function(result){q.resolve(result)}),q.promise}}}]}]);