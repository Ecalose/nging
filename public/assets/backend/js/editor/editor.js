App.loader.libs.editormdPreview = [
	'#editor/markdown/lib/marked.min.js', 
	'#editor/markdown/lib/prettify.min.js', 
	'#editor/markdown/lib/raphael.min.js', 
	'#editor/markdown/lib/underscore.min.js',  
	'#editor/markdown/css/editormd.preview.min.css',
	'#editor/markdown/editormd.min.js'
];
App.loader.libs.codemirror = [
	'#editor/markdown/lib/codemirror/codemirror.min.css',
	'#editor/markdown/lib/codemirror/addon/fold/foldgutter.css',
	'#editor/markdown/lib/codemirror/addon/hint/show-hint.css',
	'#editor/markdown/lib/codemirror/theme/ambiance.css',
	'#editor/markdown/lib/codemirror/codemirror.min.js', 
	'#editor/markdown/lib/codemirror/modes.min.js', 
	'#editor/markdown/lib/codemirror/addons.min.js',
	'#editor/markdown/lib/codemirror/addon/hint/show-hint.js'
];
App.loader.libs.editormd = ['#editor/markdown/css/editormd.min.css', '#editor/markdown/css/editormd.preview.min.css', '#editor/markdown/editormd.min.js'];
App.loader.libs.flowChart = ['#editor/markdown/lib/flowchart.min.js'];
App.loader.libs.flowChartJQuery = ['#editor/markdown/lib/jquery.flowchart.min.js'];
App.loader.libs.sequenceDiagram = ['#editor/markdown/lib/sequence-diagram.min.js'];
//App.loader.libs.ueditor = ['#editor/ueditor/ueditor.config.js', '#editor/ueditor/ueditor.all.min.js'];
//window.UEDITOR_HOME_URL = ASSETS_URL + '/js/editor/ueditor/';
//App.loader.libs.summernote = ['#editor/summernote/summernote.css', '#editor/summernote/summernote.min.js', '#editor/summernote/lang/summernote-' + App.langTag() + '.min.js'];
//App.loader.libs.summernote_bs4 = ['#editor/summernote/summernote-bs4.css', '#editor/summernote/summernote-bs4.min.js', '#editor/summernote/lang/summernote-' + App.langTag() + '.min.js'];
App.loader.libs.tinymce = ['#editor/tinymce/custom.css', '#editor/tinymce/tinymce.min.js', '#editor/tinymce/jquery.tinymce.min.js', '#editor/tinymce/langs/' + App.langTag('_') + '.js'];
App.loader.libs.dialog = ['#dialog/bootstrap-dialog.min.css', '#dialog/bootstrap-dialog.min.js'];
App.loader.libs.markdownit = ['#markdown/it/markdown-it.min.js', '#markdown/it/plugins/emoji/markdown-it-emoji.min.js'];
App.loader.libs.codehighlight = ['#markdown/it/plugins/highlight/loader/prettify.js','#markdown/it/plugins/highlight/loader/run_prettify.js?skin=sons-of-obsidian'];
App.loader.libs.powerFloat = ['#float/powerFloat.min.css', '#float/powerFloat.min.js'];
App.loader.libs.uploadPreviewer = ['#jquery.uploadPreviewer/css/jquery.uploadPreviewer.min.css', '#jquery.uploadPreviewer/jquery.uploadPreviewer.min.js'];
App.loader.libs.fileUpload = [
	'#jquery.upload/js/vendor/jquery.ui.widget.min.js',
	'#jquery.upload/js/jquery.iframe-transport.min.js',
	'#jquery.upload/js/jquery.fileupload.min.js',
	'#jquery.upload/js/jquery.fileupload-process.min.js'
];
App.loader.libs.jcrop = ['#jquery.crop/css/jquery.Jcrop.min.css','#jquery.crop/js/jquery.Jcrop.min.js'];
App.loader.libs.cropImage = ['#jquery.crop/css/jquery.Jcrop.min.css','#jquery.crop/js/jquery.Jcrop.min.js','#behavior/page/crop-image.min.js'];
App.loader.libs.select2 = ['#jquery.select2/select2.css','#jquery.select2/select2.min.js'];
App.loader.libs.select2ex = ['#behaviour/page/select2.min.js'];
App.loader.libs.selectPage = ['#selectpage/selectpage.css','#selectpage/selectpage.min.js'];
App.loader.libs.cascadeSelect = ['#behaviour/page/cascade-select.min.js'];
App.loader.libs.forms = ['#behaviour/page/forms.min.js'];
App.loader.libs.jqueryui = ['#jquery.ui/jquery-ui.custom.min.js','#jquery.ui/jquery-ui.touch-punch.min.js'];
App.loader.libs.dropzone = ['#jquery.ui/css/dropzone.min.css','#dropzone/dropzone.min.js'];
App.loader.libs.loadingOverlay = ['#loadingoverlay/loadingoverlay.min.js'];
App.loader.libs.dateRangePicker = ['#daterangepicker/daterangepicker.min.css','#daterangepicker/moment.min.js','#daterangepicker/jquery.daterangepicker.min.js','#behaviour/page/datetime.min.js'];
App.loader.libs.magnificPopup = ['#magnific-popup/magnific-popup.min.css','#magnific-popup/jquery.magnific-popup.min.js'];
App.loader.libs.inputmask = ['#inputmask/inputmask.min.js','#inputmask/jquery.inputmask.min.js'];
App.loader.libs.clipboard = ['#clipboard/clipboard.min.js','#clipboard/utils.js'];

