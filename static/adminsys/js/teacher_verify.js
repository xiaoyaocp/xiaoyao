/**
 * Created by liao on 16/5/23.
 */

function filter_at() {
    var status = $("#user_type").val();
    $.get("/operation/user/get_teacher_verify_list/", {'status': status}, displayTeacher)

}


function changeType(operation_type, user_id) {
//审核通过后修改用户类型，目前可以更改为认证教师和大学生老师
    var type = "change_type_" + user_id;
    var jtype = $(document.getElementById(type));
    var a = jtype.val();
    $.get('/operation/operation_on_teacher_check/', {
            operation_type: operation_type,
            type: jtype.val(),
            user_id: user_id
        },
        function (data) {
            swal("修改成功", "两秒后自动跳转刷新", "success");
            setTimeout(function () {
                window.location.href = "/operation/user/teacher_verify_render/";
            }, 2000)
        });
}

function certify_pass(user_id, operation_type, type) {
    //点击通过审核
    $.get('/operation/operation_on_teacher_check/', {operation_type: operation_type, type: type, user_id: user_id},
        function (data) {

            swal("修改成功", "两秒后自动跳转刷新", "success");
            setTimeout(function () {
                window.location.href = "/operation/user/teacher_verify_render/";
            }, 2000)

        });
}

function certify_reject(user_id, operation_type, type) {
    //点击拒绝(审核不通过)
    var reason = $('input[name=reason]:checked').val();

    if (reason == null) {

        swal('请选择拒绝原因');
    } else {

        $.get('/operation/operation_on_teacher_check/', {
                operation_type: operation_type,
                type: type,
                user_id: user_id,
                reason: reason
            },
            function (data) {

                swal("操作成功", "两秒后自动跳转刷新", "success");
                setTimeout(function () {
                    window.location.href = "/operation/user/teacher_verify_render/";
                }, 2000)

            });
    }
}

function degrade(user_id, operation_type, type) {
    //点击降级
    $.get('/operation/operation_on_teacher_check/', {operation_type: operation_type, type: type, user_id: user_id},
        function (data) {

            swal("降级成功", "两秒后自动跳转刷新", "success");
            setTimeout(function () {
                window.location.href = "/operation/user/teacher_verify_render/";
            }, 2000)


        });
}


