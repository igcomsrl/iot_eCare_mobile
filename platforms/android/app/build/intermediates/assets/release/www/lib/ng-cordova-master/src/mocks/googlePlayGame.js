"use strict";ngCordovaMocks.factory("$cordovaGooglePlayGame",["$q",function($q){return{_throwsError:!1,_isSignedIn:!1,_displayName:"",auth:function(){var defer=$q.defer();return this._throwsError?defer.reject("There was a auth error."):(this.isSignedIn=!0,defer.resolve("SIGN IN SUCCESS")),defer.promise},signout:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was a signout error."):defer.resolve(),defer.promise},isSignedIn:function(){var defer=$q.defer();return this._throwsError?defer.reject("There was a isSignedIn error."):defer.resolve({isSignedIn:this._isSignedIn}),defer.promise},showPlayer:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was a showPlayer error."):defer.resolve({displayName:this._displayName}),defer.promise},submitScore:function(data){var defer=$q.defer();return this._throwsError?defer.reject("There was a submitScore error."):defer.resolve("OK"),defer.promise},showAllLeaderboards:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was a showAllLeaderboards error."):defer.resolve("OK"),defer.promise},showLeaderboard:function(data){var defer=$q.defer();return this._throwsError?defer.reject("There was a showLeaderboard error."):defer.resolve("OK"),defer.promise},unlockAchievement:function(data){var defer=$q.defer();return this.throwsError?defer.reject("There was a unlockAchievement error."):defer.resolve("OK"),defer.promise},incrementAchievement:function(data){var defer=$q.defer();return this._throwsError?defer.reject("There was a incrementAchievement error."):defer.resolve("OK"),defer.promise},showAchievements:function(){var defer=$q.defer();return this.throwsError?defer.reject("There was a showAchievements error."):defer.resolve("OK"),defer.promise}}}]);