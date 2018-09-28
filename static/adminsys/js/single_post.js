/**
 * Created by liao on 16/8/8.
 */

//筛选
function filter() {
    $.get("/operation/user/get_single_post_info/", {
        'post_id': post_id,
        'report_type': $("#report_type").val()
    }, displaySinglePost);
}

//展示发帖
function displaySinglePost(data) {

    var value = data;

    $(".single_post_list").html("");

    if (value.district == 1) {
        district = "答题广场";
    } else {
        district = "开小差";
    }

    $(".single_post_list").append(
        "<article class='post'>" +
        "<div class='post-head'>" +
        "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
        "<img id='author_photo' class='avatar' src='" + value.user_photo_store_path + "' width='70px' height='70px'>" +
        "</a>" +
        "<div class='post-meta'>" +

        "<div class='author_list'>" +
        "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
        "<span class='author'>" + value.author_name + "</span>" +
        "</a>" +
        "<span class='post_status'>" + value.status + "</span>" +
        "</div>" +

        "<ul class='meta-list'>" +
        "<li>" + "发布时间: " + "<time class='date'>" + value.create_time + "</time>" + "</li>" +
        "<li>" + "发布于: " + "<span id='district'>" + district + "</span>" + "</li>" +
        "<li>" + "学科: " + "<span id='subject'>" + value.subject + "</span>" + "</li>" +
        "<li>" + "学段: " + "<span id='grade'>" + value.grade + "</span>" + "</li>" +
        "<li>" + "学币: " + value.reward + "</li>" +
        "</ul>" +

        "</div>" +

        "</div>" +

        "<div class='post-content'>" +
        "<p>" + value.title + "<span id='post_id'>" + value.post_id + "</span>" + "</p>" +
        "<a class='fancybox-button' href='" + value.image_store_path + "' title='发帖图片'>" +
        "<p>" + "<img id='post_img" + value.post_id + "' src='" + value.image_store_path + "' height='200px' width='80%'>" + "</p>" +
        "</a>" +
        "</div>" +

        "<div class='post-footer'>" +
        "<div class='pull-right' id='" + value.post_id + "'>" +
        "<input type='radio' name='post_delete_reason' value='14'>" + "&nbsp;严重违规&nbsp;&nbsp;" +
        "<input type='radio' name='post_delete_reason' value='13'>" + "&nbsp;无关内容&nbsp;&nbsp;" +
        "<input type='radio' name='post_delete_reason' value='15'>" + "&nbsp;骗取采纳&nbsp;&nbsp;" +
        "<input type='radio' name='post_delete_reason' value='16'>" + "&nbsp;对刷作弊&nbsp;&nbsp;" +
        "<button class='btn btn-danger post_delete' id='post_delete_" + value.post_id + "' data-post-id= '" + value.post_id + "'>" + "一键删除" + "</button>" +
        "</div>" +
        "</div>" +

        "</article>"
    );

    if (value.is_deleted == true) {
        $("#" + value.post_id).html("<h3>已删除!</h3>");
    }


    if (value.image_store_path == "") {
        $("#post_img" + value.post_id).css("display", "none");
    }


}

//展示所有回复
function displayReply(data) {
    $(".single_reply_list").html('');
    $.each(data.post_comment_info_list, function (key, value) {

        $(".single_reply_list").append(
            "<article class='post' style='background: #e3e3e3'>" +
            "<div class='post-head'>" +
            "<div class='post-meta'>" +

            "跟帖人:" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<span class='author'>" + value.comment_user_name + "</span>" + "</a>" + "&nbsp;" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<img id='author_photo' src='" + value.comment_user_photo_store_path + "' width='30px' height='30px'>" + "</a>" + "&nbsp;&nbsp;&nbsp;" +
            "发布时间:" + "<time class='date'>" + value.create_time + "</time>" + "&nbsp;&nbsp;&nbsp;" +
            "回复内容:" + "<span id='comment'>" + value.comment_content + "</span>" +
            "</div>" +
            "</div>" +

            "<div class='post-content'>" +
            "<a class='fancybox-button' href='" + value.image_store_path + "' title='回复图片'>" +
            "<p>" + "<img id='comment_img" + value.post_comment_id + "' src='" + value.image_store_path + "' height='200px'>" + "</p>" +
            "</a>" +
            "</div>" +

            "<div class='post-footer'>" +
            "<div class='pull-right tag-list' id='" + value.post_comment_id + "'>" +
            "<input type='radio' name='reply_delete_reason' value='13'>" + "&nbsp;无关内容&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='14'>" + "&nbsp;严重违规&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='15'>" + "&nbsp;骗取采纳&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='16'>" + "&nbsp;对刷作弊&nbsp;&nbsp;" +
            "<button class='btn btn-danger reply_delete' id='reply_delete_" + value.post_comment_id + "' data-comment-id= '" + value.post_comment_id + "'>" + "一键删除" + "</button>" +
            "</div>" +
            "</div>" +
            "</article>"
        );

        if (value.is_deleted == true) {
            $("#" + value.post_comment_id).html("<h3>已删除!</h3>");
        }

        if (value.image_store_path == "") {
            $("#comment_img" + value.post_comment_id).css("display", "none");
        }
    })
}

$(function () {

    var post_id = $("#single_post_id").html();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //信息展示
    $.get("/operation/user/get_single_post_info/", {'post_id': post_id}, displaySinglePost);

    $.get("/operation/user/get_all_post_comment_belong_one_post/", {'post_id': post_id}, displayReply);


    //fancybox-button
    $(".fancybox-button").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
            title: {type: 'inside'},
            buttons: {}
        }
    });

    //一键删除发帖
    $(document).on("click", ".post_delete", function () {
        var post_id = $(this).data("post-id");
        var post_type = $("input[name=post_delete_reason]:checked").val();
        if (post_type == null) {
            alert("选择删除原因");
            return false;
        }
        $.get("/operation/user/delete_user_post/", {
            'post_id_or_post_id_list': post_id,
            'post_type': post_type
        }, function (data) {
            if (data.success) {
                swal("操作成功", "成功删除", "success");
                $("#" + post_id).html("<h3>已删除!</h3>");
            }
        });

    });


    //一键删除回帖
    $(document).on("click", ".reply_delete", function () {
        var comment_id = $(this).data("comment-id");
        var post_type = $("input[name=reply_delete_reason]:checked").val();
        if (post_type == null) {
            alert("选择删除原因");
            return false;
        }
        $.get("/operation/user/delete_post_comment/", {
            'comment_id_or_comment_id_list': comment_id,
            'comment_type': post_type
        }, function (data) {
            console.log(data);
            if (data.success) {
                swal("操作成功", "成功删除", "success");
                $("#" + comment_id).html("<h3>已删除!</h3>");
            }
        });

    });


});
