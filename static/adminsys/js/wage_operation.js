/**
 * Created by liao on 16/6/29.
 */


$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //日期插件
    $('.date_time').datepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    //下载
    $("#wb_download").click(function () {

        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();

        if (start_time == '') {
            swal("请选择筛选的开始日期");
        } else {

            window.location.href = '/operation/tool/get_one_to_one_teacher_salary/?start_time=' + start_time + '&' + 'end_time=' + end_time;

        }

    })

});
