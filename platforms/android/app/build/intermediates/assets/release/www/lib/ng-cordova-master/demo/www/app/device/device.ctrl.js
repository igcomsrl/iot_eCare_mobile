angular.module("demo.device.ctrl",[]).controller("DeviceCtrl",["$scope","$state","$cordovaDevice",function($scope,$state,$cordovaDevice){!function(){try{document.addEventListener("deviceready",function(){$scope.available=$cordovaDevice.getDevice().available,$scope.cordova=$cordovaDevice.getCordova(),$scope.model=$cordovaDevice.getModel(),$scope.platform=$cordovaDevice.getPlatform(),$scope.uuid=$cordovaDevice.getUUID(),$scope.version=$cordovaDevice.getVersion()},!1)}catch(err){alert("error "+err.$$failure.message)}}()}]);