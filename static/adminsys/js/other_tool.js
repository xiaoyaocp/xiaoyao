/**
 * Created by liao on 16/8/5.
 */

function uploadFileCheck() {
    if ($("#FrontPhotoCdn").val() == '') {
        swal("请选择上传的打包文件");
        return false;
    } else {
        return true;
    }
}


$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    $("#refreshBtn").click(function (event) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/operation/tool/refresh_package_cdn/",
            beforeSend: function () {
                swal({
                    title: '刷新中!',
                    text: '请耐心等候',
                    imageUrl: '/static/adminsys/img/hourglass.gif',
                    animation: false
                })

            },
            success: function (data) {
                swal.resetDefaults();
                if (data.success == true) {
                    swal("刷新成功", "", "success");
                } else {
                    swal(data, "操作失败请重试", "error");
                }
            },
            error: function (exception) {
                swal(exception, "操作失败请重试", "error");
            }
        })
    });

})
