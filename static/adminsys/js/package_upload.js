/**
 * Created by liao on 16/9/7.
 */

function fileCheck() {

    if ($("#channel_list").val() == '') {
        swal("请选择渠道名称");
        return false;
    } else if ($("#apk_name").val() == '') {
        swal("请上传渠道包");
        return false;
    } else if ($("#channel_brief").val() == '') {
        swal("填写渠道包版本");
        return false;
    } else {
        return true;
    }

}

$(function () {

    //导航选中
    $(".dropdown_col_5").addClass("active").siblings().removeClass("active");

    //
    $.get("/operation/channel/get_channel_name_list/", {}, function (data) {

        var output = [];
        $.each(data.channel_name_list, function (key, value) {
            output.push('<option value="' + value + '">' + value + '</option>');
        });

        $('#channel_list').append(output.join(''));


    });


})
