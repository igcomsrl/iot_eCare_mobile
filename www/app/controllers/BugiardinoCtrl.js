metiMobile.controller("BugiardinoCtrl",
    ['$scope',
    '$ionicLoading',
        function ($scope, $ionicLoading) {

            //#region Model
            //#endregion

            //#region Behaviors
            //#endregion

            var constructor = function () {
                $ionicLoading.show();
            }
            window.hide=function(){
                $ionicLoading.hide();
            }
            constructor();

            $scope.$on("$destroy", function () {
            });
        }])