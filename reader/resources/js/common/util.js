/*通用工具模块*/
define(function(require, exports, module){
	var $ = require("jquery");
	
	//附件初始化
	var letterMultiUpload;
	// constants
	var SUCC = "R_SUCCESS",
	    FAIL = "R_FAIL",
	    NOPRI = "R_NOPRI";
	/*工具类*/
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};

	exports.isIE6 = function(){
		return ($.browser.msie) && ($.browser.version == "6.0");
	};
	exports.isEmail = function(str){
		var re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
		var isEmail = str.match(re);
		return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(str);
	};
	//验证是否存在该邮箱
	exports.isExistEmail = function(email) {
		// alert(mobile);
		var flag = true;
		$.ajax({
			url : contextPath+'/register/checkEmail.json',
			data : "email=" + email,
			type : "get",
			dataType : 'json',
			cache : false,
			async : false,
			success : function(data) {
				if (data.isExist) {
					flag = true;
				} else {
					flag = false;
				}
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}
		});
		return flag;
	};
	/* 检查联通手机号 */
	exports.checkCuMobile = function(num) {
		var cupres = [ 130, 131, 132, 133, 134, 155, 156, 186 ];
		if (num.length != 11) {
			return false;
		}
		var re = /^(-?\d+)(\.\d+)?$/;
		if (re.test(num)) {
		} else {
			return false;
		}
		var pre = num.substring(0, 3);
		var len = cupres.length;
		for ( var i = 0; i < len; ++i) {
			if (pre == cupres[i]) {
				return true;
			}
		}
		return false;
	};
	//旧式手机验证
	exports.isMobel = function(value) {
		if (/^1[3458]\d{9}$/g.test(value)) {
			return true;
		} else {
			return false;
		}
	};
	//新式手机验证
	exports.isNewMobel = function(value) {
		if (/^1[0123456789]\d{9}$/g.test(value)) {
			return true;
		} else {
			return false;
		}
	};
	//旧式邮箱验证
	exports.checkEmail = function(email) {
		var reg = /^(([\w\-]((?!\.\.)[\w\.\-])*[\w\-])|[\w\-])@([a-zA-Z0-9\-])+(\.[a-zA-Z0-9\-]{1,}){1,}$/;
		return reg.test(email);
	};
	//新式邮箱验证
	exports.checkNewEmail = function(email){
		var reg = "^[_a-zA-Z0-9_-_._-]+@([_a-zA-Z0-9_-]+\\.)+[a-zA-Z]{2,3}$"
		return reg.test(email);
	};
	/* 测试6-20位 */
	exports.checkPwd = function(pwd) {
		var reg = /^[\x21-\x7E]{6,16}$/;
		return reg.test(pwd);
	};
	function checkNumAndCapter(str){
		var reg = /^[a-zA-Z0-9_]*$/g; //支持字母、数组、下划线
		return  reg.test(str);
	};
	exports.checkNumAndCapter = checkNumAndCapter;
	
	exports.isUsername = function(str){//支持中文、数字、字母
		var re = new RegExp("^[a-zA-Z0-9\\u4e00-\\u9fa5]+$", "");
		return re.test(str);
	};
	
	function isChinese(str) {
		var lst = /[u00-uFF]/;
		return !lst.test(str);
	};
	exports.isChinese = isChinese;
	
	function isChinese2(str) {
		var lst = /[\u4e00-\u9fa5]/;
		return lst.test(str);
	};
	exports.isChinese2 = isChinese2;
	
	exports.getCharLen = function(str) {
		var strlength = 0;
		for (var i = 0; i < str.length; i++) {
			if (this.isChinese(str.charAt(i)) == true)
				strlength = strlength + 2;
			else
				strlength = strlength + 1;
		}
		return strlength;
	};
	
	function getCharLen2(str) {
		var strlength = 0;
		for (var i = 0; i < str.length; i++) {
			if (this.isChinese2(str.charAt(i)) == true)
				strlength = strlength + 2;
			else
				strlength = strlength + 1;
		}
		return strlength;
	};
	exports.getCharLen2 = getCharLen2;
	
	exports.getSubstring = function(str,size){
		if(str.length <= size){
			return str;
		}else{
			return str.substring(0,size) + '...';
		}
	};
	exports.getSubstring2 = function(str,size){
		if(str.length <= size){
			return str;
		}else{
			return str.substring(0,size);
		}
	};
	function getSubstring3(str,size){
		var strlength = 0;
		var si = -1;
		if(str!=null && str!=''){
			for (var i = 0; i < str.length; i++) {
				if (this.isChinese2(str.charAt(i)) == true){
					strlength = strlength + 2;
				}
				else{
					strlength = strlength + 1;
				}
				if(strlength > size && si == -1){
					if(si == -1){
						si = i;
					}
				}
			}
			if(strlength > size){
				str = str.substr(0,si<3?si:(si-3));
				return str + '...'
			}else{
				return str;
			}
		}	
	};
	exports.getSubstring3 = getSubstring3;
	
	/**
     * 缩写
     */
	exports.getSimpleStr = function(str,len){
		var strlength = 0;
		var newValue="";
		var lastValue="";
		var isCh = true;
		if(str != null && typeof(str) != 'undefined'){
			for (var i = 0; i < str.length; i++) {
				if (this.isChinese2(str.charAt(i)) == true){
					isCh = true;
					strlength = strlength + 2;
				}else if (str.charAt(i) == '@' || str.charAt(i) == 'W'){
					isCh = true;
					strlength = strlength + 1.5;
				}else{
					isCh = false;
					strlength = strlength + 1;
				}
				if(strlength <= (len*2-2)){
					newValue = newValue + str.charAt(i);
					if(i < str.length - 1){
						lastValue = str.charAt(i+1);
					}
				}
			}
			if(isCh){
				if(strlength > (len*2-2) && strlength <= len*2){
					newValue = newValue + lastValue;
				}else if(strlength > len*2){
					newValue = newValue + "...";
				}
			}else{
				if(strlength == len*2-1){
					newValue = newValue + lastValue;
				}else if(strlength >= len*2){
					newValue = newValue + "...";
				}
			} 
		}
		return newValue;
	};
	
	exports.getNowFormatDate = function(){ 
		var day = new Date(); 
		var Year,Month,Day; 
		var CurrentDate = ""; 
		Year= day.getFullYear();//ie火狐下都可以 
		Month= day.getMonth()+1; 
		Day = day.getDate(); 
		CurrentDate += Year + "-"; 
		if (Month >= 10 ){
			CurrentDate += Month + "-"; 
		}else{ 
			CurrentDate += "0" + Month + "-"; 
		} 
		if (Day >= 10 ){ 
			CurrentDate += Day ; 
		}else{ 
			CurrentDate += "0" + Day ; 
		} 
		return CurrentDate; 
	};
	
	exports.dateDiff0 = function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式,两个日期计算天数
          var  aDate,  oDate1,  oDate2,  iDays    
          aDate  =  sDate1.split("-")    
          oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式    
          aDate  =  sDate2.split("-")    
          oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    
          iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数   
          return  iDays ;  
     };

    exports.dateDiff = function(sDate1,  sDate2){//
		var day = new Date(); 
		var Year,Month,Day; 
		Day = day.getDate();
		return 31 - Day;
	};
	
	//邮箱自动补全功能，需传入邮箱输入框的dom。
	exports.emailAotoComplete = function(objId){
		var self = this;
		this.emailId = objId;
		this.emailInput = $('#'+objId);  
		this.emailListDiv = $("#emailAotoComplete");
		//常用邮件列表数组  
		//this.emailList = ["@163.com", "@126.com","@sina.com","@yeah.net","@yahoo.com","@vip.163.com","@vip.126.com","@188.com","@qq.com", "@gmail.com", "@sohu.com", "@tom.com", "@hotmail.com"];
		this.emailList = ["@163.com", "@126.com","@sina.com","@yeah.net","@yahoo.com","@vip.163.com","@vip.126.com","@188.com","@qq.com", "@sohu.com", "@tom.com"];
		//新项的索引(用于设置高亮显示的样式)  
		this.newIndex = 0;  
		//旧项的索引(用于取消原有高亮显示的样式)  
		this.oldIndex = 0;  
		//邮件列表个数  
		this.counts = self.emailList.length;
        if(self.emailAotoComplete.length > 0){
        	self.emailListDiv = $('<div class="clearfix" id="emailAotoComplete"></div>').appendTo($('body'));
        }
        document.onclick = function (event){     
            var e = event || window.event;  
            var elem = e.srcElement||e.target;
            var isElem = typeof(elem) != 'undefined' && (typeof(elem.id) != 'undefined' && elem.id != objId);
        	if(isElem){
        		self.autoHide();
        		return;  
        	}
    	}
        //输入框事件绑定
        this.emailInput.attr({'autocomplete':'off'}).blur(function(){
        }).focus(function(){
        	self.autoShow();
        }).keyup(function(event){
        	self.autoShow();
        	var myEvent = event || window.event;  
            var keyCode = myEvent.keyCode; //获得键值  
            //press down key(向下键)  
            if (keyCode == 40) {  
                self.oldIndex = self.newIndex;  
                self.newIndex++;  
                self.setStyleForChange();  
                self.setValue();  
            }  
            //press up key(向上键)  
            if (keyCode == 38) {  
                self.oldIndex = self.newIndex;  
                self.newIndex--;  
                self.setStyleForChange();  
                self.setValue();  
            }  
            //press enter key(回车键)  
            if (keyCode == 13) {  
                self.setValue();  
                self.autoHide();  
            }  
            //press esc key(ESC键)  
            if (keyCode == 27) {  
                self.autoHide();  
            }  
            //press a-z|A-Z|0-9     //8对应退格键，46对应删除键  
            var changedText = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (keyCode >= 48 && keyCode <= 56);  
            var currentVal = $.trim(self.emailInput.val());
            var atIndex = currentVal.indexOf("@");
            currentVal = (atIndex > -1 ? currentVal.substring(0,atIndex) : currentVal);
            if (changedText) {  
                for (var i = 1; i <= self.emailList.length; i++) {  
                	self.emailListDiv.find('div[eid='+ i+']').text("").text(currentVal + self.emailList[i - 1]);  
                }  
            }  
            //如果按下退格键或删除键  
            if (keyCode == 8 || keyCode == 46) {  
                //self.emailInput.val("");  
                for (var i = 1; i <= self.emailList.length; i++) {  
                	self.emailListDiv.find('div[eid='+ i+']').text("").text(currentVal+self.emailList[i - 1]);  
                }  
            }  
        });
        //显示
        this.autoShow = function(){
        	var val = $.trim($('#'+self.emailId).val());
        	if(val != ''){
        		self.emailListDiv.html('');
        		//bind the events:mouseover、mouseout for the div  
        		$.each(self.emailList,function(i,o){
        			var text = (val == '' ? '' : val);
        			var text2 = (text.indexOf("@") > -1 ? val.substring(0,text.indexOf("@")) : text);        			
        			$('<div>',{'eid':i+1+'','etext':o,text:text2+o,'style':'padding:0 5px;cursor: pointer;word-break:break-all;word-wrap:break-word;',mouseover:function(){
        				$(this).css({'background-color':'#e09a36','color':'#fff'});
        			},'mouseout':function(){
        				$(this).css({'background-color':'#fff','color':'#333'});
        			},'click':function(event){
        				self.oldIndex = self.newIndex;  
                        self.newIndex = $(this).attr('eid');  
        				self.setValue();  
                        self.autoHide();
        			}}).appendTo(self.emailListDiv);            	
        		});
        		var x = self.emailInput.position().left, y = self.emailInput.position().top + 28;
        		self.emailListDiv.css({'left':x+'px',top:y+'px','position':'absolute','z-index':1,'line-height':'22px','width':self.emailInput.width(),'border':'#bd7717 solid 1px','heihgt':'auto','background':'#fff','color':'#333','padding':'2px','border-radius':'2px'}).show();
        	}
        };
        //隐藏
        this.autoHide = function(){
        	self.emailListDiv.hide();
        	if(checkRegEmail && $.trim($('#regEmail').val()) != ''){
        		checkRegEmail();
        	}
        };
        //给文本框设值
        this.setValue = function(){
        	 var addr = $.trim(self.emailListDiv.find('div[eid='+ self.newIndex+']').text());  
			 self.emailInput.val(addr);
			 if(checkRegEmail && $.trim($('#regEmail').val()) != ''){
				 checkRegEmail();
			 }
        };
        //上下键变色
        this.setStyleForChange = function() {  
            //handle newIndex  
            self.newIndex = self.newIndex > self.counts ? 1 : self.newIndex;  
            self.newIndex = self.newIndex < 1 ? self.counts : self.newIndex;  
            self.emailListDiv.find('div[eid=' + self.newIndex+']').css({'background-color':'#e09a36','color':'#fff'});  
            self.emailListDiv.find('div[eid=' + self.oldIndex+']').css({'background-color':'#fff','color':'#333'});  
        };  
	};
	
	/**
	 * textareaId 需要技术的输入框的id
	 * countTextId 显示还剩多少字的标签id
	 * 注：显示还剩多少字的标签需要附加属性 maxCount，用来记录最多可以显示多少字，这里的字数是按照一个汉字2个字符算的
	 */
	exports.countText = function(textareaId,countTextId){
		//最大字数指汉字字数
		var textarea = $('#'+textareaId);
		var countText = $('#'+countTextId);
		var ca = (countText.attr('maxCount') == undefined ? countText.attr('maxcount') : countText.attr('maxCount'));
		var maxCount = parseInt(ca)*2;//此处为字数最大值
		var strlength = 0;
		var str = $.trim(textarea.val());
		var strnew = '';//超出范围截取后后的字符串
		var subindex = 0;//截取字符串的位置
		var orgintxt = textarea.attr('orgintxt');
		if(orgintxt && str == orgintxt){
			//textarea.val('');
			str = '';
		}
		
		for (var i = 0; i < str.length; i++) {
			if (Utils.isChinese(str.charAt(i)) == true){
				strlength = strlength + 2;
			}else{
				strlength = strlength + 1;
			}
			if(strlength > maxCount && subindex == 0){
				subindex = i;
			}
		}
		var leftVal = parseInt((maxCount-strlength)/2);
		if (strlength > maxCount) {
			var aaa = textarea.val();
			textarea.val(aaa.substr(0, subindex));
		}
		countText.text((leftVal <= 0) ? 0 : leftVal);
	};
	
	//首页：说说 -> /member/index.jsp
	function countTextNew(textareaId,countTextId){
		//最大字数指汉字字数
		var textarea = $('#'+textareaId);
		var countText = $('#'+countTextId);
		var ca = (countText.attr('maxCount') == undefined ? countText.attr('maxcount') : countText.attr('maxCount'));
		var maxCount = parseInt(ca)*2;//此处为字数最大值
		var strlength = 0;
		var str = $.trim(textarea.html());
		var strnew = '';//超出范围截取后后的字符串
		var subindex = 0;//截取字符串的位置
		var divHeight=textarea.height();
		textarea.css("height","auto");
		textarea.height()>divHeight ? textarea.css({"height":divHeight+"px","overflow-y":"scroll"}) :	textarea.css({"height":divHeight+"px","overflow-y":"hidden"});
		
		var len = this.getCharLen2(str);
		if(len > maxCount){
			strnew = this.getSubstring3(str,maxCount);
			strlength = maxCount;
		}else{
			strnew = str;
			strlength = len;
		}
		var leftVal = parseInt((maxCount-strlength)/2);
		if(strnew.length != str.length){
			textarea.html(strnew);
		}
		countText.text((leftVal <= 0) ? 0 : leftVal);
	};
	exports.countTextNew = countTextNew;
	/**
	 * 输入框调用此方法可以使自动光标定位到输入框指定的位置，参数为指定的位置
	 */
	exports.selectInputRange = function(startIndex,endIndex){
		 return this.each(function() {
		        if (this.setSelectionRange) {
		            this.focus();
		            this.setSelectionRange(startIndex, endIndex);
		        } else if (this.createTextRange) {
		            var range = this.createTextRange();
		            range.collapse(true);
		            range.moveEnd('character', endIndex);
		            range.moveStart('character', startIndex);
		            range.select();
		        }
		    });
	};
	
	//在当前输入框中添加字符
	exports.insertContent = function(textarea,myValue, t) {
		if(textarea){
		     var $t = textarea[0];
		     var txt0 = textarea.val();
		     if(txt0 == '说点什么吧......'){
		    	 textarea.val('');
		     }
		     if (document.selection) { //ie
			     textarea.focus();
			     var sel = document.selection.createRange();
			     sel.text = myValue;
			     textarea.focus();
			     sel.moveStart('character', -l);
			     var wee = sel.text.length;
		     	 if (arguments.length == 2) {
			    	var l = $t.value.length;
			     	sel.moveEnd("character", wee + t);
			     	t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
			     	sel.select();
		     	 }
		     }else if ($t.selectionStart || $t.selectionStart == '0') {
			     var startPos = $t.selectionStart;
			     var endPos = $t.selectionEnd;
			     var scrollTop = $t.scrollTop;
			     $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
			     textarea.focus();
			     $t.selectionStart = startPos + myValue.length;
			     $t.selectionEnd = startPos + myValue.length;
			     $t.scrollTop = scrollTop;
			     if (arguments.length == 2) {
			    	 $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
			    	 textarea.focus();
			     }
			}else{
		    	 textarea.value += myValue;
		    	 textarea.focus();
		    }
		}
     };
     
	/**
	 * 转换null为""
	 */
     exports.convertNull = function(str){
		return (str == null || typeof(str) == 'undefined') ? '' : str;
	};
	
	exports.getSelections = function(){
		var ids = [];
		var rows = $('#grid').datagrid('getSelections');
		if(rows != null || typeof(rows) != 'undefined'){
			for ( var i = 0; i < rows.length; i++) {
				ids.push(rows[i].id);
			}
		}
		return ids;
	};
	
	exports.JSRemove = function(array, element) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].id == element.id) {
				array.splice(i, 1);
			}
		}
	};
	
	exports.JSAdd = function(container, obj) {
		var exist = false;
		$.each(container, function(i, o) {
			if (o.id == obj.id) {
				exist = true;
			}
		});
		if (exist == false) {
			container.push(obj);
			exist = false;
		}
	};
	
	exports.likeSearch = function(str, objs) {
		var result = [];
		var obj;
		var name;
		var firstLetters;
		var pinyin;
		var startChar = str.charAt(0);
		var success;
		var strLen = str.length;
		for (var i = 0; i < objs.length; i++) {
			obj = objs[i];
			name = obj.name;
			firstLetters = obj.nameIndex;
			pinyin = obj.nameIndexAll;
			success = 0;
			// 检查是否跟obj.name匹配
			for (var j = 0; j < name.length && success == 0; j++) {
				// alert("name");
				if (name.charAt(j) == startChar) { // double check,为了提升性能
					if (name.substring(j).substring(0, strLen) == str){ // 如果从j开始的字符与str匹配，那ok，结束查询
						result.push(obj);
						success = 1;
					}
				}
			}
			// 检查是否跟obj.firstLetters匹配
			if(typeof(firstLetters) != "undefined" && firstLetters != null){
				for (var j = 0; j < firstLetters.length && success == 0; j++) {
					if (firstLetters.charAt(j) == startChar) { // double check,为了提升性能
						if (firstLetters.substring(j).substring(0, strLen) == str){ // 如果从j开始的字符与str匹配，那ok，结束查询
							result.push(obj);
							success = 1;
						}
					}
				}
			}
			// 检查是否跟obj.pinyin匹配
			if(typeof(pinyin) != "undefined" && pinyin != null){
				for (var j = 0; j < pinyin.length && success == 0; j++) {
					if (pinyin.charAt(j) == startChar) { // double check,为了提升性能
						if (pinyin.substring(j).substring(0, strLen) == str){ // 如果从j开始的字符与str匹配，那ok，结束查询
							result.push(obj);
							success = 1;
						}
					}
				}
			}
		}
		return result;
	};
	
	//获得文本编辑器
	exports.getXhEditor = function(eleId,isSimple,cleanPaste){
		var xheditor1;
			var xheditor_tools = ((typeof(isSimple) == 'undefined' || isSimple == '') ? 'Cut,Copy,Paste,|,Bold,Italic,Underline,Strikethrough' : 'Cut,Copy,Paste');
			//这里是自定义的xheditor工具集，如果不需要自定义，则可以在页面中调用xheditor
			$('#'+eleId).addClass('js_xheditor');
			var cleanPasteV = ((typeof(cleanPaste) == 'undefined' || cleanPaste == '') ? 3 : 0);
			xheditor1= $('#'+eleId).xheditor({tools:xheditor_tools,cleanPaste:cleanPasteV,submitID:'#000',linkTag:false});
			$('a[title="关于 xhEditor"]').hide();
			//if(isShowCharCount == 1){
				//editor.appendHTML('<tr><td style="height:24px; line-height:24px;background: #fff;border-top: #ccc solid 1px;width: 100%;"><span class="xheCharCount">当前您已输入<span class="xhe0_charAlready">0</span>个字符，还可输入<span class="xhe0_charLeft">3000</span>个字符</span></td></tr>')
				//var parent = editor.getParent();
				//parent.find('.xheLayout tbody').append('<tr><td style="height:24px; line-height:24px;background: #fff;border-top: #ccc solid 1px;width: 100%;"><span class="xheCharCount">当前您已输入<span class="xhe0_charAlready">0</span>个字符，还可输入<span class="xhe0_charLeft">3000</span>个字符</span></td></tr>');
			//}
			var xheditorHtmls0 = $('span.xhe_default');
			$.each(xheditorHtmls0,function(i,o){
				var div = $(o).parent();
				var textarea0 = div.find('textarea');
				var maxChar = textarea0.attr('maxchar');
				maxChar = (typeof(maxChar) == 'undefined' || maxChar == '') ? '300' : maxChar;
				if(typeof(maxChar) != 'undefined' && maxChar != ''){
					var alreadyChar = Utils.getCharLen2(textarea0.parent().find('iframe').contents().find('body').text());
					var leftChar = maxChar - alreadyChar;
					//if(typeof(maxChar) != 'undefined' && maxChar != ''){
					if(div.find('.xhe_default_charcount').length < 1){
						div.find('.xheLayout tbody').append('<tr><td class="xhe_default_charcount"><span class="xheCharCount">当前您已输入<span class="xhe0_charAlready">'+alreadyChar+'</span>个字符，还可输入<span class="xhe0_charLeft">'+leftChar+'</span>个字符</span></td></tr>');
						if(leftChar < 0){
							textarea0.addClass('error');
							if(textarea0.parent().find('label.editorError').length < 1 && leftChar < 0){
								$('<label class="editorError redText2">您输入的字符超过限制（'+maxChar/2+'个中文或'+maxChar+'位字符内）</label>').appendTo(div).show();
							}
						}else{
							//div.find('.xheLayout tbody').append('<tr><td class="xhe_default_charcount"><span class="xheCharCount">当前您已输入<span class="xhe0_charAlready">0</span>个字符，还可输入<span class="xhe0_charLeft">'+maxChar+'</span>个字符</span></td></tr>');
							textarea0.removeClass('error').parent().find('label.editorError').remove();
						}
					}
				}
				//}
			});
			
			$("iframe").contents().keyup(function(){
				$(this).find('body').addClass('editingMode');
				xhEditorCount();
			}).change(function(){
				$(this).find('body').addClass('editingMode')
				xhEditorCount();
			});
		return xheditor1;
	};
	
	function xhEditorCount(){
		$('.js_xheditor').each(function(){
			var self = this;
			var textarea0 = $(self);
			var thisId = textarea0.attr('id');
			var thisSource = $(this).xheditor().getSource();
			var p = $(this).parent();
			var thisBody = p.find('iframe').contents().find('body');
			if(thisBody.hasClass('editingMode')){
				var thisText = thisBody.text();
				var maxChar = $(this).attr('maxChar');
				var tCount = $(this).parent().find('.xheCharCount');
				//maxChar = (typeof(maxChar) == 'undefined' || maxChar == '') ? '300' : maxChar;
				//如果有不允许为空的提示消息，则将提示消息去除
				var errorMsg = $('label.error[eidtorid='+thisId+']');
				if(errorMsg.length > 0){
					errorMsg.remove();
				} 
				//没有定义最大字符时不进行计数
				if(typeof(maxChar) != 'undefined' && maxChar != ''){					
					var strCount = Utils.getCharLen2(thisText);
					var strLeft = maxChar - strCount;
					//if(thisText != ''){
						if(strLeft >= 0){							
							//$(this).val(thisSource);
							textarea0.parent().find('label.editorError').remove();
							tCount.find('.xhe0_charAlready').text(strCount);
							tCount.find('.xhe0_charLeft').text(strLeft);
							$(this).removeClass('error').addClass('valid');
							
						}else{
							//thisSource = thisSource.substr(0,maxChar);
							//$(this).xheditor().setSource(thisSource);
							$(this).removeClass('valid').addClass('error');
							tCount.find('.xhe0_charAlready').text(strCount);
							tCount.find('.xhe0_charLeft').text(strLeft);
							//显示错误消息
							if(textarea0.parent().find('label.editorError').length < 1 && strLeft <= 0){
								$('<label class="editorError redText2">您输入的字符超过限制（'+maxChar/2+'个中文或'+maxChar+'位字符内）</label>').appendTo(p).show();
							}
						}
						
					//}
					thisBody.removeClass('editingMode');
				}
			}
		});
	};
	exports.xhEditorCount = xhEditorCount;
	
	//将已知数字转换成千分位的数字
	exports.commafy = function(number){
		var num = number.replace(",","");
		if(num.indexOf(',')>0){  
			num = num.replace(/,/gi,'') + "";   
		}  
		var  re=/(-?\d+)(\d{3})/;    
		while(re.test(num)){    
			num=num.replace(re,"$1,$2")    
		}    
		return  num
	};
	
	//将数字还原,去除千分位
	exports.delcommafy = function(number){
		return number.replace(",","");
	};
	
	//显示头像
	exports.showAuthorImg = function(fbrId,fbr){
		var htmlStr = '';
		if(typeof(fbr) != 'undefined' || fbr != null){
			htmlStr += '<a target="_blank" href="';
			if(fbrId == currentUser.id){//如果发表人是当前登录者
					htmlStr += contextPath+'/member/preview/" title="'+fbr+'"><img src="'+contextPath+'/member/user/image/?module=user&amp;userId=' + fbrId + '" /></a>';
			}else{
					htmlStr += contextPath+'/friend/' + fbrId + '/" title="'+fbr+'"><img src="'+contextPath+'/member/user/image/?module=user&amp;userId=' + fbrId + '" /></a>';
			}
		}
		return htmlStr;
	};
	
	//显示地域
	exports.showArea = function(province,city){
		if((city == '' || city == undefined) && (province == '' || province == undefined)){
			return '';
		}else if((city == '' || city == undefined) && province != ''){
			return province;
		}else{
			return (province == city ? province : province + ' ' + city);
		}
	};
	
	exports.beforeLoading = function(obj){
		try{	
			obj.append('<div id="background" class="backgroundLitLoading" style="display:none; "></div><div id="progressBar" class="progressBarLitLoading" style="display: none; "><span style="padding-left:20px;">数据加载中，请稍等...</span></div>');
			$(".progressBarLitLoading").show(); 
		}catch(e){
			$.alerts._showMessage('网络出现异常，请稍后重试','','','',2000);
		}
	};
	
	exports.removeLoading = function(){
		$(".progressBarLitLoading").remove(); 
	};
	
	function checkMemUsername(){
		var usernameInput = $('#infoUsernameInput');
		var username = $.trim($('#infoUsernameInput').val());
		//检测用户名
		if(usernameInput == 0){
			return true;
		}else if(username == ''){
			usernameInput.removeClass('valid').addClass('error');
			var le = $('label[for="infoUsernameInput"]');
			if(le.length>0){
				le.text('请输入会员帐号').show();
			}else{
				$('#infoUsernameInput').after('<label for="infoUsernameInput" generated="true" class="error" style="">请输入会员帐号</label>');
			}
			return false;
		}else if(!checkNumAndCapter(username) || username.length > 20 || (username != '' && username.length < 4)){
			usernameInput.removeClass('valid').addClass('error');
			var le = $('label[for="infoUsernameInput"]');
			if(le.length>0){
				le.text('4-20位字符内（字母、数字、下划线任意组合）').show();
			}else{
				$('#infoUsernameInput').after('<label for="infoUsernameInput" generated="true" class="error" style="">4-20位字符内（字母、数字、下划线任意组合）</label>');
				
			}
			return false;
		}else if(!isNaN(username)){
			usernameInput.removeClass('valid').addClass('error');
			var le = $('label[for="infoUsernameInput"]');
			if(le.length>0){
				le.text('至少包含一个字母或下划线').show();
			}else{
				$('#infoUsernameInput').after('<label for="infoUsernameInput" generated="true" class="error" style="">至少包含一个字母或下划线</label>');
			}
			return false;
		}else{
			$.ajax({
//				url:contextPath+'/member/updateUserName.json',
				url:contextPath+'/member/modifyUserName.json',
				data: {'userName':username},
				async: false,
				type: 'POST',
				cache:false,
				success : function(data){
					if(data=='isExist'){
						usernameInput.removeClass('valid').addClass('error');
						var le = $('label[for="infoUsernameInput"]');
						if(le.length>0){
							le.text('该帐号已经注册过了，请更换').show();
						}else{
							$('#infoUsernameInput').after('<label for="infoUsernameInput" generated="true" class="error" style="">该帐号已经注册过了，请更换</label>');
						}
						return false;
					}else{
						usernameInput.removeClass('error').addClass('valid');
						var le = $('label[for="infoUsernameInput"]');
						le.remove();
						return true;
					}
				},
				error : function(){
					usernameInput.removeClass('valid').addClass('error');
					var le = $('label[for="infoUsernameInput"]');
					if(le.length>0){
						le.text('系统忙，请稍后重试！').show();
					}else{
						$('#infoUsernameInput').after('<label for="infoUsernameInput" generated="true" class="error" style="">系统忙，请稍后重试！</label>');
					}
					return false;
				}	
			});
		}
	};
	exports.checkMemUsername = checkMemUsername;
	
	function checkMemEmail(){
		var emailInput = $('#useremail');
		var email = $.trim($('#useremail').val());
		if(emailInput.length == 0){
			return true;
		}else if (email != "") {
			re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
			var emailLength = email.length;
			if (!email.match(re)) {
				emailInput.removeClass('valid').addClass('error');
				var le = $('label[for="useremail"]');
				if(le.length>0){
					le.text('请输入正确的邮箱地址').show();
				}else{
					$('#useremail').after('<label for="useremail" generated="true" class="error">请输入正确的邮箱地址</label>');
				}
				return false;
			}else if(emailLength > 40){
				var le = $('label[for="useremail"]');
				if(le.length>0){
					le.text('邮箱名称较长，最长支持40字符').show();
				}else{
					$('#useremail').after('<label for="useremail" generated="true" class="error">邮箱名称较长，最长支持40字符</label>');
				}
				emailInput.removeClass('valid').addClass('error');
				return false;
			}else if(is_ExistEmail(email)){
				var le = $('label[for="useremail"]');
				if(le.length>0){
					le.text('该邮箱已经注册，请重新输入').show();
				}else{
					$('#useremail').after('<label for="useremail" generated="true" class="error">该邮箱已经注册，请重新输入</label>');
				}
				emailInput.removeClass('valid').addClass('error');
				return false;
			}else{
				$('label[for="useremail"]').remove();
				emailInput.removeClass('error').addClass('valid');
				return true;
			}
		} else {
			var le = $('label[for="useremail"]');
			if(le.length>0){
				le.text('请输入邮箱').show();
			}else{
				$('#useremail').after('<label for="useremail" generated="true" class="error">请输入邮箱</label>');
			}
			emailInput.removeClass('valid').addClass('error');
			return false;
		}
	};
	exports.checkMemEmail = checkMemEmail;
	
	//检测会员帐号和邮箱是否填写和上是否存在，确定按钮由灰色变为红色
	function checkMemInfo(){
		var formVal = $('form#info').valid();
		resetPopupWrap();
		return formVal;
	};
	exports.checkMemInfo = checkMemInfo;
	
	exports.initDetailInfo = function(isDetail,config){
		if((!isDetail || isDetail == '0') && typeof(config) != 'undefined'){
//			检测cookies
			var firstset = getCookie('IFFIRSTSET');
			if(firstset==null){
				return;
			}
			var html = '<div class="dInfo"><h4 class="dInfoTit">完善基本资料并设置合理的可见性，有利于促进项目合作</h4><div class="dInfoIntro"><p>• 强烈建议您最少设置一下会员帐号和邮箱。</p><p>• 会员帐号和邮箱都会可以作为登录帐号访问网站。</p><p>• 邮箱设置之后我们可以定时把与您相关的项目情况、回复信息、提醒发给您。</p></div>'
				+ '<form id="info" method="POST" action="/member/infoset/" name="form1" onsubmit="return checkMemInfo();"><div class="dInfoItems clearfix">'
		        + '<dl class="home clearfix"><dt>会员帐号：</dt><dd class="loginName fl"><span class="checkInfo fl"><span class="" id="infoUsernameText" style="none;color:#515151;">'+config.userName+'</span><input id="infoUsernameInput" type="text" value="'+config.userName+'" style="width:193px;" name="userName" class="inputStyle homeInput required fl {checkNumAndCapter:true,byteRangeLength:[4,20],messages:{required:\'请输入会员帐号\',checkNumAndCapter:\'4-20位字符内（字母、数字、下划线任意组合）\',byteRangeLength:\'4-20位字符内（字母、数字、下划线任意组合）\'}}"/>'
		        + '</span><span class="ml5 fl"><span class="msg_hide" id="usernameHideText"><span class="redText requiredText" style="color:red;">*</span>&nbsp;4-20位字符内（字母、数字、下划线任意组合）</span></span></dd></dl>'
		        + '<dl class="home clearfix"><dt>邮箱：</dt>'
		        + '<dd class="fl"><span class="selectBox"><input type="hidden"  name="emailPrivacy" id="emailPrivacy" value="'+config.emailPrivacy+'" /><u>'+selectOption(config.emailPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span>'
		        + '<span class="checkInfo fl"><span id="infoEmailText" class="" style="display:none;color:#515151;">'+config.email+'</span><input type="text" class="inputStyle homeInput email {maxlength:40,messages:{required:\'请输入邮箱\',email:\'请输入正确的邮箱地址\',maxlength:\'邮箱名称较长，最长支持40字符\'}}" name="email" id="useremail" value="'+config.email+'"/></span><span class="ml5 fl"><span class="msg_hide" id="emailHideText"><span class="redText requiredText" style="color:red;">*</span></span></span>'
		        + '</dd></dl>'
		        + '<dl class="home clearfix"><dt>所在地：</dt><dd class="fl clearfix"><span class="" id="jg"></span><span class="selectBox"><input type="hidden"  name="provincePrivacy" id="provincePrivacy" value="'+config.provincePrivacy+'" /><u>'+selectOption(config.provincePrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span></dd></dl>'
		        + '<dl class="home clearfix"><dt>性别：</dt><dd class="sexStyle fl"><span class="selectBox"><input type="hidden"  name="sexPrivacy" id="sexPrivacy" value="'+config.sexPrivacy+'" /><u>'+selectOption(config.sexPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span><label for="male" class="memberSex"><input type="radio" id="male" name="sex" value="1" '+getChecked(1,config.sex)+'/>男</label><label for="female" class="memberSex"><input type="radio" id="female" name="sex" value="2" '+getChecked(2,config.sex)+'/>女</label></dd></dl>'
		        + '<dl class="home clearfix"><dt>生日：</dt><dd class="fl"><input type="text" id="birthday" class="inputStyle homeInput fl" value="'+config.birthday+'" onClick="WdatePicker({maxDate:\'%y-%M-%d\'})" name="birthday" readonly="readonly" /><span class="selectBox"><input type="hidden"  name="birthdayPrivacy" id="birthdayPrivacy" value=\'1\' /><u>'+selectOption(config.birthdayPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span></dd></dl>'
		        + '<dl class="home clearfix"><dt>信仰：</dt><dd class="fl"><span class="selectBorder fl religion"><select name="faith" ><option value="无神论" '+getSelected("无神论",config.faith)+'>无神论</option><option value="佛教" '+getSelected("佛教",config.faith)+'>佛教</option><option value="道教"  '+getSelected("道教",config.faith)+'>道教</option><option value="基督教" '+getSelected("基督教",config.faith)+'>基督教</option><option value="天主教" '+getSelected("天主教",config.faith)+'>天主教</option><option value="犹太教" '+getSelected("犹太教",config.faith)+'>犹太教</option><option value="伊斯兰教" '+getSelected("伊斯兰教",config.faith)+'>伊斯兰教</option><option value="印度教" '+getSelected("印度教",config.faith)+'>印度教</option></select></span><span class="selectBox"><input type="hidden"  name="faithPrivacy" id="faithPrivacy" value="'+config.faithPrivacy+'" /><u>'+selectOption(config.faithPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span></dd></dl>'                    
		        + '<dl class="home clearfix"><dt>MSN：</dt><dd class="loginName fl"><span class="checkInfo fl"><input type="text" value="'+config.msn+'" class="inputStyle homeInput fl isMsn {maxlength:50,messages:{maxlength:\'MSN最长50个字符\'}}" name="msn"/></span><span class="selectBox"><input type="hidden"  name="msnPrivacy" id="msnPrivacy" value="'+config.msnPrivacy+'"/><u>'+selectOption(config.msnPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span></dd></dl>'
		        + '<dl class="home clearfix"><dt>QQ：</dt><dd class="loginName fl"><span class="checkInfo fl"><input type="text" value="'+config.qq+'" class="inputStyle homeInput fl isQq {maxlength:16,messages:{maxlength:\'长度应为5~16个数字\',isQq:\'长度应为5~16个数字\'}}" name="qq"/></span><span class="selectBox"><input type="hidden"  name="qqPrivacy" id="qqPrivacy" value="'+config.qqPrivacy+'"/><u>'+selectOption(config.qqPrivacy)+'</u><ul class="selectUl"><li value="0">自己可见</li><li value="1">好友可见</li><li value="2">所有人可见</li></ul></span></dd></dl>'
		        + '<dl class="home clearfix"><dt>证件号：</dt><dd class="fl"><span class="selectBorder fl religion" style="width:64px;max-width:64px; min-width:64px;"><select  name="idType" id="idType" idtype="1" style="width:64px;max-width:64px; min-width:64px;"><option value="1" '+getSelected(config.idType,1)+'>身份证</option><option value="2" '+getSelected(config.idType,2)+'>警官证</option><option value="3" '+getSelected(config.idType,3)+'>护照</option></select></span><input value="'+config.idNumber+'" type="text" class="inputStyle homeInput fl isCardNo ml5" name="idNumber" id="idNumber" orival="" style="width:180px;max-width:180px; min-width:180px;"/><span class="ml10 grayText">不会被公开</span></dd></dl>'
		        + '</div>'
		        + '<div class="dInfoConfirm clearfix"><span class="fr"><span class="button buttonA"><a href="'
		        + ((userConfig.userName==''||userConfig.userName==undefined||userConfig.userName=='null')?'javascript:void(0)':'/member/passinfo/')
		        +'">忽略</a></span><span class="button buttonNo">确定</span><span><span class="button buttonPureBlue" style="display:none;"><input type="submit" value="确定"/></span><span></div></form>';
		        + '</div>';
			$.alerts._show('完善基本资料：', html, null, 610, undefined , 'html', function(flag){
				if(userConfig.userName==''||userConfig.userName==undefined||userConfig.userName=='null'){
					return "show";
				}
				delCookie('IFFIRSTSET');
			},'whole');
			
			$('.overlayMask').css({'height':$(document).height()+'px'});
			//$('#popup_overlay,#popup_overlay iframe').css({'opacity':'0.3','filter':'alpha(opacity=30)','background-color':'#000'});
			$('form#info').validate({
				onsubmit:false,
				//onkeyup:true,
				focusInvalid : true,
				submitHandler : function(form) {
					
				}
			}); 
			initSelectBox();
			$('#infoUsernameInput').live('blur',function(){
				checkMemUsername();
				resetPopupWrap();
				var usernameValid = ($('#infoUsernameInput').length > 0 && $('#infoUsernameInput').hasClass('valid') ||  $('#infoUsernameInput').length == 0);
				var emailValid = ($('#useremail').length > 0 && $('#useremail').hasClass('valid') || $('#useremail').length == 0);
				if(usernameValid && emailValid){
					$('.dInfoConfirm .buttonNo').hide();
					$('.dInfoConfirm .buttonPureBlue').show();
				}else{
					$('.dInfoConfirm .buttonNo').show();
					$('.dInfoConfirm .buttonPureBlue').hide();
				}
			});
			$('#useremail').live('blur',function(){
				checkMemEmail();
				var usernameValid = ($('#infoUsernameInput').length > 0 && $('#infoUsernameInput').hasClass('valid') ||  $('#infoUsernameInput').length == 0);
				var emailValid = ($('#useremail').length > 0 && $('#useremail').hasClass('valid') || $('#useremail').length == 0);
				if(usernameValid && emailValid){
					$('.dInfoConfirm .buttonNo').hide();
					$('.dInfoConfirm .buttonPureBlue').show();
				}else{
					$('.dInfoConfirm .buttonNo').show();
					$('.dInfoConfirm .buttonPureBlue').hide();
				}
				resetPopupWrap();
			});
			//证件事件切换
			$('#idType').change(function(){
				$("label[for='idNumber']").hide();
				var o = $(this);
				var ov = o.val();
				var otype = o.attr('idtype');		
				var i = $('#idNumber');
				var iv = $.trim($('#idNumber').val());
				var oriv = i.attr('orival');
				if(ov == 1){//身份证
					i.removeAttr('maxlength').addClass('isCardNo');
				}else{//警官证、护照
					i.attr({'maxlength':'60'}).removeClass('isCardNo');
				}
				o.parent().find('label.error').remove();
				if(otype == ov){
					i.val(oriv);
				}else{
					i.val('');
				}
			});
			changeEmailInit();
			RegionUtils.showHtml({
			    'obj':$('#jg'),
				'index':'',
				'country': userConfig.country,
				'province':userConfig.province,
				'city':userConfig.city,
				'country_name':'country',
				'province_name':'province',
				'city_name':'city',
				'isShowCounty':'0'
			});
			//如果已经有会员帐号，则不显示输入框
			if(config && config.userName != ''){
				$('#infoUsernameText').show();
				$('#usernameHideText').hide();
				$('#infoUsernameInput').remove();
			}else{
				checkMemUsername();
			}
			if(config && config.email != ''){
				$('#infoEmailText').show();
				$('#emailHideText').hide();
				$('#useremail').remove();
			}else{
				checkMemEmail();
			}
			//弹出框显示成功之后检测邮箱和用户名
			var usernameValid = ($('#infoUsernameInput').length > 0 && $('#infoUsernameInput').hasClass('valid') ||  $('#infoUsernameInput').length == 0);
			var emailValid = ($('#useremail').length > 0 && $('#useremail').hasClass('valid') || $('#useremail').length == 0);
			if(usernameValid && emailValid){
				$('.dInfoConfirm .buttonNo').hide();
				$('.dInfoConfirm .buttonPureBlue').show();
			}else{
				$('.dInfoConfirm .buttonNo').show();
				$('.dInfoConfirm .buttonPureBlue').hide();
			}
			resetPopupWrap();
		}
	};
	
	//设置隐私属性
	function initSelectBox(){
		$(".selectBox u").click(function(){
			var thisu = $(this);
			var thisul = $(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				thisul.parent().addClass('selectHover');
				thisul.fadeIn("100");
				thisul.parent().bind('mouseleave',function(){thisul.fadeOut("100");thisul.parent().removeClass('selectHover');});
				//thisul.hover(function(){},function(){thisul.fadeOut("100");thisul.parent().removeClass('selectHover');});
				thisul.find("li").click(function(){
					thisu.text($(this).text());
					$(this).parent().parent().find('input:hidden').val($(this).attr('value'));
					thisul.parent().removeClass('selectHover');
					thisul.fadeOut("100");}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");
					
					});				
			}		
			else{
				thisul.fadeOut("fast");
				thisul.parent().removeClass('selectHover');
			}
		});
	};
	exports.initSelectBox = initSelectBox;
	
	//分页方法
	exports.pagination = function(callback){
		$('.pagination').find('.fby').live('click',function(){
			var pageIndex = 1;
			var currentPage = parseInt($('#page_current').text());
			var totalPage = parseInt($('#page_total').text());
			var self = $(this);
			var pageType = self.find('a').text();
			if(pageType=='首页'){
				pageIndex = '1';
			}
			if(pageType=='上一页'){
				pageIndex = ((currentPage - 1) < 1 ? 1 : (currentPage - 1));
			}
			if(pageType=='下一页'){
				pageIndex = ((currentPage + 1) > totalPage ? totalPage : (currentPage + 1));
			}
			if(pageType=='末页'){
				pageIndex = totalPage;
			}
			if(callback){
				callback(pageIndex);
			}
		    return false;
		});
		//页面跳转
		$('#page_input_go').click(function(){
			var page = parseInt($.trim($('#page_input').val()));
			var totalPage = parseInt($('#page_total').text());
			if(isNaN(page)){
				$.alerts._showMessage("请输入正确的页码",'','','',2000);
				return;
			}else if(totalPage < page || page < 1 ){
				$.alerts._showMessage("请输入正确的页码",'','','',2000);
				return;
			}else{
				if(callback){
					callback(page);
				}
				return false;
			}
	     
		});
	};
	
	function stopBubble(e){
		if(e){
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			if (e && e.stopPropagation) {//非IE  
				e.stopPropagation();  
			}else {//IE  
				window.event.cancelBubble = true;  
			}  
			try{
				e.stopPropagation();
			}catch(e){
				return false;
			}		
		}
	};
	exports.stopBubble = stopBubble;
	
	//加为好友
	exports.addFriend = function(id,obj){
		var self =　$(obj);
		if(!self.hasClass('waitForMakeSure')){
			$.ajax({
				url : dataPath+'/friend/add.json',
				data : {
					friendId : id
				},
				type: "post",
				success : function() {
					var _html = '<span class="waitForMakeSure">等待确认</span>';
					self.parent().append(_html);
					self.remove();
//					self.addClass('waitForMakeSure').text('等待确认');
				},
				error : function(){
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}
				
			});
		}
	};
	//加为好友
	exports.addFriend1 = function(id,obj){
		var self =　$(obj);
		if(self.hasClass('buttonDisabled')){
			return;
		}
		$.ajax({
			url : dataPath+'/friend/add.json',
			data : {
				friendId : id
			},
			type: "post",
			success : function() {
				self.removeClass('buttonNO').addClass('buttonDisabled').text('等待确认');
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}
			
		});
	};
	
	//会员转为人脉
	exports.transPeople = function(id,obj){
		var self =　$(obj);
		$.ajax({
			url : dataPath+'/member/transPeople.json',
			data : {
				friendId : id
			},
			type: "get",
			success : function(data) {
				if(data.result=='success'){
					self.attr('onclick',"").attr('style',"margin-right:0px").addClass('insOld').text('已加为人脉');
				}
//					self.removeClass('buttonNO').addClass('buttonDisabled').text('');
			}
		});
	};
	
	//机构转为客户
	exports.transCustomer = function(id,obj){
		var self =　$(obj);
		$.ajax({
			url : dataPath+'/corp/transCustomer.json',
			data : {
				orgUserId : id
			},
			type: "get",
			success : function(data) {
				if(data.result=='success'){
					self.addClass('insOld').attr('style',"margin-right:0px").attr('onclick',"").text('已转为客户');
				}
//					self.removeClass('buttonNO').addClass('buttonDisabled').text('');
			}
		});
	};
	
	//解除单个好友
	exports.relieveFriend = function(id){
		jConfirm('<div class="friHandleInfo"><p class="friMainInfo">确定要解除好友关系吗?</p><p class="friSubInfo">解除好友关系后，您设置好友可见的内容对方将不再可见</p></div>', '解除好友', function(res) {
			if(res){
				$.ajax({
					url : dataPath+'/friend/relieve.json',
					data : {
						friendId : id
					},
					type: "post",
					success : function(data) {
						if(data.results=='success'){
							location.reload();
						}
					},
					error : function(){
						$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
					}
					
				});
			}
		});
	};
	
	//加为机构好友
	exports.addCorpFriend = function(id,obj){
		var self =　$(obj);
		if(self.hasClass('buttonNO')){
			$.ajax({
				url : dataPath+'/corp/friend/add.json',
				data : {
					friendId : id
				},
				type: "post",
				success : function() {
					self.removeClass('buttonNO').addClass('buttonDisabled').text('等待确认');
				},
				error : function(){
					$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
				}
				
			});
		}
	};
	
	//解除单个机构好友
	exports.relieveCorpFriend = function(id){
		jConfirm('<div class="friHandleInfo"><p class="friMainInfo">确定要解除好友关系吗?</p><p class="friSubInfo">解除好友关系后，您设置好友可见的内容对方将不再可见</p></div>', '解除好友', function(res) {
			if(res){
				$.ajax({
					url : dataPath+'/corp/friend/relieve.json',
					data : {
						friendId : id
					},
					type: "post",
					success : function(data) {
						if(data.results=='success'){
							location.reload();
						}
					},
					error : function(){
						$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
					}
					
				});
			}
		});
	};
	
	//添加收藏
	exports.addFavorites = function(id, type){
		$.ajax({
			url : dataPath+'/favorites/save.json',
			data : {
				id : id,
				type : type
			},
			async: false,
			type: "post",
			success : function(data) {
				if(data.results=='success'){
					$.alerts._showMessage('收藏成功！','','','',2000);
				}
			},
			error : function(){
				$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
			}
			
		});
	};
	
	function makeTaskId(){
		var taskid = ''+ new Date().getTime();
		var temp = Math.ceil(Math.random()*100000) + '';
		while(temp.length<6){
			temp = '0' + temp;
		}
		taskid += temp;
		temp = Math.ceil(Math.random()*100000) + '';
		while(temp.length<6){
			temp = '0' + temp;
		}
		taskid += temp;
		var b = new Base64();
		taskid = b.encode(taskid);
		taskid = b.encode(taskid);
		return taskid;
	};
	exports.makeTaskId = makeTaskId;
	
	//发私信事件初始化
	function letterSendInit(){
		function hideAttFiles(){
			$('#letterAttListArea').hide();
			resetPopupWrap();
		}
		function showAttFiles(){
			$('#letterAttListArea').show();
			resetPopupWrap();
		}
		//表情初始化
		if(typeof(expression) != 'undefined'){
			expression.init('emoBtn','letterAtt','emoText','textCount',false,hideAttFiles,null,'这里有个很好的资料给你借鉴！');
		}
	};
	exports.letterSendInit = letterSendInit;
	
	//添加附件初始化
	function letterSendFileBtn(obj){
		var pdiv = $('#letterAttListArea');
		var isload = pdiv.attr('isload');
		$('.emotionsList').hide();
		setTimeout(function initLetterAttListArea(){
			var pdiv = $('#letterAttListArea');
			var isload = pdiv.attr('isload');
			if(isload == '0'){
				letterMultiUpload = commonUpload('letterAttListArea','add','9','0',10,'message','taskIdLetter','letterListArea1','','','after','<div id="letterListArea1" class="mt10 attachmentListArea clearfix">','','page','showBoxErrorText');
				pdiv.attr('isload','1');
			}
			resetPopupWrap();
		},50);
		if(pdiv.css('display') == 'none'){
			pdiv.show();
		}else{
			pdiv.hide();
		}
		resetPopupWrap();
	};
	exports.letterSendFileBtn = letterSendFileBtn;
	
	//发送私信 提交
	function letterSendSubmit(){
		$('#letterAttListArea').show();
		resetPopupWrap();
		if(typeof(uploaders_cache)!='undefined'){
			letterMultiUpload = uploaders_cache['letterAttListArea'];
			if(letterMultiUpload!=null && letterMultiUpload.state != plupload.STOPPED){
				showSecondMsg('提交前请先等待文件上传完成','showBoxErrorText',2000);
				return false;
			}
		}
		var userIds=$("#userIds").val();
		var content=$("#emoText").text();
		var taskId=$("#taskIdLetter").val();
		var fileIds=$('input[name="fileIds"]').val();
		fileIds = (fileIds ? fileIds : ''); 
		if(content.trim()=="" || content.trim()==null){
			showSecondMsg('发送内容不能为空，请重新输入','showBoxErrorText',3000);
			return;
		}else if(Utils.getCharLen2($.trim(content)) > 1000){
			showSecondMsg('您输入的字符超过限制（500个中文或1000位字符内）','showBoxErrorText',3000);
			return;
		}else{
			content=expression.sendExp(content);
			var ajaxurl = dataPath +'/msg/letter/sendletter.json';
			$.ajax({
				url:ajaxurl,
				data:{
					userIds : userIds,
					content : content,
					taskId : taskId,
					fileIds : fileIds
				},
				dataType : 'json',
				cache : false,
				async : false,
				type : 'POST',
				success : function(data){
					if(data.result == 'success'){
						$.alerts._showMessage('私信发送成功','','','',2000);
					}else{
						$.alerts._showMessage('系统忙，请稍后重试','','','',2000);
					}
				},
				error : function(){
					$.alerts._showMessage('系统忙，请稍后重试','','','',2000);
				}
			});
		}	
	};	
	exports.letterSendSubmit = letterSendSubmit;
	
	// 点击弹出窗口发私信调用的方法ok
	exports.showBox = function(userid, username,taskid) {
		taskid = this.makeTaskId();
		var html = '<input type="hidden" name="userIds" id="userIds" value="'+userid+'"><input type="hidden" name="" id="taskIdLetter" value="'+taskid+'">' 
			+'<div id="showBoxError" class="showBoxError clearfix"><span id="showBoxErrorText" class="showBoxErrorText"></span></div>'
			+'<div id="createLetter" class="createLetter clearfix">'
			+'	<div id="letterContent" class="letterContent clearfix">'
			+'		<div class="letterTextOuter clearfix" style="height:105px;">'
    		+'			<div class="letterText clearfix">'
    		+'			<div id="emoText" class="emoText emoTextContent" tableIndex="1" title="私信输入框" contenteditable="true" style="width:552px;_width:554px;"></div>'
    		+'			</div>'
    		+'		</div>'
    		+'		<div class="letterOther clearfix" style="height:26px;position:relative;">'
    		+'			<span id="" class="textCount fr" style="position: absolute;top: 2px;right: 0px;">还能输入<span id="textCount" class="orangeText" maxcount="500">500</span>字</span>'
    		+' 			<div class="letterAtt clearfix" style="position: absolute;top: 2px;left: 0px;"><div class="letterAttButton"><a href="javascript:void(0);" class="lAttBtn emoBtn" title="表情" id="emoBtn'+userid+'"><i></i></a><a href="javascript:void(0);" class="lAttBtn fileBtn" title="文件" id="fileBtn'+userid+'" onclick="letterSendFileBtn(this);"><i></i></a></div></div>'
    		+'		</div>'
    		+'		<div class="pb10 clearfix" id="letterAttListArea" isload="0" style="display:none;"></div>'
    		+'		<div id="letterButton" class="letterButton clearfix"><span id="submitLetter" class="button buttonPureBlue" onclick="letterSendSubmit();">发送</span></div>'
    		+'	</div>'
    		+'</div>'
		jHtml(html, '<span class="submitLetterTit">发私信给：<span class="blueText">'+username+'</span></span>', 600);
		this.letterSendInit();
		$('.emotionsList').hide();
		resetPopupWrap();	
		// 字数提示
		$('#emoText').live('keyup',function(e){
			var ex = this;
			var stp = ex.scrollTop;
			countTextNew('emoText','textCount');
			ex.scrollTop = stp; 
		});
		$('#createLetter').parent().parent().parent().css('overflow','visible');		
		if($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
			countTextNew('emoText','textCount');
		}
	};
	//转向个人主页预览或好友详情
	exports.turnToHomepage = function(userid,event){
		stopBubble(event);
		if(typeof(userid) != 'undefined' && userid == currentUser.id){//个人主页
			window.location.href = webContextPath + '/member/info/';
		}else{
			window.location.href = webContextPath + '/friend/'+userid+'/';
		}
	};
	//显示消息，并能够设置定时消失
	function showSecondMsg(msg,tid,time,callback){
		var tdiv = $('#'+tid);
		var timer;
		if(msg != ''){
			tdiv.text(msg).addClass('redText2').show();
			resetPopupWrap();
			if(!callback){
				callback = function(){
					tdiv.removeClass('redText2').hide();
					resetPopupWrap();
				}
			}
			timer = setTimeout(callback,time);
		}
	};
	exports.showSecondMsg = showSecondMsg;
	//重新设置弹出框高度
	function resetPopupWrap(){
		$("#popup_container_shadow").css({'height':$('#popup_container_wrap').outerHeight() +'px'});
		if($('.overlayMask').hasClass('wholeMask')){
			$('.overlayMask').css({'height':$(body).height()+$(window).scrollTop()+'px','background-repeat':'repeat'});
		}
	};
	exports.resetPopupWrap = resetPopupWrap;
	
	//绑定事件：刷新回复时验证码和调整验证码输入框的样式,需传入验证码区域的span，span上要有值为对应textarea的id的属性for
	exports.refreshReplyMsgCode = function(replyCode){
		var self = this;
		var txt = replyCode.find('input');
		var img = replyCode.find('img');
		txt.focus(function(){
			if($(this).val() == '请输入验证码'){
				$(this).val('').css({'color':'#4a4a4a'});
			}
		}).blur(function(){
			if($(this).val() == ''){
				$(this).val('请输入验证码').css({'color':'#bbb'});				
			}
		});
		img.click(function(){
			var date = new Date();
			var url = dataPath + '/checkCode/'+'?date='+date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();
			img.attr('src',url);			
		});
	};
	exports.resetFriendHeight = function(){//点击页码后重设左右侧高度
		//$('.contentRight,#personalLeft').css({'height':$('#bd').height()});
		var h0 = 550;
		var h1 = $('.contentLeft').height()+20;
		if(h1>=h0){
			$('.contentRight,#personalLeft').css({'height':h1+'px'});
		}else{
			$('.contentRight,#personalLeft').css({'height':h0+'px'});
		}
	};
	
	exports.resetPageHeight = function(bd,left,right){//页面高度重设,以contentLeft或高度变化的页面部分高度为准，最小高度是500
		if(bd && left && right){
			var h0 = bd.height();
			var h1 = left.outerHeight(true);
			var h2 = right.height();
			
			if(h1 < 500){
				//bd.css({'height':'500px'});
				//left.css({'height':'500px'});
				right.css({'height':'520px'});
			}else{
				//bd.css({'height':h1+'px'});
				//left.css({'height':h1+'px'});
				right.css({'height':h1+20+'px'});
			}			
		}
	};
	
	exports.guid = function(){
	    	var S4=function(){
	    		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    	}
	    	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	    };
	    
	function strToDate(date) {
	    		date = date.replace(/-/g,"/");
	    		if(date.length>19){
	    			date = date.substring(0,19);
	    		}
	    		var date1 = new Date(date);
	    		return date1;
	    	};
	 exports.strToDate = strToDate;
	 
	 exports.formatFriendlyDateTime = function(date){
	    	if(typeof(date)=='undefined'||date==null||date==''){
	    		return '';
	    	}
	    	var date1 = this.strToDate(date);
	    	var d1 = date1.getTime();
	    	 var time = null;
	         var now = new Date().getTime();
	         d1 = now-d1;
	         var seconds = (d1/1000);
	         var minutes = Math.floor(seconds/60);
	         var hours = Math.floor(seconds/3600);
	         var days = Math.floor(seconds/86400);
	         if(days > 60){
	             time = date.substring(0,10);
	         }else if(days > 30){
	             time = "1个月前";
	         }else if(days > 14){
	             time = "2周前";
	         }else if(days > 7){
	             time = "1周前";
	         }else if(days > 1){
	             time = days + "天前";
	         }else if(hours>1){
	             time = hours + "小时前";
	         }else if(minutes>1){
	             time = minutes + "分钟前";
	         }else if(seconds>1){
	             time = Math.floor(seconds) + "秒前";
	         }else{
	             time = "刚刚";
	         }
	         return time;
	    };
	    
	exports.countMax = function(targetId){
		var textarea = $(targetId);
		var flag = 0;
		var str = $.trim(textarea.val());
		var maxCount = textarea.attr('maxCount');
		maxCount = parseInt(maxCount)*2;//此处为字数最大值
		var strlength = 0;
		for (var i = 0; i < str.length; i++) {
			if (Utils.isChinese(str.charAt(i)) == true){
				strlength = strlength + 2;
			}else{
				strlength = strlength + 1;
			}
		}
		if (strlength > maxCount) {
			flag = 1;
			textarea.val(str.substr(0, maxCount));
			return flag;
		}
		return flag;
	};
	
	function is_ExistEmail(email){
		var flag = true;
		$.ajax({
			url : contextPath+'/member/checkEmailIsExist.json',
			data : "email=" + email,
			type : "get",
			dataType : 'json',
			cache : false,
			async : false,
			success : function(data) {
				if (data.isExist) {
					flag = true;
				} else {
					flag = false;
				}
			},
			error : function(){
				$('#useremail').removeClass('valid').addClass('error');
				var le = $('label[for="useremail"]');
				if(le.length>0){
					le.text('系统忙，请稍后重试！').show();
				}else{
					$('#useremail').after('<label for="useremail" generated="true" class="error">系统忙，请稍后重试！</label>');
				}
				flag = false;
			}
		});
		return flag;
	};
	exports.is_ExistEmail = is_ExistEmail;
	
	exports.getWidth = function(percent){
		return document.body.clientWidth * percent;
	};
	
	// 取得所有选中
	exports.getSelections function(){
		var ids = [];
		var rows = $('#grid').datagrid('getSelections');
		if(rows != null || typeof(rows) != 'undefined'){
			for ( var i = 0; i < rows.length; i++) {
				ids.push(rows[i].id);
			}
		}
		return ids;
	};
	
	// 验证是否是整数
	exports.checkInt = function(myString) {
		if (myString.length > 10)
			return false;
		var reg = RegExp(/^[0-9]*$/);
		if (reg.test(myString))
			return true;
		var reg = RegExp(/^[-][0-9]*$/);
		if (reg.test(myString))
			return true;

		return false;
	};
	
	/**
	 * 控制显示的字数
	 * 
	 * @param obj
	 *            字符串
	 * @param len
	 *            控制字符串大小
	 * @returns {String}
	 */
	exports.controlSize = function(obj, len) {
		var newValue = "";
		if(obj != null || typeof(obj) != 'undefined'){
			if (obj.length > len) {
				newValue = obj.substring(0, len - 2);
				newValue += "...";
			} else {
				newValue = obj;
			}
		}
		return newValue;
	};
	
	exports.checkStrSize = function(obj, len) {
		if(obj != null || typeof(obj) != 'undefined'){
			if (obj.length > len) {
				return false;
			} else {
				return true;
			}
		}
	};
	
	exports.turnToIndex = function(){
		history.go(-1);
		return false;
	};
	
	function selectOption(value){
		if (value == "0")
		{
			return "自己可见";
		}else if (value == "1")
		{
			return "好友可见";
		}else if (value == "2")
		{
			return "所有人可见";
		}
	};
	
	function getChecked(value,tvalue){
		if (value == tvalue)
		{
			return "checked";
		}
	};
	
	function getSelected(value,tvalue){
		if (value == tvalue)
		{
			return "selected";
		}
	};
	
	/**
	*
	*  Base64 encode / decode
	*
	*  @author haitao.tu
	*  @date   2010-04-26
	*  @email  tuhaitao@foxmail.com
	*
	*/
	function Base64() {
	 
		// private property
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	 
		// public method for encoding
		this.encode = function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		}
	 
		// public method for decoding
		this.decode = function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		}
	 
		// private method for UTF-8 encoding
		_utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
			return utftext;
		}
	 
		// private method for UTF-8 decoding
		_utf8_decode = function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	};
	
	exports.imgZoomTool = {
			imgZoomInit : function(obj){
				//imgZoomSmall.jpg
				var self = this;
				var oo = $(obj);
				var pdiv = oo.parent();
				var ppdiv = pdiv.parent();
				var pid = pdiv.attr('id');
				var bigerDiv = ppdiv.find('.microBlogImgBig');
				if(pdiv.hasClass('microBlogImgSmall')){//当前是小图片区域
					var src = oo.find('img').attr('src');
					if(bigerDiv.length == 0){
						bigerDiv = this.showBigImgDiv(pid,src);
						pdiv.after(bigerDiv).show();
						pdiv.hide();
						self.handleImgHeight(bigerDiv)
						bigerDiv.click(function(){
							$(this).hide();
							pdiv.show();
							self.handleImgHeight(pdiv)
						});
					}else{
						bigerDiv.show();
						pdiv.hide();
						self.handleImgHeight(bigerDiv)
					}			
				}else{
					bigerDiv.hide();
					ppdiv.find('.microBlogImgSmall').show();
					self.handleImgHeight(ppdiv.find('.microBlogImgSmall'))
				}
			},
			handleImgHeight : function(pdiv){
				var area = pdiv.find('.imgZoomArea');
//				if(pdiv.hasClass('microBlogImgBig')){
//					setTimeout(function(){
//						var img = area.find('img');
//						var OriginImage=new Image();
//						OriginImage.src = img.attr('src');
//						var areaH = OriginImage.height;//alert(areaH);
//						
//						if(areaH <= 44){
//							area.css({'height':'44px'});
//							//img.removeAttr('height');
//						}else{
//							area.css({'height':'auto'});
//							img.attr('height',areaH);
//						}
//					},10);
//				}
				resetLeftHeight();
				$(document).scrollTop(area.parents('dl').offset().top);
			},
			showBigImgDiv : function(pid,src){
				var bsrc = src.substr(0,src.length-4)+'big.jpg';
				//var imgSize = this.resetImgSize(imgData.imgData.width, imgData.imgData.height,maxWidth);
				var bigImgDiv = $('<div id="zoomerbig_'+pid+'" class="microBlogImgBig clearfix">'
						+'<div class="imgZoomArea clearfix" style="width:448px;">'
						+'<img src="'+bsrc+'">'
//						+'<span class="zoomer zoomerSmall"><span class="big"></span><span class="small"></span></span>'
						+'</div>'
						+'</div>');
				return bigImgDiv;
			},
			resetImgSize : function(w0,h0,maxWidth){
				var size = {"width":w0,"height":h0};
				w0 = ((w0 == null || typeof(w0) == 'undefined') ? maxWidth : parseInt(w0));
				h0 = ((w0 == null || typeof(h0) == 'undefined') ? maxWidth : parseInt(h0));
				maxWidth = ((maxWidth == null || typeof(maxWidth) == 'undefined') ? 446 : parseInt(maxWidth));
				var style = '';
				var w1,h1,l1,t1;
				if(w0 >= h0){//如果宽>=高，则以宽为准缩放
					w1 = (w0 > maxWidth ? maxWidth : w0);
					h1 = parseInt(w1*h0/w0);
				}
				/*else{//如果高>=宽，则以高为准缩放
					h1 = (h0 > maxWidth ? maxWidth : h0);
					w1 = parseInt(h1*w0/h0);
				}*/
				/*l1 = 22 + (100-w1)/2;
				t1 = (100-h1)/2;
				style = 'width:'+w1+'px;height:'+h1+'px;left:'+l1+'px;top:'+t1+'px;';*/
				return {"width":w1,"height":h1};
			}
	    };
	
	//重设页面左侧导航高度
	function resetLeftHeight(){
		var h0 = 0;
		var h1 = $('dl.headPortrait').height() +  $('dl.navSelfManage').height() + 100;
		var h2 = $('.threeClumn_m').height() + 20;
		var h3 = $('.contentRight').height() + 20;
		if(h1 > h2){
			h0 = h1;
		}else{
			h0 = h2;
		}
		if(h0 < h3){
			h0 = h3
		}
		$('.personalLeft,.threeClumn_l').height(h0);//.css({'height':h0+'px'});
	};
	exports.resetLeftHeight = resetLeftHeight;
	
	
	if(!/^.*\.?[server,qatest,dev,local,online]\..*/.test(document.location.host)){
		//百度统计代码
		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F3bea1a4eeed7a7b90e3a2bbb30472e09' type='text/javascript'%3E%3C/script%3E"));
	}
	
});

