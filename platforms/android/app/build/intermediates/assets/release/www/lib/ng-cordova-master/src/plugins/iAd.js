angular.module("ngCordova.plugins.iAd",[]).factory("$cordovaiAd",["$q","$window",function($q,$window){return{setOptions:function(options){var d=$q.defer();return $window.iAd.setOptions(options,function(){d.resolve()},function(){d.reject()}),d.promise},createBanner:function(options){var d=$q.defer();return $window.iAd.createBanner(options,function(){d.resolve()},function(){d.reject()}),d.promise},removeBanner:function(){var d=$q.defer();return $window.iAd.removeBanner(function(){d.resolve()},function(){d.reject()}),d.promise},showBanner:function(position){var d=$q.defer();return $window.iAd.showBanner(position,function(){d.resolve()},function(){d.reject()}),d.promise},showBannerAtXY:function(x,y){var d=$q.defer();return $window.iAd.showBannerAtXY(x,y,function(){d.resolve()},function(){d.reject()}),d.promise},hideBanner:function(){var d=$q.defer();return $window.iAd.hideBanner(function(){d.resolve()},function(){d.reject()}),d.promise},prepareInterstitial:function(options){var d=$q.defer();return $window.iAd.prepareInterstitial(options,function(){d.resolve()},function(){d.reject()}),d.promise},showInterstitial:function(){var d=$q.defer();return $window.iAd.showInterstitial(function(){d.resolve()},function(){d.reject()}),d.promise}}}]);