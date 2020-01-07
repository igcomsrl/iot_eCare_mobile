describe("ngCordovaMocks",function(){beforeEach(function(){module("ngCordovaMocks")}),describe("cordovaNetwork",function(){var $cordovaNetwork=null,$rootScope=null;$cordovaNetwork=null;beforeEach(inject(function(_$cordovaNetwork_,_$rootScope_,_$cordovaNetwork_){$rootScope=_$rootScope_,$cordovaNetwork=$cordovaNetwork=_$cordovaNetwork_})),it("should get network name",function(){$cordovaNetwork.connectionType="WiFi connection";var networkName=$cordovaNetwork.getNetwork();expect(networkName).toEqual("WiFi connection")}),it("should check if online",function(){var isOnline=$cordovaNetwork.isOnline();expect(isOnline).toBe(!0)}),it("should check if offline",function(){var isOffline=$cordovaNetwork.isOffline();expect(isOffline).toBe(!1)}),it("should launch listeners when switching to online",function(){var isOnline=!1;$rootScope.$on("$cordovaNetwork:online",function(){isOnline=$cordovaNetwork.isOnline()}),$cordovaNetwork.switchToOnline(),expect(isOnline).toBe(!0)}),it("should launch listeners when switching to online",function(){var isOffline=!1;$rootScope.$on("$cordovaNetwork:offline",function(){isOffline=$cordovaNetwork.isOffline()}),$cordovaNetwork.switchToOffline(),expect(isOffline).toBe(!0)})})});