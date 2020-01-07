metiMobile.factory("inviteFriendService",
    ["httpService", "serverRouteMap",
        function (httpService, coreRouteMap) {
            var factory = {};

            factory.fetch = function(request){
                return httpService.httpRequest(coreRouteMap.routeMap.inviteFriend.fetch, "GET", request);
            }

            factory.getByProcessInstance = function(request){
                return httpService.httpRequest(coreRouteMap.routeMap.inviteFriend.getByProcessInstance, "GET", request);
            }

            factory.create = function(request){
                return httpService.httpRequest(coreRouteMap.routeMap.inviteFriend.create, "POST", request);
            }

            factory.update = function(request){
                return httpService.httpRequest(coreRouteMap.routeMap.inviteFriend.update, "POST", request);
            }

            factory.isInvited = function(request){
                return httpService.httpRequest(coreRouteMap.routeMap.inviteFriend.isInvited, "GET", request);
            }
            
            return factory;
        }]);