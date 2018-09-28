/**
 * Created by liao on 2016/11/1.
 */

//列表展示
function displayVersions(data) {
    $(".version_list").html('');
    $.each(data.version_info_list, function (key, value) {
        $(".version_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_15'>" + value.version + "</div>" +
            "<div class='td_20'>" + value.platform + "</div>" +
            "<div class='td_20'>" + value.release_date + "</div>" +
            "<div class='td_20 ellipsis' title='" + value.new_feature + "'>" + value.new_feature + "</div>" +
            "<div class='td_20 ellipsis'>" + "<a href='" + value.download_url + "'>" + value.download_url + "</a>" + "</div>" +
            "</article>"
        );
    })
}


$(function () {
    //自动加载
    $.ajax({
        'type': 'GET',
        'url': '/operation/data/get_version_info_list/',
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayVersions(data)
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //发布新的版本
    $("#submitBn").click(function (event) {
        // event.preventDefault();
        if ($("#version").val() == '') {
            swal("请输入版本号！");
        } else if ($('input:radio[name="platform"]:checked').val() == null) {
            swal("请选择发布平台");
        } else if ($("#release_date").val() == '') {
            swal("请上传发布时间");
        } else if ($("#new_feature").val() == '') {
            swal("请输入版本特性");
        } else if ($("#download_url").val() == '') {
            swal("请输入下载链接");
        } else {
            $.ajax({
                'type': 'POST',
                'url': '/operation/data/add_app_version/',
                'data': {
                    'version': $("#version").val(),
                    'platform': $('input:radio[name="platform"]:checked').val(),
                    'release_date': $("#release_date").val(),
                    'download_url': $("#download_url").val(),
                    'new_feature': $("#new_feature").val()
                },
                'dataType': 'json',
                'success': function (data) {
                    if (data.success) {
                        swal("发布成功!", "2秒后自动返回", "success");
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    } else {
                        swal(d.error_msg, "请稍后再试", "error");
                    }
                }
            });
        }
    });

    //导航选中
    $(".dropdown_col_4").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //日期插件
    $('#release_date').datepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        minuteStep: 0
    });

});
