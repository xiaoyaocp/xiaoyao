/**
 * Created by xiaopang on 17/01/14.
 */

//图片地址获取
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

function showRequest(formData, jqForm, options) {
    swal({
        title: '上传中!',
        text: '请耐心等候',
        imageUrl: '/static/adminsys/img/hourglass.gif',
        animation: false
    })
    return true;
}

function showResponse(data) {
    swal.resetDefaults();
    if (data == "操作成功") {
        swal(data, "2秒后自动刷新", "success");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal(data, "上传失败请重试", "error");
    }
}

function skinDom(container, data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var currentItem = data[i];
        html += '' +
            '<ul id="skin-list">' +
            '	<li>' + currentItem.platform + '</li>' +
            '	<li><a class="glyphicon glyphicon-link" href="' + currentItem.image_url + '"></a></li>' +
            '	<li><a class="glyphicon glyphicon-link" href="' + currentItem.download_url + '"></a></li>' +
            '	<li>' + currentItem.display_name + '</li>' +
            '	<li>' + currentItem.res_name + '</li>' +
            '	<li>' + currentItem.pay_type + '</li>' +
            '	<li><a class="glyphicon glyphicon-edit" href="/operation/tool/app_skin_update_render/?info_id=' + currentItem.info_id + '"></a></li>' +
            '</ul>'
    }
    container.html(html);

}

//页数显示
function pageShow(data) {
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

//翻页
function pageSkip() {
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
}

$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");


    (function () {
        var api = '/operation/tool/get_app_skin_info_list/';
        var trumpetList = $('#trumpet-list');
        var data = {
            page: 1
        }
        $.get(api, data, function (res) {
            console.log(res);
            skinDom(trumpetList, res.app_skin_info_list);
        })
    })();

    (function () {
        var api = '/operation/tool/get_app_skin_info_list/';
        var data = {
            page: 1
        }
        $.get(api, data, function (res) {
            pageShow(res);
        })
    })();

    pageSkip();

    //皮肤包上传
    var options = {
        beforeSubmit: showRequest,
        success: showResponse
    };

    $('#skin_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});
