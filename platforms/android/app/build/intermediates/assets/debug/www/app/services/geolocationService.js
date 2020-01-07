metiMobile.factory('geolocationService',
    ['$sce',
    '$rootScope',
        function ($sce, $rootScope) {
            var factory = {};

            factory.getPatientDashboardUrl = function (processInstanceId) {
                var grafanaUrl =  $rootScope.getPatientDashboardUrl;//"http://212.189.207.224:3000/d/XFWJlkuiz/test-sempre-vicini";
                var grafanaConsoleRefreshTime = 5

                grafanaUrl = grafanaUrl + "?orgId=1";
                grafanaUrl = grafanaUrl + "&var-processInstanceId=" + processInstanceId;
                grafanaUrl = grafanaUrl + "&refresh=" + grafanaConsoleRefreshTime + "s&kiosk&from=now%2Fw&to=now";
                //return $sce.trustAsResourceUrl('http://212.189.207.224:3000/d/XFWJlkuiz/test-sempre-vicini?orgId=1&var-processInstanceId='+processInstanceId+'&refresh=5s&kiosk=tv');
                return $sce.trustAsResourceUrl(grafanaUrl);
            }

            factory.getPatientDashboardUrlFiltered = function (processInstanceId, showPeso, showTemperatura, showGlicemia, showFrequenza, showPressione, showOssigeno, showCamera) {
                var grafanaUrl = $rootScope.getPatientDashboardUrlFiltered;//"http://212.189.207.224:3000/dashboard/script/scripted.js";
                var grafanaConsoleRefreshTime = 5
                

                grafanaUrl = grafanaUrl + "?orgId=1";
                grafanaUrl = grafanaUrl + "&var-processInstanceId=" + processInstanceId;
                grafanaUrl = grafanaUrl + "&refresh=" + grafanaConsoleRefreshTime + "s&kiosk&from=now%2Fw&to=now";

                grafanaUrl = grafanaUrl + "&glucose="+ showGlicemia || false;
                grafanaUrl = grafanaUrl + "&pulse="+ showFrequenza|| false;
                grafanaUrl = grafanaUrl + "&weight="+ showPeso|| false;
                grafanaUrl = grafanaUrl + "&pressure="+ showPressione|| false;
                grafanaUrl = grafanaUrl + "&temperature="+ showTemperatura|| false;
                grafanaUrl = grafanaUrl + "&spo2="+ showOssigeno || false;
                grafanaUrl = grafanaUrl + "&movement="+ showCamera || false;                

                // if (showGlicemia == false)
                //     grafanaUrl = grafanaUrl + "&glucose=false"
                // if (showFrequenza == false)//battiti
                //     grafanaUrl = grafanaUrl + "&pulse=false"
                // if (showPeso == false)
                //     grafanaUrl = grafanaUrl + "&weight=false"
                // if (showPressione == false)
                //     grafanaUrl = grafanaUrl + "&pressure=false"
                // if (showTemperatura == false)
                //     grafanaUrl = grafanaUrl + "&temperature=false"
                // if (showOssigeno == false)
                //     grafanaUrl = grafanaUrl + "&spo2=false"

                return $sce.trustAsResourceUrl(grafanaUrl);
            }

            return factory;
        }]);