App.editor = {
	browsingFileURL: App.loader.siteURL + (typeof (window.IS_BACKEND) !== 'undefined' && window.IS_BACKEND ? BACKEND_URL : FRONTEND_URL+'/user/file') + '/finder'
};
App.editor.loadingOverlay = function (options) {
	App.loader.defined(typeof ($.fn.LoadingOverlay), 'loadingOverlay');
	return $.LoadingOverlay(options||{});
};
App.editor.dialog = function (options) {
	App.loader.defined(typeof (BootstrapDialog), 'dialog');
	return BootstrapDialog.show(options||{});
};
App.editor.contypeAttachers = {};
App.editor.contypeAttachers.markdown = function(obj){App.editor.markdownToHTML(obj);};
App.editor.contypeAttachers.html = function(obj){
	var $code=$(obj).find('pre[class^=language-]');
	if($code.length>0)App.editor.codeHighlight($code);
};
App.editor.attachContype = function(container){
    var $container=container?$(container):$(document);
    $container.find('[data-contype]:not([contype-attached])').each(function(){
        $(this).attr('contype-attached','1');
        var contype=$(this).data('contype');
		if(typeof(App.editor.contypeAttachers[contype])!='undefined'){
			App.editor.contypeAttachers[contype](this);
		}
    })
}
/*/ =================================================================
// ueditor
// =================================================================

App.editor.ueditors = function (editorElement, uploadUrl, options) {
	$(editorElement).each(function () {
		App.editor.ueditor(this, uploadUrl, options);
	});
};
// 初始化UEditor编辑器
App.editor.ueditor = function (editorElement, uploadUrl, options) {
	if ($(editorElement).hasClass('form-control')) $(editorElement).removeClass('form-control');
	if (!uploadUrl) uploadUrl = $(editorElement).attr('action');
	if (options == null) options = {};
	App.loader.defined(typeof (window.UE), 'ueditor');
	if (uploadUrl) {
		if (uploadUrl.substr(0, 1) == '!') uploadUrl = uploadUrl.substr(1);
		if (uploadUrl.indexOf('?') >= 0) {
			uploadUrl += '&';
		} else {
			uploadUrl += '?';
		}
		uploadUrl += 'format=json&';
		uploadUrl += 'client=webuploader';
		options.serverUrl = uploadUrl;
	}
	var idv = $(editorElement).attr('id');
	if (!idv) {
		idv = 'ueditor-instance-' + App.utils.unixtime();
		$(editorElement).attr('id', idv);
	}
	var editor = UE.getEditor(idv, options);
	$(editorElement).data('editor-name', 'ueditor');
	$(editorElement).data('editor-object', editor);
};
*/
// =================================================================
// editormd
// =================================================================
App.editor.markdownReset = function() {
	var path = ASSETS_URL + '/js/editor/markdown/';
	editormd.emoji.path = path+'images/emojis/';
	editormd.katexURL.css = path+'lib/katex/katex.min';
	editormd.katexURL.js = path+'lib/katex/katex.min';
};
/* 解析markdown为html */
App.editor.markdownToHTML = function (elem, markdownData, options) {
	if (typeof (elem) == 'string') {
		elem = document.querySelector(elem);
		if(!elem) return;
	}
	if($(elem).data('markdownRendered')) return;
	$(elem).data('markdownRendered',true);
	var init = function(options, onSuccess){
		var defaults = {
			markdown: markdownData,
			//markdownSourceCode: true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
			htmlDecode: "style,script,iframe|on*", // 启用html解码。这里设置需要被过滤的标签和属性。竖线“|”左边的为标签，右边的为属性(1. “*” 代表删除全部属性；2. “on*” 代表删除全部以“on”开头的属性。这两种特殊设置必须放在“|”右边第一的位置)
			toc: true,
			tocm: true,  // Using [TOCM]
			//gfm: true,
			//tocDropdown: true,
			emoji: true,
			taskList: true,
			tex: true,  // 默认不解析
			flowChart: true,  // 默认不解析
			sequenceDiagram: true  // 默认不解析
		};
		if (typeof(window.THEME_COLOR)=='string'&&window.THEME_COLOR=='dark') {
			defaults.theme = "dark"; // ambiance
		}
		var params = $.extend({}, defaults, options || {});
		var callback = function(){
			return onSuccess(params);
		};
		App.loader.defined(typeof (marked), 'editormdPreview', function(){
			if (params.flowChart) {
				return App.loader.defined(typeof (flowchart), 'flowChart',function(){
					return App.loader.defined(typeof ($.fn.flowChart), 'flowChartJQuery',function(){
						if (params.sequenceDiagram) return App.loader.defined(typeof ($.fn.sequenceDiagram), 'sequenceDiagram',function(){
							callback();
						});
						callback();
					});
				});
			}
			if(needSequenceDiagram){
				return App.loader.defined(typeof ($.fn.sequenceDiagram), 'sequenceDiagram',function(){
					callback();
				});
			}
			callback();
		}, function(){
			App.editor.markdownReset();
		});
		return params;
	};
	var loadingId = 'markdown-render-processing-'+ App.utils.unixtime();
	var loadingHTML = '<div id="'+loadingId+'"><i class="fa fa-spinner fa-spin fa-3x"></i></div>';
	if (markdownData == null || typeof (markdownData) == 'boolean') {
		var box = $(elem), isSelf = $(elem).hasClass('markdown-code');
		if (!markdownData && !isSelf) {
			box = $(elem).find('.markdown-code');
			if(box.length<1) return;
		}
		if (isSelf){
			box.prepend(loadingHTML);
		}else{
			box.first().before(loadingHTML);
		}
		init(options,function(params){
			box.each(function () {
				if($(this).children('textarea').length>0){
					params.markdown = $(this).children('textarea').text();
				}else{
					params.markdown = $(this).text();
				}
				var viewer = editormd.markdownToHTML(this, params);
				$(this).data('markdown-viewer', viewer);
			});
			$('#'+loadingId).remove();
		});
		return;
	}
	$(elem).before(loadingHTML);
	init(options,function(params){
		var viewer = editormd.markdownToHTML(elem, params);
		$(elem).data('markdown-viewer', viewer);
		$('#'+loadingId).remove();
	});
};

