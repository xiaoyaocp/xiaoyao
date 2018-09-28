/**
 * Created by liao on 16/5/9.
 */

//展示所有用户
function displayUser(data) {
    $(".user_list").html("");
    $.each(data.user_info_list, function (key, value) {
        $(".user_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "<div class='td_xs'>" + "&nbsp;" + "</div>" +
            "<div class='td_10 ellipsis'>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + " ' target='_blank' title='" + value.username + "'>" + value.username + "</a>" + "</div>" +
            "<div class='td_15'>" + value.type + "</div>" +
            "<div class='td_15'>" + value.cellphone + "</div>" +
            "<div class='td_10'>" + value.balance + "</div>" +
            "<div class='td_15'>" + value.register_ip + "</div>" +
            //"<div class='td_10'>" + value.city + "</div>" +
            "<div class='td_20'>" + value.register_time + "</div>" +
            "<div class='td_10'>" + value.invite_code + "</div>" +
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

//查询用户检测
function checkUserSearch() {
    var query = $("#query").val();
    if (query == '') {
        swal("请输入想要查找的用户名或手机号");
        return false;
    } else {
        return true;
    }
}


$(function () {

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //用户搜索
    $("#searchBtn").click(function () {
        var query = $("#query").val();
        var user_type = $("#user_type").val();
        $.ajax({
            'type': 'GET',
            'url': '/operation/user/search_user/',
            'data': {'query': query, 'user_type': user_type},
            'beforeSend': function () {
                $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
            },
            'dataType': 'json',
            'success': function (data) {
                displayUser(data)
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
            var user_type = $("#user_type").val();
            $.ajax({
                'type': 'GET',
                'url': '/operation/user/search_user/',
                'data': {'query': query, 'user_type': user_type},
                'beforeSend': function () {
                    $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
                },
                'dataType': 'json',
                'success': function (data) {
                    displayUser(data)
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
        var user_type = $("#user_type").val();
        $.get("/operation/user/search_user/", {
            'query': query,
            'user_type': user_type,
            'page': page
        }, displayUser);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var query = $("#query").val();
        var user_type = $("#user_type").val();
        $.get("/operation/user/search_user/", {
            'query': query,
            'user_type': user_type,
            'page': page
        }, displayUser);
    })

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var query = $("#query").val();
        var user_type = $("#user_type").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/search_user/", {
                'query': query,
                'user_type': user_type,
                'page': page
            }, displayUser);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var query = $("#query").val();
            var user_type = $("#user_type").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/search_user/", {
                    'query': query,
                    'user_type': user_type,
                    'page': page
                }, displayUser);
            }
        }
    });


})
