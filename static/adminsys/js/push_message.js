/**
 * Created by liao on 16/5/16.
 */

function checkPushMessageByFile() {
    if ($(".message_title").val() == '') {
        $(".message_title").focus();
        swal("请输入发帖标题！");
        return false;
    } else if ($(".message_content").val() == '') {
        $(".message_content").focus();
        swal("请输入发帖文本内容！");
        return false;
    } else if ($('input:radio[name="input_type"]:checked').val() == null) {
        swal("请选择输入的号码类型！");
        return false;
    } else if ($('input:file[name="file"]').val() == '') {
        swal("请上传文件");
        return false;
    } else if ($('input:radio[name="push_type"]:checked').val() == null) {
        swal("请选择推送类型");
        return false;
    } else if ($("#url_pop").is(':checked') && $("#web_url").val() == '') {
        swal("请输入url");
        return false;
    } else if ($('input:radio[name="is_can_share"]:checked').val() == null) {
        swal("请选择是否分享");
        return false;
    } else if ($("#date_tx").val() == '') {
        swal("请选择推送时间");
        return false;
    } else {
        console.log($('input:radio[name="is_share"]:checked').val());
        return true;
    }
}


function checkPushMessage() {

    var val = $('input:radio[name="push_type"]:checked').val();

    if ($(".message_title").val() == '') {
        $(".message_title").focus();
        swal("请输入发帖标题！");
        return false;
    } else if ($(".message_content").val() == '') {
        $(".message_content").focus();
        swal("请输入发帖文本内容！");
        return false;
    } else if ($('input:radio[name="user_type"]:checked').val() == null) {
        swal("请选择推送的用户类型");
        return false;
    } else if ($("#custom_user").is(":checked") && $(".phone_list").val() == '') {
        $(".phone_list").focus();
        swal("请输入至少一个自定义用户手机号！");
        return false;
    } else if ($("#custom_user").is(":checked") && $('input:radio[name="input_type"]:checked').val() == null) {
        swal("请选择输入的号码类型！");
        return false;
    } else if ($('input:radio[name="push_type"]:checked').val() == null) {
        swal("请选择推送类型");
        return false;
    } else if ($("#url_pop").is(':checked') && $("#web_url").val() == '') {
        swal("请输入url");
        return false;
    } else if ($('input:radio[name="is_share"]:checked').val() == null) {
        swal("请选择是否分享");
        return false;
    } else if ($("#date_tx").val() == '') {
        swal("请选择推送时间");
        return false;
    } else {

        $.ajax({
            type: 'POST',
            data: {
                'title': $(".message_title").val(),
                'content': $(".message_content").val(),
                'user_type': $('input:radio[name="user_type"]:checked').val(),
                'input_type': $('input:radio[name="input_type"]:checked').val(),
                'cellphone_or_user_id_list_str': $(".phone_list").val(),
                'push_type': $('input:radio[name="push_type"]:checked').val(),
                'target_url': $("#web_url").val(),
                'is_can_share': $('input:radio[name="is_share"]:checked').val(),
                'push_time': $("#date_tx").val()
            },
            dataType: "json",
            url: '/operation/content/push_message/',
            beforeSend: function () {
                $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
            },
            success: function (data) {
                if (data.success == true) {
                    swal("推送成功!", "2秒后自动刷新", "success");
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                } else {
                    swal("推送失败", data.error_msg, "error");
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }
            },
            complete: function () {
                $(".loading_pic").css('display', 'none');
            }
        })
    }
}

$(function () {

    //导航选中
    $(".dropdown_col_1").addClass("active").siblings().removeClass("active");

    //日期选择
    $('#date_tx').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        pickerPosition: 'top-left'
    });

    //URL框弹出
    $("#url_pop").click(function (event) {
        /* Act on the event */
        $("#web_url").css('display', 'inline-block');
    });

    $("#url_fade").click(function (event) {
        /* Act on the event */
        $("#web_url").css('display', 'none');
    });


    //电话框弹出
    $("#custom_user").click(function (event) {
        /* Act on the event */
        $(".custom_area").css('display', 'block');
    });

    $(".not_custom_user").click(function (event) {
        /* Act on the event */
        $(".custom_area").css('display', 'none');
    });

})