App.editor.markdowns = function (editorElement, uploadUrl, options) {
	$(editorElement).each(function () {
		App.editor.markdown(this, uploadUrl, options);
	});
};
/* 初始化Markdown编辑器 */
App.editor.markdown = function (editorElement, uploadUrl, options) {
	var isManager = false;
	if (!uploadUrl) uploadUrl = $(editorElement).attr('action');
	App.loader.defined(typeof (editormd), 'editormd', null, function(){
		App.editor.markdownReset();
	});
	if (uploadUrl) {
		if (uploadUrl.substr(0, 1) == '!') {
			uploadUrl = uploadUrl.substr(1);
			isManager = true;
		}
		if (uploadUrl.indexOf('?') >= 0) {
			uploadUrl += '&';
		} else {
			uploadUrl += '?';
		}
		if (!isManager) uploadUrl += 'format=json&';
		uploadUrl += 'filetype=image&client=markdown';
	}
	var browseFn = function(ed) {
		App.editor.finderDialog(App.editor.browsingFileURL + '?from=parent&size=12&filetype=image&multiple=0', function(fileList){
			if (fileList.length <= 0) {
				return App.message({ type: 'error', text: App.t('没有选择任何选项！') });
			}
			ed.dialog.find("[data-url]").val(fileList[0]);
		}, 100000);
	};
	var container = $(editorElement).parent(),
		containerId = container.attr('id');
	if (containerId === undefined) {
		containerId = 'webx-md-' + App.utils.unixtime();
		container.attr('id', containerId);
	};
	var path = ASSETS_URL + '/js/editor/markdown/';
	var defaults = {
		width: "100%",
		height: container.height(),
		path: path + 'lib/',
		markdown: $(editorElement).val(),
		placeholder: $(editorElement).attr('placeholder') || '',
		codeFold: true,
		saveHTMLToTextarea: true,			// 保存HTML到Textarea
		searchReplace: true,
		watch: true,						// 关闭实时预览
		htmlDecode: "style,script,iframe|on*", // 启用html解码。这里设置需要被过滤的标签和属性。竖线“|”左边的为标签，右边的为属性(1. “*” 代表删除全部属性；2. “on*” 代表删除全部以“on”开头的属性。这两种特殊设置必须放在“|”右边第一的位置)
		//autoHeight : true, // 自动高度
		emoji: true,
		taskList: true,
		tocm: true,					 // Using [TOCM]
		tex: true,                   // 开启科学公式TeX语言支持，默认关闭
		flowChart: true,             // 开启流程图支持，默认关闭
		sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
		imageUpload: true,
		imageFormats: ["jpg", "jpeg", "gif", "png", "bmp"],
		imageUploadURL: uploadUrl,
		imageBrowseFn: browseFn,
		crossDomainUpload: true,
		uploadCallbackURL: path + 'plugins/image-dialog/upload_callback.htm',
		dialogLockScreen: false,
		onload: function () {
			var editor=this;
			editormd.loadPlugin(path+"plugins/drop-or-paste-upload/drop-or-paste-upload", function(){
				editor.dropOrPasteUpload();
			});
		}
	};
	if (typeof(window.THEME_COLOR)=='string'&&window.THEME_COLOR=='dark') {
		defaults.theme = "dark"; // ambiance
	}
	var params = $.extend({}, defaults, options || {});
	if (isManager) {
		params.toolbarIcons = function () {
			// Or return editormd.toolbarModes[name]; // full, simple, mini
			return [
				"undo", "redo", "|",
				"bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
				"h1", "h2", "h3", "h4", "h5", "h6", "|",
				"list-ul", "list-ol", "hr", "|",
				"link", "reference-link", "browsing-image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
				"goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
				"help", "info"
			];
		};
		params.toolbarIconsClass = {
			'browsing-image': "fa-image"
		};
		params.toolbarIconTexts = {
			'browsing-image': App.t('选择图片')
		};
		params.toolbarHandlers = {
			'browsing-image': function (cm, icon, cursor, selection) {
				App.editor.finderDialog(App.editor.browsingFileURL + '?from=parent&size=12&filetype=image&multiple=1', function(fileList,infoList){
					if (fileList.length <= 0) {
						return App.message({ type: 'error', text: App.t('没有选择任何选项！') });
					} 
					var urls = [];
					for (var i = 0; i < fileList.length; i++) {
						var v = fileList[i];
						var name = infoList[i].name;
						urls.push('![' + name + '](' + v + ')');
					}
					//var linenum=urls.length>0?urls.length-1:0;
					urls = urls.join('\n') + '\n';
					cm.replaceSelection(urls);
					//if(selection === "") cm.setCursor(cm.line+linenum, cm.ch+1);
				});
			}
		};
		params.lang = {
			toolbar: {
				'browsing-image': App.t("从服务器选择图片")
			}
		};
	}
	if (!uploadUrl) params.imageUpload = false;
	var editor = editormd(containerId, params);
	$(editorElement).data('editor-name', 'markdown');
	$(editorElement).data('editor-object', editor);
	return editor;
};
App.editor.md = App.editor.markdown;

// =================================================================
// markdownit
// =================================================================
App.editor.codeHighlight = function(elem){
	if(elem==null) elem='pre[class^=language-]';
	var $e;
	if(typeof elem == 'object'){
		$e=$.isPlainObject(elem)?$(elem):elem;
	}else{
		$e=$(elem);
	}
	if($e.length<1) return;
	App.loader.defined(typeof (window.prettyPrint), 'codehighlight', function(){
		$e.not('.prettyprint').addClass('prettyprint linenums');
		if (typeof (prettyPrint) !== "undefined") prettyPrint();
	});
}

