/**
 * Created by liao on 16/5/5.
 */
$(document).ready(function () {
    $("#login_submit").click(function () {
        $(".alarm").html("");
        var userId = $("#username");
        var password = $("#password");

        if ($.trim(userId.val()) == "") {
            swal("用户名不能为空！");
            userId.focus();
            return false;
        } else if ($.trim(password.val()) == "") {
            swal("密码不能为空！");
            password.focus();
            return false;
        }
    });
});
