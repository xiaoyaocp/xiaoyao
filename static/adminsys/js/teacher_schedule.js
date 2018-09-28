/**
 * Created by liao on 16/7/18.
 */

function displaySchedule(data) {

    $(".time_table").html('');

    var weekday = data.teacher_schedule_list;

    var course_num = data.course_num;

    $(".totalCourse").html(course_num);

    var le = weekday.length + 1;

    for (var i = 1; i < le; i++) {

        $(".time_table").append(
            "<tr>" +
            "<th id='th_" + i + "'>" + Object.keys(weekday[i - 1]) +
            "</th>" +
            "<td class='periodTd' id='period_" + i + "_1'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_2'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_3'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_4'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_5'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_6'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_7'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_8'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_9'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_10'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_11'>不可预约</td>" +
            "<td class='periodTd' id='period_" + i + "_12'>不可预约</td>" +
            "</tr>"
        );

        //console.log( Object.entries(weekday[i-1]));

        $.map(weekday[i - 1], function (val, key) {

            //console.log(val[i-1].period);

            for (var p = 1; p < (val.length + 1); p++) {

                var period = val[p - 1].period;

                var student_user_id = val[p - 1].student_user_id;

                if (student_user_id == null) {

                    $("#period_" + i + "_" + period).html("<button class='btn btn-info disBtn' id='btn_" + i + "_" + period + "' data-row='" + i + "' data-col='" + period + "'>分配课程</button>");

                    $("#period_" + i + "_" + period).css('background-color', '#30e07c');

                } else {
                    $("#period_" + i + "_" + period).html('');
                    var student_name = val[p - 1].student_name; //相应展示信息
                    var student_cellphone = val[p - 1].student_cellphone;

                    $("#period_" + i + "_" + period).css('background-color', '#f0697e').css('color', '#fff');

                    $("#period_" + i + "_" + period).append(
                        "<p>" + student_name + "</p>" +
                        "<p>" + student_cellphone + "</p>" +
                        "已预约"
                    );
                }

            }

        });


        // for (var p = 1; p < (weekday[i - 1].length + 1); p++) {
        //
        //     var period = weekday[i - 1][p - 1].period;
        //
        //     var student_user_id = weekday[i - 1][p - 1].student_user_id;
        //
        //     if (student_user_id == null) {
        //
        //         $("#period_" + i + "_" + period).html("<button class='btn btn-info disBtn' id='btn_" + i + "_" + period + "' data-row='" + i + "' data-col='" + period + "'>分配课程</button>");
        //
        //         $("#period_" + i + "_" + period).css('background-color', '#30e07c');
        //
        //     } else {
        //         $("#period_" + i + "_" + period).html('');
        //         var student_name = weekday[i - 1][p - 1].student_name; //相应展示信息
        //         var student_cellphone = weekday[i - 1][p - 1].student_cellphone;
        //
        //         $("#period_" + i + "_" + period).css('background-color', '#f0697e').css('color', '#fff');
        //
        //         $("#period_" + i + "_" + period).append(
        //             "<p>" + student_name + student_cellphone + "</p>" +
        //             "已预约"
        //         );
        //     }
        // }
    }


}


