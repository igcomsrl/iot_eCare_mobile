metiMobile.controller("RilevazioneCtrl",
    ['$scope',
    '$ionicLoading',
    '$window',
    '$sce',
        function ($scope, $ionicLoading, $window, $sce) {

            //#region Model
            $scope.raspberryIp = '';
            $scope.url = '';
            //#endregion

            //#region Behaviors
            //#endregion
            
            window.hide=function(){
                $ionicLoading.hide();
            }

            $scope.$on('$ionicView.enter', function () {
                $scope.raspberryIp = $window.localStorage["raspberryIpKey"];
                $scope.url = $sce.trustAsResourceUrl("http://"+ $scope.raspberryIp +":1880/ui") ;

                $ionicLoading.show();

                setTimeout(function () {
                    $ionicLoading.hide();
                }, 10000)
            });


            $scope.$on("$destroy", function () {
            });
        }])