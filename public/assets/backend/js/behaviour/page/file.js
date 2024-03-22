var editor,creator;
function resetCheckedbox() {
    $('#checkedAll:checked').prop('checked', false);
    $('#tbody-content input[type=checkbox][name="path[]"]:checked').prop('checked', false);
}
function refreshList() {
    if($('#tbody-content').length<1){
        window.location.reload();
        return;
    }
    App.loading('show');
    $.get(window.location.href,{'_pjax':'tbody-content'},function(r){
        var e=$(r);
        $('#tbody-content').html(e.find('#tbody-content').html());
        App.float('#tbody-content img.previewable');
        App.loading('hide');
        $('#tbody-content').trigger('refresh');
        resetCheckedbox();
    },'html');
}
function initCodeMirrorEditor() {
    var cfg = {
        lineNumbers: true,
        theme: 'ambiance',
        extraKeys: {
          "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
    }, newInstance=function(obj){
        var editor = CodeMirror.fromTextArea(obj, cfg);
        editor.setOption('lineWrapping', true);
        editor.setSize('auto', '100%');
        editor.on('keypress', function(){if(typeof(editor.showHint)=='function')editor.showHint();});
        return editor
    };
    editor = newInstance($("#file-edit-content")[0]);
    $('#file-edit-modal .modal-footer .btn-success').on('click',function(){
        var url=$(this).data('url');
        var enc=$('#use-encoding-open').val();
        if(!enc)enc='';
        $.post(url,{content:editor.getValue(),encoding:enc},function(r){
            if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
            return App.message({title: App.i18n.SYS_INFO, text: App.i18n.SAVE_SUCCEED},false);
        },'json');
    });
    if($("#file-create-content").length>0){
        creator = newInstance($("#file-create-content")[0]);
        $('#file-create-name').on('change',function(){
            var file=$(this).val();
            codeMirrorChangeMode(creator,file);
        });
    }
    $('#file-create-modal .modal-footer .btn-primary:last').on('click',function(ev){
        var url=$(this).data('url'),enc=$('#use-encoding-save').val(),fileName=$.trim($('#file-create-name').val());
        if(!fileName){
            App.message({text: App.t('请输入文件名'), type: 'error'});
            $('#file-create-name').focus();
            return;
        }
        if(!enc)enc='';
        $.post(url,{content:creator.getValue(),encoding:enc,name:fileName},function(r){
            if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
            App.message({title: App.i18n.SYS_INFO, text: App.i18n.SAVE_SUCCEED},false);
            $('#file-create-modal').niftyModal('hide');refreshList();
        },'json');
    });
    $('#file-edit-modal .modal-body').css('padding',0);
    $('#use-encoding-open').on('change',function(){
        var enc=$(this).val();
        fileReopen(enc);
    });
    $('#file-edit-modal .modal-footer .btn-reload').on('click',function(){
        $('#use-encoding-open').trigger('change');
    });
}

function fileReopen(encoding,url) {
    App.loading('show');
    if(url==null)url=$('#file-edit-modal .modal-footer .btn-success').data('url');
    $.get(url,{encoding:encoding},function(r){
        App.loading('hide');
        if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
        editor.setValue(r.Data);
    },'json');
}

function fileEdit(obj,file) {
    var url=$(obj).data('url');
    $('#file-edit-modal .modal-footer .btn-success').data('url',url);
    App.loading('show');
    $.get(url,{},function(r){
        App.loading('hide');
        if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
        $('#file-edit-modal .modal-header h3').html(App.i18n.EDIT_FILE+': '+file);
        $('#file-edit-modal').niftyModal('show',{
            afterOpen: function(modal) {
                editor.setValue(r.Data);
                codeMirrorChangeMode(editor,file);
            },
            afterClose: function(modal) {
                $('#use-encoding-open').find('option:selected').prop('selected',false);
            }
        });
    },'json');
}

function fileCreate(obj) {
    var url=$(obj).data('url');
    $('#file-create-modal .modal-footer .btn-primary:last').data('url',url);
    $('#file-create-modal .modal-header h3').html(App.i18n.CREATE_FILE);
    $('#file-create-modal').niftyModal('show',{
        afterOpen: function(modal) {
            $('#file-create-name').val('');
            creator.setValue('');
            creator.refresh();
            setTimeout(function(){
                $('#file-create-name').focus();
            },500)
        },
        afterClose: function(modal) {
            $('#use-encoding-save').find('option:selected').prop('selected',false);
        }
    });
}

function fileRename(obj,file,isDir) {
    var url=$(obj).data('url');
    $('#file-rename-modal .modal-footer .btn-primary:last').data('url',url);
    $('#file-rename-modal .modal-header h3').html((isDir ? App.i18n.MODIFY_DIRNAME : App.i18n.MODIFY_FILENAME)+': '+file);
    $('#file-rename-modal').niftyModal('show',{afterOpen:function(modal){
        $('#file-rename-input').val(file);
        setTimeout(function(){
            $('#file-rename-input').focus();
        },500)
    }});
}

function fileMkdir(obj) {
    var url=$(obj).data('url');
    $('#file-mkdir-modal .modal-footer .btn-primary:last').data('url',url);
    $('#file-mkdir-modal .modal-header h3').html(App.i18n.CREATE_DIR);
    $('#file-mkdir-modal').niftyModal('show',{afterOpen:function(modal){
        $('#file-mkdir-input').val('');
        setTimeout(function(){
            $('#file-mkdir-input').focus();
        },500)
    }});
}

function filePlay(obj,playlist){
    if(playlist==null) playlist='a[playable]';
    var url=$(obj).data('url'),i=$(playlist).index($(obj)),
    fileName=$(obj).data('name'),
    mime=$(obj).data('mime'),
    player,id='file-play-video',
    headTitle=$('#file-play-modal .modal-header h3');
    headTitle.html(App.i18n.PLAY+': '+fileName);
    var body=$('#file-play-modal .modal-body');
    body.css({'padding':'0','text-align':'center'});
    $(obj).css({'color':'yellow'});
    $('#file-play-modal').niftyModal('show',{afterOpen:function(modal){
        /*
        if(String(url.split('.').pop()).toLowerCase()=='ts'){
            //transferTS(url,'#file-play-video');
            url=BACKEND_URL+'/ts2m3u8?ts='+encodeURIComponent(url);
            mime='application/x-mpegURL';
        }
        */
        $('#file-play-video source').attr('src',url).attr('type',mime);
        $(window).trigger('resize');
        player = videojs(id, null, function(){
	        this.on('ended',function(){
	    	    i++;
	            if(i >= $(playlist).length) i = 0;
                var ve=$(playlist).eq(i);
                ve.css({'color':'yellow'});
	            this.src({type: ve.data('mime'), src: ve.data('url')});
	            this.play();
                headTitle.html(App.i18n.PLAY+': '+ve.data('name'));
	        });
        });
        player.play();
    },afterClose:function(){
        if(!player) return;
        var c=$('<video-js id="file-play-video" class="vjs-default-skin" width=500 height=500 controls><source src="" type=""></video-js>');
        player.dispose();
        player=null;
        body.html(c);
    }});
}

function codeMirrorChangeMode(editor,val) {
  var m, mode, spec;
  if (m = /.+\.([^.]+)$/.exec(val)) {
    var info = CodeMirror.findModeByExtension(m[1]);
    if (info) {
      mode = info.mode;
      spec = info.mime;
    }
  } else if (/\//.test(val)) {
    var info = CodeMirror.findModeByMIME(val);
    if (info) {
      mode = info.mode;
      spec = val;
    }
  } else {
    mode = spec = val;
  }
  if (mode) {
    editor.setOption("mode", spec);
    CodeMirror.autoLoadMode(editor, mode);
  } else {
    console.log("Could not find a mode corresponding to " + val);
  }
}
Dropzone.autoDiscover=false;
CodeMirror.modeURL = ASSETS_URL+"/js/editor/markdown/lib/codemirror/mode/%N/%N.js";
$(function(){
    var defaultOptions = {
        timeout:21600000, // 提交超时(毫秒)6小时
        chunking:true,
        parallelChunkUploads:true,
        retryChunksLimit:3,
        //retryChunks:true,
        chunkSize:MAX_REQUEST_BYTES||2000000,
        maxFilesize:1024 // 文件最大尺寸(MB)
    };
    if(typeof initDropzone == 'function')initDropzone($.extend({},defaultOptions,window.dropzoneOptions||{}));
    $('#uploadBtn').attr('dropzone-container','#multi-upload-dropzone').attr('dropzone-modal','#multi-upload-modal');
    if($('#uploadZipBtn').length>0) {
        $('#uploadZipBtn').attr('dropzone-container','#multi-upload-zip-dropzone').attr('dropzone-modal','#multi-upload-zip-modal');
    }
    var modalIds = [];
    $('[dropzone-container]').each(function(){
        var dropzoneId=$(this).attr('dropzone-container');
        if(!dropzoneId) return;
        if($(dropzoneId).length<1) return;
        var dz=$(dropzoneId).get(0).dropzone;
        if(!dz) {
            var options = $(this).attr('dropzone-options');
            if(options && typeof options == 'string') options=JSON.parse(options);
            App.editor.dropzone(dropzoneId,$.extend({},defaultOptions,options||{}));
            dz=$(dropzoneId).get(0).dropzone;
        }
        var modalId=$(this).attr('dropzone-modal');
        if(!modalId) return;
        $(this).on('click',function(event){
            $(modalId).niftyModal('show',{
                closeOnClickOverlay:false,
                afterClose:function(modal){dz.removeAllFiles();refreshList();}
            });
        });
        modalIds.push(modalId);
    })
    initCodeMirrorEditor();
    $(window).off().on('resize',function(){
        $('#file-edit-form,#file-play-video').css({height:$(window).height()-150,width:'100%','max-width':'100%',overflow:'auto'});
        $('#file-create-form').css({height:$(window).height()-180,width:'100%','max-width':'100%',overflow:'auto'});
        $('#file-play-video > video').css({height:'100%'});
    });
    $(window).trigger('resize');
    $('#file-rename-modal .modal-footer .btn-primary:last').off().on('click',function(){
        var url=$(this).data('url');
        App.loading('show');
        $.post(url,{name:$('#file-rename-input').val()},function(r){
            App.loading('hide');
            if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
            App.message({title: App.i18n.SYS_INFO, text: App.i18n.SAVE_SUCCEED},false);
            refreshList();
        },'json');
    });
    $('#file-mkdir-modal .modal-footer .btn-primary:last').off().on('click',function(){
        var url=$(this).data('url');
        App.loading('show');
        $.post(url,{name:$('#file-mkdir-input').val()},function(r){
            App.loading('hide');
            if(r.Code!=1)return App.message({title: App.i18n.SYS_INFO, text: r.Info},false);
            App.message({title: App.i18n.SYS_INFO, text: App.i18n.CREATE_SUCCEED},false);
            refreshList();
        },'json');
    });
    $('#query-current-path').on('keyup',function(event){
        var q=$(this).val();
        if(q==''){
            $('#tbody-content').children('tr:not(:visible)').show();
            var disabledBoxies=$('#tbody-content input[type=checkbox][name="path[]"]:disabled');
            if(disabledBoxies.length>0)$('#checkedAll').prop('checked',false);
            disabledBoxies.prop('disabled',false);
            return;
        }
        $('#tbody-content').children('tr:not([item*="'+q+'"])').hide().find('input[type=checkbox][name="path[]"]').prop('disabled',true);
        $('#tbody-content').children('tr[item*="'+q+'"]:not(:visible)').show().find('input[type=checkbox][name="path[]"]:disabled').prop('disabled',false);
        $('#tbody-content input[type=checkbox][name="path[]"]:disabled:checked').prop('checked',false);
        $('#checkedAll').prop('checked',$('#tbody-content tr[item]:visible input[type=checkbox][name="path[]"]:checked').length==$('#tbody-content tr[item]:visible input[type=checkbox][name="path[]"]'));
        if(event.keyCode==13){
            var tr=$('#tbody-content').children('tr:visible');
            if(tr.length==1){
                var a=tr.children('td:first').children('a:first');
                var url=a.attr('href');
                window.location=url;
                return;
            }
        }
    }).focus();
    $('#btn-query-current-path').on('click',function(){
        $('#query-current-path').trigger('keyup');
    });
    App.float('#tbody-content img.previewable');
    resetCheckedbox();
    App.attachCheckedAll('#checkedAll','#tbody-content input[type=checkbox][name="path[]"]');
});