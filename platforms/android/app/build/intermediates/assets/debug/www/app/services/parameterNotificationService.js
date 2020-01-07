metiMobile.factory('parameterNotificationService',
    ['serverRouteMap',
        '$window',
        'settingsService',
        'processInstanceService',
        function (serverRouteMap, $window, settingsService, processInstanceService) {
            var factory = {};
            factory.parameterNotificationIntervals = [];
            factory.enableParameterNotification = settingsService.getParameterNotification();
            factory.glicemiaParameter = "";
            factory.temperaturaParameter = "";
            factory.pesoParameter = "";
            factory.ossigenoParameter = "";
            factory.pressioneParameter = "";
            factory.frequenzaParameter = "";
            //#region Behaviors

            factory.initParameters = function () {
                
                var parameters = processInstanceService.processInstanceModel.process.parameters;

                if(processInstanceService && processInstanceService.processInstanceModel && processInstanceService.processInstanceModel.process)
                    parameters = processInstanceService.processInstanceModel.process.parameters;

                angular.forEach(parameters, function (item) {
                    switch (item.name.toLowerCase()) {
                        case 'glicemia':
                            factory.glicemiaParameter = item;
                            break;
                        case 'temperatura':
                            factory.temperaturaParameter = item;
                            break;
                        case 'peso':
                                factory.pesoParameter = item;
                            break;
                        case 'ossigeno':
                                factory.ossigenoParameter = item;
                            break;
                        case 'pressione':
                                factory.pressioneParameter = item;
                            break;
                        case 'frequenza':
                                factory.frequenzaParameter = item;
                            break;
                    }
                });
            }

            //factory.initParameters();
            //Demone di notifica
            // factory.enableParameterNotificationDeamon = function () {
            //     if (factory.enableParameterNotification) {
            //         //cordova.plugins.notification.local.schedule.cancelAll();
            //         angular.forEach(factory.parameterNotificationIntervals, function(item){
            //             clearInterval(item);
            //         });
            //         parseParameterNotification();
            //     }
            //     else {
            //         return;
            //     }
            // }

            // var parseParameterNotification = function () {
            //     var parameters = processInstanceService.processInstanceModel.process.parameters;
            //     if (!parameters)
            //         return;

            //     angular.forEach(parameters, function (item) {
            //         notifyParameter(item);
            //     });
            // }

            // var notifyParameter = function (parameter) {
            //     if (!parameter)
            //         return;

            //     setNofityParameterLastDate(parameter);

            //     var notifyParameterLastDate = getNofityParameterLastDate(parameter);

            //     executeEvery(notifyParameterLastDate.getTime(), showLocalNotification, notifyParameterLastDate, parameter);

            // }

            // var getNofityParameterLastDate = function (parameter) {
            //     var nofityParameterLastDate = $window.localStorage[parameter.id] || '';

            //     if(nofityParameterLastDate === "")
            //         return nofityParameterLastDate = new Date();

            //     return new Date(nofityParameterLastDate);
            // };

            // var setNofityParameterLastDate = function (parameter) {
            //     if (!parameter)
            //         return;

            //     var notifyParameterLastDate = getNofityParameterLastDate(parameter);
            //     if (!(notifyParameterLastDate instanceof Date)) {
            //         notifyParameterLastDate = new Date(notifyParameterLastDate);
            //     }

            //     var frequency = parameter.frequency;
            //     var frequencyType = parameter.frequencyType;

            //     if(!frequency || !frequencyType)
            //         return;

            //     notifyParameterLastDate = dateAdd(notifyParameterLastDate, frequencyType.id, frequency);

            //     //$window.localStorage[parameter.id] = notifyParameterLastDate;

            //     // cordova.plugins.notification.local.schedule({
            //     //     title: "Ricordati di misurare..",
            //     //     text: "Ti consiglio di misurare "+ parameter.name +" alle "+ date.toLocaleString(),
            //     //     trigger: { every: resolveFrequency(frequencyType.id), count: frequency }
            //     // });
            // };

            // var resolveFrequency = function(frequencyType){
            //     switch (frequencyType) {
            //         // case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
            //         // case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
            //         case 6: return 'month';
            //         case 5: return 'week';
            //         case 4: return 'day';
            //         case 3: return 'hour';
            //         case 2: return 'minute';
            //         case 1: return 'second';
            //     }
            // }

            // function executeEvery(time, func, notifyParameterLastDate, parameter){
            //     var currentTime = new Date().getTime();
            //     // if(currentTime>time){
            //     //     console.error("Time is in the Past");
            //     //     return false;
            //     // }
            //     var interval = setInterval(function(){
            //         func(parameter, new Date());
            //     //}, time-currentTime);
            // }, 10000);
            //     factory.parameterNotificationIntervals.push(interval);
            //     return true;
            // }

            //  /**
            //  * Adds time to a date. Modelled after MySQL DATE_ADD function.
            //  * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
            //  * https://stackoverflow.com/a/1214753/18511
            //  * 
            //  * @param date  Date to start with
            //  * @param interval  One of: year, quarter, month(6), week(5), day(4), hour(3), minute(2), second(1)
            //  * @param units  Number of units of the given interval to add.
            //  */
            // function dateAdd(date, interval, units) {
            //     var ret = new Date(date); //don't change original date
            //     var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
            //     switch (interval) {
            //         // case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
            //         // case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
            //         case 6: ret.setMonth(ret.getMonth() + units); checkRollover(); break;
            //         case 5: ret.setDate(ret.getDate() + 7 * units); break;
            //         case 4: ret.setDate(ret.getDate() + units); break;
            //         case 3: ret.setTime(ret.getTime() + units * 3600000); break;
            //         case 2: ret.setTime(ret.getTime() + units * 60000); break;
            //         case 1: ret.setTime(ret.getTime() + units * 1000); break;
            //         default: ret = undefined; break;
            //     }
            //     return ret;
            // }

            // var showLocalNotification= function(parameter, date){                
            //     cordova.plugins.notification.local.schedule({
            //         id: new Date(),
            //         title: "Ricordati di misurare...",
            //         text: parameter.name +". Messaggio delle: "+ date.toLocaleString(),
            //         foreground: true
            //         //attachments: [deviceImg]
            //     });
            //     $window.localStorage[parameter.id] = date;
            // }
            return factory;
        }]);
