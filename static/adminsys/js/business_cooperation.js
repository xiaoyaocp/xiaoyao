/**
 * Created by liao on 16/9/6.
 */


//图片地址获取
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

//文件是否为空判断
function fileCheck() {
    if (
        $("#fileId1").val() == "" || $("#fileId2").val() == ""
    ) {
        swal("有图片未上传，请检查！");
        return false;
    } else if ($("#platform").val() == "") {
        swal("请选择平台！");
        return false;
    } else if ($("#activity").val() == "") {
        swal("请输入活动标题！");
        return false;
    } else if ($("#target_url").val() == "") {
        swal("请输入目标url！");
        return false;
    } else if ($("#cooperation_name").val() == "") {
        swal("请输入合作商名称！");
        return false;
    } else {
        return true;
    }
}


$(function () {


    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //图片预览
    $("#fileId1").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#user_photo_file").attr("src", objUrl);
        }
    });

    $("#fileId2").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#image_file").attr("src", objUrl);
        }
    });

});
