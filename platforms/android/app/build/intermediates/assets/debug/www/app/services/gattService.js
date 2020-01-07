metiMobile.factory("gattService",
    ["$q", "$rootScope",
        function ($q, $rootScope) {
            var factory = {};

           
            factory.parseAdvertisingData = function (buffer) {
                var length, type, data, i = 0, advertisementData = {};
                var bytes = new Uint8Array(buffer);

                while (length !== 0) {

                    length = bytes[i] & 0xFF;
                    i++;

                    // decode type constants from https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
                    type = bytes[i] & 0xFF;
                    i++;

                    data = bytes.slice(i, i + length - 1).buffer; // length includes type byte, but not length byte
                    i += length - 2;  // move to end of data
                    i++;

                    advertisementData[factory.asHexString(type)] = data;
                }

                return advertisementData;
            }

            // i must be < 256
            factory.asHexString = function(i) {
                var hex;

                hex = i.toString(16);

                // zero padding
                if (hex.length === 1) {
                    hex = "0" + hex;
                }

                return "0x" + hex;
            }

            factory.testPeso = function (buffer) {
                var SERVICE_DATA_KEY = '0x38';
                var advertisingData = factory.parseAdvertisingData(buffer);
                serviceData = advertisingData[SERVICE_DATA_KEY];
                if (serviceData) {
                    // first 2 bytes are the 16 bit UUID
                    var uuidBytes = new Uint16Array(serviceData.slice(0, 2));
                    var uuid = uuidBytes[0].toString(16); // hex string
                    console.log("Found service data for " + uuid);
                    // remaining bytes are the service data, expecting 32bit floating point number
                    var data = new Float32Array(serviceData.slice(2));
                    celsius = data[0];
                }
            }

            factory.arrayBufferToHex = function (buffer) {
                var dataBuffer = new Uint8Array(buffer);
                return Array.prototype.map.call(new Uint8Array(dataBuffer.buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
            }

            return factory;
        }]);