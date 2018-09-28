/**
 * Created by liao on 16/7/21.
 */

//图片url
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

//列表展示
function displayPost(data) {
    $(".post_list").html('');
    $.each(data.post_info_list, function (key, value) {
        $(".post_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_10'>" + value.post_id + "</div>" +
            "<div class='td_25 ellipsis'>" + value.post_title + "</div>" +
            "<div class='td_20'>" + value.create_time + "</div>" +
            "<div class='td_10'>" + value.comment_num + "</div>" +
            "<div class='td_10'>" + value.is_toped + "</div>" +
            "<div class='td_operation' id='operation_" + value.post_id + "'>" +

            "<a href='#' class='but_modify' data-toggle='modal' data-target='#changeModal' style='text-decoration:none' onclick='showDetail(" + value.post_id + ")'>" +
            "<span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='修改' style='color:#fff;'>" + "..." + "</span>" +
            "</a>" +

            "<a href='/operation/content/top_post_comment_render/?post_id=" + value.post_id + "' target='_blank' class='but_check tooltips' data-toggle='tooltip' data-placement='bottom' title='查看回复'>" +
            "</a>" +
            "</div>" +
            "</article>"
        );

        if (value.is_toped == '已置顶') {
            $("#operation_" + value.post_id).prepend(
                "<a href='#' class='but_no tooltips' data-toggle='tooltip' data-placement='bottom' title='取消置顶' onclick='offTop(" + value.post_id + ")'>" + "</a>"
            )
        } else {
            $("#operation_" + value.post_id).prepend(
                "<a href='#' class='but_yes' data-toggle='modal' data-target='#onTopModal' style='text-decoration:none' onclick='onTop(" + value.post_id + ")'>" + "<span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='置顶' style='color:#fff;'>" + "..." +
                "</span>" +
                "</a>"
            );
        }
    })

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

//取消置顶操作
function offTop(id) {
    $.post("/operation/content/exec_unpin_post/", {
        'post_id': id
    }, function (data) {
        if (data.success) {
            swal("取消置顶成功!", "2秒后自动刷新", "success");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal(data.error_msg, "请稍后再试", "error");
        }

    }, 'json');
}

//置顶操作(提供post_id)
function onTop(id) {
    $("#post_id_input").val(id);
}

//展示帖子已有信息
function showDetail(id) {
    $.get("/operation/content/get_post_detail_info/", {
        'post_id': id
    }, function (data) {
        console.log(data);
        $("#post_id_input").val(data.post_id);
        $("#post_title").val(data.post_title);
        $("#pic_show").attr('src', data.image_store_path);
    })
}

//帖子修改检测
function submitModifyCheck() {
    if ($("#post_title").val() == '') {
        swal("请输入帖子标题");
        return false;
    } else {
        return true;
    }
}

$(function () {
    $.ajax({
        'type': 'GET',
        'url': '/operation/content/get_post_list/',
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayPost(data)
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //导航选中
    $(".dropdown_col_1").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //日期插件
    $('#on_top_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('#off_top_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('#post_start_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('#post_end_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    //图片修改展示
    $("#post_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#pic_show").attr("src", objUrl);
        }
    });

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/content/get_post_list/", {
            'page': page
        }, displayPost);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/content/get_post_list/", {
            'page': page
        }, displayPost);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/content/get_post_list/", {
                'page': page
            }, displayPost);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/content/get_post_list/", {
                    'page': page
                }, displayPost);
            }

        }
    });

    //发布新帖页面
    $("#add-post").click(function (event) {
        window.location.href = "/operation/content/create_new_post_render/";
    });

    //帖子置顶
    $("#onTopBtn").click(function () {
        var post_id = $("#post_id_input").val();
        var on_top_time = $("#on_top_time").val();
        var off_top_time = $("#off_top_time").val();

        $.post("/operation/content/exec_pin_post/", {
                'post_id': post_id,
                'start_time': on_top_time,
                'end_time': off_top_time
            },
            function (data) {
                if (data.success) {
                    swal("置顶成功!", "2秒后自动返回", "success");
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                } else {
                    swal(d.error_msg, "请稍后再试", "error");
                }
            }, 'json');
    });
});
