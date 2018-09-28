/**
 * Created by liao on 16/5/24.
 */


function filter_wb() {
    var status = $("#user_type").val();
    $.get("/operation/user/get_one_to_one_tutor_verify_list/", {'status': status}, displayWhiteboard)

}


function certify_pass(user_id, type) {
    //点击通过审核
    $.get('/operation/user/operate_one_to_one_teacher_check_status/', {check_status: type, user_id: user_id},
        function (data) {

            if (data.success) {
                swal("修改成功", "已通过审核", "success");
                $("#operate" + user_id).html("<h3>已执行通过操作!</h3>");
            } else {
                swal(data.error_msg);
            }


        });
}

function certify_reject(user_id, reject_check_status) {
    //点击拒绝(审核不通过)
    var reason = $('input[name=reason]:checked').val();
    if (reason == null && reject_check_status != 2 && reject_check_status != 1) {
        //点击拒绝未选原因时弹出提示
        swal('请选择拒绝原因');
    } else {
        var reason_obj = document.getElementsByName('reason');
        var reason_list = '';
        for (var i = 0; i < reason_obj.length; i++) {
            if (reason_obj[i].checked) {
                reason_list += reason_obj[i].value + '-';
            }
        }

        $.get('/operation/user/operate_one_to_one_teacher_check_status/', {
                check_status: reject_check_status,
                user_id: user_id,
                reason: reason_list,
                remark: $("textarea[name='remark']").val()
            },
            function (data) {
                if (data.success) {
                    var jreason = $('input[name=reason]:checked').next('span').text();
                    swal("操作成功", "两秒后自动跳转刷新", "success");
                    $("#operate" + user_id).html("<h3>已执行撤销或拒绝操作!</h3>");
                } else {
                    swal(error_msg);
                }

            });
    }
}

function prohibit_wb(user_id) {
    $.post('/operation/user/prohibit_one_to_one_teacher/', {'user_id': user_id}, function (data) {
        if (data.success) {
            swal("封禁成功!");
            $("#operate" + user_id).html("<h3>已经封禁!</h3>");
        } else {
            swal("封禁失败,请稍后再试");
        }
    }, 'json')
}

function unprohibit_wb(user_id) {
    $.post('/operation/user/unprohibit_one_to_one_teacher/', {'user_id': user_id}, function (data) {
        if (data.success) {
            swal("解除封禁成功!");
            $("#operate" + user_id).html("<h3>已经解除封禁!</h3>");
        } else {
            swal("解除失败,请稍后再试");
        }
    }, 'json')
}


