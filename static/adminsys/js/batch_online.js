/**
 * Created by liao on 16/6/22.
 */

function reasonCheck() {
    var val = $('input:radio[name="reject_reason"]:checked').val();
    if (val == null) {
        swal("请选中删除原因!");
        return false;
    }
    else {
        return true;
    }
}


$(function () {


    //导航选中
    $(".dropdown_col_6").addClass("active").siblings().removeClass("active");

    //时间插件
    $('input[name="daterange"]').daterangepicker();

    //批量发货
    $(".deliverBtn").click(function () {
        if ($("#daterange").val() == '') {
            swal("请选择发货日期!");
        } else {
            $.post("/operation/tool/batch_teacher_exchange_record_deliver/", {'time_range': $("#daterange").val()}, function (data) {
                if (data.success) {
                    swal("发货成功");

                } else {
                    swal("发货失败,请稍后重试!")
                }

            }, 'json');
        }
    });

});