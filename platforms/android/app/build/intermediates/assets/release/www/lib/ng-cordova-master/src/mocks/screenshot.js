ngCordovaMocks.factory("$cordovaScreenshot",["$q",function($q){return{throwsError:!1,captureToFile:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was an error capturing the screenshot."):defer.resolve("path"),defer.promise},captureToUri:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was an error capturing the screenshot."):defer.resolve(),defer.promise}}}]);