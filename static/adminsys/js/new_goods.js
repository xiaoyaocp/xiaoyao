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

//提交检查
function submitCheck() {
    if ($("#goods_type").val() == '') {
        swal({
            title: "请选择产品类型",
            type: 'error'
        });
        return false;
    } else if ($("#is_ios_forbid").val() == '') {
        swal({
            title: "请选择发布平台",
            type: 'error'
        });
        return false;
    } else if ($("#goods_title").val() == '') {
        swal({
            title: "请输入产品标题",
            type: 'error'
        });
        return false;
    } else if ($("#goods_detail").val() == '') {
        swal({
            title: "请输入产品详情",
            type: 'error'
        });
        return false;
    } else if ($("#bg_pic").val() == '') {
        swal({
            title: "请上传详情图片",
            type: 'error'
        });
        return false;
    } else if ($("#md_pic").val() == '') {
        swal({
            title: "请上传缩略图片",
            type: 'error'
        });
        return false;
    } else if ($("#sm_pic").val() == '') {
        swal({
            title: "请上图标图片",
            type: 'error'
        });
        return false;
    } else if ($("#credits_one").val() == "") {
        swal({
            title: "请输入学币值",
            type: 'error'
        });
        return false;
    } else if ($('#origin_price').val() == "") {
        swal({
            title: "请输入成本价格",
            type: 'error'
        });
        return false;
    } else if ($("#money_one").val() == "") {
        swal({
            title: "请输入人民币值",
            type: 'error'
        });
        return false;
    }
}

//拿到不同的年级的值
function getGrade() {
    var grade = $('#grade');
    return grade.val();
}

//点击一对一套餐下拉列表的时候，获取到年级的参数，从而请求数据Dom操作
function DomGradeData(container, datas) {
    var pid = $('#pid');
    var option = '<option value="0">请选择套餐</option>';
    var html = '';
    $.each(datas, function (key, value) {
        html += '<option value="' + value.pid + '">' + value.name + '</option>'
    })
    option += html;
    container.html(option);
}

//判断年级以及对应的套餐时候可以选择是否可以选择
// function isnoSelect() {
//   var goods_type = $('#goods_type');
//   var grade = $('#grade');
//   var pid = $('#pid');
//   goods_type.focus();
//   goods_type.on('blur', function() {
//     console.log(goods_type.val());
//     if (goods_type.val() != 7) {
//       grade.attr('disabled', 'disabled');
//       pid.attr('disabled', 'disabled');
//     } else {
//       grade.removeAttr('disabled');
//       pid.removeAttr('disabled');
//     }
//   })
// }

//点击一对一套餐下拉列表的时候，获取到年级的参数，从而请求数据
function getGradeData() {
    var api = '/operation/reward/get_mall_package_info_list/';
    var grade = getGrade();
    var pid = $('#pid');
    var data = {
        grade: grade
    }
    $.get(api, data, function (res) {
        console.log(res);
        DomGradeData(pid, res.mall_package_info_list)
    });
}

//发送信息
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    console.log(queryString);
    return true;
}

//返回信息
function showResponse(data) {
    console.log(data);
    if (data.success) {
        swal({
            title: "成功！2秒后自动刷新",
            type: "success",
            showConfirmButton: false
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
    $(".dropdown_col_3").addClass("active").siblings().removeClass("active");

    //日期插件
    $('#goods_off_sale_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    // isnoSelect();
    $('#grade').on('click', function () {
        getGradeData();
    })

    //上传图片修改
    $("#bg_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#bg_show").attr("src", objUrl);
        }
    });
    $("#md_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#md_show").attr("src", objUrl);
        }
    });
    $("#sm_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#sm_show").attr("src", objUrl);
        }
    });

    //上传完后操作
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#goods_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});