/**
 * Created by liao on 16/5/24.
 */

function filter() {
    var user_id = $("#user_id_reply").html();
    var district = $("#district").val();
    var date_range = $("#datefilter").val();
    $.get("/operation/user/get_user_all_post_comment/", {
        'user_id': user_id,
        'district': district,
        'date_range': date_range
    }, displayUserReply);

}


function displayUserReply(data) {
    console.log(data);
    $(".user_reply_list").html("");
    $.each(data.user_post_comment_list, function (key, value) {
        $(".user_reply_list").append(
            "<article class='post'>" +

            "<div class='post-head'>" +
            "<input type='checkbox' class='batch_input' name='batch_delete' value='" + value.comment_id + "'>" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<img id='author_photo' class='avatar' src='" + value.user_photo_store_path + "' width='70px' height='70px'>" +
            "</a>" +
            "<div class='post-meta'>" +

            "<div class='author_list'>" +
            "原贴作者: " +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "'>" +
            "<span class='author'>" + value.author_name + "</span>" +
            "</a>" +
            "</div>" +

            "<ul class='meta-list'>" +
            "<li>" + "回复时间: " + "<time class='date'>" + value.create_time + "</time>" + "</li>" +
            "</ul>" +

            "</div>" +

            "<div class='pull-left'>" +
            "<p style='float: left'>" + "原帖图片:&nbsp;&nbsp;&nbsp;" + "</p>" +
            "<a class='fancybox-button' href='" + value.image_store_path + "' title='原帖图片'>" +
            "<img src='" + value.image_store_path + "' height='70px' width='140px' style='float: left'>" +
            "</a>" +
            "</div>" +

            "</div>" +

            "<div class='post-content'>" +
            "<p>" + "<span id='comment'>" + value.comment_content + "</span>" + "</p>" +
            "<a class='fancybox-button' href='" + value.comment_image_store_path + "' title='回复图片'>" +
            "<p>" + "<img id='comment_img" + value.comment_id + "' src='" + value.comment_image_store_path + "' height='200px' width='80%'>" + "</p>" +
            "</a>" +
            "</div>" +

            "<div class='post-footer'>" +
            "<div class='pull-right tag-list' id='" + value.comment_id + "'>" +
            "<input type='radio' name='reply_delete_reason' value='13'>" + "&nbsp;无关内容&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='14'>" + "&nbsp;严重违规&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='15'>" + "&nbsp;骗取采纳&nbsp;&nbsp;" +
            "<input type='radio' name='reply_delete_reason' value='16'>" + "&nbsp;对刷作弊&nbsp;&nbsp;" +
            "<button class='btn btn-danger reply_delete' id='reply_delete_" + value.comment_id + "' data-comment-id= '" + value.comment_id + "'>" + "一键删除" + "</button>" +
            "</div>" +
            "</div>" +
            "</article>"
        );


        if (value.is_deleted == true) {
            //$("#reply_delete_" + value.comment_id).attr('disabled', 'disabled');
            $("#" + value.comment_id).html("<h3>已删除!</h3>");
        }

        if (value.comment_image_store_path == "") {
            $("#comment_img" + value.comment_id).css("display", "none");
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


$(function () {

    var user_id = $("#user_id_reply").html();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //信息展示
    $.get("/operation/user/get_user_all_post_comment/", {'user_id': user_id}, displayUserReply);

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
        var district = $("#district").val();
        var date_range = $("#datefilter").val();
        $.get("/operation/user/get_user_all_post_comment/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range
        }, displayUserReply);
    });

    //全选
    $("#SelectAll").click(function () {
        if ($("#SelectAll").is(":checked") == true) {
            $("input[name=batch_delete]").prop("checked", true);
        } else {
            $("input[name=batch_delete]").prop("checked", false);
        }
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

        var comment_id_or_comment_id_list = ids.join("-");
        var comment_type = $("#batch_delete_reason").val();

        $.get("/operation/user/delete_post_comment/", {
            'comment_id_or_comment_id_list': comment_id_or_comment_id_list,
            'comment_type': comment_type
        }, function (data) {
            if (data.success) {
                swal("操作成功", "成功删除", "success");
            } else {
                alert("删除失败，请稍后再试");
            }

        });
    });


    //一键删除回帖
    $(document).on("click", ".reply_delete", function () {
        var comment_id = $(this).data("comment-id");
        var comment_type = $("input[name=reply_delete_reason]:checked").val();
        if (comment_type == null) {
            alert("选择删除原因");
            return false;
        }
        $.get("/operation/user/delete_post_comment/", {
            'comment_id_or_comment_id_list': comment_id,
            'comment_type': comment_type
        }, function (data) {
            if (data.success) {
                swal("操作成功", "成功删除", "success");
                $("#" + comment_id).html("<h3>已删除!</h3>");
            }
        });
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var date_range = $("#datefilter").val();
        var district = $("#district").val();
        $.get("/operation/user/get_user_all_post_comment/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range,
            'page': page
        }, displayUserReply);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var date_range = $("#datefilter").val();
        var district = $("#district").val();
        $.get("/operation/user/get_user_all_post_comment/", {
            'user_id': user_id,
            'district': district,
            'date_range': date_range,
            'page': page
        }, displayUserReply);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var date_range = $("#datefilter").val();
        var district = $("#district").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/user/get_user_all_post_comment/", {
                'user_id': user_id,
                'district': district,
                'date_range': date_range,
                'page': page
            }, displayUserReply);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var date_range = $("#datefilter").val();
            var district = $("#district").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/user/get_user_all_post_comment/", {
                    'user_id': user_id,
                    'district': district,
                    'date_range': date_range,
                    'page': page
                }, displayUserReply);
            }

        }
    });
})
