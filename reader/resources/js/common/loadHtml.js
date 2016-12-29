define(function(require, exports, module){
	var $ = require('jquery');
	//动态加载首尾页面
	$('#header').load('/htmlv4/common/header.html');
	$('#footer').load('/htmlv4/common/footer.html');	
	
});