describe("Service: $cordovaFileOpener2",function(){var $cordovaFileOpener2,$rootScope;beforeEach(function(){module("ngCordovaMocks")}),beforeEach(inject(function(_$cordovaFileOpener2_,_$q_,_$rootScope_,_$window_){$cordovaFileOpener2=_$cordovaFileOpener2_,$rootScope=_$rootScope_,_$window_})),it("should call window's plugins.fileOpener2.open method of success",function(done){$cordovaFileOpener2.open("/sdcard/Download/gmail.apk","application/vnd.android.package-archive").then(function(){expect(!0).toBe(!0)},function(){expect(!1).toBe(!0)}).finally(done),$rootScope.$digest()}),it("should call window's plugins.fileOpener2.open method of failure",function(done){$cordovaFileOpener2.throwsError=!0,$cordovaFileOpener2.open("/sdcard/Download/gmail.apk","application/vnd.android.package-archive").then(function(){expect(!0).toBe(!0)},function(){expect(!1).toBe(!0)}).finally(done),$rootScope.$digest()})});