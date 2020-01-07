angular.module("ngCordova.plugins.sqlite",[]).factory("$cordovaSQLite",["$q","$window",function($q,$window){return{openDB:function(options,background){return angular.isObject(options)&&!angular.isString(options)?(void 0!==background&&(options.bgType=background),$window.sqlitePlugin.openDatabase(options)):$window.sqlitePlugin.openDatabase({name:options,bgType:background})},execute:function(db,query,binding){var q=$q.defer();return db.transaction(function(tx){tx.executeSql(query,binding,function(tx,result){q.resolve(result)},function(transaction,error){q.reject(error)})}),q.promise},insertCollection:function(db,query,bindings){var q=$q.defer(),coll=bindings.slice(0);return db.transaction(function(tx){!function insertOne(){var record=coll.splice(0,1)[0];try{tx.executeSql(query,record,function(tx,result){0===coll.length?q.resolve(result):insertOne()},function(transaction,error){q.reject(error)})}catch(exception){q.reject(exception)}}()}),q.promise},nestedExecute:function(db,query1,query2,binding1,binding2){var q=$q.defer();return db.transaction(function(tx){tx.executeSql(query1,binding1,function(tx,result){q.resolve(result),tx.executeSql(query2,binding2,function(tx,res){q.resolve(res)})})},function(transaction,error){q.reject(error)}),q.promise},deleteDB:function(dbName){var q=$q.defer();return $window.sqlitePlugin.deleteDatabase(dbName,function(success){q.resolve(success)},function(error){q.reject(error)}),q.promise}}}]);