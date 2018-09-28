/**
 * Created by liao on 16/7/21.
 */
function displayMallList(data) {

}

$(function () {

    //导航选中
    $(".dropdown_col_3").addClass("active").siblings().removeClass("active");

    //时间筛选
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });


    //checkbox全选，jQuery1.6+后用prop()代替attr()
    $("#SelectAll").click(function () {
        console.log($("#SelectAll").is(":checked"));
        if ($("#SelectAll").is(":checked") == true) {
            $("input[name=student_info]").prop("checked", true);
        } else {
            $("input[name=student_info]").prop("checked", false);
        }
    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get("/operation/reward/get_duiba_mall_exchange_record_info/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'good_type': $("#good_type").val(),
            'order_by_time': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayMallList);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;

        $.get("/operation/reward/get_duiba_mall_exchange_record_info/", {
            'status': $("#goods_status").val(),
            'cellphone': $("#query").val(),
            'good_type': $("#good_type").val(),
            'order_by_time': $("#create_time").val(),
            'time_range': $("#datefilter").val(),
            'page': page
        }, displayMallList);
    });

    $('.skipBtn').click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        }
        else {
            $.get("/operation/reward/get_duiba_mall_exchange_record_info/", {
                'status': $("#goods_status").val(),
                'cellphone': $("#query").val(),
                'good_type': $("#good_type").val(),
                'order_by_time': $("#create_time").val(),
                'time_range': $("#datefilter").val(),
                'page': page
            }, displayMallList);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            }
            else {
                $.get("/operation/reward/get_duiba_mall_exchange_record_info/", {
                    'status': $("#goods_status").val(),
                    'cellphone': $("#query").val(),
                    'good_type': $("#good_type").val(),
                    'order_by_time': $("#create_time").val(),
                    'time_range': $("#datefilter").val(),
                    'page': page
                }, displayMallList);
            }

        }
    });

})
