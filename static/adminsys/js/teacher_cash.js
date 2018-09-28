/**
 * Created by liao on 16/7/1.
 */
//筛选功能
function filter() {
    var is_ordered = $("#create_time").val();
    var status = $("#goods_status").val();
    var time_range = $("#datefilter").val();
    var cellphone = $("#query").val();
    console.log(time_range);
    $.get("/operation/reward/get_teacher_cash_list/", {
        'status': status,
        'cellphone': cellphone,
        'is_ordered': is_ordered,
        'time_range': time_range
    }, displayTeacherCashList);
}

function exchange_pass(type, record_id, user_id) {
    //状态修改-点击通过
    //var jreason = $(document.getElementById(reason));
    var remark = $("#remark_" + record_id).val();
    //var jdiscount = $(document.getElementById(discount));
    var discount = $("#discount_" + record_id).val();
    // var pass_discount_id = "pass_discount_" + record_id;
    // var apply_money_id = 'apply_money_' + record_id;
    // var actual_money_id = 'actual_money_' + record_id;
    // var j_apply_money = $(document.getElementById(apply_money_id));
    // var j_actual_money = $(document.getElementById(actual_money_id));
    // var jpass_discount = $(document.getElementById(pass_discount_id));
    var status_id = "status_" + record_id;
    var after_undo_id = "undo_" + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    $.get('/operation/operation_on_exchange_record/', {
            type: type,
            user_id: user_id,
            record_id: record_id,
            reason: '通过',
            remark: remark,
            discount: discount
        },
        function () {
            // //var jpass_id = $(document.getElementById(pass_id));
            // //var jbefore_id = $(document.getElementById(before_id));
            // //var jstatus_id = $(document.getElementById(status_id));
            // //var reason_text = jreason.find("option:selected").text();
            // //var remark_text = jremark.val();
            // var discount_text = jdiscount.find("option:selected").val();
            // var apply_money = j_apply_money.text();
            // var actual_money = parseFloat(apply_money) * (1 - parseFloat(discount_text));
            // var jrecord_id = $(document.getElementById(record_id));
            // jstatus_id.html('<br/><input type="button" class="btn btn-warning" value="待发货"><br/><br/><span><a></a></span>');
            // var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            // jlink.attr({
            //     href: "javascript:void(0)",
            //     id: after_undo_id,
            //     value: 1,
            //     onclick: onclick_des
            // }).html('撤&nbsp;&nbsp;销');
            // jbefore_id.css({"display": "none"});
            // jpass_id.css({"display": "block"});
            // jpass_discount.html('<p>原因：' + reason_text + "</p><p>备注：" + remark_text + '</p><p>扣除比例：' + discount_text + "</p>");
            // j_actual_money.text(actual_money);
            // jrecord_id.val('1');

            $("#status_" + record_id).html('待发货<br/><br/><span><a></a></span>');
            $("#operate_" + record_id).html("<p>" + "<input type='button' class='btn btn-success deliverBtn' onclick='exchange_delivery(12, " + record_id + ", " + user_id + ")' value='发货'>" + "</p>" + "<p>" + "扣除比例：" + discount + "</p>" + "<p>" + "备注:" + remark + "</p>");
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 1,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
            $("#operate_" + record_id).html();

        });
}

