/**
 * Created by liao on 16/5/9.
 */

function displayUserDetail(data) {
    console.log(data);
    $("#user_avatar").attr('src', data.user_detail_info_dict.user_photo_store_path); //头像
    $("#username").html(data.user_detail_info_dict.username);                       //用户姓名
    $("#type").html(data.user_detail_info_dict.type);                               //用户类型
    $("#cellphone").html(data.user_detail_info_dict.cellphone);                     //电话
    $("#register_time").html(data.user_detail_info_dict.register_time);             //注册时间
    $("#user_invite_code").html(data.user_detail_info_dict.invite_code);         //登录时间

    $("#current_balance").html(data.user_detail_info_dict.current_balance);         //当前学币
    $("#invited_user_num").html(data.user_detail_info_dict.invited_user_num);       //邀请人数
    $("#user_task_num").html(data.user_detail_info_dict.user_task_num);             //我的任务

    $("#gender").html(data.user_detail_info_dict.gender);
    $("#qq").html(data.user_detail_info_dict.qq);
    $("#birthday").html(data.user_detail_info_dict.birthday);
    $("#age").html(data.user_detail_info_dict.age);


    $("#image_search_num").html(data.user_detail_info_dict.image_search_num);       //搜索数
    $("#comment_num").html(data.post_info_dict.comment_num);
    $("#post_num").html(data.post_info_dict.post_num);
    $("#reply_post_num").html(data.post_info_dict.reply_post_num);
    $("#post_and_accept_num").html(data.post_info_dict.post_and_accept_num);
    $("#reply_post_and_accepted_num").html(data.post_info_dict.reply_post_and_accepted_num);
    $("#post_and_accept_num_rate").html(data.post_info_dict.post_and_accept_num_rate);  //发帖被采纳率
    $("#reply_post_and_accepted_num_rate").html(data.post_info_dict.reply_post_and_accepted_num_rate);  //被采纳率


    $("#tutor_time_sum").html(data.tutor_info_dict.tutor_time_sum);
    $("#tutor_num").html(data.tutor_info_dict.tutor_num);
    $("#tutor_success_num").html(data.tutor_info_dict.tutor_success_num);
    $("#charge_num").html(data.tutor_info_dict.charge_num);
    $("#balance").html(data.tutor_info_dict.balance);
    $("#is_member_user").html(data.tutor_info_dict.is_member_user);
    $("#expired_red_packet_num").html(data.tutor_info_dict.expired_red_packet_num);
    $("#available_red_packet_num").html(data.tutor_info_dict.available_red_packet_num);


    $("#tutored_time_sum").html(data.tutored_info_dict.tutored_time_sum);
    $("#tutored_num").html(data.tutored_info_dict.tutored_num);
    $("#tutored_success_num").html(data.tutored_info_dict.tutored_success_num);


    $("#closure_num").html(data.operation_info_dict.closure_num);
    $("#delete_post_num").html(data.operation_info_dict.delete_post_num);
    $("#delete_comment_num").html(data.operation_info_dict.delete_comment_num);
    $("#clear_coin_num").html(data.operation_info_dict.clear_coin_num);
    $("#decrease_coin_num").html(data.operation_info_dict.decrease_coin_num);
    $("#increase_coin_num").html(data.operation_info_dict.increase_coin_num);


    $("#mall_exchange_success_num").html(data.mall_exchange_record_info_dict.exchange_success_num);
    $("#mall_exchange_failed_num").html(data.mall_exchange_record_info_dict.exchange_failed_num);

    $("#wb_exchange_success_num").html(data.tutor_exchange_record_info_dict.exchange_success_num);
    $("#wb_exchange_failed_num").html(data.tutor_exchange_record_info_dict.exchange_failed_num);

    //判断用户类型 / 解除封禁
    if ($('#type').html() == '封禁用户') {
        var user_id = $("#user_id_detail").html();
        $('#un_ban').css({"display": "block", "cursor": "pointer"});
        $('#ban_duration').attr('disabled', 'disabled');
        $('#ban_reason').attr('disabled', 'disabled');
        $('#ban_note').attr('disabled', 'disabled');
        $('#user_operate').val('已封禁').attr('disabled', 'disabled').css('opacity', '0.1');

        $('#prohibit_reason').html(data.user_detail_info_dict.prohibit_reason);
        $('#prohibit_duration').html(data.user_detail_info_dict.prohibit_day_num);
        $('#prohibit_note').html(data.user_detail_info_dict.remark);
        $('#prohibit_operation_time').html(data.user_detail_info_dict.action_time)

    } else {
        $('.prohibit_info').css({"display": "none"});
    }


}


$(function () {

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");


    var user_id = $("#user_id_detail").html();


    //获取用户信息
    $.get("/operation/user/user_all_info/", {'user_id': user_id}, displayUserDetail);


    //学币判断


    //封禁用户
    $("#user_operate").click(function () {
        var select = $("#ban_reason").val();
        var time = $("#ban_duration").val();
        if (select == "") {
            swal("请选择封禁原因!");
            return false;
        } else if (time == "") {
            swal("请选择封禁时间!");
            return false;
        } else {

            $.post("/operation/user/prohibit_user/",
                {
                    user_id: user_id,
                    day_num: $('#ban_duration').val(),
                    reason: $('#ban_reason').val(),
                    remark: $('#ban_note').val()
                },
                function (data) {

                    if (data.success) {
                        swal("封禁成功", "2秒内自动刷新", "success");
                        setTimeout(function () {
                            location.reload(true);
                        }, 2000);
                    } else {
                        swal(data.error_msg);
                    }

                }, 'json');
        }
    });

    //解封用户
    $('#un_ban').click(function () {
        var y = confirm('确定解除封禁?');
        if (y == true) {
            $.post("/operation/user/unprohibit_user/", {user_id: user_id},
                function (data) {
                    if (data.success) {

                        swal("解除成功", "2秒内自动刷新", "success");
                        setTimeout(function () {
                            location.reload(true);
                        }, 2000);
                    } else {
                        swal(data.error_msg);
                    }
                }, 'json');
        } else {
            swal("取消解除");
        }
    });


    //学币操作
    $("#coin_operate").click(function () {
        if ($('input[name=operation_coin]:checked').val() == null) {
            alert("选择操作类型");
            return false;
        } else if ($('input[name=operation_coin]:checked').val() != 3 && $('#coin_value').val() == '') {
            alert('请输入处理的数值');
            return false;
        } else {

            $.post("/operation/user/operate_user_coin/", {
                    user_id: user_id,
                    operation_type: $('input[name=operation_coin]:checked').val(),
                    coin_num: $('#coin_value').val(),
                    remark: $('#operate_note').val()
                },
                function (data) {
                    if (data.success) {

                        swal("操作成功", "2秒内自动刷新", "success");
                        setTimeout(function () {
                            location.reload(true);
                        }, 2000);
                    } else {
                        swal(data.error_msg);
                    }
                }, 'json');
        }

    })


})