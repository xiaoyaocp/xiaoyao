/**
 * Created by liruinan on 2017/2/17.
 */
/**
 * Created by xiaopang on 17/01/17.
 */

function displayCardDom(data) {
    var curPage = data.current_page;
    var maxPage = data.all_page;
    var trumpetList = $('#trumpet-list');
    var html = '';
    $.each(data.afanti_live_coupon_info_list, function (key, currentItem) {
        html += '' +
            '<ul class="card-list">' +
            '<li>' + currentItem.coupon_id + '</li>' +
            '<li>' + currentItem.category + '</li>' +
            '<li>' + currentItem.account + '</li>' +
            '<li>' + currentItem.discount + '</li>' +
            '<li>' + currentItem.valid_days + '</li>' +
            '<li>' + currentItem.min_price + '</li>' +
            '<li class="ellipsis" data-toggle="tooltip" data-placement="bottom" title="' + currentItem.recommend_course_ids + '">' + currentItem.recommend_course_ids + '</li>' +
            '</ul>'
    });

    trumpetList.html(html);

    //页数显示
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

// 检查数据内容是否为空
function fileCheckCard() {

    var from_time = $('#from_time');
    var to_time = $('#to_time');
    var charge_amount = $('#charge_amount');
    var card_amount = $('#card_amount');
    var package_name = $('#package_name');

    if (from_time.val() == '') {
        swal({
            title: '开始时间不能为空！',
            type: 'error'
        });
        return false;
    } else if (to_time.val() == '' || platform.val() == undefined) {
        swal({
            title: '结束时间不能为空！',
            type: 'error'
        });
        return false;
    } else if (charge_amount.val() == '') {
        swal({
            title: '优惠券金额不能为空！',
            type: 'error'
        });
        return false;
    } else if (card_amount.val() == '' || is_share.val() == undefined) {
        swal({
            title: '优惠券数量不能为空！',
            type: 'error'
        });
        return false;
    } else if (package_name.val() == '' || is_share.val() == undefined) {
        swal({
            title: '卡名不能为空！',
            type: 'error'
        });
        return false;
    } else {
        return true;
    }
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
            type: "success"
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

//翻页
function pageSkip() {
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/user/get_live_coupon_list/", {
            'page': page
        }, displayCardDom);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/user/get_live_coupon_list/", {
            'page': page
        }, displayCardDom);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/get_live_coupon_list/", {
                'page': page
            }, displayCardDom);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/get_live_coupon_list/", {
                    'page': page
                }, displayCardDom);
            }

        }
    });
}

$(function () {

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //日期插件
    $('#from_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    $('#to_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });


    (function () {
        var api = '/operation/user/get_live_coupon_list/';
        var data = {
            page: 1
        }
        $.get(api, data, function (res) {
            console.log(res);
            displayCardDom(res);
        })
    })();

    pageSkip();

    // 生成直播课优惠券
    (function () {
        var dowloadCard = $('#dowload-card');
        dowloadCard.on('click', function () {
            swal({
                title: '确定要生成直播优惠券么？',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(function (isConfirm) {
                if (isConfirm === true) {
                    window.location.href = '/operation/user/export_live_card_info_file/';   // 下载调用的地址
                }
            }, function (isConfirm) {
                if (isConfirm === 'cancel') {
                    window.location.reload();
                }
            });
        });
    })();

    //创建直播课优惠券
    var options = {
        beforeSubmit: showRequest,
        success: showResponse
    };

    $('#create_live_card').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});
