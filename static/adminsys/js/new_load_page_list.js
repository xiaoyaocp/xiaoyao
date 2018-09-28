function displayXiaolabaList(data) {

    // $(".trumpet-list").html('');
    var html = '';

    $.each(data.new_load_page_info_list, function (key, value) {
        html += '' +
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div class='td_10 ellipsis text_center'>" + value.activity_name + "</div>" +
            "   <div class='td_10 text_center'>" + value.group_name + "</div>" +
            "   <div class='td_15 text_center'>" + value.platform + "</div>" +
            "   <div class='td_10 text_center'>" + value.open_city + "</div>" +
            "   <div class='td_15 text_center'>" + value.expire_time + "</div>" +
            "   <div class='td_10 text_center'><a class='glyphicon glyphicon-link' href='" + value.ad_image_url + "'></a></div>" +
            "   <div class='td_10 text_center'><a class='glyphicon glyphicon-link' href='" + value.back_image_url + "'></a></div>" +
            "   <div class='td_operation text_center' style='padding-left:5%;' id='operation_" + value.activity_id + "'>" +
            "       <a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线小喇叭' onclick='offLine(" + value.group_id + ")'>" + "</a>" +
            "   </div>" +
            "</article>";
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

//下线小喇叭
function offLine(id) {
    swal({
        title: '确定要下线活动么？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(function (isConfirm) {
        if (isConfirm === true) {
            $.post("/operation/tool/offline_new_load_page/", {
                    'group_id': id
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

function getXiaolabaList() {
    var api = '/operation/tool/get_new_load_page_info_list/';
    var data = {
        page: 1
    }
    $.get(api, data, function (res) {
        console.log(res);
        displayXiaolabaList(res);
    })
}

$(function () {
    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    getXiaolabaList();

    //图片回显
    $("#share_image").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#share_image_show").attr("src", objUrl);
        }
    });

    //文本域绑定多个事件检测字数的变化
    $('#share_content').on('click keyup keypress', function () {
        var need_num = $('#need_num');

        need_num.html($(this).val().length);
    })

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