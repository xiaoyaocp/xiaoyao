function displayBusinessList(data) {

    // $(".trumpet-list").html('');
    var html = '';

    $.each(data.business_post_info_list, function (key, value) {
        console.log(value);
        html += '' +
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div style='display:none;'>" + value.post_id + "</div>" +
            "   <div class='td_10 ellipsis text_center'>" + value.user_name + "</div>" +
            "   <div class='td_15 ellipsis text_center'>" + value.title + "</div>" +
            "   <div class='td_5s text_center'>" + value.category + "</div>" +
            "   <div class='td_10 text_center'><a href='" + value.image_store_path + "' class='glyphicon glyphicon-link'></a></div>" +
            "   <div class='td_10 text_center'><a href='" + value.target_url + "' class='glyphicon glyphicon-link'></a></div>" +
            "   <div class='td_10 text_center'><a href='" + value.user_photo_store_path + "' class='glyphicon glyphicon-link'></a></div>" +
            "   <div class='td_10 text_center'>" + value.on_off + "</div>" +
            "   <div class='td_10 text_center'>" + value.platform + "</div>" +

            "   <div class='td_operation text_center' style='padding-left:5%;' id='operation_" + value.post_id + "'>" +
            "       <a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线小喇叭' onclick='offLine(" + value.post_id + ")'>" + "</a>" +
            "   </div>" +
            "</article>"
    });
    $("#trumpet-list").html(html);

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

//下线商业合作
function offLine(id) {
    swal({
        title: '确定要下线活动么？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(function (isConfirm) {
        if (isConfirm === true) {
            $.post("/operation/tool/offline_business_post/", {
                    'post_id': id
                },
                function (data) {
                    console.log(data);
                    if (data.success) {
                        swal({
                            title: "下线成功,两秒后自动刷新!",
                            type: "success",
                            showConfirmButton: false
                        });
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000)
                    } else {
                        swal({
                            title: '操作失败，请重试！',
                            type: 'error'
                        })
                    }
                });
        }
    })
}

function getBusinessList() {
    var api = '/operation/tool/get_business_post_info_list/';
    var data = {
        page: 1
    }
    $.get(api, data, function (res) {
        console.log(res);
        displayBusinessList(res);
    })
}

$(function () {
    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    getBusinessList();

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/tool/get_latest_activity_info_list/", {
            'page': page
        }, displayXiaolabaList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/tool/get_latest_activity_info_list/", {
            'page': page
        }, displayXiaolabaList);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/tool/get_latest_activity_info_list/", {
                'page': page
            }, displayXiaolabaList);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/tool/get_latest_activity_info_list/", {
                    'page': page
                }, displayXiaolabaList);
            }

        }
    });
})