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

//文件是否为空
function ios_fileCheck() {
    if ($("#photo").val() == "") {
        swal("文件未上传，请检查！");
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
        imageWidth: 50,
        imageHeight: 50,
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
        swal(data, "上传失败请重试", "error");
    }
}


$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");
    checkShare();
    //上传图片修改
    $("#photo").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#photo_show").attr("src", objUrl);
        }
    });

    //ios图片下线
    $("#ios_offline").click(function () {
        swal({
            title: '确定下线全部ios图片？',
            text: "无法撤销该操作",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '全部下线',
            cancelButtonColor: '#3085d6',
            cancelButtonText: '取消'
        }).then(function () {
            $.get("/operation/tool/let_load_page_offline/", {
                'platform': 'ios'
            }, function (data) {
                if (data.success) {
                    swal("下线成功", "点击确定继续", "success");
                } else {
                    swal("操作失败", "请稍后重试", "error")
                }
            })
        })
    });

    //ios图片上传
    var options = {
        //target:        '#output2',   // target element(s) to be updated with server response
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback

        // other available options:
        //url:       url         // override for form's 'action' attribute
        //type:      type        // 'get' or 'post', override for form's 'method' attribute
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit
        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };

    $('#ios_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });


});