function displayWhiteboard(data) {

    console.log(data);

    $(".teacher_verify_list").html("");

    $.each(data.one_to_one_teacher_check_list, function (key, value) {

        if (value.is_direct_one_to_one == "否") {
            $(".teacher_verify_list").append(
                "<article class='teacher_verify_unit'>" +
                "<div class='container'>" +
                "<div class='row'>" +
                "<main class='col-md-6 teacher_info'>" +
                "<div class='avatar_display'>" +
                "<img class='certify_avatar' src='" + value.user_photo_path + "' alt='avatar' width='50px' height='50px'>" +
                "<p>" + "姓名: " + value.real_name + "<span class='teacher_status' id='status" + value.user_id + "' >" + value.faq_user_check_status_chinese_name + "</span>" + "</p>" +
                "<span id='user_id' style='display: none'>" + value.user_id + "</span>" +
                "</div>" +
                "<ul class='teacher_info_list'>" +
                "<li>" + "<b>" + "由答题老师过来的" + "</b>" + "&nbsp;&nbsp;" +
                "<a class='btn btn-primary btn-xs show_detail' data-toggle='modal' data-target='#wbinfoModal' data-user-id= '" + value.telephone_num + "'>" + "显示详情" + "</a>" + "</li>" +
                "<li>" + "银行卡账号: " + value.user_bank_account + "</li>" +
                "<li>" + "收款人姓名: " + value.user_bank_name + "</li>" +
                "<li>" + "开户地点: " + value.bank_province + "&nbsp;&nbsp;" + value.bank_city + "</li>" +
                "<li>" + "开户行: " + value.bank_name + "</li>" +
                "<li>" + "用户名: " + value.user_name + "</li>" +
                "<li>" + "QQ号: " + value.qq + "</li>" +
                "<li>" + "学段: " + value.grade + "</li>" +
                "<li>" + "学科: " + value.subject + "</li>" +
                "<li>" + "教学经历: " + value.teacher_career + "</li>" +

                "</ul>" +
                "</main>" +

                "<aside class = 'col-md-6' >" +
                "<div class = 'id_card_display'>" +
                "<label>" + "身份证" + "</label>" +

                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.register_image_path + "' title='用户身份证'>" +
                "<img src='" + value.register_image_path + "'/>" +
                "</a>" +


                "</div>" +
                "<div class = 'teacher_card_display'>" +
                "<label>" + value.id_image_type + "</label>" +

                "<div class = 'teacher_card_display_two'>" +

                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_path + "' title='证件内侧'>" +
                "<img  id = 'teacher_card_one' src='" + value.user_id_image_path + "'/>" +
                "</a>" +

                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_back_path + "' title='证件外侧'>" +
                "<img id = 'teacher_card_two' src='" + value.user_id_image_back_path + "'/>" +
                "</a>" +

                "</div>" +
                "</div>" +
                "</aside>" +
                "</div>" +
                "<hr>" +
                "<div class = 'post-footer' id = '" + value.user_id + "'>" +
                "</div>" +
                "</div>" +
                "</article>"
            );
        } else {

            $(".teacher_verify_list").append(
                "<article class='teacher_verify_unit'>" +
                "<div class='container'>" +

                "<div class='avatar_display'>" +
                "<img class='certify_avatar' src='" + value.user_photo_path + "' alt='avatar' width='50px' height='50px'>" +
                "<p>" + "<span class='teacher_status' id='status" + value.user_id + "' >" + value.faq_user_check_status_chinese_name + "</span>" +
                "&nbsp;&nbsp;&nbsp;" + "<b>" + "直接申请的一对一老师" + "</b>" +
                "&nbsp;&nbsp;&nbsp;" + "姓名: " + value.real_name + "&nbsp;&nbsp;&nbsp;" + "学段:" + value.grade + "&nbsp;&nbsp;&nbsp;" + "学科:" + value.subject + "&nbsp;&nbsp;&nbsp;" +
                "<a class='btn btn-primary btn-xs show_detail' data-toggle='modal' data-target='#wbinfoModal' data-user-id= '" + value.telephone_num + "'>" + "显示详情" + "</a>" +
                "</p>" +
                "<span id='user_id' style='display: none'>" + value.user_id + "</span>" +
                "</div>" +

                "<div class = 'pic_display'>" +
                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.register_image_path + "' title='用户身份证'>" +
                "<img src='" + value.register_image_path + "'/>" +
                "</a>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_path + "' title='证件内侧'>" +
                "<img  id = 'teacher_card_one' src='" + value.user_id_image_path + "'/>" +
                "</a>" + "&nbsp;&nbsp;&nbsp;" +
                "<a class='fancybox-button' rel='gallery" + value.user_id + "' href='" + value.user_id_image_back_path + "' title='证件外侧'>" +
                "<img id = 'teacher_card_two' src='" + value.user_id_image_back_path + "'/>" +
                "</a>" +
                "</div>" +
                "<hr>" +
                "<div class = 'post-footer' id = '" + value.user_id + "'>" +
                "</div>" +
                "</div>" +
                "</article>"
            );
        }


        var check_status = value.faq_user_check_status;
        if (check_status == 1) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "'>" +
                "<input type='checkbox' name='reason' value='11'>&nbsp;<span>姓名不符合规范</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='12'>&nbsp;<span>银行账号不符合规范</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='13'>&nbsp;<span>身份证不符合规范</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='14'>&nbsp;<span>学生证/教师证不符合规范</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='23'>&nbsp;<span>学校/专业不符合要求</span>&nbsp;&nbsp;" +
                "<br/>" +
                "<input type='checkbox' name='reason' value='32'>&nbsp;<span>头像不合格</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='33'>&nbsp;<span>昵称不合格</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='34'>&nbsp;<span>教龄不够</span>&nbsp;&nbsp;" +
                "<input type='checkbox' name='reason' value='35'>&nbsp;<span>学校不符合要求</span>&nbsp;&nbsp;" +
                "<span>&nbsp;&nbsp;&nbsp;备注:&nbsp;</span><textarea name='remark' rows='1'>" + "</textarea>" +
                "<a id='success" + value.user_id + "' class='btn btn-success' type='button' onclick='certify_pass(" + value.user_id + ", 2 )' >" + "&nbsp;&nbsp;通过&nbsp;&nbsp;" + "</a>" +
                "<a id='reject" + value.user_id + "' class='btn btn-danger' onclick='certify_reject(" + value.user_id + " , 8 )'>" + "拒绝" + "</a>" +
                "</div>"
            )

        } else if (check_status == 2) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "' >" +
                "<input type='radio' name='reason' value='36'>&nbsp;<span>普通话不合格</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='39'>&nbsp;<span>讲课方式不合格</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='150'>&nbsp;<span>笔试不合格</span>&nbsp;&nbsp;" +
                "<span>&nbsp;&nbsp;&nbsp;备注:&nbsp;</span><textarea name='remark' rows='1'>" + "</textarea>" +
                "<a id='success" + value.user_id + "' class='btn btn-success' type='button' onclick='certify_pass(" + value.user_id + " ,3 )' >" + "&nbsp;&nbsp;通过&nbsp;&nbsp;" + "</a>" +
                "<a id='reject" + value.user_id + "' class='btn btn-danger' onclick='certify_reject(" + value.user_id + " , 9 )'>" + "拒绝" + "</a>" +
                "</div>"
            )

        } else if (check_status == 3) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "'>" +
                "<b>培训审核 </b>" +
                "<a id='success" + value.user_id + "' class='btn btn-success' type='button' onclick='certify_pass(" + value.user_id + ",4 )' >" + "通过" + "</a>" +
                "<a id='reject" + value.user_id + "' class='btn btn-warning' type='button' onclick='certify_reject(" + value.user_id + ", 2 )' >" + "撤销" + "</a>" +
                "</div>"
            );

        } else if (check_status == 7 && value.is_prohibited == true) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "'>" +
                "<b>已成为一对一辅导教师 </b>" +
                "<a class='btn btn-danger' type='button' onclick='certify_reject(" + value.user_id + ", 2 )' >" + "取消资格" + "</a>" +
                "<a class='btn btn-success type='button' onclick='unprohibit_wb( " + value.user_id + ")' >" + "解除封禁" + "</a>" +
                "</div>"
            );

        } else if (check_status == 7 && value.is_prohibited == false) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "'>" +
                "<b>已成为一对一辅导教师 </b>" +
                "<a class='btn btn-danger' type='button' onclick='certify_reject(" + value.user_id + ", 2 )' >" + "取消资格" + "</a>" +
                "<a class='btn btn-warning type='button' onclick='prohibit_wb( " + value.user_id + ")' >" + "封禁用户" + "</a>" +
                "</div>"
            );

        }
        else if (check_status == 8) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='operate" + value.user_id + "'>" +
                "<div class='pull-left'>" +
                "<p>" + "被拒绝原因:" + "<span id='rejcet_reason'>" + value.reject_reason + "</span>" +
                "<a class='btn btn-warning' type='button' onclick='certify_reject(" + value.user_id + ", 1 )' >" + "撤销操作" + "</a>" +
                "</p>" + "</div>"
            );
        } else if (check_status == 9) {
            $("#" + value.user_id).append(
                "<div class='pull-left' id='operate" + value.user_id + "'>" +
                "<p>" + "被拒绝原因:" + "<span id='rejcet_reason'>" + value.reject_reason + "</span>" +
                "<a id='reject" + value.user_id + "' class='btn btn-warning' type='button' onclick='certify_reject(" + value.user_id + ", 2 )' >" + "撤销操作" + "</a>" +
                "</p>" + "</div>"
            );

        } else {
            $("#" + value.user_id).append(
                "<div class='pull-left'>" +
                "<h3>未知操作</h3>"
                + "</div>"
            );
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
    $.get("/operation/user/get_one_to_one_tutor_verify_list/?status=1", displayWhiteboard);

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

    //详细展示show_detail
    $(document).on("click", ".show_detail", function () {
        var query = $(this).data("user-id");
        $.get("/operation/user/get_one_to_one_tutor_verify_list/", {
            'query': query
        }, function (data) {
            $(".wb_detail").html('');
            $.each(data.one_to_one_teacher_check_list, function (key, value) {
                $(".wb_detail").append(
                    "<ul class='detail_list'>" +
                    "<li>" + "银行卡账号: " + value.user_bank_account + "</li>" +
                    "<li>" + "收款人姓名: " + value.user_bank_name + "</li>" +
                    "<li>" + "开户地点: " + value.bank_province + "&nbsp;&nbsp;" + value.bank_city + "</li>" +
                    "<li>" + "开户行: " + value.bank_name + "</li>" +
                    "<li>" + "开户行支行:" + value.bank_branch_name + "</li>" +
                    "<li>" + "学校:" + value.school + "</li>" +
                    "<li>" + "证件类型:" + value.id_image_type + "</li>" +
                    "<li>" + "用户名: " + value.user_name + "</li>" +
                    "<li>" + "电话:" + value.telephone_num + "</li>" +
                    "<li>" + "身份证号:" + value.id_card + "</li>" +
                    "<li>" + "QQ号: " + value.qq + "</li>" +
                    "<li>" + "学段: " + value.grade + "</li>" +
                    "<li>" + "学科: " + value.subject + "</li>" +
                    "<li>" + "教学经历: " + value.teacher_career + "</li>" +
                    "<li>" + "荣誉证书:" + value.honour + "</li>" +
                    "<li>" + "自我简介:" + value.brief + "</li>" +
                    "<li>" + "自我推荐:" + value.word + "</li>" +
                    "<li>" + "教师标签:" + value.teacher_tag + "</li>" +
                    "<li>" + "收件人姓名:" + value.recipient_name + "</li>" +
                    "<li>" + "收件人手机:" + value.recipient_tel + "</li>" +
                    "<li>" + "申请时间:" + value.register_time + "</li>" +
                    "<li>" + "当前用户类型:" + value.user_type_chinese_name + "</li>" +
                    "</ul>"
                );
            })
        })

    });


    //教师点击搜索
    $("#searchBtn").click(function () {
        var query = $("#query").val();
        $.get("/operation/user/get_one_to_one_tutor_verify_list/", {
            'query': query,
        }, displayWhiteboard)
    });

    //教师回车搜索
    $("#query").bind('keypress', function (event) {
        if (event.keyCode == "13") {
            event.preventDefault();
            var query = $("#query").val();
            $.get("/operation/user/get_one_to_one_tutor_verify_list/", {
                'query': query,
            }, displayWhiteboard);
        }
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_one_to_one_tutor_verify_list/", {'page': page, 'status': status}, displayWhiteboard);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_one_to_one_tutor_verify_list/", {'page': page, 'status': status}, displayWhiteboard);
    });


    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var status = $("#user_type").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/user/get_one_to_one_tutor_verify_list/", {
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
                $.get("/operation/user/get_one_to_one_tutor_verify_list/", {
                    'page': page,
                    'status': status
                }, displayWhiteboard);
            }

        }
    });


})
