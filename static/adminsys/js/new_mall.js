/**
 * Created by liao on 16/8/4.  \"" + value[i].id + "\"
 */

//筛选功能
function filter() {
    var good_type = $("#good_type").val();
    var order_by_time = $("#create_time").val();
    var status = $("#goods_status").val();
    var time_range = $("#datefilter").val();
    var cellphone = $("#query").val();
    $.get("/operation/reward/get_new_mall_exchange_list/", {
        'status': status,
        'cellphone': cellphone,
        'good_type': good_type,
        'order_by_time': order_by_time,
        'time_range': time_range
    }, displayMallList);
}

//下载功能
function download_file() {
    var y = confirm("确定下载？");
    if (y == true) {
        var good_type = $("#good_type").val();
        var order_by_time = $("#create_time").val();
        var status = $("#goods_status").val();
        var time_range = $("#datefilter").val();
        var cellphone = $("#query").val();
        window.location.href = '/operation/reward/download_new_mall_exchange_list_info/?good_type=' + good_type + '&order_by_time=' + order_by_time + '&status=' + status + '&time_range=' + time_range + '&cellphone=' + cellphone;
    }
}


//通过
function goods_pass(record_id) {

    $.post("/operation/reward/operate_new_goods_record/", {
        'new_goods_record_id': record_id,
        'operate_type': 'pass'
    }, function (data) {

        if (data.success) {

            $("#status_" + record_id).html('审核通过');
            $("#operate_" + record_id).html("<input type='button' class='btn btn-success btn-xs deliverBtn' onclick='goods_delivery(" + record_id + ")' value='发货'>&nbsp;<input type='button' class='btn btn-primary btn-xs revokeBtn' onclick='goods_revoke(" + record_id + ")' value='撤销'>");
        }

    }, 'json');

}

//发货
function goods_delivery(record_id) {

    $.post("/operation/reward/operate_new_goods_record/", {
        'new_goods_record_id': record_id,
        'operate_type': 'deliver'
    }, function (data) {

        if (data.success) {

            $("#status_" + record_id).html('已发货');
            $("#operate_" + record_id).html("<span style='color:green'>已发货</span>");
        }

    }, 'json');
}


//拒绝
function goods_reject(record_id) {

    var reason_id = "reason_" + record_id;
    var reason = $("#" + reason_id).val();
    var remark_id = "remark_" + record_id;
    var remark = $("#" + remark_id).val();
    var reason_text;
    if (reason == 1) {
        reason_text = "传播色情反动人身攻击内容"
    }
    else if (reason == 2) {
        reason_text = "对刷作弊"
    }
    else if (reason == 3) {
        reason_text = "骗采纳"
    }
    else if (reason == 5) {
        reason_text = "其他"
    }
    else if (reason == 6) {
        reason_text = "发广告"
    }
    else if (reason == 7) {
        reason_text = "无意义的解答"
    }
    else if (reason == 9) {
        reason_text = "频繁发布非作业贴"
    }
    else if (reason == 10) {
        reason_text = "不当使用邀请码"
    }

    if (reason == 0) {
        swal("请选择拒绝原因！");
    } else {

        $.post("/operation/reward/operate_new_goods_record/", {
            'new_goods_record_id': record_id,
            'operate_type': 'reject',
            'reason': reason,
            'remark': remark
        }, function (data) {
            if (data.success == false) {
                $("#status_" + record_id).html('请求被拒绝');
                $("#operate_" + record_id).html("<p style='color:red'>" + "已拒绝" + "</p>" + "<p>" + "拒绝原因：" + reason_text + "</p>");

            }

        }, 'json');

    }

}


//撤销
function goods_revoke(record_id) {

    $.post("/operation/reward/operate_new_goods_record/", {
        'new_goods_record_id': record_id,
        'operate_type': 'revoke'

    }, function (data) {

        if (data.success) {

            $("#status_" + record_id).html('待审核');
            $("#operate_" + record_id).html("<div id='operate_panel_" + record_id + "'>" + "<select class='form-control' id='reason_" + record_id + "' name='reject_reason'>" + "<option value='0'>" + "空" + "</option>" + "<option value='1'>" + "传播色情反动人身攻击内容" + "</option>" + "<option value='2'>" + "对刷作弊" + "</option>" + "<option value='3'>" + "骗采纳" + "</option>" + "<option value='5'>" + "其他" + "</option>" + "<option value='6'>" + "发广告" + "</option>" + "<option value='7'>" + "无意义的解答" + "</option>" + "<option value='9'>" + "频繁发布非作业贴" + "</option>" + "<option value='10'>" + "不当使用邀请码" + "</option>" + "</select>" + "<input class='form-control' type='text' id='remark_" + record_id + " name='refuse_remark' placeholder='备注' value =''>" + "<input type='button' class='btn btn-warning btn-xs passBtn' value='通过' onclick = 'goods_pass(" + record_id + ")' />" + "<input type='button' class='btn btn-danger btn-xs rejectBtn' value='拒绝' onclick = 'goods_reject(" + record_id + ")' />" + "</div>");

        }

    }, 'json');

}


