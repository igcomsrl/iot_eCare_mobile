metiMobile.factory('processInstanceService',
    ['serverRouteMap',
        'httpService',
        function (serverRouteMap, httpService) {
            var factory = {};

            factory.processInstanceModel = null;

            factory.processInstanceUpdateModel = function (dto) {
                if (!dto) return {};

                var model = {
                    'id': dto.id,
                    'name': dto.name,
                    'process': dto.process,
                    'isEnabled': dto.isEnabled || true,
                    'patient': dto.patient,
                    'doctors': dto.doctors,
                    'referencePersons': dto.referencePersons,
                    'process': dto.process
                };

                return model;
            }

            factory.getByRegistry = function (request) {
                return httpService.httpRequest(serverRouteMap.routeMap.processInstance.getByRegistry, "GET", request);
            }

            factory.getByRegistryEmail = function (request) {
                return httpService.httpRequest(serverRouteMap.routeMap.processInstance.getByRegistryEmail, "GET", request);
            }

            factory.get = function(request){
                return httpService.httpRequest(serverRouteMap.routeMap.processInstance.get, "GET", request);
            }
            
            return factory;
        }]);
