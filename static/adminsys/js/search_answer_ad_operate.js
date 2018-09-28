/**
 * Created by liao on 16/9/13.
 * Updated by xiaopang on 16/12/17
 */

//图片地址
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

function offLine(id) {
    $.post("/operation/tool/offline_search_ad/", {
        'ad_id': id
    }, function (data) {
        if (data.success) {
            swal({
                title: "下线成功,两秒后自动刷新",
                type: 'success'
            });
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal({
                title: data.error_msg,
                type: 'error'
            });
        }
    }, 'json')
}

//发送信息
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    console.log(queryString);
    return true;
}


//点击分享后展示内容
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

//返回信息
function showResponse(data) {
    if (data.success) {
        swal({
            title: '2秒后自动刷新',
            type: 'success'
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal({
            title: data.error_msg,
            type: 'error'
        });
    }
}

//获得图片尺寸大小
function getImageWidthAndHeight(id, callback) {
    var _URL = window.URL || window.webkitURL;
    $("#" + id).change(function (e) {
        var file, img;
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                callback && callback({
                    "width": this.width,
                    "height": this.height
                    // "filesize": file.size
                });
            };
            img.src = _URL.createObjectURL(file);
        }
    });
}


function displayBannerList(data) {

    console.log(data);
    $.each(data.search_ad_info_list, function (key, value) {
        console.assert('hello');
        console.assert(data.search_ad_info_list);
        $(".search_ad_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            " <div class='td_10 text-center'>" + value.name + "</div>" +
            " <div class='td_10 text-center'>" + value.on_off + "</div>" +
            " <div class='td_15 text-center'><a href='" + value.web_url + "' target='_blank' class='glyphicon glyphicon-link tooltips' data-toggle='tooltip' data-placement='bottom' title='相关链接' ></a></div>" +
            " <div class='td_15 text-center'>" + value.city + "</div>" +
            " <div class='td_20 text-center'>" +
            "     <img id = 'banner_img' src='" + value.image_url + "' width='150' height='50' />" +
            " </div>" +
            " <div class='td_15 text-center'>" + value.channel + "</div>" +
            "   <div class='td_operation' style='padding-left:2%;' id='operation_" + value.ad_id + "'>" +
            "       <a href='#' class='glyphicon glyphicon-trash tooltips' data-toggle='tooltip' data-placement='bottom' title='下线' onclick='offLine(" + value.ad_id + ")'>" + "</a>" +
            "   </div>" +
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

$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");


    checkShare();
    //提示工具
    $(document).tooltip();

    //日期选择
    $('#date_start_1').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    $('#date_end_1').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

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

    //加载
    $.ajax({
        type: 'GET',
        url: '/operation/tool/get_search_ad_info_list/',
        beforeSend: function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        success: function (data) {
            displayBannerList(data)
        },
        complete: function () {
            $(".loading_pic").css('display', 'none');
        }
    });

    //新帖图片展示banner
    $("#search_ad_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log('yes');
        if (objUrl) {
            $("#pic_show").attr("src", objUrl);
        }
    });

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/tool/get_search_ad_info_list/", {
            'page': page
        }, displayBannerList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/tool/get_search_ad_info_list/", {
            'page': page
        }, displayBannerList);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/tool/get_search_ad_info_list/", {
                'page': page
            }, displayBannerList);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/tool/get_search_ad_info_list/", {
                    'page': page
                }, displayBannerList);
            }

        }
    });

    // //检测图片大小尺寸
    // getImageWidthAndHeight('search_ad_pic', function (obj) {
    //     if (obj.width != 720 && obj.height != 160) {
    //         setTimeout(function () {
    //             swal({
    //                 title: '上传图片大小不符合要求',
    //                 type: 'error'
    //             })
    //         }, 500);
    //     } else {
    //         //新帖图片展示banner
    //         $("#search_ad_pic").change(function () {
    //             var objUrl = getObjectURL(this.files[0]);
    //             if (objUrl) {
    //                 $("#pic_show").attr("src", objUrl);
    //             }
    //         });
    //     }
    // });

    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#banner_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });


});