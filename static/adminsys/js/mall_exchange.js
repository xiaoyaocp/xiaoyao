/**
 * Created by liao on 16/6/27.
 */


//筛选功能
function filter() {
    var good_type = $("#good_type").val();
    var order_by_time = $("#create_time").val();
    var status = $("#goods_status").val();
    var time_range = $("#datefilter").val();
    var cellphone = $("#query").val();
    console.log(status);
    $.get("/operation/reward/get_mall_exchange_list/", {
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
        window.location.href = '/operation/reward/download_mall_exchange_list_info/?good_type=' + good_type + '&order_by_time=' + order_by_time + '&status=' + status + '&time_range=' + time_range + '&cellphone=' + cellphone;
    }
}


//点击通过
function goods_pass(status, record_id, user_id) {
    var status_id = "status_" + record_id;
    var after_undo_id = "undo_" + record_id;
    var reason_id = 'reason_' + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    var jreason = $(document.getElementById(reason_id));
    if (jreason.val() != 0) {
        alert('请取消已选择的原因！');
    } else {
        $.get('/operation/modify_goods_record_status/', {
                status: status,
                user_id: user_id,
                record_id: record_id
            },
            function () {
                $("#status_" + record_id).html('待发货<br/><br/><span><a></a></span>');
                $("#operate_" + record_id).html("<input type='button' class='btn btn-success deliverBtn' onclick='goods_delivery(2, " + record_id + ", " + user_id + ")' value='发货'>");
                var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                jlink.attr({
                    href: "javascript:void(0)",
                    id: after_undo_id,
                    value: 1,
                    onclick: onclick_des
                }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');

            });
    }
}


//点击拒绝
function goods_reject(status, record_id, user_id) {


    var status_id = "status_" + record_id;
    var reason_id = "reason_" + record_id;
    var reason = $("#" + reason_id).val();
    var jreason = $(document.getElementById(reason_id));
    var remark_id = "remark_" + record_id;
    var remark = $("#" + remark_id).val();
    var after_undo_id = "undo_" + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    if (reason == 0) {
        alert('请选择拒绝原因！');
    } else {
        $.get('/operation/modify_goods_record_status/', {
                status: status,
                user_id: user_id,
                record_id: record_id,
                reason: reason,
                remark: remark
            },
            function (data) {

                var undo_status = "undo_" + record_id;
                var jundo_status = $(document.getElementById(undo_status));
                var jstatus_id = $(document.getElementById(status_id));
                var reason_text = jreason.find("option:selected").text();
                jstatus_id.html('已拒绝<br/><br/><span><a></a></span>');
                var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                jlink.attr({
                    href: "javascript:void(0)",
                    id: after_undo_id,
                    value: 4,
                    onclick: onclick_des
                }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
                $("#operate_" + record_id).html('<p>原因：' + reason_text + '</p><p>备注：' + remark + '</p>');
            });
    }
}


//点击发货
function goods_delivery(status, record_id, user_id) {
    var status_id = "status_" + record_id;
    var after_undo_id = "undo_" + record_id;
    var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
    $.get('/operation/modify_goods_record_status/', {
            localflag: '1',
            modify_flag: '2',
            status: status,
            user_id: user_id,
            record_id: record_id
        },
        function (data) {

            $("#status_" + record_id).html('已发货<br/><br/><span><a></a></span>');
            $("#operate_" + record_id).html('');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 2,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');

        });
}


//撤销操作
function undoCash(status_id, undo_id, record_id, user_id) {
    var y = confirm("确定撤销操作？");
    if (y == true) {
        var before = "before_" + record_id;
        var pass = "pass_" + record_id;
        var reject = "reject_" + record_id;
        var undo_status = "undo_" + record_id;
        var jreject = $(document.getElementById(reject));
        var jbefore = $(document.getElementById(before));
        var jundo = $(document.getElementById(undo_id));
        var jpass = $(document.getElementById(pass));
        var jstatus = $(document.getElementById(status_id));
        var jundo_status = $(document.getElementById(undo_status));
        var jrecord = $(document.getElementById(record_id));
        var after_undo_id = "undo_" + record_id;
        var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + record_id + "," + user_id + ")";
        var v_undo = jundo.attr('value');
        var n_undo = parseInt(v_undo);
        switch (n_undo) {
            case 1:
                //待发货到待审核
                $.get('/operation/modify_goods_record_status/', {
                        status: '0',
                        back: '1',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        jstatus.html('待审核');
                        $("#operate_" + record_id).html("<div id='operate_panel_" + record_id + "'>" + "<select class='form-control' id='reason_" + record_id + "' name='reject_reason'>" + "<option value='0'>" + "空" + "</option>" + "<option value='1'>" + "传播色情反动人身攻击内容" + "</option>" + "<option value='2'>" + "对刷作弊" + "</option>" + "<option value='3'>" + "骗采纳" + "</option>" + "<option value='5'>" + "其他" + "</option>" + "<option value='6'>" + "发广告" + "</option>" + "<option value='7'>" + "无意义的解答" + "</option>" + "<option value='9'>" + "频繁发布非作业贴" + "</option>" + "<option value='10'>" + "不当使用邀请码" + "</option>" + "</select>" + "<input class='form-control' type='text' id='remark_" + record_id + " name='refuse_remark' placeholder='备注' value =''>" + "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'goods_pass( 1, " + record_id + " , " + user_id + ")' />" + "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' />" + "</div>");
                    })
                break;

            case 2:
                //已发货到待发货
                $.get('/operation/modify_goods_record_status/', {
                        status: '1',
                        back: '3',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        jstatus.html('待发货<br/><br/><span><a></a></span>');
                        var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
                        jlink.attr({
                            href: "javascript:void(0)",
                            id: after_undo_id,
                            value: 1,
                            onclick: onclick_des
                        }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
                        $("#operate_" + record_id).html("<input type='button' class='btn btn-success deliverBtn' onclick='goods_delivery(2, " + record_id + ", " + user_id + ")' value='发货'>");
                        // jrecord.val('1');
                    })
                break;

            case 4:
                //已拒绝到待审核
                $.get('/operation/modify_goods_record_status/', {
                        status: '0',
                        back: '2',
                        record_id: record_id,
                        user_id: user_id
                    },
                    function (data) {
                        jstatus.html('待审核');
                        $("#operate_" + record_id).html("<div id='operate_panel_" + record_id + "'>" + "<select class='form-control' id='reason_" + record_id + "' name='reject_reason'>" + "<option value='0'>" + "空" + "</option>" + "<option value='1'>" + "传播色情反动人身攻击内容" + "</option>" + "<option value='2'>" + "对刷作弊" + "</option>" + "<option value='3'>" + "骗采纳" + "</option>" + "<option value='5'>" + "其他" + "</option>" + "<option value='6'>" + "发广告" + "</option>" + "<option value='7'>" + "无意义的解答" + "</option>" + "<option value='9'>" + "频繁发布非作业贴" + "</option>" + "<option value='10'>" + "不当使用邀请码" + "</option>" + "</select>" + "<input class='form-control' type='text' id='remark_" + record_id + " name='refuse_remark' placeholder='备注' value =''>" + "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'goods_pass( 1, " + record_id + " , " + user_id + ")' />" + "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' />" + "</div>");
                    })
                break;

        }
    } else {
    }
}

function deliver_all() {
    //全部发货
    var checkObj = $("[name='checkpost']:checked");
    var deliver_all_flag = 0;
    for (var i = 0; i < checkObj.length; i++) {
        //获取所有订单id
        var obj = checkObj[i];
        console.log(obj.value);
        if (obj.value != '1') {
            deliver_all_flag = 1;
            break;
        }
    }
    if (deliver_all_flag == 1) {
        alert("只能选择待发货订单！")
    }
    else {
        var y = confirm("确定全部发货?");
        if (y == true) {
            var record_id_list_str = '';
            $("[name='checkpost']:checked").each(function () {
                record_id_list_str += this.id;
                record_id_list_str += ',';
                temp_stat = 'status_' + this.id;
                temp_opr = 'operation_' + this.id;
                temp_pass = 'pass_' + this.id;
                var jstatus_id = $(document.getElementById(temp_stat));
                var joperation_id = $(document.getElementById(temp_opr));
                var jpass = $(document.getElementById(temp_pass));
                var after_undo_id = "undo_" + this.id;
                var onclick_des = "undoCash('" + temp_stat + "','" + after_undo_id + "'," + this.id + ")";
                jstatus_id.html('<br/><input type="button" class="btn btn-success" value="已发货"><br/><br/><span><a></a></span>');
                var jlink = $(document.getElementById(temp_stat).getElementsByTagName('a'));
                jlink.attr({
                    href: "javascript:void(0)",
                    id: after_undo_id,
                    value: 2,
                    onclick: onclick_des
                }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');
                jpass.css({"display": "none"});
            });
            $.get('/operation/batch_deliver/', {
                    localflag: '1',
                    modify_flag: '2',
                    record_id_list_str: record_id_list_str
                },
                function (data) {
                    if (data != 'batch deliver successed') {
                        alert(data);
                    } else {
                        $("[name='checkpost']:checked").val('2').attr("checked", false);
                    }
                });
        }
    }
}


function displayMallList(data) {
    $(".exchange_list").html('');
    console.log(data);
    $.each(data.mall_exchange_list, function (key, value) {
        $(".exchange_list").append(
            "<tr>" +
            "<td>" + "<input name='student_info' type='checkbox' class='all_post' value=' " + value.record_id + "'>" + "</td>" +
            "<td>" +
            "<p>" + "订单号: " + value.record_id + "</p>" +
            "<p>" + value.price + "元的" + value.goods_name + "</p>" +
            "<p>" + "<b>" + value.goods_type + "</b>" + "</p>" +
            "</td>" +
            "<td>" + value.real_name + "</td>" +
            "<td>" +
            "<p>" + "<a href='/operation/user/user_all_info_render/?user_id=" + value.user_id + "' target='_blank'>" + value.user_name + "</a>" + "</p>" +
            "<p>" + "<a class='btn btn-info btn-xs' data-toggle='collapse' data-parent='#accordion' href='#userInfo_" + value.record_id + "'>" + "用户信息" + "</a>" + "</p>" +
            "<div id='userInfo_" + value.record_id + "' class='panel-collapse collapse'>" +
            "<p>" + "采纳率: " + value.post_and_accept_num_rate + "</p>" +
            "<p>" + "被采纳率: " + value.reply_post_and_accepted_num_rate + "</p>" +
            "<p>" + "邀请数: " + value.invite_user_num + "</p>" +
            "<p>" + "收货地址: " + value.correspondence_address + "</p>" +
            "</div>" +
            "</td>" +
            "<td>" + value.cellphone + "</td>" +
            "<td>" + value.qq + "</td>" +
            "<td>" + value.create_time + "</td>" +
            "<td>" + value.update_time + "</td>" +
            "<td>" + value.note + "</td>" +
            "<td id='status_" + value.record_id + "'>" + "</td>" +
            "<td id='operate_" + value.record_id + "' class='operation_panel'>" + "</td>" +
            "</tr>"
        );


        //0表示新建待审核，1表示已审核通过，2表示已发货，3表示用户已收货，4表示兑换请求被拒绝
        if (value.status == 0) {

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
                "<input type='button' class='btn btn-warning passBtn' value='通过' onclick = 'goods_pass( 1, " + value.record_id + " , " + value.user_id + ")' />" +
                "<input type='button' class='btn btn-danger rejectBtn' value='拒绝' onclick='goods_reject(4 , " + value.record_id + ", " + value.user_id + ")' />" +
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
                "<input type='button' class='btn btn-success deliverBtn' onclick='goods_delivery(2, " + value.record_id + ", " + value.user_id + ")' value='发货'>"
            );
        } else if (value.status == 2) {
            var status_id = "status_" + value.record_id;
            var after_undo_id = "after_undo_" + value.record_id;
            var onclick_des = "undoCash('" + status_id + "','" + after_undo_id + "'," + value.record_id + "," + value.user_id + ")";
            $("#status_" + value.record_id).html('已发货<br/><br/><span><a></a></span>');
            var jlink = $(document.getElementById(status_id).getElementsByTagName('a'));
            jlink.attr({
                href: "javascript:void(0)",
                id: after_undo_id,
                value: 2,
                onclick: onclick_des
            }).html('<span class="undo">撤&nbsp;&nbsp;销</span>');

            $("#operate_" + value.record_id).append(
                "<p>已发货</p>"
            );
        } else if (value.status == 3) {
            $("#status_" + value.record_id).append(
                "<p>" + value.status_chinese_name + "</p>"
            );

            $("#operate_" + value.record_id).append(
                "<p style='color:green'>已收货</p>"
            );
        } else if (value.status == 4) {
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
    $.get("/operation/reward/get_mall_exchange_list/", {}, displayMallList);

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
        $.get("/operation/reward/get_mall_exchange_list/", {
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

        $.get("/operation/reward/get_mall_exchange_list/", {
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
            $.get("/operation/reward/get_mall_exchange_list/", {
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
                $.get("/operation/reward/get_mall_exchange_list/", {
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