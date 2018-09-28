var formCheck = {
    //图片地址获取
    getObjectURL: function (file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },
    //检查文件上传是否符合规则
    fileCheck: function () {
        var ad_image_file_720 = $("#ad_image_file_720");
        var back_image_file_720 = $("#back_image_file_720");
        var ad_image_file_1080 = $("#ad_image_file_1080");
        var back_image_file_1080 = $("#back_image_file_1080");
        var share_image = $('#share_image');
        //检查文件是否为空
        if (ad_image_file_720.val() == "" || back_image_file_720.val() == "" || ad_image_file_1080.val() == "" || back_image_file_1080.val() == "") {
            swal({
                title: "有图片未上传，请检查！",
                type: "warning"
            });
            return false;
            //检查图片的类型
            // } else if (!ad_image_file_720.val().match(/.jpg/i)) {
            // 	swal("720P主题内容图类型不对，请检查！");
            // 	return false;
            // } else if (!back_image_file_720.val().match(/.jpg/i)) {
            // 	swal("720P背景图类型不对，请检查！");
            // 	return false;
            // } else if (!ad_image_file_1080.val().match(/.jpg/i)) {
            // 	swal("1080P主题内容图类型不对，请检查！");
            // 	return false;
            // } else if (!back_image_file_1080.val().match(/.jpg/i)) {
            // 	swal("1080P背景图类型不对，请检查！");
            // 	return false;
            // } else {
        } else {
            return true;
        }
    },
    showRequest: function () {
        swal({
            title: '上传中!',
            text: '请耐心等候',
            imageUrl: '/static/adminsys/img/hourglass.gif',
            animation: false
        });
        return true;
    },
    showResponse: function (data) {
        swal.resetDefaults();
        if (data.success) {
            swal(data, "2秒后自动刷新", "success");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal(data, data.error_msg, "error");
        }
    },
    //获取input图片宽高和大小
    getImageWidthAndHeight: function (id, callback) {
        var _URL = window.URL || window.webkitURL;
        $("#" + id).change(function (e) {
            var file, img;
            if ((file = this.files[0])) {
                img = new Image();
                img.onload = function () {
                    callback && callback({
                        "width": this.width,
                        "height": this.height
                        // "filesize": file.size
                    });
                };
                img.src = _URL.createObjectURL(file);
            }
        });
    },
    //检查多行文本框的字数显示
    checkMaxInput: function () {
        var share_text = $('#share_text');
        var text_num = $('#text_num');
        var need_num = $('#need_num');
        var share_text_num = share_text.val().length;

        need_num.html(share_text.val().length);
    },
    //点击分享后展示内容
    checkShare: function () {
        var share = $('#share');
        var no_share = $('#no_share');
        var share_tab = $('#share_tab');
        share.click(function () {
            share_tab.css('display', 'block');
        });
        no_share.click(function () {
            share_tab.css('display', 'none');
        })
    }
};

$(function () {
    //日期插件
    $('#date_time_start').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('#date_time_end').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    (function () {
        //分享选项卡展示
        formCheck.checkShare();
        //上传图片修改
        $("#ad_image_file_720").change(function () {
            var objUrl = formCheck.getObjectURL(this.files[0]);
            if (objUrl) {
                $("#new_720_ad_photo_show").attr("src", objUrl);
            }
        });
        $("#back_image_file_720").change(function () {
            var objUrl = formCheck.getObjectURL(this.files[0]);
            if (objUrl) {
                $("#new_720_bg_photo_show").attr("src", objUrl);
            }
        });
        $("#ad_image_file_1080").change(function () {
            var objUrl = formCheck.getObjectURL(this.files[0]);
            if (objUrl) {
                $("#new_1080_ad_photo_show").attr("src", objUrl);
            }
        });
        $("#back_image_file_1080").change(function () {
            var objUrl = formCheck.getObjectURL(this.files[0]);
            if (objUrl) {
                $("#new_1080_bg_photo_show").attr("src", objUrl);
            }
        });
        $("#share_image").change(function () {
            var objUrl = formCheck.getObjectURL(this.files[0]);
            if (objUrl) {
                $("#share_image_show").attr("src", objUrl);
            }
        });
        formCheck.getImageWidthAndHeight('ad_image_file_720', function (obj) {
            if (obj.width != 720 || obj.height != 954) {
                setTimeout(function () {
                    swal({
                        title: '上传图片大小不符合要求',
                        type: 'error'
                    })
                }, 500);
                return;
            }
            // alert(222);
            console.log(obj.width);
        });
        formCheck.getImageWidthAndHeight('back_image_file_720', function (obj) {
            if (obj.width != 720 || obj.height != 1070) {
                setTimeout(function () {
                    swal({
                        title: '上传图片大小不符合要求',
                        type: 'error'
                    })
                }, 500);
                return;
            }
            // alert(222);
            console.log(obj.width);
        });
        formCheck.getImageWidthAndHeight('ad_image_file_1080', function (obj) {
            if (obj.width != 1080 || obj.height != 1432) {
                setTimeout(function () {
                    swal({
                        title: '上传图片大小不符合要求',
                        type: 'error'
                    })
                }, 500);
                return;
            }
            // alert(222);
            console.log(obj.width);
        });
        formCheck.getImageWidthAndHeight('back_image_file_1080', function (obj) {
            if (obj.width != 1080 || obj.height != 1604) {
                setTimeout(function () {
                    swal({
                        title: '上传图片大小不符合要求',
                        type: 'error'
                    })
                }, 500);
                return;
            }
            // alert(222);
            console.log(obj.width);
        });

        //图片上传
        var options = {
            beforeSubmit: formCheck.showRequest, // pre-submit callback
            success: formCheck.showResponse // post-submit callback
        };

        $('#android_form').submit(function () {
            $(this).ajaxSubmit(options);
            return false;
        });
    })();
});