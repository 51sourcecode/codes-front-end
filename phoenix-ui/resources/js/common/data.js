var getAllRecommend=function(forwhat,id,range){
	getMultirecommend(forwhat,id,'people',range);
	getMultirecommend(forwhat,id,'company',range);
	getMultirecommend(forwhat,id,'requirement',range);
	getMultirecommend(forwhat,id,'knowledge',range);
}
var size=10;
var size1=48;
var id = '6823';
//var id = 1;
var _forwhat="people";
var _range="me";

getMultirecommend(_forwhat,id,'activeusers',_range);
/**
 * 	forwhat：推荐的页面对象，people|user|corporation|requement|business|project
	id：数据库键值<id>
	expected：推荐结果类型，<people|corporation|requirement|knowledge>
	range：推荐结果范围<me|friends|site>
 */
function getMultirecommend(forwhat,id,expected,range){
	// TODO 判断环境
	var dev = "http://192.168.101.111:8000";
	var online = "http://rec.online.gintong.com";
	var product = "http://rec.gintong.com";
	var host ;
	if(!/^.*\.?[server,qatest,dev,local,online]\..*/.test(document.location.host)){
		host = product;
	}else if(/^.*\.?[online]\..*/.test(document.location.host)){
		host = online;
	}else if(/^.*\.?[server,qatest,dev,local]\..*/.test(document.location.host)){
		host = dev;
	}
	var url=host+"/rec/multirecommend/?forwhat="+forwhat+"&key="+id+"&userId="+currentUser.id+"&expected="+expected+"&range="+range+"&callback=?";
	$.getJSON(url,function(data){
		if(expected=='people'){
			showPeopleHtml(data.results);
		}else if(expected=='activeusers'){
			showAddPeopleHtml(data.results);
		}else if(expected=='company'){
			showCorporationHtml(data.results);
		}else if(expected=='requirement'){
			showRequirementHtml(data.results);
		}else if(expected=='knowledge'){
			showKnowledgeHtml(data.results);
		}
	});
};
var showPeopleHtml = function(results){
	var html=[];
	if(results.length==0){
		html.push('<div class="relationshipMainList">暂无相关人</div>');
	}else{
		$.each(results,function(i,o){
			if(i==size){
				return false;
			}
			if(o.expected =='activeusers'){
				html.push('<div class="relationshipMainList">');
				html.push('<div class="relationshipMainListL"><a href="/member/view/?id='+o.id+'" target="_blank"><img src="/member/user/image/?module=user&userId='+o.id+'"></a></div>');
				html.push('<div class="relationshipMainListR">');
				html.push('<div><a href="/people/'+o.id+'/" target="_blank">'+Utils.getSimpleStr(o.name, 7)+'</a></div>');
				html.push('<p>'+o.reason+'</p>');
				html.push('<p>'+o.range+'</p>');
				html.push('</div><div class="clearQ"></div></div>');
			}else if(o.expected =='people'){
				html.push('<div class="relationshipMainList">');
				html.push('<div class="relationshipMainListL"><a href="/people/'+o.id+'/" target="_blank"><img src="/member/user/image/?module=people&userId='+o.id+'"></a></div>');
				html.push('<div class="relationshipMainListR">');
				html.push('<div><a href="/people/'+o.id+'/" target="_blank">'+Utils.getSimpleStr(o.name, 7)+'</a></div>');
				html.push('<p>'+o.reason+'</p>');
				html.push('<p>'+o.range+'</p>');
				html.push('</div><div class="clearQ"></div></div>');
			}
		});
	}
	$('.relationshipPeople .relationshipMain').html(html.join(''));
};
var showAddPeopleHtml = function(results){
	var html=[];
	var idStr=[];
	if(results.length==0){
		html.push('<h3 class="popIntroNone">暂无相关人</h3>');
	}else{
		$.each(results,function(i,o){
			if(i==size1){
				return false;
			}
			if(o.expected =='activeusers'){
				for(var s in o){
					if(o[s]==null){
						o[s]="";
					}
				}
				html.push('<dl class="popIntro">');
				html.push('<dt><img src="/member/user/image/?module=user&userId='+o.id+'">');
				html.push('<input class="popCheck" id="'+o.id+'" name="addPeoples" data-id="'+o.id+'" type="checkbox" checked="checked" /></dt>');
				html.push('<dd><h3>'+Utils.getSimpleStr(o.name, 7)+'</h3>');
				html.push('<p><b class="b1">'+o.company+'</b>&nbsp;&nbsp;<b class="b2">'+o.position+'</b></p>');
				html.push('<p>'+o.city+'&nbsp;&nbsp;'+o.industry+'</p></dd>');
				html.push('<div class="clearQ"></div></dl>');
			}
		}); 
		$("#checkAllPeople_bottom").before('已选中<span style="padding: 0 5px;color: #f98512;">'+results.length+'</span>人')
	}
	$('.addPeoplesMenu').html(html.join(''));
	
	$('.popCheck').click(function(){
         //判断是否被选中
            var self=$(this);
            var bischecked=self.is(':checked');
            bischecked?self.attr('checked',true):self.attr('checked',false);
            var addLen=$(".addPeoplesMenu input[checked='checked']").length;
            $(".addtitle_right span").html(addLen);
        });
    $('.checkAllPeople').click(function(){
         //判断是否被选中
         $(':checkbox[name="addPeoples"],.checkAllPeople').attr('checked', this.checked);
            var self=$(this);
            var bischecked=self.is(':checked');
            bischecked?self.attr('checked',true):self.attr('checked',false);
            var addLen=$(".addPeoplesMenu input[checked='checked']").length;
            $(".addtitle_right span").html(addLen);
        });
	$(".addBtn").on('click',function(){
		var addLen=$(".addPeoplesMenu input[checked='checked']").length;
		
		$(".addPeoplesMenu input[checked='checked']").each(function(){
			var checkedLen=$(this).attr('data-id');
			idStr.push(checkedLen);
		});
		var addPeopleStr=idStr.join(";");
		$("#popup_overlay").remove();
		jAlert("您已成功向<span style='color:#f98512'>"+addLen+"</span>人发送加为好友通知，请等待回应","提示");
		$.ajax({
			url : '/friend/addIndex.json',
			dataType : 'json',
			data : 'friendIds='+ addPeopleStr,
			type:'post',
			cache : false,
			async : true,
			success : function(data) {
				 
			}
		});
	})
};
var showCorporationHtml = function(results){
	var html=[];
	if(results.length==0){
		html.push('<div class="relationshipMainList">暂无相关机构</div>');
	}else{
		$.each(results,function(i,o){
			if(i==size){
				return false;
			}
			html.push('<div class="relationshipMainList">');
			html.push('<div class="relationshipMainListL"><a href="/member/view/?id='+o.id+'" target="_blank"><img src="/member/user/image/?module=user&userId='+o.id+'"></a></div>');
			html.push('<div class="relationshipMainListR">');
			html.push('<div><a href="/member/view/?id='+o.id+'" target="_blank">'+Utils.getSimpleStr(o.name,10)+'</a></div>');
			html.push('<p>'+o.reason+'</p>');
			html.push('<p>'+o.range+'</p>');
			html.push('</div><div class="clearQ"></div></div>');
		});
	}
	$('.relationshipCompany .relationshipMain').html(html.join(''));
};
var showRequirementHtml = function(results){
	var html=[];
	if(results.length==0){
		html.push('<div class="relationshipMainList">暂无相关需求</div>');
	}else{
		$.each(results,function(i,o){
			if(i==size){
				return false;
			}
			var xqlxName="投资";
			var xqType=o.requirementType;
			if(xqType=='tzxq' || xqType=='TZXQ'){
				xqlxName="投资";
				xqType = "tzxq";
			}else if(xqType=='rzxq' || xqType=='RZXQ'){
				xqlxName="融资";
				xqType = "rzxq";
			}else{
				xqType="tzxq";
			}
			if(o.name!=undefined && o.id != undefined){
				html.push('<div class="relationshipMainListXq">');
				html.push('<div class="relationshipMainListXqL">['+xqlxName+']</div>');
				html.push(' <div class="relationshipMainListXqR"><a href="/requirement/detail/'+xqType+'/'+o.id+'/" target="_blank">'+Utils.getSimpleStr(o.name,10)+'</a></div>');
				html.push('<div class="clearQ"></div></div>');
					
			}
		});
	}
	$('.relationshipDemand .relationshipMain').html(html.join(''));
};
var showKnowledgeHtml = function(results){
	var html=[];
	if(results.length==0){
		html.push('<div class="relationshipMainListZs">暂无相关知识</div>');
	}else{
		$.each(results,function(i,o){
			if(i==size){
				return false;
			}
			if(o.name!=undefined && o.id != undefined){
				var rea="经典案例";
				if(o.reason !=undefined){
					rea=o.reason;
				}
				var p="";
				if(o.creatorName !=undefined){
					p=o.creatorName;
				}
				html.push('<div class="relationshipMainListZs"><a target="_blank" href="'+cloudHost+'/cloud/case/case?taskid='+o.id+'">['+rea+']'+Utils.getSimpleStr(o.name,10)+'</a><span>'+p+'</span></div><div class="clearQ"></div>');
			}
		});
	}
	$('.relationshipKnowledge .relationshipMain').html(html.join(''));
};