App.editor.markdownItToHTML = function markdownParse(box, isContainer) {
	App.loader.defined(typeof (window.markdownit), 'markdownit');
	App.loader.defined(typeof (window.prettyPrint), 'codehighlight');
	if (typeof(box) != 'object') {
		box = $(box);
	}
	if (isContainer != false) box = box.find('.markdown-code');
	var md = App.editor.markdownItInstance();
	box.each(function () {
		var markdown;
		if($(this).children('textarea').length>0){
			markdown = $(this).children('textarea').text();
		}else{
			markdown = $(this).text();
		}
		$(this).html(md.render($.trim(markdown)));
		$(this).find("pre > code").each(function () {
			$(this).parent("pre").addClass("prettyprint linenums");
		});

		if (typeof (prettyPrint) !== "undefined") prettyPrint();
	});
};
App.editor.markdownItInstance = function () {
	App.loader.defined(typeof (window.markdownit), 'markdownit');
	var md = window.markdownit();
	if (typeof (window.markdownitEmoji) != 'undefined') md.use(window.markdownitEmoji);
	return md;
};

// =================================================================
// tinymce
// =================================================================

App.editor.tinymces = function (elem, uploadUrl, options, useSimpleToolbar) {
	$(elem).each(function () {
		App.editor.tinymce(this, uploadUrl, options, useSimpleToolbar);
	});
};
App.editor.finderDialog = function (remoteURL, callback, zIndex) {
	if(!zIndex) zIndex = 2000;
	App.loader.defined(typeof (BootstrapDialog), 'dialog');
	var dialog = BootstrapDialog.show({
		title: App.t('选择文件'),
		//animate: false,
		message: function (dialog) {
			var cb = "finderDialogCallback" + App.utils.unixtime();
			window[cb] = function (files,infos) {
				callback(files,infos);
				if (files && files.length > 0) dialog.close();
			}
			return $('<iframe src="' + remoteURL + '&callback=' + cb + '" style="width:100%;height:635px;border:0;padding:0;margin:0"></iframe>');
			/*
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
			*/
		},
		onshown: function (d) {
			d.$modal.css('zIndex', zIndex);
			d.$modalBody.css('padding', 0);
			//console.dir(d);
		}
		//,data: {'pageToLoad': remoteURL}
	});
	return dialog;
};
App.editor.tinymceOnceFix = false;
App.editor.tinymce = function (elem, uploadUrl, options, useSimpleToolbar) {
	if (!App.editor.tinymceOnceFix) {
		App.editor.tinymceOnceFix = true;
		// Prevent Bootstrap dialog from blocking focusin
		$(document).on('focusin', function (e) {
			if ($(e.target).closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root").length) {
				e.stopImmediatePropagation();
			}
		});
	}
	App.loader.defined(typeof ($.fn.tinymce), 'tinymce');
	if (!uploadUrl) uploadUrl = $(elem).attr('action');
	var managerUrl = App.editor.browsingFileURL;
	if (uploadUrl && uploadUrl.substr(0, 1) == '!') {
		managerUrl = uploadUrl.substr(1);
		uploadUrl = $(elem).data('upload-url');
	}
	if (uploadUrl) {
		if (uploadUrl.indexOf('?') >= 0) {
			uploadUrl += '&';
		} else {
			uploadUrl += '?';
		}
		uploadUrl += 'format=json&client=tinymce&filetype=';
	}
	if (managerUrl) {
		managerUrl = managerUrl.replace(/[\?&]multiple=1/, '');
		if (managerUrl.indexOf('?') >= 0) {
			managerUrl += '&';
		} else {
			managerUrl += '?';
		}
		managerUrl += 'from=parent&client=tinymce&filetype=';
	}
	var simpleToolbar = 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | customDateButton';
	var fullToolbar = 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | customDateButton';
	var filePickerCallback = function (callback, value, meta) {
		switch (meta.filetype) {
			case 'file': //Provide file and text for the link dialog
				App.editor.finderDialog(managerUrl + meta.filetype, function (files,infos) {
					if (files && files.length > 0) callback(files[0], { text: infos[0].name });
				});
				//callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
				break;

			case 'image': //Provide image and alt text for the image dialog
				App.editor.finderDialog(managerUrl + meta.filetype, function (files,infos) {
					if (files && files.length > 0) callback(files[0], { alt: infos[0].name });
				});
				//callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
				break;

			case 'media': //Provide alternative source and posted for the media dialog
				App.editor.finderDialog(managerUrl + meta.filetype, function (files,infos) {
					if (files && files.length > 0) callback(files[0], {});
				});
				//callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
				break;

			default:
				alert('Unsupported file type');
		}
	};
	var imagesUploadHandler = function (blobInfo, success, failure) {
		var xhr = new XMLHttpRequest(), formData = new FormData();
		xhr.withCredentials = false;
		xhr.open('POST', uploadUrl);
		xhr.onload = function () {
			if (xhr.status != 200) {
				failure('HTTP Error: ' + xhr.status);
				return;
			}
			var json = JSON.parse(xhr.responseText);
			//{"Code":1,"Info":"","Data":{"Url":"a.jpg","Id":"1"}}
			if (!json || typeof json.Code == 'undefined') {
				failure('Invalid JSON: ' + xhr.responseText);
				return;
			}
			if (json.Code != 1) {
				failure(json.Info);
				return;
			}
			success(json.Data.Url);
		};
		formData.append('filedata', blobInfo.blob(), blobInfo.filename());
		xhr.send(formData);
	};
	var contextmenu = 'link table';
	var selectionToobar = 'bold italic | quicklink h2 h3 blockquote quicktable';
	var plugin = 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap quickbars emoticons';
	if (uploadUrl) {
		contextmenu += ' image imagetools';
		selectionToobar += ' quickimage';
	}
	var defaults = {
		height: useSimpleToolbar ? 200 : 500,
		menubar: true,
		language: App.langTag('_'),
		plugins: [plugin],
		toolbar: useSimpleToolbar ? simpleToolbar : fullToolbar,
		toolbar_sticky: true,
		autosave_ask_before_unload: false,
		autosave_interval: "30s",
		autosave_prefix: "{path}{query}-{id}-",
		autosave_restore_when_empty: true,
		autosave_retention: "2m",
		image_advtab: true,
		templates: [
			{ 
				title: 'New Table', 
				description: 'creates a new table', 
				content: '<div class="mceTmpl">\
			<table width="98%" border="0" cellspacing="0" cellpadding="0" class="table table-bordered table-striped">\
			<thead>\
				<tr>\
					<th scope="col"> </th>\
					<th scope="col"> </th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<td> </td>\
					<td> </td>\
				</tr>\
			</tbody>\
			</table>\
			</div>'
			}
		],
		image_caption: true,
		relative_urls: false,
		image_title: true,
		quickbars_selection_toolbar: selectionToobar,
		noneditable_noneditable_class: "mceNonEditable",
		toolbar_drawer: 'sliding',
		contextmenu: contextmenu,
		setup: function (editor) {
			var toTimeHtml = function (date) {
				return '<time datetime="' + date.toString() + '">' + date.toLocaleString() + '</time>';
			};
			editor.ui.registry.addButton('customDateButton', {
				icon: 'insert-time',
				tooltip: 'Insert Current Date',
				disabled: true,
				onAction: function (_) {
					editor.insertContent(toTimeHtml(new Date()));
				},
				onSetup: function (buttonApi) {
					var editorEventCallback = function (eventApi) {
						buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'time');
					};
					editor.on('NodeChange', editorEventCallback);
					return function (buttonApi) {
						editor.off('NodeChange', editorEventCallback);
					};
				}
			});
		}
	};
	if (typeof(window.THEME_COLOR)=='string'&&window.THEME_COLOR=='dark') {
		defaults.skin = "oxide-dark";
		defaults.content_css= "dark";
	}
	if (managerUrl) defaults.file_picker_callback = filePickerCallback;
	if (uploadUrl) defaults.images_upload_handler = imagesUploadHandler;
	var id = App.utils.elemToId(elem).replace(/^#/,'');
	//see document: https://www.tiny.cloud/docs/integrations/jquery/
	$(elem).tinymce($.extend({}, defaults, options || {}));
	$(elem).data('editor-name', 'tinymce');
	var editor = tinymce.get(id);
	$(elem).data("editor-object", editor);
};

