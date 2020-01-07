metiMobile.controller("ProfiloCtrl",
    ["$scope",
    'processInstanceService',
    '$rootScope',
        function ($scope, processInstanceService, $rootScope) {

            //#region Model
            //#endregion

            //#region Behaviors
            //#endregion

            var constructor = function () {
                $scope.processInstanceModel = processInstanceService.processInstanceModel;
            }
            
            $rootScope.$on('processInstanceModel-updated', function(){
                $scope.processInstanceModel = processInstanceService.processInstanceModel;
            });
            constructor();

            $scope.$on("$destroy", function () {
            });
        }])