/**
 * Created by liao on 16/5/23.
 */

function checkCellphoneSearch() {
    var query = $("#query").val();
    if (query == '') {
        swal("请输入想要查找的手机号");
        return false;
    } else {
        return true;
    }
}


function displayHistoryOperation(data) {
    $(".operation_history_content").html("");
    $.each(data.operation_history_list, function (key, value) {
        $(".operation_history_content").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_20'>" + value.operate_user_name + "</div>" +
            "<div class='td_15'>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.operated_user_id + "'>" + value.operated_user_phone + "</a>" + "</div>" +
            "<div class='td_20 '>" + value.operate_time + "</div>" +
            "<div class='td_20'>" + value.type + "</div>" +
            "<div class='td_20 ellipsis'>" + value.reason + "</div>" +
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

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //展示历史操作记录
    $.ajax({
        'type': 'GET',
        'url': '/operation/user/get_operation_history/',
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayHistoryOperation(data)
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //时间插件
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    //搜索
    $("#searchBtn").click(function () {
        var query = $("#query").val();
        var start_time = $("#date_start").val();
        var end_time = $("#date_end").val();

        $.ajax({
            'type': 'GET',
            'url': '/operation/user/get_operation_history/',
            'data': {
                'query': query,
                'start_time': start_time,
                'end_time': end_time
            },
            'beforeSend': function () {
                $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
            },
            'dataType': 'json',
            'success': function (data) {
                displayHistoryOperation(data)
            },
            'complete': function () {
                $(".loading_pic").css('display', 'none');
            }
        });
    });

    //回车搜索
    $("#query").bind('keypress', function (event) {
        if (event.keyCode == "13") {
            event.preventDefault();
            var query = $("#query").val();
            $.ajax({
                'type': 'GET',
                'url': '/operation/user/get_operation_history/',
                'data': {
                    'query': query,
                    'start_time': start_time,
                    'end_time': end_time
                },
                'beforeSend': function () {
                    $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
                },
                'dataType': 'json',
                'success': function (data) {
                    displayHistoryOperation(data)
                },
                'complete': function () {
                    $(".loading_pic").css('display', 'none');
                }
            });
        }
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var query = $("#query").val();
        var start_time = $("#date_start").val();
        var end_time = $("#date_end").val();
        $.get("/operation/user/get_operation_history/", {
            'start_time': start_time,
            'end_time': end_time,
            'page': page,
            'query': query
        }, displayHistoryOperation);
    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var query = $("#query").val();
        var start_time = $("#date_start").val();
        var end_time = $("#date_end").val();
        $.get("/operation/user/get_operation_history/", {
            'start_time': start_time,
            'end_time': end_time,
            'page': page,
            'query': query
        }, displayHistoryOperation);
    });

    $(".skipBtn").click(function () {
        var query = $("#query").val();
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var start_time = $("#date_start").val();
        var end_time = $("#date_end").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/get_operation_history/", {
                'start_time': start_time,
                'end_time': end_time,
                'page': page,
                'query': query
            }, displayHistoryOperation);
        }

    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var query = $("#query").val();
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var start_time = $("#date_start").val();
            var end_time = $("#date_end").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/get_operation_history/", {
                    'page': page,
                    'query': query,
                    'start_time': start_time,
                    'end_time': end_time
                }, displayHistoryOperation);
            }

        }
    });

})
