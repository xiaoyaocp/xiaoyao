/**
 * Created by liao on 16/5/23.
 */


function filter() {
    var user_id = $("#user_id_post").html();
    var district = $("#district").val();
    var date_range = $("#datefilter").val();
    $.get("/operation/user/get_user_all_post/", {
        'user_id': user_id,
        'district': district,
        'date_range': date_range
    }, displayUserPost);

}


//展示所有发帖
function displayUserPost(data) {
    $(".user_post_list").html("");

    $.each(data.user_post_list, function (key, value) {

        if (value.district == 1) {
            var district = "答题广场";
        } else {
            var district = "开小差";
        }

        $(".user_post_list").append(
            "<article class='post'>" +

            "<div class='post-head'>" +
            "<input type='checkbox' class='batch_input' name='batch_delete' value='" + value.post_id + "'>" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<img id='author_photo' class='avatar' src='" + value.user_photo_store_path + "' width='70px' height='70px'>" + +"</a>" +
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
            "<a class='btn btn-default reply_display' data-post-id= '" + value.post_id + "'>" + "查看回复" + "</a>" +
            "<div class='pull-right' id='" + value.post_id + "'>" +
            "<input type='radio' name='post_delete_reason' value='14'>" + "&nbsp;严重违规&nbsp;&nbsp;" +
            "<input type='radio' name='post_delete_reason' value='13'>" + "&nbsp;无关内容&nbsp;&nbsp;" +
            "<input type='radio' name='post_delete_reason' value='15'>" + "&nbsp;骗取采纳&nbsp;&nbsp;" +
            "<input type='radio' name='post_delete_reason' value='16'>" + "&nbsp;对刷作弊&nbsp;&nbsp;" +
            "<button class='btn btn-danger post_delete' id='post_delete_" + value.post_id + "' data-post-id= '" + value.post_id + "'>" + "一键删除" + "</button>" +
            "</div>" +
            "</div>" +

            "<div class='row'>" +
            "<div class='reply_list' id='reply_list_" + value.post_id + "'>" +
            //插入回复
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

    })
}

//展示所有回复
function displayReply(data) {

    $.each(data.post_comment_info_list, function (key, value) {

        if (value.type > 50) {
            var type = "快捷";
        } else {
            var type = "";
        }

        if (value.status == 1) {
            var show = "block";
        } else {
            var show = "none";
        }


        $("#reply_list_" + value.post_id).append(
            "<article class='post wrapper' style='background: #e3e3e3'>" +
            "<div class='ribbon-wrapper-green' style='display:" + show + "'>" + "<div class='ribbon-green'>" + "被采纳" + "</div>" + "</div>" +
            "<div class='post-head'>" +
            "<div class='post-meta' style='width:100%;'>" +
            "<p>" +
            "跟帖人:" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<span class='author'>" + value.comment_user_name + "</span>" + "</a>" + "&nbsp;" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<img id='author_photo' src='" + value.comment_user_photo_store_path + "' width='30px' height='30px'>" + "</a>" + "&nbsp;&nbsp;&nbsp;" +
            "发布时间:" + "<time class='date'>" + value.create_time + "</time>" + "&nbsp;&nbsp;&nbsp;" +
            "类型:" + type + "&nbsp;&nbsp;&nbsp;" +
            "</p>" +
            "</div>" +
            "</div>" +

            "<div class='post-content'>" +
            "回复内容:" + "<span id='comment'>" + value.comment_content + "</span>" + "&nbsp;&nbsp;&nbsp;" +
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
            //$("#reply_delete_" + value.post_comment_id).attr('disabled','disabled');
            $("#" + value.post_comment_id).html("<h3>已删除!</h3>");
        }

        console.log(value.image_store_path);

        if (value.image_store_path == "") {
            $("#comment_img" + value.post_comment_id).css("display", "none");
        }


    })
}

$(function () {

    var user_id = $("#user_id_post").html();
    var district = $("#district").val();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //信息展示
    $.get("/operation/user/get_user_all_post/", {
        'user_id': user_id
    }, displayUserPost);


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

    //全选
    $("#SelectAll").click(function () {
        if ($("#SelectAll").is(":checked") == true) {
            $("input[name=batch_delete]").prop("checked", true);
        } else {
            $("input[name=batch_delete]").prop("checked", false);
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
            if (data.success) {
                swal("操作成功", "成功删除", "success");
                $("#" + comment_id).html("<h3>已删除!</h3>");
            }
        });

    });


    //批量删除
    $(".batch_delete").click(function () {


        var ids = new Array(); //声明一个存放id的数组
        $("input[name=batch_delete]").each(function (i, d) {
            if (d.checked) {
                ids.push(d.value);
            }
        })
        if (ids.length < 1) {
            alert("请选中帖子!");
            return false;
        }

        var post_id_or_post_id_list = ids.join("-");
        var post_type = $("#batch_delete_reason").val();

        $.get("/operation/user/delete_user_post/", {
            'post_id_or_post_id_list': post_id_or_post_id_list,
            'post_type': post_type
        }, function (data) {
            if (data.success) {
                swal("操作成功", "成功删除", "success");
            } else {
                alert("删除失败，请稍后再试");
            }

        });
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


    //时间筛选
    $("#filter-btn").click(function () {
        var user_id = $("#user_id_post").html();
        var district = $("#district").val();
        var date_range = $("#datefilter").val();
        $.get("/operation/user/get_user_all_post/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range
        }, displayUserPost);
    });


    //回复展示
    $(document).on("click", ".reply_display", function () {
        var post_id = $(this).data("post-id");
        $("#reply_list_" + post_id).html('');
        $.get("/operation/user/get_all_post_comment_belong_one_post/", {
            'post_id': post_id
        }, displayReply)

    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var date_range = $("#daterange").val();
        $.get("/operation/user/get_user_all_post/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range,
            'page': page
        }, displayUserPost);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var date_range = $("#daterange").val();
        $.get("/operation/user/get_user_all_post/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range,
            'page': page
        }, displayUserPost);
    });


    $('.skipBtn').click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var date_range = $("#daterange").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/get_user_all_post/", {
                'user_id': user_id,
                'district': district,
                'date_range': date_range,
                'page': page
            }, displayUserPost);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var date_range = $("#daterange").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/get_user_all_post/", {
                    'user_id': user_id,
                    'district': district,
                    'date_range': date_range,
                    'page': page
                }, displayUserPost);
            }

        }
    });


});
