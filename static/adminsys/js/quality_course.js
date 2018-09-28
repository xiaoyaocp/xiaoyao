/**
 * Created by liao on 16/7/18.
 */

function showOrderList(data) {

    $(".order_list_content").html('');

    $.each(data.quality_course_info_list, function (key, value) {
        $(".order_list_content").append(
            "<tr class='order_list_row'> " +
            "<td>" + value.order_no + "</td>" +
            "<td>" + value.teacher_name + "</td>" +
            "<td>" + value.student_name + "</td>" +
            "<td>" + value.student_cellphone + "</td>" +
            "<td>" + value.subject + "</td>" +
            "<td>" + value.grade + "</td>" +
            "<td>" + value.create_time + "</td>" +
            "<td id='status_" + value.lesson_order_map_id + "'>" + "</td>" +
            "</tr>");

        if (value.status == "未排期") {
            $("#status_" + value.lesson_order_map_id).html("<a href='/operation/user/teacher_schedule_render/?lesson_order_map_id=" + value.lesson_order_map_id + "'>" + value.status + "</a>");
        } else {
            $("#status_" + value.lesson_order_map_id).html("<a class='btn btn-info' href='/operation/user/lesson_order_map_schedule_info_render/?lesson_order_map_id=" + value.lesson_order_map_id + "'>查看排班详情</a>")
        }

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

function filter(status) {

    $.get("/operation/user/get_quality_course_order/", {'status': status}, showOrderList);

}

$(function () {

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //加载数据
    $.get("/operation/user/get_quality_course_order/", {}, showOrderList);

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/user/get_quality_course_order/", {
            'date_range': $("#datefilter").val(),
            'page': page
        }, showOrderList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/user/get_quality_course_order/", {
            'date_range': $("#datefilter").val(),
            'page': page
        }, showOrderList);
    });

    $('.skipBtn').click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/user/get_quality_course_order/", {
                'date_range': $("#datefilter").val(),
                'page': page
            }, showOrderList);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/user/get_quality_course_order/", {
                    'status': $("#goods_status").val(),
                    'date_range': $("#datefilter").val(),
                    'page': page
                }, showOrderList);
            }

        }
    });


})
