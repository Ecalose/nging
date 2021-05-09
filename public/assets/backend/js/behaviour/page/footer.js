$(function(){
	App.init();
	App.initLeftNavAjax(window.activeURL,null);
	App.bottomFloat('.pagination');
	App.bottomFloat('.form-submit-group',0,true);
    if(window.errorMSG) App.message({title: App.i18n.SYS_INFO, text: App.ifTextNl2br(window.errorMSG), class_name: "danger"});
	if(window.successMSG) App.message({title: App.i18n.SYS_INFO, text: App.ifTextNl2br(window.successMSG), class_name: "success"});
	App.notifyListen();
	$('#topnav a[data-project]').on('click',function(e){
		e.preventDefault();
		var ident=$(this).data('project');
		var li=$(this).parent('li');
		var active=function(){
			if(!li.hasClass('active')){
				li.addClass('active');
			}
			li.siblings('li.active').removeClass('active');
			if($(".cl-toggle").is(':visible')){ // small device
				$('.navbar-header > .navbar-toggle').trigger('click');
				if(!$('#leftnav').is(':visible')) $(".cl-toggle").trigger('click');
			}
		};
		if(ident==$('#topnav').attr('data-project')) return active();
		$('#topnav').attr('data-project',ident);
		$.get(window.BACKEND_URL+'/project/'+ident,{partial:1},function(r){
			if(r.Code!=1){
				App.message({title:App.i18n.SYS_INFO,text:r.Info,type:'error'});
				return;
			}
			$('#leftnav').attr('data-project',ident).html(r.Data.list);
			App.initLeftNav();
			App.initLeftNavAjax(window.activeURL,'#leftnav');
			active();
		},'json');
	});
	$('#leftnav').on('click','a[data-marknav="left"]',function(){
		if($(".cl-toggle").is(':visible')) $(".cl-toggle").trigger('click');
	});
	$('#topnav').on('click','a[data-marknav="top"]',function(){
		if($(".cl-toggle").is(':visible')) {
			//$('.navbar-header > .navbar-toggle').trigger('click');
			if($('#leftnav').is(':visible')) $(".cl-toggle").trigger('click');
		}
	});
});