metiMobile.controller("SettingsCtrl",
    ["$scope",
        '$window',
        'settingsService',
        function ($scope, $window, settingsService) {

            //#region Model
            $scope.model = {
                raspberryIp: '',
                pushNotification: true,
                vibrationOnNotification: true,
                macPulsossimetro: '',
                macGlucometro: ''
            }

            //#endregion

            //#region Behaviors
            $scope.setRaspberryIp = function () {
                settingsService.setRaspberryIp($scope.model.raspberryIp);
            }

            $scope.getRaspberryIp = function () {
                var raspberryIp = settingsService.getRaspberryIp();
                $scope.model.raspberryIp = raspberryIp;
            }

            $scope.getMacPulsossimetro = function () {
                var macPulsossimetro = settingsService.getMacPulsossimetro();
                $scope.model.macPulsossimetro = macPulsossimetro;
            }

            $scope.setMacPulsossimetro = function () {
                settingsService.setMacPulsossimetro($scope.model.macPulsossimetro);
            }

            $scope.getMacGlucometro = function () {
                var macGlucometro = settingsService.getMacGlucometro();
                $scope.model.macGlucometro = macGlucometro;
            }

            $scope.setMacGlucometro = function () {
                settingsService.setMacGlucometro($scope.model.macGlucometro);
            }


            $scope.setPushNotification = function () {
                settingsService.setPushNotification($scope.model.pushNotification);
            }

            $scope.getPushNotification = function () {
                var pushNotification = settingsService.getPushNotification();
                if (pushNotification !== false)
                    pushNotification = true;
                $scope.model.pushNotification = pushNotification;
                console.log(pushNotification)
            }

            $scope.setVibrationOnNotification = function () {
                settingsService.setVibrationOnNotification($scope.model.vibrationOnNotification);
            }

            $scope.getVibrationOnNotification = function () {
                var vibrationOnNotification = settingsService.getVibrationOnNotification();
                if (vibrationOnNotification !== false)
                    vibrationOnNotification = true;
                $scope.model.vibrationOnNotification = vibrationOnNotification;
                console.log(vibrationOnNotification)
            }
            //#endregion


            var constructor = function () {
                $scope.getRaspberryIp();
                $scope.getPushNotification();
                $scope.getVibrationOnNotification();
                $scope.getMacGlucometro();
                $scope.getMacPulsossimetro();
            }

            $scope.$on('$ionicView.enter', function () {

                constructor();
            });


            $scope.$on("$destroy", function () {
            });
        }])