$(function () {


    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    var order_id = $(".order_id").html();

    var courseJson = {
        "teacher_schedule_list": [{
            "2016-07-25": [{
                "date": "2016-07-25",
                "create_time": "2016-07-29 04:21:51",
                "period": "1",
                "last_modify_time": "2016-07-29 04:21:51"
            }
            ]
        }, {
            "2016-07-26": [{
                "date": "2016-07-28",
                "create_time": "2016-07-29 04:21:51",
                "period": "8",
                "last_modify_time": "2016-07-29 04:21:51",
                "student_user_id": "22",
                "student_name": "haha",
                "student_cellphone": "1234"
            }

            ]
        }, {
            "2016-07-27": []
        }, {
            "2016-07-28": [{
                "date": "2016-07-28",
                "create_time": "2016-07-29 04:21:51",
                "period": "8",
                "last_modify_time": "2016-07-29 04:21:51"
            }, {
                "date": "2016-07-28",
                "create_time": "2016-07-29 04:21:51",
                "period": "9",
                "last_modify_time": "2016-07-29 04:21:51"
            }]
        }, {
            "2016-07-29": [{
                "date": "2016-07-30",
                "create_time": "2016-07-29 12:23:43",
                "period": "8",
                "last_modify_time": "2016-07-29 12:23:43"
            }]
        }, {
            "2016-07-30": [{
                "date": "2016-07-30",
                "create_time": "2016-07-29 12:23:43",
                "period": "8",
                "last_modify_time": "2016-07-29 12:23:43"
            }]
        }, {
            "2016-07-31": []
        }],
        "course_num": 1
    }

    $.get("/operation/user/get_teacher_schedule_list/", {'lesson_order_map_id': order_id}, displaySchedule);

    //displaySchedule(courseJson);

    $("#week_choose").click(function () {

        var date_range = $("#startDate").html() + " - " + $("#endDate").html();

        $.get("/operation/user/get_teacher_schedule_list/", {
            'date_range': date_range,
            'lesson_order_map_id': $(".order_id").html()
        }, displaySchedule);

    });

    $("#bookBtn").click(function () {

        var totalCourse = $(".totalCourse").html();

        if ($(".tag").length < totalCourse) {

            swal("选择课程不够");

        } else {

            var dates = "";
            var date_arr = [];

            for (var i = 0; i < $(".tag").length - 1; i++) {
                var inputElement = $(".tag")[i].innerHTML;
                dates += inputElement + "|";
                date_arr.push(inputElement);
            }

            dates += $(".tag")[$(".tag").length - 1].innerHTML;
            date_arr.push($(".tag")[$(".tag").length - 1].innerHTML);

            var n = []; //一个新的临时数组
            for (var i = 0; i < date_arr.length; i++) //遍历当前数组
            {

                if (n.indexOf(date_arr[i]) == -1) n.push(date_arr[i]);
            }

            if (n.length < date_arr.length) {

                swal("有重复日期，请检查")

            } else {

                //swal("上传成功", dates, "success")
                $.post("/operation/user/operate_teacher_class_schedule/", {
                    'lesson_order_map_id': order_id,
                    'schedule_time_str': dates
                }, function (d) {

                    if (d.success) {

                        swal("排课成功", "2秒内自动返回", "success");
                        setTimeout(function () {
                            window.location.href = "/operation/user/quality_course_order_render/";
                        }, 2000);
                    } else {
                        swal(d.error_msg);
                    }

                }, 'json')

            }
        }
    });


    $(document).on("click", ".disBtn", function () {

        var totalCourse = $(".totalCourse").html();

        if ($(".tag").length >= totalCourse) {
            swal("不能再选了，请删除")
        } else {

            var row = $(this).data("row");
            var col = $(this).data("col");
            var course_date = $("#th_" + row).html();
            var course_period = $("#header_" + col).html();
            $(".date_tags").append(
                "<li class='tag' style='background-color:#fff;padding: 0 10px;margin: 10px 20px;display:inline-block;cursor:pointer'>" + course_date + ',' + course_period + ',' + col +
                "</li>"
            );
        }


    });

    $(document).on("click", ".tag", function () {

        $(this).fadeOut(500, function () {

            $(this).remove();
        })

    })


    //时间插件
    var startDate;
    var endDate;
    var dateToday = new Date();

    var selectCurrentWeek = function () {
        window.setTimeout(function () {
            $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
        }, 1);
    }

    $('.week-picker').datepicker({
        firstDay: 1,
        minDate: dateToday,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDate').text($.datepicker.formatDate(dateFormat, startDate, inst.settings));
            $('#endDate').text($.datepicker.formatDate(dateFormat, endDate, inst.settings));

            selectCurrentWeek();
        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek();
        }
    });

    $('.week-picker .ui-datepicker-calendar tr').on('mousemove', '', function () {
        $(this).find('td a').addClass('ui-state-hover');

    });
    $('.week-picker .ui-datepicker-calendar tr').on('mouseleave', '', function () {
        $(this).find('td a').removeClass('ui-state-hover');
    });

});
