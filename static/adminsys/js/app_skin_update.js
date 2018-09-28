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
    if ($("#fileId2").val() == "") {
        swal({
            title: "皮肤包未上传！",
            type: 'error'
        });
        return false;
    } else if ($("#platform").val() == "") {
        swal({
            title: "请选择平台！",
            type: 'error'
        });
        return false;
    } else if ($("#display_name").val() == "") {
        swal({
            title: "请输入皮肤包名称！",
            type: 'error'
        });
        return false;
    } else if ($("#res_name").val() == "") {
        swal({
            title: "请输入皮肤包唯一标识！",
            type: 'error'
        });
        return false;
    } else if ($("#skin_version").val() == "") {
        swal({
            title: "请输入皮肤包版本！",
            type: 'error'
        });
        return false;
    }
    else if ($("input[name='pay_type']:checked").val() == null) {
        swal({
            title: "请选择购买类型！",
            type: 'error'
        });
        return false;
    } else if ($(".pop_price").is(':checked') && $("#price").val() == "") {
        swal({
            title: "请输入价格！",
            type: 'error'
        });
        return false;
    } else {
        return true;
    }
}

// 渲染DOM结构
function domRender(data) {
    //缓存dom节点
    var info_id = $('#info_id');
    var platform = $('#platform');
    var fileId1 = $('#fileId1');
    var image_show = $('#image_show');
    var fileId2 = $('#fileId2');
    var display_name = $('#display_name');
    var res_name = $('#res_name');
    var pay_type = $('input[name="pay_type"]');
    var price = $('#price');
    var skin_version = $('#skin_version');
    console.log(data);
    info_id.val(data.info_id);
    //平台
    if (data.platform.toLowerCase() === 'android') {
        platform.find('option[value="0"]').attr('selected', true);
    } else if (data.platform.toLowerCase() === 'ios') {
        platform.find('option[value="1"]').attr('selected', true);
    } else {
        platform.find('option[value=""]').attr('selected', true);
    }

    image_show.attr('src', data.image_url);
    display_name.val(data.display_name);
    res_name.val(data.res_name);
    skin_version.val(data.skin_version);

    if (data.pay_type === '免费') {
        pay_type.eq(0).attr('checked', true);
    } else if (data.pay_type === '学币') {
        pay_type.eq(1).attr('checked', true);
    } else if (data.pay_type === '人民币') {
        pay_type.eq(2).attr('checked', true);
    }
    price.val(data.price);
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

    (function () {
        var api = '/operation/tool/get_app_skin_detail_info/';
        var url = window.location.href;
        var info_id = url.split('?')[1].replace('info_id=', '');
        var data = {
            info_id: info_id
        }
        $.get(api, data, function (res) {
            domRender(res.app_skin_detain_info);
        })
    })();

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
