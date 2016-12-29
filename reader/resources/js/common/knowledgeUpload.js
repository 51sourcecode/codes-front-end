
/**
 * 初始化上传控件
 * @param container 整个上传区域id,包含附件列表和上传按钮
 * @param btnId 按钮id
 * @param count 限制文件个数
 * @param ext 限制文件后缀
 * @param size 限制文件大小
 * @param listAreaId0 附件列表区域id
 * @param taskId0 
 * @param idsInut id输出框
 */
function pluploadInit(container,btnId,count,ext, size,listAreaId0,taskId0,idsInut){
	var fatherDiv = $('#'+container);
	var uploader = new plupload.Uploader({
		  browse_button: btnId, // this can be an id of a DOM element or the DOM element itself
		  url: nginxRoot + '/web/upload',
		  runtimes : 'html5,flash',
		  filters : {
				// 每个文件的限制大小
			    max_file_size : size+'mb',
				prevent_duplicates: true,//防止重复
				// 可以选择的文件
				mime_types: [
					//{title : "Image files", extensions : "jpg,gif,png"},
					//{title : "Zip files", extensions : "zip"},
					{title : "All files", extensions : ext}
				]
			},

			flash_swf_url : knowledgePath+'/resources/plupload/Moxie.swf',
			file_data_name : 'filedata',//附件data域名字
//			multipart : false,
			multipart_params : {
				'uid' : currentUser.id,
				'sid' : _cookid,
				'sessionId' : _cookid,
				'taskId' : $('#'+taskId0).val()
			}// 随文件上传一同向上传接收程序提交的Post数据
		});
		uploader.init();
		//添加一个文件时执行事件
		uploader.bind('FilesAdded', function(up, files) {
		  //var tooMuch = false;
			var dup_names = '';
//			$.each(up.files,function(i,o){
//				if(!Utils.isChinese2(o.name)){
//					up.files[i].name = utf8_decode(o.name);
//				}
//			});
//			files = up.files;
		  plupload.each(files, function(file) {
			  if(!Utils.isChinese2(file.name)){
				  file.name = utf8_decode(file.name);
				}
//			  if(!tooMuch){// TODO 校验数量限制
//				  plupload.removeFile(file);
//			  }else{
//				  var total = $('#'+container+' .attachmentListArea').children().length;
//				  if()
//			  }
			  var dup = false;
			  //校验重复上传
			$('a',fatherDiv).each(function(){
				if($(this).text()==file.name){
					dup = true;
					uploader.removeFile(file);
				}
			});
			$('.js_name',fatherDiv).each(function(){
				  if($(this).text()==file.name){
					  dup = true;
					  uploader.removeFile(file);
				  }
			});
			if(!dup){
				showDiv(file,listAreaId0);				
			}else{
				dup_names+='、'+file.name;
			}
		  });
		  if(dup_names!=''){
				dup_names = dup_names.substr(1);
				showErrorMsg(dup_names+' 文件已经存在，请勿重复上传  或者修改文件名称之后再次尝试');
			}else{
				this.start();//文件添加完毕之后自动开始上传
				this.disableBrowse(true);
			}
		  //console.log('FilesAdded');
		});
		uploader.bind('FilesRemoved', function(up, files) {//文件开始上传
//			console.log('FilesRemoved');
//			console.log(up.state);
			if(up.state == plupload.STOPPED){
				this.disableBrowse(false);
			}
		});
		uploader.bind('UploadFile', function(up, file) {//文件开始上传
			//console.log('UploadFile');
			$('input[type="submit"]').attr('disabled','disabled');
			// setFileState(file.id, '上传中…');
			$('#' + file.id + '_div').text("");
			$('<div class="fj-jdt-div"><div class="jdt-div"></div></div><span id="' + file.id + '_span"></span>').appendTo($('#' + file.id + '_div'));
		});
		uploader.bind('UploadProgress', function(up, file) {//上传进度
			//console.log('UploadProgress');
			var percent = file.percent;
			//console.log(percent);
			percent = (percent >100 ? 100 : percent);
			$('#' + file.id + '_span').text(percent + '% ');
			$('#' + file.id + '_div div div').css('width', percent + '%');
			if(percent == 100){
				$('input[type="submit"]').removeAttr('disabled');
			}
		});
		uploader.bind('FileUploaded', function(up, file, info) {//上传一个文件完毕
			//console.log('FileUploaded');
			var data = $.parseJSON(info.response);
			var fileIdsDiv = idsInut;
			var fileIds = fileIdsDiv.val();
			fileIds += data.id + ',';
			fileIdsDiv.val(fileIds);
			$('#' + file.id + '_div').empty();
			$('<a href="javascript:void(0);">删除</a>').bind('click',{
						'file' : file,
						'id' : data.id,
						'obj':this
					},function(event) {
						removeFileDiv(event.data.file.id,event.data.file.name, event.data.id,event.data.obj,fileIdsDiv);
					}).appendTo($('#' + file.id + '_div'));
			$('#' + file.id).click(function() {
				downloadFile('' + data.id);
			});
			$('#'+file.id+'_fatherDiv').attr('fid',data.id); 
		});
		uploader.bind('UploadComplete', function(up, files) {//上传一个文件完毕
			//console.log('UploadComplete');
			this.disableBrowse(false);
		});
		uploader.bind('Error', function(up, err) {
			//console.log(err);
			showErrorMsg(err.message);
		});
		uploaders_cache[container] = uploader;
		/**
		 * 移除一个文件
		 * @param fileId 文件id
		 * @param fileName 文件名字
		 * @param id server端文件id
		 * @param obj 
		 * @param fileIdsDiv 文件id输出框
		 */
		function removeFileDiv(fileId, fileName, id,obj,fileIdsDiv) {
			$('#' + fileId + '_fatherDiv').remove();
			$.ajax({
				url : dataPath + '/attachment/delete.json',
				data : 'fileId=' + id,
				dataType : 'json',
				cache : false,
				async : false,
				type : 'POST',
				success : function(data) {
					var fileIds = fileIdsDiv.val();
					if(typeof(fileIds)!='undefined'){
						fileIds = fileIds.replace(id + ',', '');
						fileIdsDiv.val(fileIds);
					}
					Utils.resetPopupWrap();
				}
			});
		}
		function showErrorMsg(msg){
			$.alerts._showMessage(msg, '','','', 2000);
		}
}