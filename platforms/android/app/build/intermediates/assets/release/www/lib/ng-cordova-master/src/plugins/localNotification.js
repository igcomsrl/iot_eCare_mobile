angular.module("ngCordova.plugins.localNotification",[]).factory("$cordovaLocalNotification",["$q","$window","$rootScope","$timeout",function($q,$window,$rootScope,$timeout){return document.addEventListener("deviceready",function(){$window.cordova&&$window.cordova.plugins&&$window.cordova.plugins.notification&&$window.cordova.plugins.notification.local&&($window.cordova.plugins.notification.local.on("schedule",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:schedule",notification,state)})}),$window.cordova.plugins.notification.local.on("trigger",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:trigger",notification,state)})}),$window.cordova.plugins.notification.local.on("update",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:update",notification,state)})}),$window.cordova.plugins.notification.local.on("clear",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:clear",notification,state)})}),$window.cordova.plugins.notification.local.on("clearall",function(state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:clearall",state)})}),$window.cordova.plugins.notification.local.on("cancel",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:cancel",notification,state)})}),$window.cordova.plugins.notification.local.on("cancelall",function(state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:cancelall",state)})}),$window.cordova.plugins.notification.local.on("click",function(notification,state){$timeout(function(){$rootScope.$broadcast("$cordovaLocalNotification:click",notification,state)})}))},!1),{schedule:function(options,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.schedule(options,function(result){q.resolve(result)},scope),q.promise},add:function(options,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.schedule(options,function(result){q.resolve(result)},scope),q.promise},update:function(options,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.update(options,function(result){q.resolve(result)},scope),q.promise},clear:function(ids,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.clear(ids,function(result){q.resolve(result)},scope),q.promise},clearAll:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.clearAll(function(result){q.resolve(result)},scope),q.promise},cancel:function(ids,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.cancel(ids,function(result){q.resolve(result)},scope),q.promise},cancelAll:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.cancelAll(function(result){q.resolve(result)},scope),q.promise},isPresent:function(id,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.isPresent(id,function(result){q.resolve(result)},scope),q.promise},isScheduled:function(id,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.isScheduled(id,function(result){q.resolve(result)},scope),q.promise},isTriggered:function(id,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.isTriggered(id,function(result){q.resolve(result)},scope),q.promise},hasPermission:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.hasPermission(function(result){result?q.resolve(result):q.reject(result)},scope),q.promise},registerPermission:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.registerPermission(function(result){result?q.resolve(result):q.reject(result)},scope),q.promise},promptForPermission:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.registerPermission(function(result){result?q.resolve(result):q.reject(result)},scope),q.promise},getAllIds:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getAllIds(function(result){q.resolve(result)},scope),q.promise},getIds:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getIds(function(result){q.resolve(result)},scope),q.promise},getScheduledIds:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getScheduledIds(function(result){q.resolve(result)},scope),q.promise},getTriggeredIds:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getTriggeredIds(function(result){q.resolve(result)},scope),q.promise},get:function(ids,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.get(ids,function(result){q.resolve(result)},scope),q.promise},getAll:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getAll(function(result){q.resolve(result)},scope),q.promise},getScheduled:function(ids,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getScheduled(ids,function(result){q.resolve(result)},scope),q.promise},getAllScheduled:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getAllScheduled(function(result){q.resolve(result)},scope),q.promise},getTriggered:function(ids,scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getTriggered(ids,function(result){q.resolve(result)},scope),q.promise},getAllTriggered:function(scope){var q=$q.defer();return scope=scope||null,$window.cordova.plugins.notification.local.getAllTriggered(function(result){q.resolve(result)},scope),q.promise},getDefaults:function(){return $window.cordova.plugins.notification.local.getDefaults()},setDefaults:function(Object){$window.cordova.plugins.notification.local.setDefaults(Object)}}}]);