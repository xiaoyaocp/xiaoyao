/**
 * Created by liao on 16/7/5.
 */

//图片地址获取
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function checkShare() {
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

//文件是否为空判断
function android_fileCheck() {
    if (
        $("#old_photo").val() == "" || $("#new_720_ad_photo").val() == "" || $("#new_720_cooperation_photo").val() == "" || $("#new_720_brand_photo").val() == "" ||
        $("#new_720_bg_photo").val() == "" || $("#new_1080_ad_photo").val() == "" ||
        $("#new_1080_cooperation_photo").val() == "" || $("#new_1080_brand_photo").val() == "" ||
        $("#new_1080_bg_photo").val() == ""
    ) {
        swal("有图片未上传，请检查！");
        return false;
    } else if ($("#activity").val() == "") {
        swal("请输入活动名称！");
        return false;
    } else {
        return true;
    }
}

function showRequest(formData, jqForm, options) {
    swal({
        title: '上传中!',
        text: '请耐心等候',
        imageUrl: '/static/adminsys/img/hourglass.gif',
        animation: false
    })

    return true;
}

function showResponse(data) {
    swal.resetDefaults();
    if (data == "操作成功") {
        swal(data, "2秒后自动刷新", "success");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal(data, "操作失败请重试", "error");
    }
}


$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    checkShare();

    //上传图片修改
    $("#old_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#old_photo_show").attr("src", objUrl);
        }
    });
    $("#new_720_ad_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_720_ad_photo_show").attr("src", objUrl);
        }
    });
    $("#new_720_cooperation_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_720_cooperation_photo_show").attr("src", objUrl);
        }
    });
    $("#new_720_brand_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_720_brand_photo_show").attr("src", objUrl);
        }
    });
    $("#new_720_bg_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_720_bg_photo_show").attr("src", objUrl);
        }
    });
    $("#new_1080_ad_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_1080_ad_photo_show").attr("src", objUrl);
        }
    });
    $("#new_1080_cooperation_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_1080_cooperation_photo_show").attr("src", objUrl);
        }
    });
    $("#new_1080_brand_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_1080_brand_photo_show").attr("src", objUrl);
        }
    });
    $("#new_1080_bg_photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#new_1080_bg_photo_show").attr("src", objUrl);
        }
    });


    //android图片下线
    $("#android_offline").click(function () {
        swal({
            title: '确定下线全部安卓图片？',
            text: "无法撤销该操作",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '全部下线',
            cancelButtonColor: '#3085d6',
            cancelButtonText: '取消'
        }).then(function () {
            $.get("/operation/tool/let_load_page_offline/", {
                'platform': 'android'
            }, function (data) {
                if (data.success) {
                    swal("下线成功", "点击确定继续", "success");
                } else {
                    swal("操作失败", "请稍后重试", "error")
                }
            })
        })
    });

    //图片上传
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#android_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });


});
