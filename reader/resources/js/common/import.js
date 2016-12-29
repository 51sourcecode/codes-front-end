define(function(require, exports, module){
	var $ = require("jquery");
	require("global")(window);
	require("jAlert")($);
	//var require('newImport');
var mu0,timer;
//导入


//file对象的属性：filestatus、id、index、name、post、size、type
function showDiv(file, showFatherDivId) {
	$('<ul class="attContent clearfix" id="'+file.id+'_fatherDiv">'
			+'<li class="attName textoverflow">' + file.name + '</li>'
			+'<li class="attSize textoverflow" size="'+file.size+'">' + getSize(file.size) + '</li>'
			+'<li class="attType textoverflow">' + file.type.substr(1,file.type.length) + '</li>'
			+'<li class="attStatues textoverflow"><div id="'+ file.id + '_div" class="waitUpload">待上传</div></li>'
			+'</ul>').appendTo($('#' + showFatherDivId));
}
//移除附件，移除已经上传但没有保存的附件
function removeFile(fileId, fileName, id) {
	$('#' + fileId + '_fatherDiv').remove();
	$.ajax({
		url : knowledgePath + '/attachment/delete.json',
		data : 'fileId=' + id,
		dataType : 'json',
		cache : false,
		async : false,
		type : 'POST',
		success : function(data) {
			var fileIds = $('input[name=fileIds]').val();
			fileIds = fileIds.replace(id + ',', '');
			$('input[name=fileIds]').val(fileIds);
			if($('ul.attContent').length < 1){
				$('#deleteFiles').attr({'disabled':'disabled'}).parent().addClass('disabled');
			}
			getTotalSize();
		},
		error : function(){
			$.alerts._showMessage('系统忙，请稍后重试！','','','',2000);
		}
	});
}

//修改时需要显示已经上传成功的附加列表
function initSuccessUploadFile(showFatherId,taskId) {
	
}

//换算文件大小成MB
function getSize(size){
	var size0 = size/1024000;
	var size1 = size/1000;
	var size00 = size0.toFixed(2);
	var size11 = size1.toFixed(2);
	if(size00 > 0){
		return size00+'MB';
	}else{
		return size11+'KB';
	}
}

//get file percent
function getFilePercent(){
	$.ajax({
		url : knowledgePath + '/article/importProcess.json',
		async : false,
		cache:false,
		data : {
			taskId : $('#taskId').val()
		},
		success : function(data){
			var percent = (parseInt(data.current)/parseInt(data.total)*100).toFixed(0);
			var totalSizeD = $('#attSizeTotal');
			var size = totalSizeD.text();
			var totalSize = data.total;
			var readySize = percent * 100;
			if(data.result == 'success'){
				clearTimer();
				$('.handleLeft[status="1"]').hide();
				$('.handleLeft[status="2"]').show();
			}else{
				$('.progressBar .percent').css({'width':percent+'%'});
				$('#uploadPercent').text(percent+'%');
				$('#uploadAlreadySize').text(readySize);				
			}
		},
		error : function(){
			setTimeout(clearTimer,5000);
		}
	});
}

//清除计时器
function clearTimer(){
	clearInterval(timer);
}

//队列添加成功后获取总的文件大小
function getTotalSize(){
	var sizeD = $('.attContent .attSize');
	var size = 0;
	if(sizeD.length > 0){
		$.each(sizeD,function(i,o){
			size += parseInt($(o).attr('size'));
		});
	}
	size = getSize(size);
	$('#attSizeTotal').text(size);
	$('#uploadTotalSize').text(size);
}




//file对象的属性：filestatus、id、index、name、post、size、type
exports.showDiv=showDiv;
//移除附件，移除已经上传但没有保存的附件
exports.removeFile=removeFile;
//修改时需要显示已经上传成功的附加列表
exports.initSuccessUploadFile=initSuccessUploadFile;
//换算文件大小成MB
exports.getSize=getSize;
//get file percent
exports.getFilePercent=getFilePercent;
//清除定时器
exports.clearTimer=clearTimer;
//队列添加成功后获取总的文件大小
exports.getTotalSize=getTotalSize;
});