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

//提交测试
function fileCheck_wb() {
    if ($("#banner_pic").val() == '') {
        $("#banner_pic").focus();
        swal("请上传banner图！");
        return false;
    } else if ($("#date_start_1").val() == '') {
        swal("请选择上线时间");
        return false;
    } else if ($("#date_end_2").val() == '') {
        swal("请选择下线时间");
        return false;
    } else if ($("#wb_url").val() == '') {
        swal("请选择链接");
        return false;
    } else if ($("#share_title_w").val() == '') {
        swal("请输入标题");
        return false;
    } else {
        return true;
    }
}

function offLine(id) {
    $.post("/operation/tool/offline_the_banner/", {
        'banner_id': id
    }, function (data) {
        if (data.success) {
            swal("下线成功", "两秒后自动刷新", "success");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } else {
            swal(data.error_msg)
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
    if (data == "操作成功") {
        swal(data, "2秒后自动刷新", "success");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal(data, "操作失败请重试", "error");
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

    $(".banner_list").html('');

    $.each(data.banner_info_list, function (key, value) {

        $(".banner_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            " <div class='td_xs'>" + "&nbsp;" + "</div>" +
            " <div class='td_15 ellipsis'>" + value.share_title + "</div>" +
            " <div class='td_20'>" +
            "   <a class='fancybox-button' rel='gallery" + value.banner_id + "' href='" + value.image_path + "' title='banner图片'>" +
            "     <img id = 'banner_img' src='" + value.image_path + "' width='150' height='50' />" +
            "   </a>" +
            " </div>" +
            " <div class='td_20'>" + value.start_time + "</div>" +
            " <div class='td_20'>" + value.end_time + "</div>" +
            " <div class='td_10'>" + value.platform + "</div>" +

            " <div class='td_operation' id='operation_" + value.banner_id + "'>" +
            "   <a href='" + value.target_url + "' target='_blank' class='but_href tooltips' data-toggle='tooltip' data-placement='bottom' title='相关链接' >" + "</a>" +

            "   <a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线banner' onclick='offLine(" + value.banner_id + ")'>" + "</a>" +
            " </div>" +
            "</article>"
        );

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

    });

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
        url: '/operation/tool/get_banner_info_list/',
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
    $("#banner_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log('yes');
        if (objUrl) {
            $("#pic_show").attr("src", objUrl);
        }
    });
    //新帖图片展示新banner
    $("#new_banner_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log('yes');
        if (objUrl) {
            $("#new_pic_show").attr("src", objUrl);
        }
    });

    //检测图片大小尺寸
    getImageWidthAndHeight('banner_pic', function (obj) {
        if (obj.width != 720 && obj.height != 160) {
            setTimeout(function () {
                swal({
                    title: '上传图片大小不符合要求',
                    type: 'error'
                })
            }, 500);
        } else {
            //新帖图片展示banner
            $("#banner_pic").change(function () {
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $("#pic_show").attr("src", objUrl);
                }
            });
        }
    });
    getImageWidthAndHeight('new_banner_pic', function (obj) {
        console.log(obj.width + '---' + obj.height)
        if ((obj.width == 640 && obj.height == 282) || (obj.width == 750 && obj.height == 328)) {
            //新帖图片展示新banner
            $("#new_banner_pic").change(function () {
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $("#new_pic_show").attr("src", objUrl);
                }
            });
        } else {
            setTimeout(function () {
                swal({
                    title: '上传图片大小不符合要求',
                    type: 'error'
                })
            }, 500);
        }
    });

    //新banner上传
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#banner_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });


});