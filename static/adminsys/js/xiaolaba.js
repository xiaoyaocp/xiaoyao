function displayXiaolabaList(data) {

    // $(".trumpet-list").html('');
    var html = '';

    $.each(data.latest_activity_info_list, function (key, value) {
        html += '' +
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div style='display:none;'>" + value.activity_id + "</div>" +
            "   <div class='td_10 ellipsis'>" + value.title + "</div>" +
            "   <div class='td_10'>" + value.activity_name + "</div>" +
            "   <div class='td_10'>" + value.open_city + "</div>" +
            "   <div class='td_5s'><a class='glyphicon glyphicon-link' href='" + value.web_url + "'></a></div>" +
            "   <div class='td_10'>" + value.share + "</div>" +
            "   <div class='td_10 ellipsis'>" + value.share_title + "</div>" +
            "   <div class='td_10 ellipsis'>" + value.share_content + "</div>" +
            "   <div class='td_5s'><a class='glyphicon glyphicon-link' href='" + value.share_url + "'></a></div>" +
            "   <div class='td_5s'><a class='glyphicon glyphicon-link' href='" + value.share_image + "'></a></div>" +
            "   <div class='td_operation' style='padding-left:5%;' id='operation_" + value.active_id + "'>" +
            "       <a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线小喇叭' onclick='offLine(" + value.activity_id + ")'>" + "</a>" +
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

//分享后的页面展示
function checkShare() {
    var share = $('#share');
    var no_share = $('#no_share');
    var share_tab = $('#share_tab');
    share.click(function () {
        share_tab.css('display', 'block');
    });
    no_share.click(function () {
        share_tab.css('display', 'none');
    })
}

//上线小喇叭摸态框检测
function fileCheck_xiaolaba() {
    var title = $('#title');
    var platform = $('input[name="platform"]:checked');
    var is_share = $('input[name="is_share"]:checked');
    var url_href = $('#url_href');
    var open_city = $('#city');
    var share_title = $('#share_title');
    var share_content = $('#share_content');
    var share_image = $('#share_image');

    console.log(platform.val());
    console.log(is_share.val());
    console.log(share_image.val());

    if (title.val() == '') {
        swal({
            title: '活动标题不能为空！',
            type: 'error'
        });
        return false;
    } else if (platform.val() == '' || platform.val() == undefined) {
        swal({
            title: '上线渠道不能为空！',
            type: 'error'
        });
        return false;
    } else if (url_href.val() == '') {
        swal({
            title: '跳转链接不能为空！',
            type: 'error'
        });
        return false;
    } else if (is_share.val() == '' || is_share.val() == undefined) {
        swal({
            title: '是否分享不能为空！',
            type: 'error'
        });
        return false;
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
            $.post("/operation/tool/offline_latest_activity/", {
                    'activity_id': id
                },
                function (data) {
                    console.log(data);
                    if (data.success) {
                        swal({
                            title: "下线成功,两秒后自动刷新!",
                            type: "success",
                            showConfirmButton: false
                        });
                        setTimeout(function() {
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
    var api = '/operation/tool/get_latest_activity_info_list/';
    var data = {
        page: 1
    }
    $.get(api, data, function (res) {
        console.log(res);
        displayXiaolabaList(res);
    })
}

//发送信息
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    console.log(queryString);
    return true;
}

//返回信息
function showResponse(data) {
    if (data.success) {
        swal({
            title: "2秒后自动刷新",
            type: "success",
            showConfirmButton: false
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal({
            title: data.error_msg,
            type: "error"
        });
    }
}


$(function () {
    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    getXiaolabaList();
    checkShare();

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

    //下喇叭上传完后操作
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#xiaolaba_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

})