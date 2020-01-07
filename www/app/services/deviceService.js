metiMobile.factory("deviceService",
    ["$q", "$rootScope", 'gattService', 'settingsService', 'serverRouteMap', 'httpService', 'base64Service', '$window', 'parameterNotificationService',
        function ($q, $rootScope, gattService, settingsService, serverRouteMap, httpService, base64Service, $window, parameterNotificationService) {
            var factory = {};
            factory.enableParameterNotification = settingsService.getParameterNotification();


            factory.deviceModelKeys = {
                'bilancia': 'bilanciaModelKey',
                'pulsossimetro': 'pulsossimetroModelKey',
                'sfigmomanometro': 'sfigmomanometroModelKey',
                'termometro': 'termometroModelKey',
                'glucometro': 'glucometroModelKey',
                'smartwatch': 'smartwatchModelKey',
            }

            factory.setDeviceModel = function (model, key) {
                $window.localStorage[key] = JSON.stringify(model);
            }

            factory.getDeviceModel = function (key) {
                var deviceModel = $window.localStorage[key] || '';
                if (deviceModel)
                    deviceModel = JSON.parse(deviceModel)
                return deviceModel;
            }

            factory.bilanciaModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Bilancia",
                    "connected": false,
                    "img": 'img/bilancia.jpg',
                    "localStorageKey": factory.deviceModelKeys.bilancia,
                    'isPairied': false,
                    'isMacAddressValid': true
                }
                return model;
            }

            factory.pulsossimetroModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Pulsossimetro",
                    "connected": false,
                    "img": 'img/pulsossimetro.jpg',
                    "localStorageKey": factory.deviceModelKeys.pulsossimetro,
                    'isPairied': true,
                    'isMacAddressValid': true
                }
                return model;
            }

            factory.sfigmomanometroModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Sfigmomanometro",
                    "connected": false,
                    "img": 'img/sfigmomanometro.jpg',
                    "localStorageKey": factory.deviceModelKeys.sfigmomanometro,
                    'isPairied': false,
                    'isMacAddressValid': true
                }
                return model;
            }

            factory.termometroModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Termometro",
                    "connected": false,
                    "img": 'img/termometro.jpg',
                    "localStorageKey": factory.deviceModelKeys.termometro,
                    'isPairied': false,
                    'isMacAddressValid': true
                }
                return model;
            }
            factory.glucometroModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Glucometro",
                    "connected": false,
                    "img": 'img/glucometro.jpg',
                    "localStorageKey": factory.deviceModelKeys.glucometro,
                    'isPairied': true,
                    'isMacAddressValid': true
                }
                return model;
            }
            factory.smartwatchModel = function (param) {
                if (!param) return;
                var model = {
                    "macAddress": param.id || "",
                    "paringDate": new Date(),
                    "model": param.name || "",
                    "name": "Samsung Galaxy Watch",
                    "connected": true,
                    "img": 'img/smartwatch.jpg',
                    "localStorageKey": factory.deviceModelKeys.smartwatch,
                    'isPairied': true,
                    'isMacAddressValid': true
                }
                return model;
            }

            factory.pushNotification = function (title, text) {

                var pushNotification = settingsService.getPushNotification();

                if (pushNotification) {
                    cordova.plugins.notification.local.schedule({
                        id: new Date(),
                        title: title,
                        text: text,
                        foreground: true
                        //attachments: [deviceImg]
                    });
                }

                var vibrationOnNotification = settingsService.getVibrationOnNotification();

                if (vibrationOnNotification) {
                    navigator.vibrate(1000)
                }

                window.plugins.toast.showLongTop(text);
            }

            factory.resolveFakeMac = function (device) {
                if ($rootScope.isMacFakeEnabled)
                    return device.macAddressFake;
                else
                    return device.macAddress;
            }

            factory.startNotificationBilancia = function (device) {
                if (device.localStorageKey == factory.deviceModelKeys.bilancia) {
                    var onSuccess = function (data) {
                        var array = new Uint8Array(data);
                        var hex = gattService.arrayBufferToHex(array.buffer);
                        var str = hex
                        var weightBytes = parseInt("0x" + str.substring(4, 6) + str.substring(2, 4));
                        var weight = (weightBytes * 0.005).toFixed(2);

                        if (isFloat(weight))
                            weight = weight.toFixed(2);


                        try {
                            parameterNotificationService.initParameters();
                            var parameter = parameterNotificationService.pesoParameter;

                            cordova.plugins.notification.local.clear(1)
                            cordova.plugins.notification.local.schedule({
                                id: 1,
                                title: "Ricordati di misurare il peso",
                                text: "Il medico consiglia ogni " + parameter.frequency + " " + parameter.frequencyType.description + ". Messaggio del: " + new Date().toLocaleString(),
                                foreground: true,
                                trigger: { in: parameter.frequency, unit: parameter.frequencyType.text.toLowerCase() }
                            });
                        }
                        catch (err) {
                            console.log(err.message);
                        }

                        if(weight > 250){
                            window.plugins.toast.showLongBottom("Il peso rilevato è troppo alto: "+ weight +". Esegui una nuova misurazione.");
                            return;
                        }

                        factory.pushNotification('Misurazione peso eseguita!', "Peso rilevato: " + weight + "kg in data: " + new Date().toLocaleString())

                        var request = {
                            "device_mac": factory.resolveFakeMac(device),
                            "timestamp": new Date().getTime(),
                            "metrics": { "weight": weight }
                        }

                        factory.sendBilancia(request).then(function (success) {
                             setTimeout(1000, function () {
                                 window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                             })
                            factory.evaluateResponse(success);

                        }, function (error) {
                            setTimeout(1000, function () {
                                window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                            });
                        });
                    }

                    var onError = function (failure) {
                        console.log(failure);
                        alert("Errore durante la misurazione, ripetere.")
                    }

                    ble.startNotification(device.macAddress, '181d', '2a9d', onSuccess, onError);//Lettura peso
                }

            }

            factory.startNotificationTermometro = function (device) {
                if (device.localStorageKey == factory.deviceModelKeys.termometro) {
                    var onSuccess = function (data) {
                        var array = new Uint8Array(data);
                        var hex = gattService.arrayBufferToHex(array.buffer);

                        var str = hex
                        tempBytes = parseInt("0x" + str.substring(8, 10) + str.substring(6, 8) + str.substring(4, 6) + str.substring(2, 4));

                        //data = msg.payload;

                        data = tempBytes;

                        mantissa = data & 0xFFFFFF;
                        exponent = data >> 24;

                        if (mantissa >= 0x800000)
                            mantissa = - ((0xFFFFFF + 1) - mantissa);


                        if (exponent >= 0x80)
                            exponent = - ((0xFF + 1) - exponent);

                        var result = mantissa * Math.pow(10, exponent);

                        if (isFloat(result))
                            result = result.toFixed(2);

                        try {
                            parameterNotificationService.initParameters();
                            var parameter = parameterNotificationService.temperaturaParameter;

                            cordova.plugins.notification.local.clear(2)
                            cordova.plugins.notification.local.schedule({
                                id: 2,
                                title: "Ricordati di misurare la temperatura",
                                text: "Il medico consiglia ogni " + parameter.frequency + " " + parameter.frequencyType.description + ". Messaggio del: " + new Date().toLocaleString(),
                                foreground: true,
                                trigger: { in: parameter.frequency, unit: parameter.frequencyType.text.toLowerCase() }
                            });
                        }
                        catch (err) {
                            console.log(err.message);
                        }

                        if(result > 45){
                            window.plugins.toast.showLongBottom("La temperatura rilevata è troppo alta: "+ result +". Esegui una nuova misurazione.");
                            return;
                        }
                        if(result < 30){
                            window.plugins.toast.showLongBottom("La temperatura rilevata è troppo bassa: "+ result +". Esegui una nuova misurazione.");
                            return;
                        }

                        factory.pushNotification('Misurazione temperatura eseguita!', "Temperatura rilevata: " + result + "C in data: " + new Date().toLocaleString())

                        var request = {
                            "device_mac": factory.resolveFakeMac(device),
                            "timestamp": new Date().getTime(),
                            "metrics": { "temperature": result }
                        }

                        factory.sendTermometro(request).then(function (success) {
                            setTimeout(1000, function () {
                                window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                            });
                            factory.evaluateResponse(success);
                        }, function (error) {
                            setTimeout(1000, function () {
                                window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                            });
                        });
                    }

                    var onError = function (failure) {
                        console.log(failure);
                        alert("Errore durante la misurazione, ripetere.")
                    }
                    ble.startNotification(device.macAddress, '1809', '2A1C', onSuccess, onError);//Lettura temperatura
                }
            }

            factory.startNotificationSfignomanometro = function (device) {
                if (device.localStorageKey == factory.deviceModelKeys.sfigmomanometro) {
                    var onSuccess = function (data) {
                        var array = new Uint8Array(data);
                        var hex = gattService.arrayBufferToHex(array.buffer);

                        var str = hex
                        var systolicBytes = parseInt("0x" + str.substring(4, 6) + str.substring(2, 4));
                        var diastolicBytes = parseInt("0x" + str.substring(8, 10) + str.substring(6, 8));
                        var pulseRateBytes = parseInt("0x" + str.substring(30, 32) + str.substring(28, 30));

                        // console.log("systolic: " + systolicBytes)
                        // console.log("diastolic: " + diastolicBytes)
                        // console.log("pulse: " + pulseRateBytes)

                        if (systolicBytes == 2047 || systolicBytes === "2047" || diastolicBytes === 2047 || diastolicBytes === "2047") {
                            factory.pushNotification("Errore durante la misurazione della pressione.")
                            window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                            return;
                        }

                        try {
                            parameterNotificationService.initParameters();
                            var parameter = parameterNotificationService.pressioneParameter;

                            cordova.plugins.notification.local.clear(3)
                            cordova.plugins.notification.local.schedule({
                                id: 3,
                                title: "Ricordati di misurare la pressione",
                                text: "Il medico consiglia ogni " + parameter.frequency + " " + parameter.frequencyType.description + ". Messaggio del: " + new Date().toLocaleString(),
                                foreground: true,
                                trigger: { in: parameter.frequency, unit: parameter.frequencyType.text.toLowerCase() }
                            });
                        }
                        catch (err) {
                            console.log(err.message);
                        }

                        if(systolicBytes > 300){
                            window.plugins.toast.showLongBottom("Sistolica rilevata è troppo alta: "+ systolicBytes +". Esegui una nuova misurazione.");
                            return;
                        }
                        if(diastolicBytes < 40){
                            window.plugins.toast.showLongBottom("Diastolica rilevata è troppo bassa: "+ diastolicBytes +". Esegui una nuova misurazione.");
                            return;
                        }

                        factory.pushNotification('Misurazione pressione eseguita!', "Pressione sis/dia : " + systolicBytes + "/" + diastolicBytes + " in data: " + new Date().toLocaleString())

                        var request = {
                            "device_mac": factory.resolveFakeMac(device),
                            "timestamp": new Date().getTime(),
                            "metrics": { "diastolic": diastolicBytes, "systolic": systolicBytes }
                        }

                        factory.sendSfigmomanometro(request).then(function (success) {
                            setTimeout(1000, function () {
                                window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                            });
                            factory.evaluateResponse(success);
                        }, function (error) {
                            setTimeout(1000, function () {
                                window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                            });
                        });
                    }

                    var onError = function (failure) {
                        console.log(failure);
                        alert("Errore durante la misurazione, ripetere.")
                    }

                    ble.startNotification(device.macAddress, '1810', '2A35', onSuccess, onError);//Lettura SFIGMO


                }
            }


            factory.headerAuthNodered =
                {
                    'X-Auth-User': $rootScope.noderedAuthUser,
                    'X-Auth-Key': $rootScope.noderedAuthPassword,
                    //'Authorization': "Basic " + base64Service.encode("ubuntu:G10m1R0m3"),
                    'Authorization': "Basic " + base64Service.encode($rootScope.noderedAuthUser+":"+$rootScope.noderedAuthPassword),
                    'overwriteAuthorization': true
                }

            factory.sendBilancia = function (request) {
                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendBilancia, "POST", request, factory.headerAuthNodered);
            }

            factory.sendTermometro = function (request) {

                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendTermometro, "POST", request, factory.headerAuthNodered);
            }
            factory.sendSfigmomanometro = function (request) {

                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendSfigmomanometro, "POST", request, factory.headerAuthNodered);
            }
            factory.sendPulsossimetro = function (request) {

                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendPulsossimetro, "POST", request, factory.headerAuthNodered);
            }
            factory.sendGlucometro = function (request) {

                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendGlucometro, "POST", request, factory.headerAuthNodered);
            }

            factory.sendAlarm = function(request){
                return httpService.httpRequest(serverRouteMap.routeMap.nodered.sendAlarm, "POST", request, factory.headerAuthNodered);
            }

            factory.evaluateResponse = function(response){
                if (!response)
                    return;

                var alertMessage = response.data.alertMessage;
                var alarms = response.data.alarms;

                //Se ha allarmi, propongo il messaggio    
                if (alarms) {
                    cordova.plugins.notification.local.clear(10)
                    cordova.plugins.notification.local.schedule({
                        id: 10,
                        title: alertMessage,
                        text: "(Scorri verso il basso per interagire)",
                        actions: [{
                            id: 'helpSi',
                            title: 'Si, aiutatemi.'
                        },
                        {
                            id: 'helpSiMessaggio',
                            type: 'input',
                            title: 'Vi scrivo il mio problema.',
                            emptyText: 'Scrivi un messaggio...',
                        }, {
                            id: 'helpNo',
                            title: 'No, sto bene grazie.'
                        }]
                    });

                    var timeout = setTimeout(function(){
                        if(!response)return;   
                        createAlarm(response, '');
                    }, $rootScope.autoAlertTimeout);

                    cordova.plugins.notification.local.on('helpSi', function (notification, eopts) {
                        if(!response)return;                        
                        createAlarm(response, '');
                        clearTimeout(timeout);
                        response = null;
                    });
                    cordova.plugins.notification.local.on('helpSiMessaggio', function (notification, eopts) {
                        if(!response)return;   
                        createAlarm(response, eopts.text);
                        clearTimeout(timeout);
                    });
                    cordova.plugins.notification.local.on('helpNo', function (notification, eopts) {
                        if(!response)return; 
                        //createAlarm(response, eopts.text);
                        clearTimeout(timeout);
                    });
                }

               

                var createAlarm = function(response, patientFeedback){
                    var request = {
                        "macAddress": response.data.macAddress,
                        "alarms": response.data.alarms,
                        "patientFeedback": patientFeedback || ""
                    }

                    factory.sendAlarm(request).then(function(success){
                        response = null;
                        //setTimeout(1000, function () {
                           // window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                        //});
                    }, function(error){
                        //setTimeout(1000, function () {
                           // window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");                            
                        //});
                    });
                }
            }


            function isInt(n) {
                return Number(n) === n && n % 1 === 0;
            }

            function isFloat(n) {
                return Number(n) === n && n % 1 !== 0;
            }
            return factory;
        }]);