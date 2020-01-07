metiMobile.factory("accountService",
    ["httpService", "serverRouteMap", "$q", "$rootScope", "zeusAuthService", "$state", "processInstanceService", "inviteFriendService",
        function (httpService, coreRouteMap, $q, $rootScope, zeusAuthService, $state, processInstanceService, inviteFriendService) {
            var factory = {};

            factory.username = "";
            factory.email= "";
            factory.picturePath = "";

            factory.getProfile = function (request) {
                var authData = zeusAuthService.getUserInfo();
                if (!authData)
                    return $q.reject();
                else
                    return httpService.httpRequest(coreRouteMap.routeMap.account.getProfile, "GET", request);
            }

            factory.setProfile = function(){
                factory.getProfile().then(function (response) {

                    var promise = null;
        
                    inviteFriendService.isInvited({ 'email': response.data.email }).then(function (responseInviteFriend) {
                      //Si tratta di un parente invitato, quindi recupero il suo processInstance associato(paziente)
                      if (responseInviteFriend && responseInviteFriend.data.result) {
                        
                        promise = processInstanceService.get({ 'id': responseInviteFriend.data.result.processInstanceId });
                        $rootScope.isInvited = true;
                      }
                      else {
                        //Si tratta di un paziente, recupero il suo processInstance tramite Email
                        promise = processInstanceService.getByRegistryEmail({ 'email': response.data.email });
                        $rootScope.isInvited = false;
                      }
        
                    }, function () {
                        $rootScope.isInvited = false;
                    }).finally(function () {
                      promise.then(function (responseProcessInstance) {
                        var isArray = Array.isArray(responseProcessInstance.data[0])
                        //Salvo il modello process instance
                        processInstanceService.processInstanceModel = processInstanceService.processInstanceUpdateModel(Array.isArray(
                          responseProcessInstance.data)?
                          responseProcessInstance.data[0]:
                          responseProcessInstance.data);
                        $rootScope.$broadcast('processInstanceModel-updated');
                        //parameterNotificationService.enableParameterNotificationDeamon();
                      }, function () {
                        processInstanceService.processInstanceModel = null;
                        $rootScope.$broadcast('processInstanceModel-updated');
                      });
        
                      //Inizializzo il profilo utente
                      factory.initProfile(response.data.claims, response.data.imgProfilePath, true, response.data.username, response.data.email);
        
                      $rootScope.$broadcast('update:username', response.data.username);
                      $rootScope.username = response.data.username;
                      // controllo se ha i claim per gestire i moduli o per backoffice
                      //$state.go("app.home");
        
                      if($rootScope.isInvited){
                        $state.go("app.andamento");
                      }
                      else
                        $state.go("app.deviceHub.device");
                    });
                  }, function (error) {
                    $state.go("login");
                  });
            }

            factory.initProfile = function (claims, profilePath, isAuth, name, email) {
                var userInfo = zeusAuthService.getUserInfo();

                $rootScope.isAuth = isAuth || false;
                $rootScope.claims = claims ? Enumerable.from(claims).select(function (x) { return zeusAuthService.claimModel(x) }).toArray() : [];
                factory.picturePath = profilePath || "";
                factory.username = name || "";
                factory.email = email || "";
                $rootScope.email = factory.email;
                $rootScope.username = factory.username;
                $rootScope.$broadcast('userProfile:updated');
            }

            return factory;
        }]);