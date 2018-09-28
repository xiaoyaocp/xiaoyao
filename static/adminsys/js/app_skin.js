/**
 * Created by liao on 16/9/24.
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

//文件判断
function fileCheck() {
    if ($("#fileId1").val() == "") {
        swal("显示图片未上传！");
        return false;
    } else if ($("#fileId2").val() == "") {
        swal("皮肤包未上传！");
        return false;
    } else if ($("#platform").val() == "") {
        swal("请选择平台！");
        return false;
    } else if ($("#display_name").val() == "") {
        swal("请输入皮肤包名称！");
        return false;
    } else if ($("#res_name").val() == "") {
        swal("请输入皮肤包唯一标识！");
        return false;
    } else if ($("#skin_version").val() == "") {
        swal("请输入皮肤包版本！");
        return false;
    } else if ($("input[name='pay_type']:checked").val() == null) {
        swal("请选择购买方式！");
        return false;
    } else if ($(".pop_price").is(':checked') && $("#price").val() == "") {
        swal("请输入价格！");
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
    if (data.success) {
        swal({
            title: "2秒后自动刷新",
            type: "success"
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal({
            title: data.error_msg,
            type: "error"
        });
    }
}

$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //价格input显示与隐藏
    $(".pop_price").click(function (event) {
        /* Act on the event */
        $(".price_div").css('display', 'block');
    });

    $(".hide_price").click(function (event) {
        /* Act on the event */
        $(".price_div").css('display', 'none');
    });

    //图片展示
    $("#fileId1").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#image_show").attr("src", objUrl);
        }
    });

    //皮肤包上传
    var options = {
        beforeSubmit: showRequest,
        success: showResponse
    };

    $('#skin_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});
