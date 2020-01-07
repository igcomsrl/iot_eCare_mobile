describe("ngCordovaMocks",function(){beforeEach(function(){module("ngCordovaMocks")}),describe("cordovaToast",function(){var $rootScope=null,$cordovaToast=null,functionNames=["hide","showShortTop","showShortCenter","showShortBottom","showLongTop","showLongCenter","showLongBottom","showWithOptions","show"];beforeEach(inject(function(_$cordovaToast_,_$rootScope_){$cordovaToast=_$cordovaToast_,$rootScope=_$rootScope_})),it("should show a toast",function(){functionNames.forEach(function(functionName){$cordovaToast[functionName]("A message.").then(function(){expect(!0).toBe(!0)},function(){expect(!1).toBe(!0)}).finally(function(){done()}),$rootScope.$digest()})}),it("should throw an error ",function(done){$cordovaToast.throwsError=!0,functionNames.forEach(function(functionName){$cordovaToast[functionName]("A message.").then(function(){expect(!0).toBe(!1)},function(){expect(!0).toBe(!0)}).finally(function(){done()}),$rootScope.$digest()})})})});