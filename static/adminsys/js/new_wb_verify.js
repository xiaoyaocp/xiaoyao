/**
 * Created by liao on 16/8/23.
 */


function filter() {
    var status = $("#user_type").val();
    $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {'status': status}, displayWhiteboard)
}


function displayWhiteboard(data) {

    $(".teacher_verify_list").html("");

    $.each(data.new_1to1_teacher_verify_info_list, function (key, value) {

        $(".teacher_verify_list").append(
            "<article class='verify_unit'>" +
            "<ul id='myTab' class='nav nav-tabs'>" +
            "<li class='active'>" + "<a href='#basic_" + value.user_id + "' data-toggle='tab'>" + "基本资料" + "</a>" + "</li>" +
            "<li>" + "<a href='#wb_" + value.user_id + "' data-toggle='tab'>" + "一对一资料" + "</a>" + "</li>" +
            "<li>" + "<a href='#audio_" + value.user_id + "' data-toggle='tab'>" + "录音" + "</a>" + "</li>" +
            "</ul> " +

            "<div id='myTabContent' class='tab-content'>" +

            "<div class='tab-pane fade in active' id='basic_" + value.user_id + "'>" +

            "<div class='basic_info_display'>" +

            "<p>" + "真实姓名：" + value.real_name + "</p>" +
            "<p>" + "QQ号：" + value.qq + "</p>" +
            "<p>" + "身份证号:" + value.id_card + "</p>" +
            "<p>" + "电话:" + value.telephone_num + "</p>" +
            "<p>" + "银行卡账号: " + value.user_bank_account + "</p>" +
            "<p>" + "开户行：" + value.bank_name + "</p>" +
            "<p>" + "<a class='btn btn-primary' data-toggle='collapse' href='#collapseExample" + value.user_id + "' aria-expanded='false' aria-controls='collapseExample' >" + "加载其他信息" + "</a>" + "</p>" +

            "<div class='collapse' id='collapseExample" + value.user_id + "'>" +

            "<p>" + "收款人姓名: " + value.user_bank_name + "</p>" +
            "<p>" + "开户地点: " + value.bank_province + "&nbsp;&nbsp;" + value.bank_city + "</p>" +
            "<p>" + "开户行: " + value.bank_name + "</p>" +
            "<p>" + "开户行支行:" + value.bank_branch_name + "</p>" +
            "<p>" + "证件类型:" + value.id_image_type + "</p>" +
            "<p>" + "用户名: " + value.user_name + "</p>" +
            "<p>" + "电话:" + value.telephone_num + "</p>" +
            "<p>" + "身份证号:" + value.id_card + "</p>" +
            "<p>" + "收件人姓名:" + value.recipient_name + "</p>" +
            "<p>" + "收件人手机:" + value.recipient_tel + "</p>" +
            "<p>" + "申请时间:" + value.register_time + "</p>" +
            "<p>" + "当前用户类型:" + value.user_type_chinese_name + "</p>" +

            "</div>" +

            "</div>" +

            "<div class='pic_display'>" +
            "<div class='label'>" + "身份证" + "</div>" +
            "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.register_image_path + "' title='用户身份证'>" +
            "<img src='" + value.register_image_path + "' id='sfz_" + value.user_id + "' />" +
            "</a>" +
            "<div class='label'>" + value.id_image_type + "内侧" + "</div>" +
            "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_path + "' title='证件内侧'>" +
            "<img src='" + value.user_id_image_path + "' id='zjnc_" + value.user_id + "'/>" +
            "</a>" +


            "<div class='label'>" + value.id_image_type + "外侧" + "</div>" +
            "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_back_path + "' title='证件外侧'>" +
            "<img src='" + value.user_id_image_back_path + "' id='zjwc_" + value.user_id + "'/>" +
            "</a>" +

            "</div>" +

            "<div class='reject_panel' id='basic_info_" + value.user_id + "'>" +

            "</div>" +
            "</div>" +


            "<div class='tab-pane fade' id='wb_" + value.user_id + "'>" +
            "<div class='onetoone_info_display'>" +
            "<p>" + "用户名：" + value.user_name + "</p>" +
            "<p>" + "学段：" + value.grade + "</p>" +
            "<p>" + "学科：" + value.subject + "</p>" +
            "<p>" + "标签：" + value.teacher_tag + "</p>" +
            "<p>" + "自我推荐：" + value.word + "</p>" +
            "<p>" + "教学经历：" + value.teacher_career + "</p>" +
            "<p>" + "自我简介：" + value.brief + "</p>" +
            "</div>" +
            "<div class='reject_panel' id='onetoone_info_" + value.user_id + "'>" +

            "</div>" +
            "</div>" +


            "<div class='tab-pane fade' id='audio_" + value.user_id + "'>" +
            "<div class='onetoone_info_display'>" +
            "<p>" + "<audio src='" + value.recording_store_url + "' controls>" + "</audio>" + "</p>" +
            "<p>" + "审核状态：" + value.audio_status_chinese + "</p>" +
            "<p>" + "拒绝原因：" + value.reject_reason + "</p>" +
            "</div>" +
            "<div class='reject_panel' id='audio_info_" + value.user_id + "'>" +

            "</div>" +
            "</div>" +

            // "<div class='tab success_panel' id='success_info_" + value.user_id + "'>" +
            // "</div>" +

            "</div>" +
            "</article>"
        );

        var w1 = $("#sfz_" + value.user_id).width;
        var h1 = $("#sfz" + value.user_id).height;

        if (w1 >= h1) {
            $("#sfz_" + value.user_id).width("50px");
        } else {
            $("#sfz_" + value.user_id).height("100px");
        }

        var w2 = $("#zjnc_" + value.user_id).width;
        var h2 = $("#zjnc" + value.user_id).height;

        if (w2 >= h2) {
            $("#zjnc_" + value.user_id).width("50px");
        } else {
            $("#zjnc_" + value.user_id).height("100px");
        }

        var w3 = $("#zjwc_" + value.user_id).width;
        var h3 = $("#zjwc" + value.user_id).height;

        if (w3 >= h3) {
            $("#zjwc_" + value.user_id).width("50px");
        } else {
            $("#zjwc_" + value.user_id).height("100px");
        }


        if (value.basic_info_status == '1') {

            $("#basic_info_" + value.user_id).html("<input type='radio' name='basic_reason_" + value.user_id + "' value='11'>&nbsp;<span>姓名不符合规范</span><br/>" + "<input type='radio' name='basic_reason_" + value.user_id + "' value='12'>&nbsp;<span>银行账号不符合规范</span><br/>" + "<input type='radio' name='basic_reason_" + value.user_id + "' value='13'>&nbsp;<span>身份证不符合规范</span><br/>" + "<input type='radio' name='basic_reason_" + value.user_id + "' value='14'>&nbsp;<span>学生证/教师证不符合规范</span><br/>" + "<input type='radio' name='basic_reason_" + value.user_id + "' value='23'>&nbsp;<span>学校/专业不符合要求</span><br/>" + "<a class='btn btn-danger' id='basic_rejectBtn' data-user-id='" + value.user_id + "'>" + "基本资料拒绝" + "</a>" + "<a class='btn btn-success' id='basic_passBtn' data-user-id='" + value.user_id + "'>基本资料通过</a>");

        } else if (value.basic_info_status == '2') {

            $("#basic_info_" + value.user_id).html('已通过');

        } else if (value.basic_info_status == '3') {

            $("#basic_info_" + value.user_id).html('已拒绝');

        }


        if (value.faq_info_status == '1') {

            $("#onetoone_info_" + value.user_id).html("<input type='radio' name='onetoone_reason_" + value.user_id + "' value='32'>&nbsp;<span>头像不合格</span><br/>" + "<input type='radio' name='onetoone_reason_" + value.user_id + "' value='33'>&nbsp;<span>昵称不合格</span><br/>" + "<input type='radio' name='onetoone_reason_" + value.user_id + "' value='34'>&nbsp;<span>教龄不够</span><br/>" + "<input type='radio' name='onetoone_reason_" + value.user_id + "' value='35'>&nbsp;<span>学校不符合要求</span><br/>" + "<a class='btn btn-danger' id='onetoone_rejectBtn' data-user-id='" + value.user_id + "'>" + "一对一资料拒绝" + "</a>" + "<a class='btn btn-success' id='onetoone_passBtn' data-user-id='" + value.user_id + "'>一对一资料通过</a>");


        } else if (value.faq_info_status == '2') {

            $("#onetoone_info_" + value.user_id).html('已通过');


        } else if (value.faq_info_status == '3') {

            $("#onetoone_info_" + value.user_id).html('已拒绝');
        }


        if (value.trial_lecture_status == '1') {

            $("#audio_info_" + value.user_id).html("<a class='btn btn-danger' id='audio_rejectBtn' data-user-id='" + value.user_id + "'>" + "音频审核拒绝" + "</a>" + "<a class='btn btn-success' id='audio_passBtn' data-user-id='" + value.user_id + "'>音频审核通过</a>");


        } else if (value.trial_lecture_status == '2') {

            $("#audio_info_" + value.user_id).html('已通过');

        } else if (value.trial_lecture_status == '3') {

            //} else {

            $("#audio_info_" + value.user_id).html('已拒绝');

        }


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
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //自动加载
    $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {}, displayWhiteboard);

    //fancybox-button
    $(".fancybox-button").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
            title: {type: 'inside'},
            buttons: {}
        }
    });


    //基本资料通过
    $(document).on("click", "#basic_passBtn", function () {
        var user_id = $(this).data("user-id");
        $.post("/operation/user/operate_new_1to1_teacher_verify/", {
            'user_id': user_id,
            'operate_type': 'pass',
            'verify_step': 1
        }, function (data) {
            console.log(data);
            if (data.success) {
                $("#basic_info_" + user_id).html('已通过');
            } else {
                swal("操作失败，请稍后再试")
            }
        }, 'json');

    });


    //基本资料拒绝
    $(document).on("click", "#basic_rejectBtn", function () {
        var user_id = $(this).data("user-id");
        var name = "basic_reason_" + user_id;

        var reason = $("input:radio[name='" + name + "']:checked").val();

        if (reason == null) {
            swal("请选择拒绝的原因！")
        } else {
            $.post("/operation/user/operate_new_1to1_teacher_verify/", {
                'user_id': user_id,
                'operate_type': 'reject',
                'reason': reason,
                'verify_step': 1
            }, function (data) {

                if (data.success) {
                    $("#basic_info_" + user_id).html('已拒绝');
                } else {
                    swal("操作失败，请稍后再试")
                }

            }, 'json');
        }

    });


    //一对一资料通过
    $(document).on("click", "#onetoone_passBtn", function () {
        var user_id = $(this).data("user-id");
        $.post("/operation/user/operate_new_1to1_teacher_verify/", {
            'user_id': user_id,
            'operate_type': 'pass',
            'verify_step': 2
        }, function (data) {
            console.log(data);
            if (data.success) {
                $("#onetoone_info_" + user_id).html('已通过');
            } else {
                swal("操作失败，请稍后再试")
            }

        }, 'json');

    });


    //一对一资料拒绝
    $(document).on("click", "#onetoone_rejectBtn", function () {
        var user_id = $(this).data("user-id");
        var name = "onetoone_reason_" + user_id;

        var reason = $("input:radio[name='" + name + "']:checked").val();

        if (reason == null) {
            swal("请选择拒绝的原因！")
        } else {
            $.post("/operation/user/operate_new_1to1_teacher_verify/", {
                'user_id': user_id,
                'operate_type': 'reject',
                'reason': reason,
                'verify_step': 2
            }, function (data) {

                if (data.success) {
                    $("#onetoone_info_" + user_id).html('已拒绝');
                } else {
                    swal("操作失败，请稍后再试")
                }

            }, 'json');
        }

    });


    //音频资料通过
    $(document).on("click", "#audio_passBtn", function () {
        var user_id = $(this).data("user-id");
        $.post("/operation/user/operate_new_1to1_teacher_verify/", {
            'user_id': user_id,
            'operate_type': 'pass',
            'verify_step': 3
        }, function (data) {
            console.log(data);
            if (data.success) {
                $("#audio_info_" + user_id).html('已通过');
            } else {
                swal("操作失败，请稍后再试")
            }

        }, 'json');

    });


    //音频资料拒绝
    $(document).on("click", "#audio_rejectBtn", function () {
        var user_id = $(this).data("user-id");

        // var name = "onetoone_reason_" + user_id;
        // var reason = $("input:radio[name='" + name + "']:checked").val();

        if (reason == null) {
            swal("请选择拒绝的原因！")
        } else {
            $.post("/operation/user/operate_new_1to1_teacher_verify/", {
                'user_id': user_id,
                'operate_type': 'reject',
                'reason': reason,
                'verify_step': 3
            }, function (data) {
                if (data.success) {
                    $("#audio_info_" + user_id).html('已拒绝');
                } else {
                    swal("操作失败，请稍后再试")
                }
            }, 'json');
        }

    });


    //教师点击搜索
    $("#searchBtn").click(function () {
        var query = $("#query").val();
        $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
            'query': query,
        }, displayWhiteboard)
    });

    //教师回车搜索
    $("#query").bind('keypress', function (event) {
        if (event.keyCode == "13") {
            event.preventDefault();
            var query = $("#query").val();
            $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
                'query': query,
            }, displayWhiteboard);
        }
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
            'page': page,
            'status': status
        }, displayWhiteboard);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
            'page': page,
            'status': status
        }, displayWhiteboard);
    });


    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var status = $("#user_type").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
                'page': page,
                'status': status
            }, displayWhiteboard);
        }
    })


    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var status = $("#user_type").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/user/get_new_1to1_teacher_verify_info_list/", {
                    'page': page,
                    'status': status
                }, displayWhiteboard);
            }

        }
    });


})
