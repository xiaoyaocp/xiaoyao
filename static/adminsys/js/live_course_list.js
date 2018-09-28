/**
 * Created by liao on 2016/11/8.
 */

/**
 * HTML编码
 * @param {String} text
 */
function encodeHTML(text) {
    return String(text).replace(/["<>&`'/]/g, function (all) {
        return "&" + {
                '"': 'quot',
                '<': 'lt',
                '>': 'gt',
                '&': 'amp',
                // ' ': 'nbsp',
                '`': '#x60',
                '\'': '#x27',
                '/': '#x2F'
            }[all] + ";";
    });
}

//列表展示
function displayLiveCourse(data) {
    $(".course_list").html('');
    $.each(data.live_course_info_list, function (key, value) {

        $(".course_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div class='td_10 content-align ellipsis' title='" + encodeHTML(value.course_id) + "'>" + encodeHTML(value.course_id) + "</div>" +
            "   <div class='td_15 content-align ellipsis'>" + encodeHTML(value.course_name) + "</div>" +
            "   <div class='td_10 content-align ellipsis'>" + encodeHTML(value.teacher_name) + "</div>" +
            "   <div class='td_10 content-align ellipsis '>" + encodeHTML(value.subject) + "</div>" +
            "   <div class='td_15 content-align ellipsis' title='" + encodeHTML(value.grade) + "'>" + encodeHTML(value.grade) + "</div>" +
            "   <div class='td_10 content-align ellipsis'>" + encodeHTML(value.course_type) + "</div>" +
            "   <div class='td_10 content-align ellipsis'>" + encodeHTML(value.is_recommend) + "</div>" +
            "   <div class='td_operation_p' id='operation_" + value.course_id + "'>" +
            "       <a href='#' class='but_yes tooltips' data-toggle='tooltip' data-placement='bottom' title='审核通过' onclick='passCourse(\"" + value.course_id + "\")'>" + "</a>" +
            "       <a href='#' class='but_no tooltips' data-toggle='tooltip' data-placement='bottom' title='审核拒绝' onclick='rejectCourse(\"" + value.course_id + "\")'>" + "</a>" +
            "       <a href='#' class='but_view' data-toggle='modal data-target='#recordModal' style='text-decoration:none'>" +
            "           <span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='查看审核记录' style='color:#fff;'>" + "..." + "</span>" +
            "       </a>" +
            "<br />" + "<br />" + "<br />" +
            "       <a href='/operation/user/live_course_detail_render/?course_id=" + value.course_id + "' class='but_modify tooltips edit_course_info' data-toggle='tooltip' data-placement='bottom' title='编辑课程详情' onclick=''>" + "</a>" +
            "       <a href='#' class='but_set' data-toggle='modal' data-target='#recommendModal' style='text-decoration:none'>" +
            "           <span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='推荐课程设置' style='color:#fff;'>" + "..." + "</span>" +
            "       </a>" +
            "   </div>" +
            "</article>"
        );
        // console.log(value);
        if (value.course_status == 'CHKING') {
            $(".td_operation_p").show();
        } else {
            $(".td_operation_p").hide();
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

//审核通过操作
function passCourse(id) {
    $.ajax({
        type: 'POST',
        url: '/operation/user/operate_live_course_status/',
        data: {
            'course_id': id,
            'operate_type': 'pass'
        },
        dataType: 'json',
        beforeSend: function () {
            swal({
                title: '处理中',
                text: '请耐心等候',
                imageUrl: '/static/adminsys/img/hourglass.gif',
                animation: false
            })
        },
        success: function (data) {
            if (data.success) {
                swal.resetDefaults();
                swal("审核成功!", "2秒后自动刷新", "success");
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            } else {
                swal("审核失败", data.error_msg, "error");
            }
        },
        error: function (err) {

        }
    });
}

//审核拒绝操作
function rejectCourse(id) {
    $.ajax({
        type: 'POST',
        url: '/operation/user/operate_live_course_status/',
        data: {
            'course_id': id,
            'operate_type': 'reject'
        },
        dataType: 'json',
        beforeSend: function () {
            swal({
                title: '处理中',
                text: '请耐心等候',
                imageUrl: '/static/adminsys/img/hourglass.gif',
                animation: false
            })
        },
        success: function (data) {
            if (data.success) {
                swal.resetDefaults();
                swal("审核成功!", "2秒后自动刷新", "success");
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            } else {
                swal("审核失败", "请稍后再试", "error");
            }
        }
    });
}


$(function () {

    function loadPage() {
        $.ajax({
            'type': 'GET',
            'url': '/operation/user/get_live_course_order/',
            "data": {
                query: $('#query').val(),
                course_status: $('#course_status').val()
            },
            'beforeSend': function () {
                $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
            },
            'dataType': 'json',
            'success': function (data) {
                console.log(data);
                displayLiveCourse(data)
            },
            'complete': function () {
                $(".loading_pic").css('display', 'none');
            }
        });
    }

    $('#searchBtn').click(function () {
        loadPage();
    });
    loadPage();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/user/get_live_course_order/", {
            page: page,
            course_status: $('#course_status').val()
        }, displayLiveCourse);
    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        console.log(page)
        $.get("/operation/user/get_live_course_order/", {
            page: page,
            course_status: $('#course_status').val()
        }, displayLiveCourse);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/get_live_course_order/", {
                page: page,
                course_status: $('#course_status').val()
            }, displayLiveCourse);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/get_live_course_order/", {
                    page: page,
                    course_status: $('#course_status').val()
                }, displayLiveCourse);
            }

        }
    });

});