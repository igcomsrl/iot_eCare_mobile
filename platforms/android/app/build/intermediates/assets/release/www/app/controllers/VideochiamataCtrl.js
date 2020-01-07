metiMobile.controller("VideochiamataCtrl",
    ["$scope",
    'processInstanceService',
        function ($scope, processInstanceService) {

            //#region Model
            
            
            //#endregion

            //#region Behaviors
            //#endregion


            var constructor = function () {
                $scope.processInstanceModel = processInstanceService.processInstanceModel;
            }

            constructor();

            $scope.$on("$destroy", function () {
            });
        }])