function exchange_reject(type, record_id, user_id) {
    //状态修改-点击拒绝
    var status_id = "status_" + record_id;
    var reason_id = "reason_" + record_id;
    var remark_id = "remark_" + record_id;
    var jreason = $(document.getElementById(reason_id));
    var jremark = $(document.getElementById(remark_id));
    var after_undo_id = "undo_" + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    if ($("#" + reason_id).val() == 0) {
        alert('请选择拒绝原因！');
    } else {
        $.get('/operation/operation_on_exchange_record/', {
                type: type,
                user_id: user_id,
                record_id: record_id,
                reason: $("#" + reason_id).val(),
                remark: $("#" + remark_id).val()
            },
            function (data) {
                // var jreject_id = $(document.getElementById(reject_id));
                // var jbefore_id = $(document.getElementById(before_id));
                // var jstatus_id = $(document.getElementById(status_id));
                // var jrecord = $(document.getElementById(record_id));
                //var reason_text = jreason.find("option:selected").text();
                //var remark_text = jremark.val();
                // jstatus_id.html('<br/><input type="button" class="btn btn-danger" value="已拒绝"><br/><br/><span><a></a></span>');
                // var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                // jlink.attr({
                //     href: "javascript:void(0)",
                //     id: after_undo_id,
                //     value: 2,
                //     onclick: onclick_des
                // }).html('撤&nbsp;&nbsp;销');
                // jbefore_id.css({"display": "none"});
                // jreject_id.css({"display": "block"});
                // jreject_id.html('<p>原因：' + reason_text + '</p><p>备注：' + remark_text + '</p>');
                // jrecord.val('2');

                var undo_status = "undo_" + record_id;
                var jundo_status = $(document.getElementById(undo_status));
                var jstatus_id = $(document.getElementById(status_id));
                var reason_text = jreason.find("option:selected").text();
                var remark_text = jremark.val();
                jstatus_id.html('已拒绝<br/><br/><span><a></a></span>');
                var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                jlink.attr({
                    href: "javascript:void(0)",
                    id: after_undo_id,
                    value: 2,
                    onclick: onclick_des
                }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
                $("#operate_" + record_id).html('<p>原因：' + reason_text + '</p><p>备注：' + remark_text + '</p>');

            });
    }
}

function exchange_delivery(type, record_id, user_id) {
    //状态修改-点击发货
    var status_id = "status_" + record_id;
    var pass = "pass_" + record_id;
    var after_undo_id = "undo_" + record_id;
    var pass_discount_id = "pass_discount_" + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    $.get('/operation/operation_on_exchange_record/', {type: type, user_id: user_id, record_id: record_id},
        function (data) {
            // var jstatus_id = $(document.getElementById(exchange_status_id));
            // var joperation_id = $(document.getElementById(exchange_operation_id));
            // var jpass = $(document.getElementById(pass));
            // var jrecord = $(document.getElementById(record_id));
            // var jpass_discount = $(document.getElementById(pass_discount_id));
            // jstatus_id.html('<br/><input type="button" class="btn btn-success" value="已发货"><br/><br/><span><a></a></span>');
            // var jlink = $(document.getElementById(exchange_status_id).getElementsByTagName('a'));
            // jlink.attr({
            //     href: "javascript:void(0)",
            //     id: after_undo_id,
            //     value: 3,
            //     onclick: onclick_des
            // }).html('撤&nbsp;&nbsp;销');
            // jpass.css({"display": "none"});
            // jpass_discount.html('<p>原因：' + reason_text + "</p><p>备注：" + remark_text + '</p><p>扣除比例：' + discount_text + "</p>");
            // jrecord.val('3');

            var undo_status = "undo_" + record_id;
            var jundo_status = $(document.getElementById(undo_status));
            var jstatus_id = $(document.getElementById(status_id));
            //var reason_text = jreason.find("option:selected").text();
            jstatus_id.html('已发货<br/><br/><span><a></a></span>');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 3,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
            $("#operate_" + record_id).html('<p>' + "已发货!" + '</p>');

        });
}


function undoCash(status_id, undo_id, record_id, user_id) {
    //撤销操作
    var y = confirm("确定撤销操作？");
    if (y == true) {
        var before = "before_" + record_id;
        var pass = "pass_" + record_id;
        var reject = "reject_" + record_id;
        var sent = "sent_" + record_id;
        var actual_money_id = 'actual_money_' + record_id;
        var j_actual_money = $(document.getElementById(actual_money_id));
        var jbefore = $(document.getElementById(before));
        var jundo = $(document.getElementById(undo_id));
        var jpass = $(document.getElementById(pass));
        var jreject = $(document.getElementById(reject));
        var jstatus = $(document.getElementById(status_id));
        var jrecord = $(document.getElementById(record_id));
        var jsent = $(document.getElementById(sent));
        var after_undo_id = "undo_" + record_id;
        var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
        var v_undo = jundo.attr('value');
        n_undo = parseInt(v_undo);
        switch (n_undo) {
            case 1:
                //待发货到待审核
                $.get('/operation/operation_on_exchange_record/', {
                        type: '24',
                        back: '1',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        // jstatus.html('<input type="button" class="btn btn-primary" value="待审核" style="cursor:default">');
                        // jbefore.css({"display": "block"});
                        // jpass.css({"display": "none"});
                        // j_actual_money.text('0.0');
                        // jrecord.val('0');
                        jstatus.html('待审核');
                        $("#operate_" + record_id).html("<div id='operate_panel_" + record_id + "'>" + "<select class='form-control' id='reason_" + record_id + "' name='reject_reason'>" + "<option value='0'>" + "拒绝原因" + "</option>" + "<option value='2'>" + "对刷作弊" + "</option>" + "<option value='3'>" + "骗取采纳" + "</option>" + "<option value='5'>" + "其他" + "</option>" + "<option value='7'>" + "无意义的解答" + "</option>" + "<option value='8'>" + "违规回复无关贴" + "</option>" + "<option value='30'>" + "无解析过程" + "</option>" + "<option value='31'>" + "不使用系统快捷回复" + "</option>" + "</select>" + "<select class='form-control' id='discount_" + record_id + "'>" + "<option value='0'>" + "扣除比例" + "</option>" + "<option value='0.01'>" + "0.01" + "</option>" + "<option value='0.02'>" + "0.02" + "</option>" + "<option value='0.03'>" + "0.03" + "</option>" + "<option value='0.05'>" + "0.05" + "</option>" + "<option value='0.07'>" + "0.07" + "</option>" + "<option value='0.1'>" + "0.1" + "</option>" + "<option value='0.2'>" + "0.2" + "</option>" + "<option value='0.3'>" + "0.3" + "</option>" + "<option value='0.4'>" + "0.4" + "</option>" + "<option value='0.5'>" + "0.5" + "</option>" + "<option value='0.6'>" + "0.6" + "</option>" + "<option value='0.7'>" + "0.7" + "</option>" + "<option value='0.8'>" + "0.8" + "</option>" + "<option value='0.9'>" + "0.9" + "</option>" + "</select>" + "<input class='form-control' type='text' id='remark_" + record_id + "' name='refuse_remark' placeholder='备注' value =''>" + "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'exchange_pass( 10, " + record_id + " , " + user_id + ")' />" + "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' onclick='exchange_reject( 11 , " + record_id + ", " + user_id + ")' />" + "</div>");

                    })
                break;

            case 2:
                //拒绝到待审核
                $.get('/operation/operation_on_exchange_record/', {
                        type: '25',
                        back: '2',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        // jstatus.html('<input type="button" class="btn btn-primary" value="待审核" style="cursor:default">');
                        // jbefore.css({"display": "block"});
                        // jreject.css({"display": "none"});
                        // jrecord.val('0');
                        jstatus.html('待审核');
                        $("#operate_" + record_id).html("<div id='operate_panel_" + record_id + "'>" + "<select class='form-control' id='reason_" + record_id + "' name='reject_reason'>" + "<option value='0'>" + "拒绝原因" + "</option>" + "<option value='2'>" + "对刷作弊" + "</option>" + "<option value='3'>" + "骗取采纳" + "</option>" + "<option value='5'>" + "其他" + "</option>" + "<option value='7'>" + "无意义的解答" + "</option>" + "<option value='8'>" + "违规回复无关贴" + "</option>" + "<option value='30'>" + "无解析过程" + "</option>" + "<option value='31'>" + "不使用系统快捷回复" + "</option>" + "</select>" + "<select class='form-control' id='discount_" + record_id + "'>" + "<option value='0'>" + "扣除比例" + "</option>" + "<option value='0.01'>" + "0.01" + "</option>" + "<option value='0.02'>" + "0.02" + "</option>" + "<option value='0.03'>" + "0.03" + "</option>" + "<option value='0.05'>" + "0.05" + "</option>" + "<option value='0.07'>" + "0.07" + "</option>" + "<option value='0.1'>" + "0.1" + "</option>" + "<option value='0.2'>" + "0.2" + "</option>" + "<option value='0.3'>" + "0.3" + "</option>" + "<option value='0.4'>" + "0.4" + "</option>" + "<option value='0.5'>" + "0.5" + "</option>" + "<option value='0.6'>" + "0.6" + "</option>" + "<option value='0.7'>" + "0.7" + "</option>" + "<option value='0.8'>" + "0.8" + "</option>" + "<option value='0.9'>" + "0.9" + "</option>" + "</select>" + "<input class='form-control' type='text' id='remark_" + record_id + "' name='refuse_remark' placeholder='备注' value =''>" + "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'exchange_pass( 10, " + record_id + " , " + user_id + ")' />" + "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' onclick='exchange_reject( 11 , " + record_id + ", " + user_id + ")' />" + "</div>");
                    })
                break;

            case 3:
                //已发货到待发货
                $.get('/operation/operation_on_exchange_record/', {
                        type: '26',
                        back: '3',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        // jstatus.html('<br/><input type="button" class="btn btn-warning" value="待发货"><br/><br/><span><a></a></span>');
                        // var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                        // jlink.attr({
                        //     href: "javascript:void(0)",
                        //     id: after_undo_id,
                        //     value: 1,
                        //     onclick: onclick_des
                        // }).html('撤&nbsp;&nbsp;销');
                        // jsent.css('display', 'none');
                        // jpass.css({"display": "block"});
                        // jrecord.val('1');
                        jstatus.html('待发货<br/><br/><span><a></a></span>');
                        var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                        jlink.attr({
                            href: "javascript:void(0)",
                            id: after_undo_id,
                            value: 1,
                            onclick: onclick_des
                        }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
                        $("#operate_" + record_id).html("<input type='button' class='btn btn-success deliverBtn' onclick='exchange_delivery(12, " + record_id + ", " + user_id + ")' value='发货'>");

                    })
                break;
        }
    } else {
    }
}


function batchDeliver() {

    var ids = new Array(); //声明一个存放id的数组
    $("input[name=deliver_record]").each(function (i, d) {
        if (d.checked) {
            ids.push(d.value);
        }
    })
    if (ids.length < 1) {
        alert("请选中发送订单!");
        return false;
    }

    var record_id_list_str = ids.join("-");

    $.get("/operation/reward/batch_teacher_deliver//", {
        'record_id_list_str': record_id_list_str,

    }, function (data) {
        if (data.success) {
            swal("操作成功", "成功发货", "success");
        } else {
            alert("发货失败，请稍后再试");
        }

    });
}


function displayTeacherCashList(data) {
    $(".exchange_list").html('');
    console.log(data);
    $.each(data.teacher_cash_exchange_list, function (key, value) {
        $(".exchange_list").append(
            "<tr>" +
            "<td>" + "<input name='deliver_record' type='checkbox'  class='all_post' value=' " + value.record_id + "'>" + "</td>" +
            "<td>" +
            "<p>" + "订单号: " + value.record_id + "</p>" +
            "<p>" + "申请兑换金额: " + value.expected_exchange_money + " 元" + "</p>" +
            "<p>" + "实际兑换金额: " + value.deal_money + " 元" + "</p>" +
            "<p>" + "消耗积分: " + value.cost_credits + "</p>" +
            "</td>" +
            "<td>" + value.real_name + "</td>" +
            "<td style='white-space: nowrap;'>" + value.user_bank_account + "</td>" +
            "<td>" +
            "<p>" + "<a target='_blank' href = '/operation/post_num/?filter_type=5&user_id=" + value.user_id + "' >" + "用户id: " + value.user_id + "</a>" + "</p>" +
            "<p>" + "兑换（拒绝/总数）: " + value.exchange_failed_num + "/" + value.exchange_all_num + "</p>" +
            "</td>" +
            "<td>" + value.create_time + "</td>" +
            "<td>" + "<p>" + value.update_time + "</p>" + "<p>" + "操作人员: " + value.operator_user_name + "</p>" + "</td>" +
            "<td id='status_" + value.record_id + "'>" + "</td>" +
            "<td id='operate_" + value.record_id + "' class='operation_panel'>" + "</td>" +
            "</tr>"
        );


        if (value.status == 0) {

            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<div id='operate_panel_" + value.record_id + "'>" +
                "<select class='form-control' id='reason_" + value.record_id + "' name='reject_reason'>" +
                "<option value='0'>" + "拒绝原因" + "</option>" +
                "<option value='2'>" + "对刷作弊" + "</option>" +
                "<option value='3'>" + "骗取采纳" + "</option>" +
                "<option value='5'>" + "其他" + "</option>" +
                "<option value='7'>" + "无意义的解答" + "</option>" +
                "<option value='8'>" + "违规回复无关贴" + "</option>" +
                "<option value='30'>" + "无解析过程" + "</option>" +
                "<option value='31'>" + "不使用系统快捷回复" + "</option>" +
                "</select>" +
                "<select class='form-control' id='discount_" + value.record_id + "'>" +
                "<option value='0'>" + "扣除比例" + "</option>" +
                "<option value='0.01'>" + "0.01" + "</option>" +
                "<option value='0.02'>" + "0.02" + "</option>" +
                "<option value='0.03'>" + "0.03" + "</option>" +
                "<option value='0.05'>" + "0.05" + "</option>" +
                "<option value='0.07'>" + "0.07" + "</option>" +
                "<option value='0.1'>" + "0.1" + "</option>" +
                "<option value='0.2'>" + "0.2" + "</option>" +
                "<option value='0.3'>" + "0.3" + "</option>" +
                "<option value='0.4'>" + "0.4" + "</option>" +
                "<option value='0.5'>" + "0.5" + "</option>" +
                "<option value='0.6'>" + "0.6" + "</option>" +
                "<option value='0.7'>" + "0.7" + "</option>" +
                "<option value='0.8'>" + "0.8" + "</option>" +
                "<option value='0.9'>" + "0.9" + "</option>" +
                "</select>" +
                "<input class='form-control' type='text' id='remark_" + value.record_id + "' name='refuse_remark' placeholder='备注' value =''>" +
                "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'exchange_pass( 10, " + value.record_id + " , " + value.user_id + ")' />" +
                "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' onclick='exchange_reject( 11 , " + value.record_id + ", " + value.user_id + ")' />" +
                "</div>"
            );

        } else if (value.status == 1) {
            var status_id = "status_" + value.record_id;
            var after_undo_id = "after_undo_" + value.record_id;
            var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + value.record_id + "," + value.user_id + ")";
            $("#status_" + value.record_id).html('已通过<br/><br/><span><a></a></span>');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 1,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');

            $("#operate_" + value.record_id).append(
                "<input type='button' class='btn btn-success deliverBtn' onclick='exchange_delivery(12, " + value.record_id + ", " + value.user_id + ")' value='发货'>"
            );


        } else if (value.status == 2) {
            var status_id = "status_" + value.record_id;
            var after_undo_id = "after_undo_" + value.record_id;
            var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + value.record_id + "," + value.user_id + ")";
            $("#status_" + value.record_id).html('已拒绝<br/><br/><span><a></a></span>');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 2,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
            $("#operate_" + value.record_id).html('<p>原因：' + value.reject_reason + '</p><p>备注：' + '' + '</p>');


        } else if (value.status == 3) {
            var status_id = "status_" + value.record_id;
            var after_undo_id = "after_undo_" + value.record_id;
            var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + value.record_id + "," + value.user_id + ")";
            $("#status_" + value.record_id).html('已发货<br/><br/><span><a></a></span>');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 3,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');

            $("#operate_" + value.record_id).append(
                "<p>已发货</p>"
            );


        } else if (value.status == 4) {

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
    $.get("/operation/reward/get_teacher_cash_list/", {}, displayTeacherCashList);

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
        console.log($("#SelectAll").is(":checked"));
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
        $.get("/operation/reward/get_teacher_cash_list/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'is_ordered': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayTeacherCashList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/reward/get_teacher_cash_list/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'is_ordered': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayTeacherCashList);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/reward/get_teacher_cash_list/", {
                'status': $("#goods_status").val(),
                'cellphone': $("#query").val(),
                'is_ordered': $("#create_time").val(),
                'time_range': $("#datefilter").val(),
                'page': page
            }, displayTeacherCashList);
        }
    })


    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/reward/get_teacher_cash_list/", {
                    'status': $("#goods_status").val(),
                    'cellphone': $("#query").val(),
                    'is_ordered': $("#create_time").val(),
                    'time_range': $("#datefilter").val(),
                    'page': page
                }, displayTeacherCashList);
            }

        }
    });

})
