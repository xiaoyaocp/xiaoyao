/**
 * Created by liao on 16/8/22.
 */


function reasonCheck1() {
    var val = $('#operate_type1').val();
    var file = $('#fileId1').val();
    if (val == '') {
        swal("请选择操作方式!");
        return false;
    } else if (file == '') {
        swal("请上传文件!");
        return false;
    } else {
        return true;
    }
}

function reasonCheck2() {
    var val = $('#operate_type2').val();
    var file = $('#fileId2').val();
    if (val == '') {
        swal("请选择操作方式!");
        return false;
    } else if (file == '') {
        swal("请上传文件!");
        return false;
    } else {
        return true;
    }
}

$(function () {

    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

});
