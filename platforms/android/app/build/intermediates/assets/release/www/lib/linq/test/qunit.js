module.exports=function(window){var QUnit,config,onErrorFnPrev,innerEquiv,callers,parents,getProto,callbacks,testId=0,fileName=(sourceFromStacktrace(0)||"").replace(/(:\d+)+\)?/,"").replace(/.+\//,""),toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,defined={setTimeout:void 0!==window.setTimeout,sessionStorage:function(){var x="qunit-test-string";try{return sessionStorage.setItem(x,x),sessionStorage.removeItem(x),!0}catch(e){return!1}}()};function Test(settings){extend(this,settings),this.assertions=[],this.testNumber=++Test.count}function extractStacktrace(e,offset){var stack,include,i;if(offset=void 0===offset?3:offset,e.stacktrace)return e.stacktrace.split("\n")[offset+3];if(e.stack){if(stack=e.stack.split("\n"),/^error$/i.test(stack[0])&&stack.shift(),fileName){for(include=[],i=offset;i<stack.length&&-1==stack[i].indexOf(fileName);i++)include.push(stack[i]);if(include.length)return include.join("\n")}return stack[offset]}if(e.sourceURL){if(/qunit.js$/.test(e.sourceURL))return;return e.sourceURL+":"+e.line}}function sourceFromStacktrace(offset){try{throw new Error}catch(e){return extractStacktrace(e,offset)}}function escapeInnerText(s){return s?(s+="").replace(/[\&<>]/g,function(s){switch(s){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return s}}):""}function synchronize(callback,last){config.queue.push(callback),config.autorun&&!config.blocking&&process(last)}function process(last){function next(){process(last)}var start=(new Date).getTime();for(config.depth=config.depth?config.depth+1:1;config.queue.length&&!config.blocking;){if(!(!defined.setTimeout||config.updateRate<=0||(new Date).getTime()-start<config.updateRate)){window.setTimeout(next,13);break}config.queue.shift()()}config.depth--,!last||config.blocking||config.queue.length||0!==config.depth||function(){config.autorun=!0,config.currentModule&&runLoggingCallbacks("moduleDone",QUnit,{name:config.currentModule,failed:config.moduleStats.bad,passed:config.moduleStats.all-config.moduleStats.bad,total:config.moduleStats.all});var i,key,banner=id("qunit-banner"),tests=id("qunit-tests"),runtime=+new Date-config.started,passed=config.stats.all-config.stats.bad,html=["Tests completed in ",runtime," milliseconds.<br/>","<span class='passed'>",passed,"</span> tests of <span class='total'>",config.stats.all,"</span> passed, <span class='failed'>",config.stats.bad,"</span> failed."].join("");if(banner&&(banner.className=config.stats.bad?"qunit-fail":"qunit-pass"),tests&&(id("qunit-testresult").innerHTML=html),config.altertitle&&"undefined"!=typeof document&&document.title&&(document.title=[config.stats.bad?"✖":"✔",document.title.replace(/^[\u2714\u2716] /i,"")].join(" ")),config.reorder&&defined.sessionStorage&&0===config.stats.bad)for(i=0;i<sessionStorage.length;i++)0===(key=sessionStorage.key(i++)).indexOf("qunit-test-")&&sessionStorage.removeItem(key);runLoggingCallbacks("done",QUnit,{failed:config.stats.bad,passed:passed,total:config.stats.all,runtime:runtime})}()}function saveGlobal(){if(config.pollution=[],config.noglobals)for(var key in window)hasOwn.call(window,key)&&!/^qunit-test-output/.test(key)&&config.pollution.push(key)}function diff(a,b){var i,j,result=a.slice();for(i=0;i<result.length;i++)for(j=0;j<b.length;j++)if(result[i]===b[j]){result.splice(i,1),i--;break}return result}function extend(a,b){for(var prop in b)void 0===b[prop]?delete a[prop]:"constructor"===prop&&a===window||(a[prop]=b[prop]);return a}function addEvent(elem,type,fn){elem.addEventListener?elem.addEventListener(type,fn,!1):elem.attachEvent?elem.attachEvent("on"+type,fn):fn()}function id(name){return!("undefined"==typeof document||!document||!document.getElementById)&&document.getElementById(name)}function registerLoggingCallback(key){return function(callback){config[key].push(callback)}}function runLoggingCallbacks(key,scope,args){var i,callbacks;if(QUnit.hasOwnProperty(key))QUnit[key].call(scope,args);else for(callbacks=config[key],i=0;i<callbacks.length;i++)callbacks[i].call(scope,args)}Test.count=0,Test.prototype={init:function(){var a,b,li,tests=id("qunit-tests");tests&&((b=document.createElement("strong")).innerHTML=this.name,(a=document.createElement("a")).innerHTML="Rerun",a.href=QUnit.url({testNumber:this.testNumber}),(li=document.createElement("li")).appendChild(b),li.appendChild(a),li.className="running",li.id=this.id="qunit-test-output"+testId++,tests.appendChild(li))},setup:function(){if(this.module!==config.previousModule?(config.previousModule&&runLoggingCallbacks("moduleDone",QUnit,{name:config.previousModule,failed:config.moduleStats.bad,passed:config.moduleStats.all-config.moduleStats.bad,total:config.moduleStats.all}),config.previousModule=this.module,config.moduleStats={all:0,bad:0},runLoggingCallbacks("moduleStart",QUnit,{name:this.module})):config.autorun&&runLoggingCallbacks("moduleStart",QUnit,{name:this.module}),(config.current=this).testEnvironment=extend({setup:function(){},teardown:function(){}},this.moduleTestEnvironment),runLoggingCallbacks("testStart",QUnit,{name:this.testName,module:this.module}),QUnit.current_testEnvironment=this.testEnvironment,config.pollution||saveGlobal(),config.notrycatch)this.testEnvironment.setup.call(this.testEnvironment);else try{this.testEnvironment.setup.call(this.testEnvironment)}catch(e){QUnit.pushFailure("Setup failed on "+this.testName+": "+e.message,extractStacktrace(e,1))}},run:function(){config.current=this;var running=id("qunit-testresult");if(running&&(running.innerHTML="Running: <br/>"+this.name),this.async&&QUnit.stop(),config.notrycatch)this.callback.call(this.testEnvironment,QUnit.assert);else try{this.callback.call(this.testEnvironment,QUnit.assert)}catch(e){QUnit.pushFailure("Died on test #"+(this.assertions.length+1)+" "+this.stack+": "+e.message,extractStacktrace(e,0)),saveGlobal(),config.blocking&&QUnit.start()}},teardown:function(){if(config.current=this,config.notrycatch)this.testEnvironment.teardown.call(this.testEnvironment);else{try{this.testEnvironment.teardown.call(this.testEnvironment)}catch(e){QUnit.pushFailure("Teardown failed on "+this.testName+": "+e.message,extractStacktrace(e,1))}!function(name){var newGlobals,deletedGlobals,old=config.pollution;saveGlobal(),0<(newGlobals=diff(config.pollution,old)).length&&QUnit.pushFailure("Introduced global variable(s): "+newGlobals.join(", "));0<(deletedGlobals=diff(old,config.pollution)).length&&QUnit.pushFailure("Deleted global variable(s): "+deletedGlobals.join(", "))}()}},finish:function(){config.current=this,config.requireExpects&&null==this.expected?QUnit.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):null!=this.expected&&this.expected!=this.assertions.length?QUnit.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack):null!=this.expected||this.assertions.length||QUnit.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack);var assertion,a,b,i,li,ol,test=this,good=0,bad=0,tests=id("qunit-tests");if(config.stats.all+=this.assertions.length,config.moduleStats.all+=this.assertions.length,tests){for(ol=document.createElement("ol"),i=0;i<this.assertions.length;i++)assertion=this.assertions[i],(li=document.createElement("li")).className=assertion.result?"pass":"fail",li.innerHTML=assertion.message||(assertion.result?"okay":"failed"),ol.appendChild(li),assertion.result?good++:(bad++,config.stats.bad++,config.moduleStats.bad++);QUnit.config.reorder&&defined.sessionStorage&&(bad?sessionStorage.setItem("qunit-test-"+this.module+"-"+this.testName,bad):sessionStorage.removeItem("qunit-test-"+this.module+"-"+this.testName)),0===bad&&(ol.style.display="none"),(b=document.createElement("strong")).innerHTML=this.name+" <b class='counts'>(<b class='failed'>"+bad+"</b>, <b class='passed'>"+good+"</b>, "+this.assertions.length+")</b>",addEvent(b,"click",function(){var next=b.nextSibling.nextSibling,display=next.style.display;next.style.display="none"===display?"block":"none"}),addEvent(b,"dblclick",function(e){var target=e&&e.target?e.target:window.event.srcElement;"span"!=target.nodeName.toLowerCase()&&"b"!=target.nodeName.toLowerCase()||(target=target.parentNode),window.location&&"strong"===target.nodeName.toLowerCase()&&(window.location=QUnit.url({testNumber:test.testNumber}))}),(li=id(this.id)).className=bad?"fail":"pass",li.removeChild(li.firstChild),a=li.firstChild,li.appendChild(b),li.appendChild(a),li.appendChild(ol)}else for(i=0;i<this.assertions.length;i++)this.assertions[i].result||(bad++,config.stats.bad++,config.moduleStats.bad++);runLoggingCallbacks("testDone",QUnit,{name:this.testName,module:this.module,failed:bad,passed:this.assertions.length-bad,total:this.assertions.length}),QUnit.reset(),config.current=void 0},queue:function(){var test=this;function run(){synchronize(function(){test.setup()}),synchronize(function(){test.run()}),synchronize(function(){test.teardown()}),synchronize(function(){test.finish()})}synchronize(function(){test.init()}),QUnit.config.reorder&&defined.sessionStorage&&+sessionStorage.getItem("qunit-test-"+this.module+"-"+this.testName)?run():synchronize(run,!0)}},(QUnit={module:function(name,testEnvironment){config.currentModule=name,config.currentModuleTestEnviroment=testEnvironment},asyncTest:function(testName,expected,callback){2===arguments.length&&(callback=expected,expected=null),QUnit.test(testName,expected,callback,!0)},test:function(testName,expected,callback,async){var test,name="<span class='test-name'>"+escapeInnerText(testName)+"</span>";2===arguments.length&&(callback=expected,expected=null),config.currentModule&&(name="<span class='module-name'>"+config.currentModule+"</span>: "+name),function(test){var include,filter=config.filter&&config.filter.toLowerCase(),module=config.module&&config.module.toLowerCase(),fullName=(test.module+": "+test.testName).toLowerCase();if(config.testNumber)return test.testNumber===config.testNumber;if(module&&(!test.module||test.module.toLowerCase()!==module))return!1;if(!filter)return!0;(include="!"!==filter.charAt(0))||(filter=filter.slice(1));if(-1!==fullName.indexOf(filter))return include;return!include}(test=new Test({name:name,testName:testName,expected:expected,async:async,callback:callback,module:config.currentModule,moduleTestEnvironment:config.currentModuleTestEnviroment,stack:sourceFromStacktrace(2)}))&&test.queue()},expect:function(asserts){config.current.expected=asserts},start:function(count){config.semaphore-=count||1,0<config.semaphore||(config.semaphore<0&&(config.semaphore=0),defined.setTimeout?window.setTimeout(function(){0<config.semaphore||(config.timeout&&clearTimeout(config.timeout),process(!(config.blocking=!1)))},13):process(!(config.blocking=!1)))},stop:function(count){config.semaphore+=count||1,config.blocking=!0,config.testTimeout&&defined.setTimeout&&(clearTimeout(config.timeout),config.timeout=window.setTimeout(function(){QUnit.ok(!1,"Test timed out"),config.semaphore=1,QUnit.start()},config.testTimeout))}}).assert={ok:function(result,msg){if(!config.current)throw new Error("ok() assertion outside test context, was "+sourceFromStacktrace(2));var source,details={result:result=!!result,message:msg};msg="<span class='test-message'>"+(msg=escapeInnerText(msg||(result?"okay":"failed")))+"</span>",result||(source=sourceFromStacktrace(2))&&(msg+="<table><tr class='test-source'><th>Source: </th><td><pre>"+escapeInnerText(details.source=source)+"</pre></td></tr></table>"),runLoggingCallbacks("log",QUnit,details),config.current.assertions.push({result:result,message:msg})},equal:function(actual,expected,message){QUnit.push(expected==actual,actual,expected,message)},notEqual:function(actual,expected,message){QUnit.push(expected!=actual,actual,expected,message)},deepEqual:function(actual,expected,message){QUnit.push(QUnit.equiv(actual,expected),actual,expected,message)},notDeepEqual:function(actual,expected,message){QUnit.push(!QUnit.equiv(actual,expected),actual,expected,message)},strictEqual:function(actual,expected,message){QUnit.push(expected===actual,actual,expected,message)},notStrictEqual:function(actual,expected,message){QUnit.push(expected!==actual,actual,expected,message)},throws:function(block,expected,message){var actual,ok=!1;"string"==typeof expected&&(message=expected,expected=null),config.current.ignoreGlobalErrors=!0;try{block.call(config.current.testEnvironment)}catch(e){actual=e}config.current.ignoreGlobalErrors=!1,actual?(expected?"regexp"===QUnit.objectType(expected)?ok=expected.test(actual):actual instanceof expected?ok=!0:!0===expected.call({},actual)&&(ok=!0):ok=!0,QUnit.push(ok,actual,null,message)):QUnit.pushFailure(message,null,"No exception was thrown.")}},extend(QUnit,QUnit.assert),QUnit.raises=QUnit.assert.throws,QUnit.equals=function(){QUnit.push(!1,!1,!1,"QUnit.equals has been deprecated since 2009 (e88049a0), use QUnit.equal instead")},QUnit.same=function(){QUnit.push(!1,!1,!1,"QUnit.same has been deprecated since 2009 (e88049a0), use QUnit.deepEqual instead")},function(){function F(){}F.prototype=QUnit,(QUnit=new F).constructor=F}(),config={queue:[],blocking:!0,hidepassed:!1,reorder:!0,altertitle:!0,requireExpects:!1,urlConfig:[{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the `window` object. Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}],begin:[],done:[],log:[],testStart:[],testDone:[],moduleStart:[],moduleDone:[]},function(){var i,current,location=window.location||{search:"",protocol:"file:"},params=location.search.slice(1).split("&"),length=params.length,urlParams={};if(params[0])for(i=0;i<length;i++)(current=params[i].split("="))[0]=decodeURIComponent(current[0]),current[1]=!current[1]||decodeURIComponent(current[1]),urlParams[current[0]]=current[1];QUnit.urlParams=urlParams,config.filter=urlParams.filter,config.module=urlParams.module,config.testNumber=parseInt(urlParams.testNumber,10)||null,QUnit.isLocal="file:"===location.protocol}(),"undefined"==typeof exports&&(extend(window,QUnit),window.QUnit=QUnit),extend(QUnit,{config:config,init:function(){extend(config,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:+new Date,updateRate:1e3,blocking:!1,autostart:!0,autorun:!1,filter:"",queue:[],semaphore:0});var tests,banner,result,qunit=id("qunit");qunit&&(qunit.innerHTML="<h1 id='qunit-header'>"+escapeInnerText(document.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar'></div><h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>"),tests=id("qunit-tests"),banner=id("qunit-banner"),result=id("qunit-testresult"),tests&&(tests.innerHTML=""),banner&&(banner.className=""),result&&result.parentNode.removeChild(result),tests&&((result=document.createElement("p")).id="qunit-testresult",result.className="result",tests.parentNode.insertBefore(result,tests),result.innerHTML="Running...<br/>&nbsp;")},reset:function(){var fixture;window.jQuery?jQuery("#qunit-fixture").html(config.fixture):(fixture=id("qunit-fixture"))&&(fixture.innerHTML=config.fixture)},triggerEvent:function(elem,type,event){document.createEvent?((event=document.createEvent("MouseEvents")).initMouseEvent(type,!0,!0,elem.ownerDocument.defaultView,0,0,0,0,0,!1,!1,!1,!1,0,null),elem.dispatchEvent(event)):elem.fireEvent&&elem.fireEvent("on"+type)},is:function(type,obj){return QUnit.objectType(obj)==type},objectType:function(obj){if(void 0===obj)return"undefined";if(null===obj)return"null";var type=toString.call(obj).match(/^\[object\s(.*)\]$/)[1]||"";switch(type){case"Number":return isNaN(obj)?"nan":"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return type.toLowerCase()}return"object"==typeof obj?"object":void 0},push:function(result,actual,expected,message){if(!config.current)throw new Error("assertion outside test context, was "+sourceFromStacktrace());var output,source,details={result:result,message:message,actual:actual,expected:expected};output=message="<span class='test-message'>"+(message=escapeInnerText(message)||(result?"okay":"failed"))+"</span>",result||(output+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+(expected=escapeInnerText(QUnit.jsDump.parse(expected)))+"</pre></td></tr>",(actual=escapeInnerText(QUnit.jsDump.parse(actual)))!=expected&&(output+="<tr class='test-actual'><th>Result: </th><td><pre>"+actual+"</pre></td></tr>",output+="<tr class='test-diff'><th>Diff: </th><td><pre>"+QUnit.diff(expected,actual)+"</pre></td></tr>"),(source=sourceFromStacktrace())&&(output+="<tr class='test-source'><th>Source: </th><td><pre>"+escapeInnerText(details.source=source)+"</pre></td></tr>"),output+="</table>"),runLoggingCallbacks("log",QUnit,details),config.current.assertions.push({result:!!result,message:output})},pushFailure:function(message,source,actual){if(!config.current)throw new Error("pushFailure() assertion outside test context, was "+sourceFromStacktrace(2));var output,details={result:!1,message:message};output=message="<span class='test-message'>"+(message=escapeInnerText(message)||"error")+"</span>",output+="<table>",actual&&(output+="<tr class='test-actual'><th>Result: </th><td><pre>"+escapeInnerText(actual)+"</pre></td></tr>"),source&&(output+="<tr class='test-source'><th>Source: </th><td><pre>"+escapeInnerText(details.source=source)+"</pre></td></tr>"),output+="</table>",runLoggingCallbacks("log",QUnit,details),config.current.assertions.push({result:!1,message:output})},url:function(params){params=extend(extend({},QUnit.urlParams),params);var key,querystring="?";for(key in params)hasOwn.call(params,key)&&(querystring+=encodeURIComponent(key)+"="+encodeURIComponent(params[key])+"&");return window.location.pathname+querystring.slice(0,-1)},extend:extend,id:id,addEvent:addEvent}),extend(QUnit.constructor.prototype,{begin:registerLoggingCallback("begin"),done:registerLoggingCallback("done"),log:registerLoggingCallback("log"),testStart:registerLoggingCallback("testStart"),testDone:registerLoggingCallback("testDone"),moduleStart:registerLoggingCallback("moduleStart"),moduleDone:registerLoggingCallback("moduleDone")}),"undefined"!=typeof document&&"complete"!==document.readyState||(config.autorun=!0),QUnit.load=function(){runLoggingCallbacks("begin",QUnit,{});var banner,filter,i,label,len,main,ol,toolbar,userAgent,val,urlConfigCheckboxes,urlConfigHtml="",oldconfig=extend({},config);for(QUnit.init(),extend(config,oldconfig),config.blocking=!1,len=config.urlConfig.length,i=0;i<len;i++)"string"==typeof(val=config.urlConfig[i])&&(val={id:val,label:val,tooltip:"[no tooltip available]"}),config[val.id]=QUnit.urlParams[val.id],urlConfigHtml+="<input id='qunit-urlconfig-"+val.id+"' name='"+val.id+"' type='checkbox'"+(config[val.id]?" checked='checked'":"")+" title='"+val.tooltip+"'><label for='qunit-urlconfig-"+val.id+"' title='"+val.tooltip+"'>"+val.label+"</label>";(userAgent=id("qunit-userAgent"))&&(userAgent.innerHTML=navigator.userAgent),(banner=id("qunit-header"))&&(banner.innerHTML="<a href='"+QUnit.url({filter:void 0,module:void 0,testNumber:void 0})+"'>"+banner.innerHTML+"</a> "),(toolbar=id("qunit-testrunner-toolbar"))&&((filter=document.createElement("input")).type="checkbox",filter.id="qunit-filter-pass",addEvent(filter,"click",function(){var tmp,ol=document.getElementById("qunit-tests");filter.checked?ol.className=ol.className+" hidepass":(tmp=" "+ol.className.replace(/[\n\t\r]/g," ")+" ",ol.className=tmp.replace(/ hidepass /," ")),defined.sessionStorage&&(filter.checked?sessionStorage.setItem("qunit-filter-passed-tests","true"):sessionStorage.removeItem("qunit-filter-passed-tests"))}),(config.hidepassed||defined.sessionStorage&&sessionStorage.getItem("qunit-filter-passed-tests"))&&(filter.checked=!0,(ol=document.getElementById("qunit-tests")).className=ol.className+" hidepass"),toolbar.appendChild(filter),(label=document.createElement("label")).setAttribute("for","qunit-filter-pass"),label.setAttribute("title","Only show tests and assertons that fail. Stored in sessionStorage."),label.innerHTML="Hide passed tests",toolbar.appendChild(label),(urlConfigCheckboxes=document.createElement("span")).innerHTML=urlConfigHtml,addEvent(urlConfigCheckboxes,"change",function(event){var params={};params[event.target.name]=!!event.target.checked||void 0,window.location=QUnit.url(params)}),toolbar.appendChild(urlConfigCheckboxes)),(main=id("qunit-fixture"))&&(config.fixture=main.innerHTML),config.autostart&&QUnit.start()},addEvent(window,"load",QUnit.load),onErrorFnPrev=window.onerror,window.onerror=function(error,filePath,linerNr){var ret=!1;if(onErrorFnPrev&&(ret=onErrorFnPrev(error,filePath,linerNr)),!0!==ret){if(QUnit.config.current){if(QUnit.config.current.ignoreGlobalErrors)return!0;QUnit.pushFailure(error,filePath+":"+linerNr)}else QUnit.test("global failure",function(){QUnit.pushFailure(error,filePath+":"+linerNr)});return!1}return ret},QUnit.equiv=(callers=[],parents=[],getProto=Object.getPrototypeOf||function(obj){return obj.__proto__},callbacks=function(){function useStrictEquality(b,a){return b instanceof a.constructor||a instanceof b.constructor?a==b:a===b}return{string:useStrictEquality,boolean:useStrictEquality,number:useStrictEquality,null:useStrictEquality,undefined:useStrictEquality,nan:function(b){return isNaN(b)},date:function(b,a){return"date"===QUnit.objectType(b)&&a.valueOf()===b.valueOf()},regexp:function(b,a){return"regexp"===QUnit.objectType(b)&&a.source===b.source&&a.global===b.global&&a.ignoreCase===b.ignoreCase&&a.multiline===b.multiline},function:function(){var caller=callers[callers.length-1];return caller!==Object&&void 0!==caller},array:function(b,a){var i,j,len,loop;if("array"!==QUnit.objectType(b))return!1;if((len=a.length)!==b.length)return!1;for(parents.push(a),i=0;i<len;i++){for(loop=!1,j=0;j<parents.length;j++)parents[j]===a[i]&&(loop=!0);if(!loop&&!innerEquiv(a[i],b[i]))return parents.pop(),!1}return parents.pop(),!0},object:function(b,a){var i,j,loop,eq=!0,aProperties=[],bProperties=[];if(a.constructor!==b.constructor&&!(null===getProto(a)&&getProto(b)===Object.prototype||null===getProto(b)&&getProto(a)===Object.prototype))return!1;for(i in callers.push(a.constructor),parents.push(a),a){for(loop=!1,j=0;j<parents.length;j++)parents[j]===a[i]&&(loop=!0);if(aProperties.push(i),!loop&&!innerEquiv(a[i],b[i])){eq=!1;break}}for(i in callers.pop(),parents.pop(),b)bProperties.push(i);return eq&&innerEquiv(aProperties.sort(),bProperties.sort())}}}(),innerEquiv=function(){var a,b,args=[].slice.apply(arguments);return args.length<2||(a=args[0],b=args[1],(a===b||null!==a&&null!==b&&void 0!==a&&void 0!==b&&QUnit.objectType(a)===QUnit.objectType(b)&&function(o,callbacks,args){var prop=QUnit.objectType(o);if(prop)return"function"===QUnit.objectType(callbacks[prop])?callbacks[prop].apply(callbacks,args):callbacks[prop]}(a,callbacks,[b,a]))&&arguments.callee.apply(this,args.splice(1,args.length-1)))}),QUnit.jsDump=function(){function quote(str){return'"'+str.toString().replace(/"/g,'\\"')+'"'}function literal(o){return o+""}function join(pre,arr,post){var s=jsDump.separator(),base=jsDump.indent(),inner=jsDump.indent(1);return arr.join&&(arr=arr.join(","+s+inner)),arr?[pre,inner+arr,base+post].join(s):pre+post}function array(arr,stack){var i=arr.length,ret=new Array(i);for(this.up();i--;)ret[i]=this.parse(arr[i],void 0,stack);return this.down(),join("[",ret,"]")}var reName=/^function (\w+)/,jsDump={parse:function(obj,type,stack){stack=stack||[];var inStack,res,parser=this.parsers[type||this.typeOf(obj)];return type=typeof parser,-1!=(inStack=function(elem,array){if(array.indexOf)return array.indexOf(elem);for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1}(obj,stack))?"recursion("+(inStack-stack.length)+")":"function"==type?(stack.push(obj),res=parser.call(this,obj,stack),stack.pop(),res):"string"==type?parser:this.parsers.error},typeOf:function(obj){return null===obj?"null":void 0===obj?"undefined":QUnit.is("regexp",obj)?"regexp":QUnit.is("date",obj)?"date":QUnit.is("function",obj)?"function":void 0!==typeof obj.setInterval&&void 0!==obj.document&&void 0===obj.nodeType?"window":9===obj.nodeType?"document":obj.nodeType?"node":"[object Array]"===toString.call(obj)||"number"==typeof obj.length&&void 0!==obj.item&&(obj.length?obj.item(0)===obj[0]:null===obj.item(0)&&void 0===obj[0])?"array":typeof obj},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&nbsp;":" "},indent:function(extra){if(!this.multiline)return"";var chr=this.indentChar;return this.HTML&&(chr=chr.replace(/\t/g,"   ").replace(/ /g,"&nbsp;")),new Array(this._depth_+(extra||0)).join(chr)},up:function(a){this._depth_+=a||1},down:function(a){this._depth_-=a||1},setParser:function(name,parser){this.parsers[name]=parser},quote:quote,literal:literal,join:join,_depth_:1,parsers:{window:"[Window]",document:"[Document]",error:"[ERROR]",unknown:"[Unknown]",null:"null",undefined:"undefined",function:function(fn){var ret="function",name="name"in fn?fn.name:(reName.exec(fn)||[])[1];return name&&(ret+=" "+name),join(ret=[ret+="( ",QUnit.jsDump.parse(fn,"functionArgs"),"){"].join(""),QUnit.jsDump.parse(fn,"functionCode"),"}")},array:array,nodelist:array,arguments:array,object:function(map,stack){var keys,key,val,i,ret=[];if(QUnit.jsDump.up(),Object.keys)keys=Object.keys(map);else for(key in keys=[],map)keys.push(key);for(keys.sort(),i=0;i<keys.length;i++)val=map[key=keys[i]],ret.push(QUnit.jsDump.parse(key,"key")+": "+QUnit.jsDump.parse(val,void 0,stack));return QUnit.jsDump.down(),join("{",ret,"}")},node:function(node){var a,val,open=QUnit.jsDump.HTML?"&lt;":"<",close=QUnit.jsDump.HTML?"&gt;":">",tag=node.nodeName.toLowerCase(),ret=open+tag;for(a in QUnit.jsDump.DOMAttrs)(val=node[QUnit.jsDump.DOMAttrs[a]])&&(ret+=" "+a+"="+QUnit.jsDump.parse(val,"attribute"));return ret+close+open+"/"+tag+close},functionArgs:function(fn){var args,l=fn.length;if(!l)return"";for(args=new Array(l);l--;)args[l]=String.fromCharCode(97+l);return" "+args.join(", ")+" "},key:quote,functionCode:"[code]",attribute:quote,string:quote,date:quote,regexp:literal,number:literal,boolean:literal},DOMAttrs:{id:"id",name:"name",class:"className"},HTML:!1,indentChar:"  ",multiline:!0};return jsDump}(),QUnit.diff=function(o,n){o=o.replace(/\s+$/,""),n=n.replace(/\s+$/,"");var i,pre,str="",out=function(o,n){var i,ns={},os={};for(i=0;i<n.length;i++)null==ns[n[i]]&&(ns[n[i]]={rows:[],o:null}),ns[n[i]].rows.push(i);for(i=0;i<o.length;i++)null==os[o[i]]&&(os[o[i]]={rows:[],n:null}),os[o[i]].rows.push(i);for(i in ns)hasOwn.call(ns,i)&&1==ns[i].rows.length&&void 0!==os[i]&&1==os[i].rows.length&&(n[ns[i].rows[0]]={text:n[ns[i].rows[0]],row:os[i].rows[0]},o[os[i].rows[0]]={text:o[os[i].rows[0]],row:ns[i].rows[0]});for(i=0;i<n.length-1;i++)null!=n[i].text&&null==n[i+1].text&&n[i].row+1<o.length&&null==o[n[i].row+1].text&&n[i+1]==o[n[i].row+1]&&(n[i+1]={text:n[i+1],row:n[i].row+1},o[n[i].row+1]={text:o[n[i].row+1],row:i+1});for(i=n.length-1;0<i;i--)null!=n[i].text&&null==n[i-1].text&&0<n[i].row&&null==o[n[i].row-1].text&&n[i-1]==o[n[i].row-1]&&(n[i-1]={text:n[i-1],row:n[i].row-1},o[n[i].row-1]={text:o[n[i].row-1],row:i-1});return{o:o,n:n}}(""===o?[]:o.split(/\s+/),""===n?[]:n.split(/\s+/)),oSpace=o.match(/\s+/g),nSpace=n.match(/\s+/g);if(null==oSpace?oSpace=[" "]:oSpace.push(" "),null==nSpace?nSpace=[" "]:nSpace.push(" "),0===out.n.length)for(i=0;i<out.o.length;i++)str+="<del>"+out.o[i]+oSpace[i]+"</del>";else{if(null==out.n[0].text)for(n=0;n<out.o.length&&null==out.o[n].text;n++)str+="<del>"+out.o[n]+oSpace[n]+"</del>";for(i=0;i<out.n.length;i++)if(null==out.n[i].text)str+="<ins>"+out.n[i]+nSpace[i]+"</ins>";else{for(pre="",n=out.n[i].row+1;n<out.o.length&&null==out.o[n].text;n++)pre+="<del>"+out.o[n]+oSpace[n]+"</del>";str+=" "+out.n[i].text+nSpace[i]+pre}}return str},"undefined"!=typeof exports&&extend(exports,QUnit)}(function(){return this}.call());