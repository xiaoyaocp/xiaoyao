/**
 * Created by liao on 16/8/3.
 */


function displayScheduleDetail(data) {

    $(".lesson_num").html(data.all_num);

    $(".order_schedule_content").html('');

    $.each(data.lesson_order_map_schedule_info_list, function (key, value) {

        $(".order_schedule_content").append(
            "<tr class='order_schedule_row'> " +
            "<td>" + value.lesson_order_id + "</td>" +
            "<td>" + value.date + "</td>" +
            "<td>" + value.period + "</td>" +
            "<td>" + value.create_time + "</td>" +
            "<td>" + value.is_paid_chinese + "</td>" +
            "<td>" + value.lesson_order_seq + "</td>" +

            "</tr>"
        );

    })
}


$(function () {

    var order_id = $(".order_id").html();

    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //加载数据
    $.get("/operation/user/get_lesson_order_map_schedule_info/", {'lesson_order_map_id': order_id}, displayScheduleDetail);

    //取消排班
    $("#cancel_course").click(function () {
        swal({
            title: '是否取消排班?',
            text: "取消本订单的全部课程",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DF5453',
            cancelButtonColor: '#d33',
            confirmButtonText: '取消排班!',
            cancelButtonText: '放弃操作'
        }, function () {

            $.post("/operation/user/unschedule_the_teacher_class/", {'lesson_order_map_id': order_id}, function (data) {

                if (data.success) {

                    alert("已成功取消");

                    window.location.href = '/operation/user/teacher_schedule_render/?lesson_order_map_id=' + order_id;


                }
                else {
                    alert(data.error_msg);
                }

            });

        })
    })

})
