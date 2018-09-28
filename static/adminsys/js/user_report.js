/**
 * Created by liao on 16/8/6.
 */

//筛选功能
function filter() {
    $.get("/operation/content/get_report_info_list/", {
        'report_reason_type': $("#report_reason_type").val(),
        'report_type': $("#report_type").val(),
        'date_range': $("#datefilter").val(),
        'query': $("#query").val(),
        'is_teacher_only': $("#is_teacher_only").val()
    }, displayReportList);
}


function displayReportList(data) {

    $(".report_list").html('');
    $.each(data.report_info_list, function (key, value) {
        $(".report_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_10 ellipsis'>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.informer_user_id + "' title='电话：" + value.informer_user_cellphone + "'>" + value.informer_user_name + "</a>" + "</div>" +
            "<div class='td_10 ellipsis'>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.reported_user_id + "'>" + value.reported_user_name + "</a>" + "</div>" +
            "<div class='td_15 '>" + value.reported_user_type + "</div>" +
            "<div class='td_10'>" + value.report_time + "</div>" +
            "<div class='td_15'>" + value.report_type_chinese_name + "</div>" +
            "<div class='td_10'>" + value.source + "</div>" +
            "<div class='td_15 ellipsis'>" + value.report_reason + "</div>" +
            "<div class='td_operation'>" +

            "<a href='/operation/user/single_post_render/?post_id=" + value.post_id + "' target='_blank' class='but_view' data-toggle='tooltip' data-placement='bottom' title='查看原帖'>" + "</a>" +

            "<div id='operation_" + value.report_id + "'>" +
            "<a id='operateBtn' data-report-id='" + value.report_id + "' data-report-type='" + value.report_type + "' href='#' class='but_yes' data-toggle='tooltip' data-placement='bottom' title='完成操作'>" +
            "</a>" +
            "</div>" +

            "</div>" +
            "</article>"
        );

    });

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

}


$(function () {

    //提示工具
    $(document).tooltip();

    //导航选中
    $(".dropdown_col_1").addClass("active").siblings().removeClass("active");

    //加载信息
    $.ajax({
        'type': 'GET',
        'url': '/operation/content/get_report_info_list/',
        'data': {'report_type': 'post_report'},
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayReportList(data)
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    });


    //时间筛选
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });


    //完成操作
    $(document).on("click", "#operateBtn", function (event) {
        event.preventDefault();
        var report_id = $(this).data("report-id");
        var report_type = $(this).data("report-type");

        $.post("/operation/content/operate_the_report/", {
            'report_id': report_id,
            'report_type': report_type,
            'operate_type': 'ignore'
        }, function (data) {
            if (data.success) {
                //$("#status_" + report_id).html('举报通过');
                $("#operation_" + report_id).html("<span style='color:red'>" + "已操作" + "</span>");
            }
        }, 'json')
    });

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/content/get_report_info_list/", {
            'report_reason_type': $("#report_reason_type").val(),
            'report_type': $("#report_type").val(),
            'date_range': $("#datefilter").val(),
            'query': $("#query").val(),
            'is_teacher_only': $("#is_teacher_only").val(),
            'page': page
        }, displayReportList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/content/get_report_info_list/", {
            'report_reason_type': $("#report_reason_type").val(),
            'report_type': $("#report_type").val(),
            'date_range': $("#datefilter").val(),
            'query': $("#query").val(),
            'is_teacher_only': $("#is_teacher_only").val(),
            'page': page
        }, displayReportList);
    });

    $('.skipBtn').click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/content/get_report_info_list/", {
                'report_reason_type': $("#report_reason_type").val(),
                'report_type': $("#report_type").val(),
                'date_range': $("#datefilter").val(),
                'query': $("#query").val(),
                'is_teacher_only': $("#is_teacher_only").val(),
                'page': page
            }, displayReportList);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/content/get_report_info_list/", {
                    'report_reason_type': $("#report_reason_type").val(),
                    'report_type': $("#report_type").val(),
                    'date_range': $("#datefilter").val(),
                    'query': $("#query").val(),
                    'is_teacher_only': $("#is_teacher_only").val(),
                    'page': page
                }, displayReportList);
            }

        }
    });

});
