metiMobile.controller("DispositivoCtrl",
    ['$scope',
        '$ionicLoading',
        'deviceService',
        '$q',
        '$rootScope',
        'settingsService',
        'parameterNotificationService',
        function ($scope, $ionicLoading, deviceService, $q, $rootScope, settingsService, parameterNotificationService) {

            //#region Model        
            $scope.deviceScanFounded = [];
            $scope.devicePariedFounded = [];
            $scope.isScanBusy = false;
            $scope.isPariedBusy = false;
            $scope.data = {
                "glucosioManuale": "",
                "ossigenoManuale": "",
                "battitiManuale": ""
            }
            $scope.deviceModelList = [];
            $scope.canInsertFields = false;

            //#endregion

            //#region Ionic Refresher
            $scope.doScanRefresh = function () {
                $scope.scan();
                $scope.$apply();
            };
            $scope.doPariedRefresh = function () {
                $scope.fetchDeviceModelList();
                $scope.$apply();
            };
            //#endregion

            $scope.fetchDeviceModelList = function () {

                $scope.deviceModelList = [];

                var bilancia = deviceService.getDeviceModel(deviceService.deviceModelKeys.bilancia);
                if (!bilancia) {
                    bilancia = deviceService.bilanciaModel({});
                    deviceService.setDeviceModel(deviceService.bilanciaModel({}), deviceService.deviceModelKeys.bilancia);
                }
                $scope.deviceModelList.push(bilancia);

                var sfigmomanometro = deviceService.getDeviceModel(deviceService.deviceModelKeys.sfigmomanometro);
                if (!sfigmomanometro) {
                    sfigmomanometro = deviceService.sfigmomanometroModel({});
                    deviceService.setDeviceModel(deviceService.sfigmomanometroModel({}), deviceService.deviceModelKeys.sfigmomanometro);
                }
                $scope.deviceModelList.push(sfigmomanometro);

                var termometro = deviceService.getDeviceModel(deviceService.deviceModelKeys.termometro);
                if (!termometro) {
                    termometro = deviceService.termometroModel({});
                    deviceService.setDeviceModel(deviceService.termometroModel({}), deviceService.deviceModelKeys.termometro);
                }
                $scope.deviceModelList.push(termometro);

                var pulsossimetro = deviceService.getDeviceModel(deviceService.deviceModelKeys.pulsossimetro)
                if (!pulsossimetro) {
                    pulsossimetro = deviceService.pulsossimetroModel({});
                    deviceService.setDeviceModel(deviceService.pulsossimetroModel({}), deviceService.deviceModelKeys.pulsossimetro);
                }
                $scope.deviceModelList.push(pulsossimetro);

                var glucometro = deviceService.getDeviceModel(deviceService.deviceModelKeys.glucometro);
                if (!glucometro) {
                    glucometro = deviceService.glucometroModel({});
                    deviceService.setDeviceModel(deviceService.glucometroModel({}), deviceService.deviceModelKeys.glucometro);
                }
                $scope.deviceModelList.push(glucometro);

                var smartwatch = deviceService.getDeviceModel(deviceService.deviceModelKeys.smartwatch);
                if (!smartwatch) {
                    smartwatch = deviceService.smartwatchModel({});
                    deviceService.setDeviceModel(deviceService.smartwatchModel({}), deviceService.deviceModelKeys.smartwatch);
                }
                $scope.deviceModelList.push(smartwatch);

                $scope.fetchPariedDevices();
                $scope.$broadcast('scroll.refreshComplete');
            }

            $scope.onDeviceModelChange = function (model, key) {
                deviceService.setDeviceModel(model, key);
                $scope.fetchPariedDevices();
            }

            window.hide = function () {
                $ionicLoading.hide();
            }

            // $scope.doParing = function (item) {
            //     ble.autoConnect(item.macAddress, function (result) {
            //         console.log(JSON.stringify(result))
            //         //alert(JSON.stringify(result))
            //         updateIsConnect(item);
            //         var text = "Associazione eseguita!"
            //         window.plugins.toast.showLongTop(text);
            //     },
            //         function (resultError) {
            //            // alert("Periferica disconnessa, eseguire la procedura di pairing")
            //             //alert(JSON.stringify(resultError))
            //             console.log(resultError);
            //             updateIsConnect(item);
            //             window.plugins.toast.showLongTop("Associazione fallita");
            //         });
            // }

            // $scope.removeParing = function (item) {
            //     ble.disconnect(item.macAddress, function (result) {
            //         //$scope.stopNotification(item);
            //         updateIsConnect(item);
            //         alert("dispositivo rimosso")
            //     },
            //         function (resultError) {
            //             alert("Error removeParing")
            //             updateIsConnect(item);
            //             console.log(resultError);
            //         });
            // }

            $scope.scan = function () {
                $scope.isScanBusy = true;
                $scope.deviceScanFounded = [];
                ble.scan([], 3, function (result) {
                    console.log("Scansione:")
                    if (result.name) {
                        var model = deviceService.deviceModel(result);
                        $scope.deviceScanFounded.push(model);
                        console.log(result);
                        $scope.$apply();
                    }

                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.isScanBusy = false;

                    // console.log("Scansione:")
                    // console.log(result);
                }, function (resultError) {
                    $scope.isScanBusy = false;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }

            var updateIsConnect = function (model) {
                ble.isConnected(model.macAddress, function (result) {
                    model.connected = true;
                    $scope.$apply();
                }, function () {
                    model.connected = false;
                    $scope.$apply();
                });
            }


            // var pushGlucometroManual = function () {
            //     var data = {
            //         id: 'n/d',
            //         name: 'n/d'
            //     }
            //     var model = deviceService.deviceModel(data);
            //     $scope.devicePariedFounded.push(model);
            //     $scope.startNotification(model);
            // }
            // var pushPulsossimetroManual = function () {
            //     var data = {
            //         id: 'n/d',
            //         name: 'SpO201'
            //     }
            //     var model = deviceService.deviceModel(data);
            //     $scope.devicePariedFounded.push(model);
            //     $scope.startNotification(model);
            // }

            $scope.canShowPulsossimetroGlucometro = function (item) {
                return item.name != 'Glucometro' && item.name != 'Pulsossimetro';
            }

            $scope.sendGlucometro = function (item) {
                if (!$scope.data.glucosioManuale) {
                    window.plugins.toast.showLongBottom("Inserisci la rilevazione di glucosio prima di inviare.");
                    return;
                }

                
                try {
                    parameterNotificationService.initParameters();
                    var parameter = parameterNotificationService.glicemiaParameter;
    
                    cordova.plugins.notification.local.clear(4)
                    cordova.plugins.notification.local.schedule({
                        id: 4,
                        title: "Ricordati di misurare il glucosio",
                        text: "Il medico consiglia ogni "+ parameter.frequency + " " + parameter.frequencyType.description + ". Messaggio del: "+ new Date().toLocaleString(),
                        foreground: true,
                        trigger: { in: parameter.frequency, unit: parameter.frequencyType.text.toLowerCase() }                            
                    });
                  }
                  catch(err) {                    
                    console.log(err.message);
                  }
                deviceService.pushNotification('Misurazione eseguita!', "Glucosio: " + $scope.data.glucosioManuale + " in data: " + new Date().toLocaleString())

                var request = {
                    "device_mac": deviceService.resolveFakeMac(item),
                    "timestamp": new Date().getTime(),
                    "metrics": { "glucose": $scope.data.glucosioManuale }
                }

                deviceService.sendGlucometro(request).then(function (success) {
                    setTimeout(3000, function(){
                        window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                    });
                }, function (error) {
                    setTimeout(3000, function(){
                        window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                    });
                });

                $scope.data.glucosioManuale = "";
            }

            $scope.sendPulsossimetro = function (item) {
                if (!$scope.data.ossigenoManuale) {
                    window.plugins.toast.showLongBottom("Inserisci la rilevazione dell'ossigeno prima di inviare.");
                    return;
                }

                if (!$scope.data.battitiManuale) {
                    window.plugins.toast.showLongBottom("Inserisci la rilevazione dei battiti prima di inviare.");
                    return;
                }

                try {
                    parameterNotificationService.initParameters();
                    var parameter = parameterNotificationService.pesoParameter;
    
                    cordova.plugins.notification.local.clear(5)
                    cordova.plugins.notification.local.schedule({
                        id: 5,
                        title: "Ricordati di misurare i battiti e l'ossigeno",
                        text: "Il medico consiglia ogni "+ parameter.frequency + " " + parameter.frequencyType.description + ". Messaggio del: "+ new Date().toLocaleString(),
                        foreground: true,
                        trigger: { in: parameter.frequency, unit: parameter.frequencyType.text.toLowerCase() }                            
                    });
                  }
                  catch(err) {                    
                    console.log(err.message);
                  }
              
                deviceService.pushNotification('Misurazione eseguita!', "Ossigeno: " + $scope.data.ossigenoManuale + " Battiti: "+ $scope.data.battitiManuale  + " in data: " + new Date().toLocaleString())

                var request = {
                    "device_mac": deviceService.resolveFakeMac(item),
                    "timestamp": new Date().getTime(),
                    "metrics": { "spo2": $scope.data.ossigenoManuale, "pulse": $scope.data.battitiManuale }
                }

                deviceService.sendPulsossimetro(request).then(function (success) {
                    setTimeout(3000, function(){
                        window.plugins.toast.showLongBottom("Dato inviato al server con successo!");
                    });
                    
                }, function (error) {
                    setTimeout(3000, function(){
                        window.plugins.toast.showLongBottom("Errore durante l'invio dei dati. Verifica la tua connessione internet.");
                    });
                });

                $scope.data.ossigenoManuale = "";
                $scope.data.battitiManuale = "";
            }

            $scope.toggleInsertFields = function () {
                $scope.canInsertFields = !$scope.canInsertFields;
            }


            $scope.isMacAddressValid = function (device) {

                ble.bondedDevices(function (devices) {
                    var result = false;
                    angular.forEach(devices, function (value) {
                        if (value.id === device.macAddress || (device.name === "Glucometro" || device.name === "Pulsossimetro" || device.name === "Smartwatch")) {
                            result = true;
                            $scope.$apply();
                        }
                    });
                    device.isMacAddressValid = result;
                },
                    function (resultError) {
                        device.isMacAddressValid = false;
                        $scope.$apply();
                    });
            }

            $scope.fetchPariedDevices = function () {

                var deferred = $q.defer();

                $scope.isPariedBusy = true;
                $scope.devicePariedFounded = [];
                ble.bondedDevices(function (result) {

                    angular.forEach(result, function (value) {

                        //var model = deviceService.deviceModel(value);

                        angular.forEach($scope.deviceModelList, function (deviceModel) {
                            if (value.id === deviceModel.macAddress) {
                                //Abilito l'autoconnessione
                                $scope.autoConnect(deviceModel);
                                deviceModel.isPairied = true;
                            }

                            updateIsConnect(deviceModel);
                            $scope.isMacAddressValid(deviceModel);
                        })

                        $scope.devicePariedFounded.push(value);
                    });

                    // pushPulsossimetroManual();
                    // pushGlucometroManual();

                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.isPariedBusy = false;
                    deferred.resolve();
                },
                    function (resultError) {
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.isPariedBusy = false;
                        deferred.reject();
                    });
                return deferred.promise;
            }

            $scope.enableBluetooth = function () {

                var deferred = $q.defer();

                ble.enable(
                    function (result) {
                        console.log(JSON.stringify(result));
                        $scope.isBluetoothEnabled = true;
                        $scope.$apply();
                        deferred.resolve(result);
                    },
                    function (resultError) {
                        console.log(JSON.stringify(resultError));
                        $scope.isBluetoothEnabled = false;
                        $scope.$apply();
                        deferred.reject(resultError);
                    }
                );

                return deferred.promise;
            }

            $scope.checkBleEnabled = function () {
                var deferred = $q.defer();

                ble.isEnabled(function (result) {
                    console.log(JSON.stringify(result));
                    $scope.fetchDeviceModelList();
                    deferred.resolve();
                }, function (resultError) {
                    console.log(JSON.stringify(resultError));
                    deferred.reject();
                });

                return deferred.promise;
            }



            $scope.autoConnect = function (device) {

                ble.autoConnect(device.macAddress, function (result) {
                    updateIsConnect(device);
                    $scope.startNotification(device);
                },
                    function (resultError) {
                        updateIsConnect(device);
                        console.log("Errore autoconnect")
                        console.log(JSON.stringify(resultError));
                    });

            }

            $scope.startNotification = function (device) {
                deviceService.startNotificationBilancia(device);
                deviceService.startNotificationSfignomanometro(device);
                deviceService.startNotificationTermometro(device);
               // deviceService.startNotificationPulsossimetro(device);
               // deviceService.startNotificationGlucometro(device);
            }


            $scope.$on('$ionicView.enter', function () {

                setTimeout(function () {

                    var promise = $scope.checkBleEnabled();
                    promise.then(function (result) { // verifico se il bluetooth è abilitato
                        constructor();
                        $scope.fetchDeviceModelList();
                    }, function (resultError) {

                        $scope.enableBluetooth( //Richiedo l'abilitazione
                            function (result) {
                                constructor();
                            },
                            function (resultError) {
                            }
                        );
                    });
                }, 500)
            });


            var constructor = function () {
                $scope.fetchDeviceModelList();
 
            }

            $scope.$on("$destroy", function () {
            });
        }])