$(function () {
    var new_pwd = $('#new_pwd');
    var sure_new_pwd = $('#sure_new_pwd');
    var new_error_info = $('.new_error_info');
    var new_right_info = $('.new_right_info');
    var sure_error_info = $('.sure_error_info');
    var sure_right_info = $('.sure_right_info');
    var sure_btn = $('#sure_btn');

    new_pwd.focus();

    function checkPwd() {
        console.log(new_pwd.val().length);
        if (new_pwd.val().length < 6) {
            new_error_info.css('display', 'inline-block');
            new_right_info.css('display', 'none');
        } else {
            console.log(new_right_info);
            new_error_info.css('display', 'none');
            new_right_info.css('display', 'inline-block');
        }
    }

    function surePwd() {
        console.log(sure_new_pwd.val() !== new_pwd.val());
        if (sure_new_pwd.val() !== new_pwd.val()) {
            sure_error_info.css('display', 'inline-block');
            sure_right_info.css('display', 'none');
        } else {
            sure_error_info.css('display', 'none');
            sure_right_info.css('display', 'inline-block');
        }
    }

    new_pwd.blur(checkPwd);
    sure_new_pwd.change(surePwd);

    sure_btn.click(function (e) {
        if (sure_new_pwd.val() !== new_pwd.val()) {
            e.preventDefault();
            return;
        } else {
            // swal({
            // 	title: '修改成功，请重新登陆！',
            // 	type: 'success'
            // })
            console.log(new_pwd.val());
            $.ajax({
                type: 'GET',
                url: '/change_pwd/',
                data: {
                    'new_pwd': new_pwd.val()
                },
                success: function (res) {
                    console.log(res);
                }
            })

        }
    })
});