/**
 * Created by liao on 16/5/19.
 */

//发布新帖检测方法
function submitCheck() {
    if ($("#post_title").val() == '') {
        swal("请输入帖子标题");
        return false;
    } else if ($("#post_pic").val() == '') {
        swal("请上传帖子图片");
        return false;
    } else if ($('input:radio[name="district"]:checked').val() == null) {
        swal("请选择上传区域");
        return false;
    } else {
        return true;
    }

    // else if ($("#new_on_top_time").val() == ''){
    //   swal("请选择上线时间");
    //   return false;
    // } else if ($("#new_off_top_time").val() == ''){
    //   swal("请选择下线时间");
    //   return false;
    // }
}


//图片地址
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


$(function () {

    //导航选中
    $(".dropdown_col_1").addClass("active").siblings().removeClass("active");

    //日期插件
    $('#new_on_top_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    $('#new_off_top_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    //新帖图片展示
    $("#post_pic").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        console.log('yes');
        if (objUrl) {
            $("#pic_show").attr("src", objUrl);
        }
    });
})