//老师列表展示
function displayTeacher(data) {

    $(".teacher_verify_list").html("");
    $.each(data.teacher_check_list, function (key, value) {
        $(".teacher_verify_list").append(
            "<article class='teacher_verify_unit'>" +
            "<div class='container'>" +
            "<div class='row'>" +
            "<main class='col-md-6 teacher_info'>" +
            "<div class='avatar_display'>" +
            "<img class='certify_avatar' src='" + value.user_photo_path + "' alt='avatar' width='50px' height='50px'>" +
            "<p>" + "姓名: " + "<span contenteditable=false id='e_real_name_" + value.user_id + "'>" + value.real_name + "</span>" +
            "<span class='teacher_status' id='status" + value.user_id + "' >" + value.answer_user_status_chinese_name + "</span>" + "</p>" +
            "<span id='user_id' style='display: none'>" + value.user_id + "</span>" +
            "<input uId='" + value.user_id + "' type='button' value='修改' class='e_btn btn btn-defalut'>" +
            "</div>" +
            "<ul class='teacher_info_list'>" +
            "<li>" + "用户名: " + value.user_name + "</li>" +
            "<li>" + "电话: " + value.telephone_num + "</li>" +
            "<li>" + "身份证号: " + value.id_card + "</li>" +
            "<li>" + "QQ号: " + value.qq + "</li>" +
            "<li>" + "申请时间: " + value.register_time + "</li>" +
            "<li>" + "当前用户类型: " + value.user_type_chinese_name + "</li>" +

            "<li>" + "收款人姓名: " + "<span contenteditable=false id='e_bank_name_" + value.user_id + "'>" + value.user_bank_name + "</span>" + "</li>" +
            "<li>" + "银行卡账号: " + value.user_bank_account + "</li>" +
            "<li>" + "开户地点: " + value.bank_province + "&nbsp;&nbsp;" + value.bank_city + "</li>" +
            "<li>" + "开户行: " + value.bank_name + "</li>" +
            "<li>" + "开户行支行: " + value.bank_branch_name + "</li>" +
            "<li>" + "学校: " + value.school + "</li>" +
            "<li>" + "证件类型: " + value.id_image_type + "</li>" +
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
            "<div class = 'teacher_card_display_two' >" +
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

        if (value.answer_user_status == 1) {
            $("#" + value.user_id).append(
                "<div class = 'pull-left' id='before" + value.user_id + "' >" +
                "<div class='dropdown'>" +
                "<button class='btn btn-warning dropdown-toggle' type='button' id='dropdown_status' data-toggle='dropdown'>" + "通过为" + "<span class='caret'>" + "</span>" + "</button>" +
                "<ul class='dropdown-menu' aria-labelledby='dropdown_status'>" +
                "<li role='presentation' class='filter_status'>" + "<a role='menuitem' tabindex='-1' onclick='certify_pass( " + value.user_id + ", 9 , 271000  )' >" + "学生" + "</a>" + "</li>" +
                "<li role='presentation' class='filter_status'>" + "<a role='menuitem' tabindex='-1' onclick='certify_pass( " + value.user_id + ", 9 , 271030 )' >" + "老师" + "</a>" + "</li>" +
                "</ul>" +
                "</div>" +
                "<input type='radio' name='reason' value='11'>&nbsp;<span>姓名不符合规范</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='12'>&nbsp;<span>银行账号不符合规范</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='13'>&nbsp;<span>身份证不符合规范</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='14'>&nbsp;<span>学生证/教师证不符合规范</span>&nbsp;&nbsp;" +
                "<input type='radio' name='reason' value='23'>&nbsp;<span>学校/专业不符合要求</span>&nbsp;&nbsp;" +
                "<a class='btn btn-danger' id='rejectBtn' onclick='certify_reject(" + value.user_id + ", 8 , 1000000 )'>" + "拒绝" + "</a>" +
                "</div>"
            )

        } else if (value.answer_user_status == 2 && value.user_type == 27) {
            $("#" + value.user_id).append(
                "<div class='pull-left' id='deg_" + value.user_id + " '>" +
                "<input type='button' class='btn btn-warning' value='降级为普通用户' onclick= 'degrade (" + value.user_id + ", 17 , 100000 )' >" +
                "&nbsp;&nbsp;&nbsp;" +
                "<div class='change_type' style='float: right'>" +
                "<label>" + "请选择用户类型:" + "</label>" +
                "&nbsp;&nbsp;" +
                "<select id='change_type_" + value.user_id + "'>" +
                "<option name='type' value='271000'>" + "大学生老师" + "</option>" +
                "<option name='type' value='271030'>" + "认证教师" + "</option>" +
                "</select>" + "&nbsp;&nbsp;&nbsp;" +
                "<a class='btn btn-primary' onclick='changeType( 29 , " + value.user_id + ")' >" + "修改" + "</a>" +
                "</div>" +
                "</div>"
            )
        } else if (value.answer_user_status == 3) {
            $("#" + value.user_id).append(
                "<p>" + "原因：" + "<span id='reject_reason'>" + value.reject_reason + "</span>" + "</p>"
            );

            if (value.answer_user_reason == 11) {
                $("#reject_reason").html(姓名不符合规范);
            } else if (value.answer_user_reason == 12) {
                $("#reject_reason").html(银行卡账号不符合规范);
            } else if (value.answer_user_reason == 13) {
                $("#reject_reason").html(身份证不符合规范);
            } else if (value.answer_user_reason == 14) {
                $("#reject_reason").html(学生证 / 教师证不符合规范);
            } else if (value.answer_user_reason == 23) {
                $("#reject_reason").html(学校 / 专业不符合要求);
            }

        } else if (value.answer_user_status == 4) {
            $("#" + value.user_id).append("<p>已降级</p>");

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

    var status = $("#user_type").val();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //自动加载
    $.get("/operation/user/get_teacher_verify_list/?status=1", displayTeacher);

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


    //教师点击搜索
    $("#searchBtn").click(function () {
        var query = $("#query").val();
        $.get("/operation/user/get_teacher_verify_list/", {'query': query}, displayTeacher)
    });


    //教师回车搜索
    $("#query").bind('keypress', function (event) {
        if (event.keyCode == "13") {
            event.preventDefault();
            var query = $("#query").val();
            $.get("/operation/user/get_teacher_verify_list/", {'query': query}, displayTeacher);
        }
    });


    //修改姓名、收款人
    $(document).on('click', '.e_btn', function () {
        var $btn = $(this);
        var user_id = $btn.attr("uId");
        if ($btn.val() === "修改") {
            $btn.val("保存");
            $("#e_real_name_" + user_id).prop("contenteditable", true).focus();
            $("#e_bank_name_" + user_id).prop("contenteditable", true);
        } else {
            var real_name = $("#e_real_name_" + user_id).text();
            var bank_name = $("#e_bank_name_" + user_id).text();
            console.log(real_name, bank_name)
            if (real_name === "" || bank_name === "") {
                alert("姓名和收款人姓名不能为空");
                return;
            }
            ;
            if (real_name !== bank_name) {
                alert("姓名和收款人姓名不一致");
                return;
            }
            $.post('/operation/change_user_bank_name/', {
                    "user_id": user_id,
                    "user_bank_name": bank_name,
                    "real_name": real_name
                },
                function (data, textStatus, xhr) {

                    $btn.val("修改");
                    $("#e_real_name_" + user_id).prop("contenteditable", false);
                    $("#e_bank_name_" + user_id).prop("contenteditable", false);
                    swal("操作成功", "姓名、收款人已修改", "success")
                });
        }

    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_teacher_verify_list/", {'page': page, 'status': status}, displayTeacher);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var status = $("#user_type").val();
        $.get("/operation/user/get_teacher_verify_list/", {'page': page, 'status': status}, displayTeacher);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var status = $("#user_type").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/user/get_teacher_verify_list/", {'page': page, 'status': status}, displayTeacher);
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
                $.get("/operation/user/get_teacher_verify_list/", {'page': page, 'status': status}, displayTeacher);
            }

        }
    });


});