App.editor.switcher = function(swicherElem, contentElem, defaultEditorName) {
	if($(swicherElem).length<1) return;
	var event, tagName = String($(swicherElem).get(0).tagName).toLowerCase();
	switch(tagName){
		case 'select':
			event = 'change';
			break;
		default:
			event = 'click';
	}
	$(swicherElem).on(event, function(){
		var etype=$(this).val();
		var texta=$(contentElem);
		var editorName=$(this).data('editor-name') || defaultEditorName;
		texta.data("editor-type",etype);
		return App.editor.switch(editorName, texta);
	});
	$(contentElem).data('placeholder', $(contentElem).attr('placeholder'));
	switch(tagName){
		case 'input':
			$(swicherElem).filter(':checked').first().trigger(event);
			break;
		default:
			$(swicherElem).trigger(event);
	}
};

//例如：App.editor.switch($('textarea'))
App.editor.switch = function (editorName, texta, cancelFn, tips) {
	var upurl = texta.attr('action') || texta.data("upload-url") || '!' + App.editor.browsingFileURL + '?size=12&multiple=1',
		etype = texta.data("editor-type"),
		ename = texta.data("editor-name"),
		eobject = texta.data("editor-object"),
		ctype = texta.data("current-editor-type");
	if (ctype == etype) return;
	var className = texta.data("class"), style = texta.data("style");
	if (className === undefined) {
		className = texta.attr("class");
		if (!className) className = '';
		texta.data("class", className);
	}
	if (style === undefined) {
		style = texta.attr("style");
		if (!style) style = '';
		texta.data("style", style);
	}
	var content = texta.data("content-elem"), cElem = content;
	if (content) cElem = App.loader.parseTmpl(content, { type: etype });
	var obj = texta.get(0);
	var resetElementAttrs = function(){
		texta.attr('class', className).attr('style',style);
	};
	var removeHTMLEditor = function(){
		switch (ename) {
			case 'ueditor':
				eobject && eobject.destroy();
				break;
			case 'tinymce': // doc: https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#remove
			default:
				eobject && typeof(eobject.remove)=='function' && eobject.remove();
		}
	};
	var createHTMLEditor = function(editorName){
		var options = texta.data(editorName+"-options") || {};
		switch (editorName) {
			case 'ueditor':
				App.editor.ueditor(obj, upurl, options);
				break;
			case 'tinymce':
			default:
				App.editor.tinymce(obj, upurl, options);
				var t = window.setInterval(function(){
					if(texta.next('.tox-tinymce').length>0){
						texta.next('.tox-tinymce').show();
						window.clearInterval(t);
					}
				},100);
				break;
		}
	};
	var createMarkdownEditor = function(){
		var options = texta.data("markdown-options") || {};
		App.editor.markdown(obj, upurl, options);
	};
	var removeMarkdownEditor = function(){
		if (cElem && $(cElem).length > 0) {
			var cc = App.loader.parseTmpl(content, { type: ctype });
			if (cc && $(cc).length > 0) {
				$(cc).text(texta.val());
				var ht = $('textarea[name="' + texta.parent().attr('id') + '-html-code"]');
				if (ht.length > 0 && ht.val() != "") {
					$(cElem).text(ht.val());
					$(cElem).val(ht.val());
				}
			};
			texta.val($(cElem).val());
			texta.text($(cElem).val());
		}
		texta.parent().removeAttr('class').css('height', 'auto');
		texta.siblings().remove();
		resetElementAttrs();
	};
	switch (etype) {
		case 'markdown':
			if (tips) {
				var cc = App.loader.parseTmpl(content, { type: ctype });
				if (cc && $(cc).length > 0) {
					if (texta.val() != $(cc).val() && !confirm('确定要切换吗？切换编辑器将会丢失您当前所做的修改。')) {
						if (cancelFn != null) cancelFn();
						return false;
					}
				}
			}
			if (cElem && $(cElem).length > 0) {
				texta.text($(cElem).val());
				texta.val($(cElem).val());
			}
			removeHTMLEditor();
			createMarkdownEditor();
			texta.data("current-editor-type", etype);
			break;
		case 'text':
			removeHTMLEditor();
			removeMarkdownEditor();
			texta.show().focus();
			//texta.attr('placeholder', texta.data('placeholder') || '');
			texta.data("current-editor-type", etype);
			break;
		default: // html
			removeMarkdownEditor();
			createHTMLEditor(editorName);
			texta.data("current-editor-type", "html");
	};
	return true;
};
if (typeof (App.utils) == 'undefined') App.utils = {};
App.utils.elemToId = function(elem) {
	if (typeof (elem) != "object") {
		if (String(elem).substring(0,1) != '#') {
			elem = '#' + elem;
		}
		return elem;
	}
	var id = $(elem).attr("id");
	if (id) return '#'+id;
	id = 'generated-id-' + App.utils.unixtime();
	$(elem).attr("id", id);
	return '#'+id;
};
App.utils.unixtime = function() {
	return new Date().getTime();
};
App.editor.selectPages = function(){
	App.loader.defined(typeof ($.fn.selectPage), 'selectPage');
	for(var i=0; i<arguments.length; i+=2){
		App.editor.selectPage(arguments[i], arguments[i+1],true);
	}
}
App.editor.selectPage = function(elem,options,loaded){
	if($(elem).length<1)return;
	var listKey='listData',pagingKey='pagination';
	if(options!=null){
		if(typeof(options.listKey)!='undefined') listKey = options.listKey;
		if(typeof(options.pagingKey)!='undefined') pagingKey = options.pagingKey;
	}else{
		options = $(elem).data() || {};
	}
	if(typeof(options.url)!='undefined') options.data = options.url;
	var defaults={
    	showField: 'name',
    	keyField: 'id',
    	data: [], // url or data
    	params: function(){return {};},
    	eAjaxSuccess: function(d){
			if(!d) return undefined;
			var list = typeof(d.Data[listKey])!='undefined'?d.Data[listKey]:d.Data.list;
			if(list==null) list=[];
			var paging;
			if(typeof(d.Data[pagingKey])=='undefined'||d.Data[pagingKey]==null) {
				paging={limit:0,page:1,rows:0,pages:0};
			}else{
				paging=d.Data[pagingKey];
			}
        	return {
          		"list":list,
          		"pageSize": paging.limit,
          		"pageNumber": paging.page,
          		"totalRow": paging.rows,
          		"totalPage": paging.pages
        	};
    	},
    	eSelect: function (data) {},
    	eClear: function () {}
	};
	if(!loaded)App.loader.defined(typeof ($.fn.selectPage), 'selectPage');
	$(elem).selectPage($.extend({},defaults,options||{}));
}
App.editor.select2 = function(){
	App.loader.defined(typeof ($.fn.select2), 'select2');
	App.loader.defined(typeof (App.select2), 'select2ex');
	return App.select2;
}
App.editor.cascadeSelect = function(elem,selectedIds,url){
	App.loader.defined(typeof (CascadeSelect), 'cascadeSelect', function(){
		CascadeSelect.init(elem, selectedIds, url);
	});
};
App.editor.initForms = function(formElem,urlPrefix){
	App.loader.defined(typeof (initForms), 'forms', function(){
		initForms(formElem,urlPrefix);
	});
};
App.editor.fileUpload = function(elem,options) {
	App.loader.defined(typeof ($.fn.fileupload), 'fileUpload');
	if(typeof(options.dataType)=='undefined')options.dataType='json';
	$(elem).fileupload(options).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
};
App.editor.cropImage = function(uploadURL,thumbsnailElem,originalElem,type,width,height) {
	App.loader.defined(typeof ($.fn.fileupload), 'fileUpload');
	App.loader.defined(typeof ($.fn.Jcrop), 'jcrop');
	App.loader.defined(typeof (cropImage), 'cropImage');
	return cropImage(uploadURL,thumbsnailElem,originalElem,type,width,height);
};
App.editor.float = function(elem, mode, attr, position, options) {
	App.loader.defined(typeof ($.fn.powerFloat), 'powerFloat', function(){
		App.float(elem, mode, attr, position, options);
	});
};
App.editor.fileInput = function (elem, options, successCallback, errorCallback) {
	if (!elem) {
		elem = '';
	} else {
		elem = App.utils.elemToId(elem) + ' ';
	}
	App.loader.defined(typeof ($.fn.powerFloat), 'powerFloat');
	App.loader.defined(typeof ($.fn.uploadPreviewer), 'uploadPreviewer');
	$(elem + '[data-toggle="finder"]').each(function () {
		$(this).on('click', function (e) {
			var managerUrl = $(this).data('finder-url')|| App.editor.browsingFileURL;
			if (!managerUrl) return;
			managerUrl = managerUrl.replace(/[\?&]multiple=1/, '');
			if (managerUrl.indexOf('?') >= 0) {
				managerUrl += '&';
			} else {
				managerUrl += '?';
			}
			managerUrl += 'from=parent&client=fileInput&filetype=image';
			var that = this;
			App.editor.finderDialog(managerUrl, function(fileList){
				var fileURL = fileList[0];
				var dataInput = $(that).data('input');
				if (!dataInput) {
					dataInput = $(that).parent('.input-group-btn').siblings('input')[0];
				}
				if (dataInput) $(dataInput).val(fileURL);
				var previewButton = $(that).data('preview-btn');
				if (!previewButton) {
					previewButton = $(that).parent('.input-group-btn').siblings('.preview-btn')[0];
				}
				if (previewButton) {
					if (!$(previewButton).data('attached-float')) {
						App.float(App.utils.elemToId(previewButton) + " a img");
						$(previewButton).data('attached-float', true);
					}
					$(previewButton).removeClass('hidden').children('a').attr('href', fileURL).children('img').attr('src', fileURL);
				}
				var previewIMG = $(that).data('preview-img');
				if (previewIMG) {
					$(previewIMG).attr('src', fileURL);
				} 
				if(successCallback) successCallback(fileURL);
			});
		});
	});
	$(elem + 'input[data-toggle="uploadPreviewer"]').each(function () {
		$(this).css('width', '70px');
		var previewContainer = $(this).data('preview-container');
		var uploadURL = $(this).data('upload-url');
		var previewButton = $(this).data('preview-btn');
		var uploadInput = $(this).uploadPreviewer($.extend({
			"buttonText": '<i class="fa fa-cloud-upload"></i> ' + App.t('上传'),
			"previewTableContainer": previewContainer,
			"url": uploadURL,
			"previewTableShow": false
		},options||{}));
		$(this).data('uploadPreviewer', uploadInput);
		if (previewButton && !$(previewButton).data('attached-float')) {
			App.float(App.utils.elemToId(previewButton) + " a img");
			$(previewButton).data('attached-float', true);
		}
		$(this).on("file-preview:changed", function (e) {
			$(e.target).data('uploadPreviewer').submit(function (r) {
				if (r.Code != 1) {
					if(errorCallback) errorCallback(r);
					return App.message({ text: r.Info, type: 'error' });
				}
				var fileURL = r.Data.files[0];
				var dataInput = $(e.target).data('input');
				if (!dataInput) {
					dataInput = $(e.target).parents('.input-group-btn').prev('input')[0];
				}
				$(dataInput).val(fileURL);
				var previewButton = $(e.target).data('preview-btn');
				if (!previewButton) {
					previewButton = $(e.target).parents('.input-group-btn').siblings('.preview-btn')[0];
				}
				if (previewButton) {
					if (!$(previewButton).data('attached-float')) {
						App.float(App.utils.elemToId(previewButton) + " a img");
						$(previewButton).data('attached-float', true);
					}
					$(previewButton).removeClass('hidden').children('a').attr('href', fileURL).children('img').attr('src', fileURL);
				}
				var previewIMG = $(e.target).data('preview-img');
				if (previewIMG) {
					$(previewIMG).attr('src', fileURL);
				}
				if(successCallback) successCallback(fileURL);
				App.message({ text: App.t('上传成功'), type: 'success' });
			},function(){
				if(errorCallback) errorCallback();
			});
		});
	});
};
App.editor.codemirror = function (elem,options,loadLangType) {
	if($(elem).length<1) return null;
	var init = function(){
		if($(elem).data('codemirror'))return;
		var defaults = {
			lineNumbers: true,
			lineWrapping: true,
			lineWrapping: true,
			gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			autoCloseTags: true,
			autoCloseBrackets: true,
			showTrailingSpace: true,
			indentWithTabs: true,
			matchBrackets: true,
			styleActiveLine: true,
			styleSelectedText: true,
			highlightSelectionMatches : true,
			smartIndent: true,
			mode: "text/x-csrc",
			width: null,
			height: null,
			hintOptions: {completeSingle: false}
		};
		var option = $.extend(defaults, options || {});
		var editor = $(elem)[0].tagName.toUpperCase()=='TEXTAREA' ? CodeMirror.fromTextArea($(elem)[0], option) : CodeMirror($(elem)[0], option);
		//editor.setSize('auto', 'auto');
		var mime = option.mode, mime2type = {"text/x-csrc":"clike","text/css":"css","text/x-mysql":"sql","text/x-mssql":"sql","text/x-markdown":"markdown","text/x-yaml":"yaml","text/x-toml":"toml","text/javascript":"javascript","application/javascript":"javascript","text/json":"javascript","text/html":"html","message/http":"http","null":"null"};
		if(loadLangType && typeof(loadLangType)=='object') {
			mime2type = $.extend(mime2type,loadLangType);
			loadLangType = null;
		}
		if(!loadLangType){
			if(option.mode in mime2type){
				loadLangType=mime2type[option.mode];
			}else{
				if(typeof(CodeMirror.modeInfo)!=='undefined'){
					for(var i = 0; i < CodeMirror.modeInfo.length; i++){
						var v = CodeMirror.modeInfo[i];
						if(v.mime == option.mode || v.mode == option.mode){
							loadLangType = v.mode;
							mime = v.mime;
							break;
						}
					}
				}else{
					loadLangType = "null";
				}
			}
		}
		if(option.width||option.height){
			if(!option.width) option.width='auto';
			if(!option.height) option.height='auto';
			editor.setSize(option.width, option.height);
		}
		if(loadLangType) {
			editor.setOption("mode", mime);
			if(typeof(option.readOnly)=='undefined'||!option.readOnly){
				var loadHint='',loadLint='';
				switch(loadLangType){
					case 'css':
					case 'html':
					case 'javascript':
					case 'sql':
					case 'xml':
						loadHint=loadLangType;
				}
				switch(loadLangType){
					case 'css':
					case 'json':
					case 'javascript':
					case 'coffeescript':
					case 'yaml':
						loadLint=loadLangType;
				}
				if(loadHint && (!CodeMirror.helpers.hasOwnProperty('hint') || !CodeMirror.helpers.hint.hasOwnProperty(loadHint))){
					loadHint='#editor/markdown/lib/codemirror/addon/hint/'+loadHint+'-hint.js';
					if(loadLangType=='html'){
						App.loader.includes('#editor/markdown/lib/codemirror/addon/hint/xml-hint.js', true, function(){
							App.loader.includes(loadHint, true);
						});
					}else{
						App.loader.includes(loadHint, true);
					}
				}
				if(loadLint && (!CodeMirror.helpers.hasOwnProperty('lint') || !CodeMirror.helpers.lint.hasOwnProperty(loadLint))){
					loadLint='#editor/markdown/lib/codemirror/addon/lint/'+loadLint+'-lint.js';
					App.loader.includes([
						'#editor/markdown/lib/codemirror/addon/lint/lint.css',
						'#editor/markdown/lib/codemirror/addon/lint/lint.js'
					], true, function(){
						App.loader.includes(loadLint, true);
					});
				}
			}
		}
        editor.on('keypress', function(){if(typeof(editor.showHint)=='function')editor.showHint();});
		$(elem).data('codemirror',editor);
	};
	App.loader.defined(typeof (CodeMirror), 'codemirror', init, function(){
		CodeMirror.modeURL = ASSETS_URL+"/js/editor/markdown/lib/codemirror/mode/%N/%N.js";
	});
};
App.editor.dropzone = function (elem,options,onSuccss,onError,onRemove) {
	if($(elem).length<1) return null;
	App.loader.defined(typeof ($.fn.dropzone), 'dropzone', null, function(){
		Dropzone.autoDiscover = false;
	});
	var putToSignedURL = false;
	if(options && typeof options.getSignedPutURL != 'undefined') {
		var getSignedPutURL = options.getSignedPutURL;
		delete options.getSignedPutURL;
		putToSignedURL = true
		if(!options.url) options.url = '/';
		options.method = 'put';
		options.sending = function(file,xhr) {
			var _send = xhr.send;
			xhr.send = function() {
			  _send.call(xhr,file);
			};
		}
		options.chunking = false;
		options.parallelUploads = 1;
		options.uploadMultiple= false;
		options.header = '';
		options.autoProcessQueue = false;
		if (typeof getSignedPutURL == 'string') {
			var url = getSignedPutURL;
			getSignedPutURL = function(file,cb,done) {
				$.post(url,{name:file.name},function(r){
					if(r.Code!=1) return App.message({text:r.Info,type:'error'});
					cb(r.URL);
				},'json').fail(function(jqXHR, textStatus, errorThrown){
					done('Failed to get an S3 signed upload URL',textStatus);
				});
			};
		}
		options.accept = function (file,done) {
		   	getSignedPutURL(file,function(url){
			  	file.uploadURL = url;
			 	done();
			 	setTimeout(function(){
					$(elem).get(0).dropzone.processFile(file);
				});
		 	},done);
		}
	}
	App.loader.defined(typeof ($.ui), 'jqueryui');
	if(options.url){
		var sep = options.url.indexOf('?')>=0?'&':'?';
		options.url += sep+'client=dropzone';
	}
	var d = $(elem).dropzone($.extend({
	    paramName: "file", maxFilesize: 0.5, // MB
		//addRemoveLinks : true,
		acceptedFiles: 'image/*',
		dictDefaultMessage: '<div class="dz-custom-message">\
		<i class="fa fa-caret-right text-danger"></i> \
		<span class="grey text-xs text-xs-minus">'+App.t('点击此处或拖动文件到这里开始上传')+'</span><br /> \
		<i class="fa fa-cloud-upload text-primary fa-3x"></i>\
		</div>',
		dictResponseError: App.t('上传文件出错!'),
		dictCancelUpload: App.t('取消'),
		dictRemoveFile: App.t('删除')
	},options||{}));
	var dropzone=d[0].dropzone;
	dropzone.on("success", function(file,resp,evt) {
		if(resp.error) {
			if(typeof(resp.error.message)!="undefined") resp.error = resp.error.message;
			if(onError) onError.call(this,file,resp.error);
			return App.message({text:resp.error,type:"error"});
		}
		if(onSuccss) onSuccss.apply(this,arguments);
		else $(elem).trigger('dropzone.success',arguments);
  	}).on('removedfile', function(file){
		if(onRemove) onRemove.apply(this,arguments);
		else $(elem).trigger('dropzone.removedfile',arguments);
	}).on('error', function(file, message, xhr){
		if(onError) onError.apply(this,arguments);
		else $(elem).trigger('dropzone.error',arguments);
	});
	if(putToSignedURL){
	  dropzone.on('processing',function(file) {
		dropzone.options.url = file.uploadURL;
	  });
	}
	$(elem).data('dropzone',dropzone);
	return dropzone;
};
App.editor.dateRangePicker = function(rangeElem, options){
	App.loader.defined(typeof (App.daterangepicker), 'dateRangePicker');
	return App.daterangepicker(rangeElem, options);
};
App.editor.dateRangePickerx = function(container,startElement,endElement,options){
	App.loader.defined(typeof (App.daterangepicker), 'dateRangePicker');
	return App.daterangepickerx(container,startElement,endElement,options);
};
App.editor.datePicker = function(elem, options){
	App.loader.defined(typeof (App.daterangepicker), 'dateRangePicker');
	return App.datepicker(elem, options);
};
App.editor.popup = function(elem,options){
	if(elem == null) elem = '.image-zoom';
	var defaults = {
        type: 'image',
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        zoom: {
          enabled: true, // By default it's false, so don't forget to enable it
          duration: 300, // duration of the effect, in milliseconds
          easing: 'ease-in-out', // CSS transition easing function
          opener: function(openerElement) {
            var parent = $(openerElement);
            return parent;
          }
        }
    };
	App.loader.defined(typeof ($.fn.magnificPopup), 'magnificPopup', function(){
		$(elem).magnificPopup($.extend(defaults, options||{}));
	});
};
App.editor.inputmask = function(elem,options) {
	App.loader.defined(typeof ($.fn.inputmask), 'inputmask',function(){
		$(elem).inputmask(options);
	});
}
App.editor.clipboard = function(elem,options) {
	App.loader.defined(typeof (ClipboardJS), 'clipboard',function(){
		attachCopy(elem,options);
	});
}