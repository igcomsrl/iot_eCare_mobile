angular.module("demo.upsPushNotifications.ctrl",[]).controller("UpsPushNotificationsCtrl",["$scope","$rootScope","$cordovaUpsPush",function($scope,$rootScope,$cordovaUpsPush){$scope.config={},$scope.register=function(){$cordovaUpsPush.register($scope.config).then(function(){},function(err){alert("Registration error: "+err)}),$rootScope.$on("$cordovaUpsPush:notificationReceived",function(event,notification){notification.alert&&navigator.notification.alert(notification.alert)})}}]);