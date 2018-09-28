/**
 * Created by xiaopang on 17/01/17.
 */

//文件判断
function fileCheck() {
    if ($("#qq_nums_str").val() == "") {
        swal({
            title: "充值的QQ号码未上传！",
            type: 'error'
        });
        return false;
    } else if ($("#charge_num").val() == "") {
        swal({
            title: "Q币充值金额未上传！",
            type: 'error'
        });
        return false;
    } else {
        return true;
    }
}

function showResponse(data) {
    swal.resetDefaults();
    console.log(data);
    if (data.success) {
        swal({
            title: "2秒后自动刷新",
            type: "success",
            showConfirmButton: false
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

$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //Q币充值
    var options = {
        success: showResponse
    };

    $('#charge_q_coin').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });

});
