/**
 * Created by liao on 16/7/21.
 */

//列表展示
function displayReply(data) {
    console.log(data);
    $(".reply_list").html('');
    $.each(data.post_comment_info_list, function (key, value) {
        $(".reply_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_10 ellipsis'>" + value.comment_user_name + "</div>" +
            "<div class='td_10'>" +
            "<img src='" + value.comment_user_photo_store_path + "' width='50px' height='50px' />" +
            "</div>" +
            "<div class='td_25 ellipsis' title='" + value.comment_content + "' style='' >" + value.comment_content + "</div>" +
            "<div class='td_20'>" + value.create_time + "</div>" +
            "<div class='td_10'>" + value.status + "</div>" +
            "<div class='td_operation' id='operation_" + value.post_id + "'>" +
            // "<a href='#' class='but_modify' data-toggle='modal' data-target='#replyModal' style='text-decoration:none'>" +
            // "<span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='回复本帖' style='color:#fff;'>" + "..." + "</span>" +
            // "</a>" +
            "<a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='删除本帖' onclick='deleteReply(" + value.post_id + ")'>" + "</a>" +
            "</div>" +
            "</article>"
        );
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

//删除回复
function deleteReply(id) {
    $.post("/operation/user/delete_user_post/", {'post_id_or_post_id_list': id}, function (data) {
        if (data.success) {
            swal("删除成功!", "2秒后自动刷新", "success");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal(data.error_msg, "请稍后再试", "error");
        }

    }, 'json');
}


$(function () {
    $.ajax({
        type: 'GET',
        url: '/operation/content/get_all_post_comment_belong_one_top_post/',
        data: {'post_id': location.search.split("=")[1]},
        beforeSend: function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        dataType: 'json',
        success: function (data) {
            displayReply(data)
        },
        complete: function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //导航选中
    $(".dropdown_col_1").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var post_id = location.search.split("=")[1];
        var page = parseInt(curPage) - 1;
        $.get("/operation/content/get_all_post_comment_belong_one_top_post/", {
            'page': page,
            'post_id': post_id
        }, displayReply);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var post_id = location.search.split("=")[1];
        $.get("/operation/content/get_all_post_comment_belong_one_top_post/", {
            'page': page,
            'post_id': post_id
        }, displayReply);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var post_id = location.search.split("=")[1];
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/content/get_all_post_comment_belong_one_top_post/", {
                'page': page,
                'post_id': post_id
            }, displayReply);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var post_id = location.search.split("=")[1];
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/content/get_all_post_comment_belong_one_top_post/", {
                    'page': page,
                    'post_id': post_id
                }, displayReply);
            }

        }
    });

});
