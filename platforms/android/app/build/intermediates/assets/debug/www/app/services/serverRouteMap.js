metiMobile.service("serverRouteMap",
    ['apiEndPoint', 'zeusEndpoint', 'noderedEndpoint',
        function (apiEndPoint, zeusEndpoint, noderedEndpoint) {
            var factory = {};

            factory.routeMap =
            {
                processInstance: {
                    getByRegistryEmail: apiEndPoint + "api/processInstance/getByRegistryEmail",
                    get: apiEndPoint + "api/processInstance/get"
                },
                zeus: {
                    login: zeusEndpoint + "token",
                    resetPassword: zeusEndpoint + "api/User/ResetPassword",
                    changePassword: zeusEndpoint + "api/User/ChangePassword"
                },
                account: {
                    getProfile: apiEndPoint + "api/account/getProfile",
           
                },
                nodered: {
                    sendBilancia: noderedEndpoint + "post_balance_app",
                    sendTermometro: noderedEndpoint + "post_thermometer_app",
                    sendSfigmomanometro: noderedEndpoint + "post_sphygmomanometer_app",
                    sendPulsossimetro: noderedEndpoint + "post_pulseoximeter_app",
                    sendGlucometro: noderedEndpoint + "post_glucometer_app",
                    sendAlarm: noderedEndpoint + "post_alarm",
                },
                inviteFriend: {
                    create: apiEndPoint + "api/inviteFriend/create",
                    update: apiEndPoint + "api/inviteFriend/update",
                    fetch: apiEndPoint + "api/inviteFriend/fetch",
                    getByProcessInstance: apiEndPoint + "api/inviteFriend/getByProcessInstance",
                    isInvited: apiEndPoint + "api/inviteFriend/isInvited"
                }
            };

            return factory;
        }]);