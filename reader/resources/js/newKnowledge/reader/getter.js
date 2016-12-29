if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

//阅读器加载模块
(function(){
    if(typeof getter === 'undefined') getter = {};
    /*
    Demo:
    function buyAgain(orderNumber) {
        var param = 'p1=test&p2=demo';
        var httpRequest = new HttpRequest();
        httpRequest.targetUrl = '/your/path';
        httpRequest.method = 'get';
        httpRequest.isAsyc = false;
        httpRequest.param = param;
        httpRequest.callBack = callback;
        httpRequest.Send();
    }
    function callback(status, html) {
        if (status == 4) {}
    }
    */
    function HttpRequest()
    {
        this.targetUrl = null; //目前URL地址，必填
        this.method = 'post'; //请求的方式 post或者get
        this.param = null; //参数 如：UserID=1&UserName=hqew
        this.callBack = null; //回调的方法 如：GetWatchComplete 必填
        this.isAsyc = false; //是否异步执行 默认为同步


        var xmlHttp = null;
        var callBackFunction = null;

        if(window.ActiveXObject) {xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');}
        else if(window.XMLHttpRequest) {xmlHttp = new XMLHttpRequest();}

        this.send = function(){
            callBackFunction = this.callBack;

            if(this.param!=null && this.method=='get')
            {
                this.targetUrl += "?"+ this.param;
            }

            xmlHttp.open(this.method,this.targetUrl,this.isAsyc);

            if(this.isAsyc) //异步
            {
                xmlHttp.onreadystatechange = this.handleStateChange;
            }

            if(this.method == 'post')
            {
                xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
                //xmlHttp.setRequestHeader("Content-Type","text/xml");
            }
            xmlHttp.send(this.param);

            if(!this.isAsyc) //非异步
            {
                this.handleStateChange();
            }
        };

        this.handleStateChange = function(){
            if(xmlHttp.readyState == 4) {
                if(xmlHttp.status == 200 && callBackFunction!=null) {
                    callBackFunction(xmlHttp.responseText);
                }
            }
        }
    }

    function $(id){
        return document.getElementById(id);
    }


    //获取<加好友>状态
    getter.getFriendStatus = function(){
        var callback = function(rsp){
            var str = "";
            var result = JSON.parse(rsp);
            if(result.friendStatus==1){
                str += '<div class="addfriend">';
                str += '<span style="color: #CCCCCC;">等待审核</span>';
                str += '</div>';
            } else {
                str += '<div class="addfriend">';
                str += '<a id="JS_iFriend" href="javascript:void(0);"><i></i>加为好友</a>';
                str += '</div>';
            }
            document.write(str);
        };

        //发送异步Ajax请求
        var httpRequest = new HttpRequest();
        httpRequest.targetUrl = API_ACTION_FRIEND;
        httpRequest.method = 'post';
        httpRequest.isAsyc = false;
        httpRequest.param = 'senduid='+KNOWLEDGE_USER_SID+'&receiveuid='+KNOWLEDGE_USER_RID,
        httpRequest.callBack = callback;
        httpRequest.send();
    };

    //阅读器加载模块
    getter.getTitle = function(title){
        var str = "";
        if(title.length>23){
            str += '<h3 style="text-align:left;">';
            str += title;
            str += '</h3>';
        } else {
            str += '<h3 style="text-align:center;">';
            str += title;
            str += '</h3>';
        }
        document.write(str);
    };

})();