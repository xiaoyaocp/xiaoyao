/**
 * Created by liao on 16/9/13.
 */

//图片地址
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

//提交测试
function fileCheck_mall() {
    if ($("#banner_pic").val() == '') {
        $("#banner_pic").focus();
        swal("请上传banner图！");
        return false;
        // } else if ($("input[name='platform']:checked").val() == null) {
        //   swal("请选择平台");
        //   return false;
    } else if ($("#date_start").val() == '') {
        swal("请选择上线时间");
        return false;
    } else if ($("#date_end").val() == '') {
        swal("请选择下线时间");
        return false;
    } else if ($("#url").val() == '') {
        swal("请输入链接");
        return false;
    } else if ($("#share_title_m").val() == '') {
        swal("请输入标题");
        return false;
    } else {
        return true;
    }
}

function offLine(id) {
    $.post("/operation/tool/offline_the_mall_activity/", {
        'activity_id': id
    }, function (data) {
        if (data.success) {
            swal("下线成功", "两秒后自动刷新", "success");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal('操作失败，请重试！')
        }
    }, 'json')
}

//发送信息
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    console.log(queryString);
    return true;
}

//返回信息
function showResponse(data) {
    if (data == "操作成功") {
        swal(data, "2秒后自动刷新", "success");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal(data, "操作失败请重试", "error");
    }
}


function displayBannerList(data) {

    $(".mall_activity_list").html('');

    $.each(data.mall_activity_list, function (key, value) {

        $(".mall_activity_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_15 ellipsis'>" + value.activity_title + "</div>" +
            "<div class='td_20'>" +
            "<a class='fancybox-button' rel='gallery" + value.activity + "' href='" + value.image_store_path + "' title='banner图片'>" +
            "<img id = 'banner_img' src='" + value.image_store_path + "' width='150' height='50' />" +
            "</a>" +
            "</div>" +
            "<div class='td_20'>" + value.start_time + "</div>" +
            "<div class='td_20'>" + value.end_time + "</div>" +

            "<div class='td_operation' id='operation_" + value.activity_id + "'>" +
            "<a href='" + value.web_url + "' target='_blank' class='but_href tooltips' data-toggle='tooltip' data-placement='bottom' title='相关链接' >" + "</a>" +

            "<a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线banner' onclick='offLine(" + value.activity_id + ")'>" + "</a>" +
            "</div>" +
            "</article>"
        );

        //页数显示
        var curPage = data.current_page;
        var maxPage = data.all_page;

        $("#curPage").html(curPage);
        $("#maxPage").html(maxPage);

        if (curPage == 1) {
            $(".prev-page").attr("disabled", "true");
        } else {
            $(".prev-page").removeAttr("disabled");
        }

        if (curPage >= maxPage) {
            $(".next-page").attr("disabled", "true");
        } else {
            $(".next-page").removeAttr("disabled");
        }

    });

}


$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //日期插件
    $('#date_start_2').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    $('#date_end_2').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });


    //fancybox-button
    $(".fancybox-button").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        }
    });

    //加载
    $.ajax({
        type: 'GET',
        url: '/operation/tool/get_mall_activity_info_list/',
        beforeSend: function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        success: function (data) {
            displayBannerList(data)
        },
        complete: function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //新帖图片展示
    $("#banner_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log('yes');
        if (objUrl) {
            $("#pic_show").attr("src", objUrl);
        }
    });

    //新banner上传
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#banner_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});
