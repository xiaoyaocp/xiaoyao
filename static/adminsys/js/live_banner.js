/**
 * Created by xiaopang on 16/12/17
 */
function fileCheck_liveBanner() {
    checkedVal();
    var banner_pic = $('#banner_pic');
    var subGrade = $('#subGrade');
    var type = $('#type');
    var offline_time = $('#offline_time');

    if (banner_pic.val() == '') {
        swal({
            title: 'banner图片不能为空！',
            type: 'error'
        });
        return false;
    } else if (subGrade.val() == '') {
        swal({
            title: '年级不能为空！',
            type: 'error'
        });
        return false;
    } else if (type.val() == 0) {
        swal({
            title: '类型不能为空！',
            type: 'error'
        });
        return false;
    } else if (offline_time.val() == '') {
        swal({
            title: '下线时间不能为空！',
            type: 'error'
        });
        return false;
    } else {
        return true;
    }
}


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

function offlineBanner(id) {
    console.log(id);
    swal({
        title: '确定要下线活动么？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(function (isConfirm) {
        if (isConfirm === true) {
            $.post("/operation/tool/offline_live_banner/", {
                    'banner_id': id
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
                            title: data.error_msg,
                            type: 'error'
                        })
                    }
                });
        }
    })

}

// checkbox选中值，为了按后台需求格式方便传入后台，将其存入input框中
function checkedVal() {
    var checkedVal = [];
    var subGrade = $('#subGrade');
    $('input[name="gradeBox"]:checked').each(function(key, val) {
        checkedVal.push($(val).val());
    })
    var checkedStr = checkedVal.join('-');
    subGrade.val(checkedStr);
}

// 根据下拉列表选择的不同的内容，显示不同的后续输入框,这里未将事件拆分开
function showInput() {
    var type = $('#type');
    var targetCourse = $('#targetCourse');
    var targetUrl = $('#targetUrl');

    type.on('change', function() {
        if($(this).val() == 1) {
            targetUrl.css('display', 'block');
            targetCourse.css('display', 'none');
        } else if($(this).val() == 2) {
            targetUrl.css('display', 'none');
            targetCourse.css('display', 'block');
        } else {
            targetUrl.css('display', 'none');
            targetCourse.css('display', 'none');
        }
        checkedVal();
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
        // swal(data, "2秒后自动刷新", "success");
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

function displayBannerList(data) {

    // $(".live_banner_list").html('');
    var html = '';

    $.each(data.live_banner_info_list, function (key, value) {
        html += '' +
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div class='td_20'>" +
            "       <a class='fancybox-button' rel='gallery" + value.banner_id + "' href='" + value.image_path + "' title='banner图片'>" +
            "           <img id = 'banner_img' src='" + value.banner_image_url + "' width='150' height='50' />" +
            "       </a>" +
            "   </div>" +
            "   <div class='td_10 ellipsis text_center'>" + value.grade + "</div>" +
            // "   <div class='td_10 text_center'>" + value.teacher_user_id + "</div>" +
            "   <div class='td_15 text_center'>" + value.category + "</div>" +
            "   <div class='td_15 text_center'>" + value.target_course_id + "</div>" +
            "   <div class='td_10 text_center'>" + value.status + "</div>" +

            "   <div class='td_operation' style='padding-left:40px;'>" +
            "       <a href='" + value.target_url + "' target='_blank' class='but_href tooltips' data-toggle='tooltip' data-placement='bottom' title='相关链接' >" + "</a>" +
            "   </div>" +
            "   <div class='td_operation' style='padding-left:40px;' id='operation_" + value.banner_id + "'>" +
            "       <a href='#' class='but_delete tooltips' data-toggle='tooltip' data-placement='bottom' title='下线banner' onclick=offlineBanner('" + value.banner_id + "')></a>" +
            "   </div>" +
            "</article>";

    });
    $(".live_banner_list").html(html);
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

    //提示工具
    $(document).tooltip();

    //日期选择
    $('#offline_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    
    
    //日期选择
    $('#start_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    
    //图片回显
    (function() {
        $("#banner_pic").change(function () {
            var objUrl = getObjectURL(this.files[0]);
            if (objUrl) {
                $("#pic_show").attr("src", objUrl);
            }
        });
    })();

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
        url: '/operation/tool/get_live_banner_list/',
        beforeSend: function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        success: function (data) {
            displayBannerList(data);
        },
        complete: function () {
            $(".loading_pic").css('display', 'none');
        }
    });
    showInput();

    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/tool/get_live_banner_list/", {
            'page': page
        }, displayBannerList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/tool/get_live_banner_list/", {
            'page': page
        }, displayBannerList);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/tool/get_live_banner_list/", {
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
                $.get("/operation/tool/get_live_banner_list/", {
                    'page': page
                }, displayBannerList);
            }

        }
    });

    //新banner上传
    var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
    };

    $('#live_banner_form').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });


});