function displayMallList(data) {
    $(".exchange_list").html('');
    console.log(data);
    $.each(data.new_mall_exchange_list, function (key, value) {
        $(".exchange_list").append(
            "<tr>" +
            "<td>" + "<input name='student_info' type='checkbox' class='all_post' value=' " + value.record_id + "'>" + "</td>" +
            "<td>" +
            "<p>" + "订单号: " + value.record_id + "</p>" +
            "<p>" + value.goods_name + "</p>" +
            "<p style='color:red'>" + "<b>" + value.goods_type + "</b>" + "</p>" +
            "</td>" +
            "<td>" + value.money + "</td>" +
            "<td>" + value.credits + "</td>" +
            "<td>" + value.real_name + "</td>" +
            "<td>" +
            "<p>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "' target='_blank'>" + value.user_name + "</a>" + "</p>" +
            "<p>" + "<a class='btn btn-info btn-xs' data-toggle='collapse' data-parent='#accordion' href='#userInfo_" + value.record_id + "'>" + "用户信息" + "</a>" + "</p>" +
            "<div id='userInfo_" + value.record_id + "' class='panel-collapse collapse'>" +
            //"<p>" + "采纳率: " + value.post_and_accept_num_rate + "</p>" +
            //"<p>" + "被采纳率: " + value.reply_post_and_accepted_num_rate + "</p>" +
            //"<p>" + "邀请数: " + value.invite_user_num + "</p>" +
            "<p>" + "收货地址: " + value.correspondence_address + "</p>" +
            "<p>" + "总兑换次数: " + value.exchange_num + "</p>" +
            "<p>" + "兑换失败次数: " + value.exchange_fail_num + "</p>" +
            "</div>" +
            "</td>" +
            "<td>" + value.cellphone + "</td>" +
            "<td>" + value.qq + "</td>" +
            "<td>" + value.remark + "</td>" +
            "<td>" + value.create_time + "</td>" +
            "<td>" + value.update_time + "</td>" +
            "<td id='status_" + value.record_id + "'>" + "</td>" +
            "<td id='operate_" + value.record_id + "' class='operation_panel'>" + "</td>" +
            "</tr>"
        );


        //1表示待审核，2表示待支付，3表示待发货，4表示已收货，5表示被拒绝
        if (value.status == 1) {

            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<div id='operate_panel_" + value.record_id + "'>" +
                "<select class='form-control' id='reason_" + value.record_id + "' name='reject_reason'>" +
                "<option value='0'>" + "空" + "</option>" +
                "<option value='1'>" + "传播色情反动人身攻击内容" + "</option>" +
                "<option value='2'>" + "对刷作弊" + "</option>" +
                "<option value='3'>" + "骗采纳" + "</option>" +
                "<option value='5'>" + "其他" + "</option>" +
                "<option value='6'>" + "发广告" + "</option>" +
                "<option value='7'>" + "无意义的解答" + "</option>" +
                "<option value='9'>" + "频繁发布非作业贴" + "</option>" +
                "<option value='10'>" + "不当使用邀请码" + "</option>" +
                "</select>" +
                "<input class='form-control' type='text' id='remark_" + value.record_id + " name='refuse_remark' placeholder='备注' value =''>" +
                "<input type='button' class='btn btn-warning btn-xs passBtn' value='通过' onclick = 'goods_pass( " + value.record_id + " )' />" +
                "<input type='button' class='btn btn-danger btn-xs rejectBtn' value='拒绝' onclick='goods_reject( " + value.record_id + ")' />" +
                "</div>"
            );
        } else if (value.status == 2) {
            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<input type='button' class='btn btn-success btn-xs deliverBtn' onclick='goods_delivery(" + value.record_id + ")' value='发货'>" +
                "<input type='button' class='btn btn-primary btn-xs deliverBtn' onclick='goods_revoke(" + value.record_id + ")' value='撤销'>"
            );
        } else if (value.status == 3) {

            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<p style='color:green'>已发货</p>"
            );
        } else if (value.status == 4) {

            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<p style='color:orange'>用户已收货</p>"
            );

        } else if (value.status == 5) {

            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<p style='color:red'>已拒绝</p>" +
                "<p>拒绝原因：" + value.reject_reason + "</p>"
            );
        }

    })

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
    $(".dropdown_col_3").addClass("active").siblings().removeClass("active");

    //加载信息
    $.get("/operation/reward/get_new_mall_exchange_list/", {}, displayMallList);

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


    //checkbox全选，jQuery1.6+后用prop()代替attr()
    $("#SelectAll").click(function () {
        if ($("#SelectAll").is(":checked") == true) {
            $("input[name=student_info]").prop("checked", true);
        } else {
            $("input[name=student_info]").prop("checked", false);
        }
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/reward/get_new_mall_exchange_list/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'good_type': $("#good_type").val(),
            'order_by_time': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayMallList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/reward/get_new_mall_exchange_list/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'good_type': $("#good_type").val(),
            'order_by_time': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayMallList);
    });

    $('.skipBtn').click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/reward/get_new_mall_exchange_list/", {
                'status': $("#goods_status").val(),
                'cellphone': $("#query").val(),
                'good_type': $("#good_type").val(),
                'order_by_time': $("#create_time").val(),
                'time_range': $("#datefilter").val(),
                'page': page
            }, displayMallList);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/reward/get_new_mall_exchange_list/", {
                    'status': $("#goods_status").val(),
                    'cellphone': $("#query").val(),
                    'good_type': $("#good_type").val(),
                    'order_by_time': $("#create_time").val(),
                    'time_range': $("#datefilter").val(),
                    'page': page
                }, displayMallList);
            }

        }
    });

})
