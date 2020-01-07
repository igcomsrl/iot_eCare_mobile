metiMobile.controller("HelpCtrl",
    ['$scope',
        'processInstanceService',
        '$rootScope',
        function ($scope, processInstanceService, $rootScope) {

            $scope.operativeCenterPhoneNumber = $rootScope.operativeCenterPhoneNumber;
            $scope.processInstanceModel = null;

            var constructor = function () {
                $scope.processInstanceModel = processInstanceService.processInstanceModel;
            }

            constructor();

            $scope.$on("$destroy", function () {
            });
        }])