metiMobile.factory('settingsService',
    ['serverRouteMap',
        '$window',
        function (serverRouteMap, $window) {
            var factory = {};

            factory.raspberryIpKey = 'raspberryIpKey';
            factory.pushNotificationKey = 'pushNotificationKey';
            factory.vibrationOnNotificationKey = 'vibrationOnNotificationKey';
            factory.macPulsossimetroKey = 'macPulsossimetroKey';
            factory.macGlucometroKey = 'macGlucometroKey';
            factory.parameterNotificationKey = 'parameterNotificationKey';
            
            //#region Behaviors
            factory.setRaspberryIp = function(raspberryIp) {
                //$window.localStorage.set("raspberryIp", JSON.stringify($scope.raspberryIp));
                $window.localStorage[factory.raspberryIpKey] = raspberryIp;
            }

            factory.getRaspberryIp = function() {
                //var raspberryIp = JSON.parse($window.localStorage[raspberryIpKey] || {});
                var raspberryIp = $window.localStorage[factory.raspberryIpKey] || '';
                return raspberryIp;
            }

            factory.setPushNotification = function(pushNotification){
                $window.localStorage[factory.pushNotificationKey] = pushNotification;
                //alert("Set Push "+ pushNotification)
            }

            factory.getPushNotification = function(){
                var pushNotification = $window.localStorage[factory.pushNotificationKey] || '';
                if(pushNotification === "")
                    pushNotification = "true"
                //alert("Get Push "+ pushNotification)
                return JSON.parse(pushNotification);
            }

            factory.setParameterNotification = function(parameterNotification){
                $window.localStorage[factory.parameterNotificationKey] = parameterNotification;
                //alert("Set Push "+ pushNotification)
            }

            factory.getParameterNotification = function(){
                var parameterNotification = $window.localStorage[factory.parameterNotificationKey] || '';
                if(parameterNotification === "")
                    parameterNotification = "true"
                //alert("Get Push "+ pushNotification)
                return JSON.parse(parameterNotification);
            }

            factory.setVibrationOnNotification = function(vibrationOnNotification){
                $window.localStorage[factory.vibrationOnNotificationKey] = vibrationOnNotification;
            }

            factory.getVibrationOnNotification = function(){
                var vibrationOnNotification = $window.localStorage[factory.vibrationOnNotificationKey] || '';
                if(vibrationOnNotification === "")
                vibrationOnNotification = "true"
                return JSON.parse(vibrationOnNotification);
            }

            factory.setMacPulsossimetro = function(macPulsossimetro) {
                //$window.localStorage.set("raspberryIp", JSON.stringify($scope.raspberryIp));
                $window.localStorage[factory.macPulsossimetroKey] = macPulsossimetro;
            }

            factory.getMacPulsossimetro = function() {
                var macPulsossimetro = $window.localStorage[factory.macPulsossimetroKey] || '';
                return macPulsossimetro;
            }

            factory.setMacGlucometro = function(macGlucometro) {
                //$window.localStorage.set("raspberryIp", JSON.stringify($scope.raspberryIp));
                $window.localStorage[factory.macGlucometroKey] = macGlucometro;
            }

            factory.getMacGlucometro = function() {
                var macGlucometro = $window.localStorage[factory.macGlucometroKey] || '';
                return macGlucometro;
            }
            return factory;
        }]);
