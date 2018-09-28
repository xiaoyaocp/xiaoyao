/**
 * Created by liao on 16/6/12.
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function downloadAudio(url) {
    window.open(url)
}


function filter_by() {
    var user_id = $("#user_id").html();
    var user_type = $("#user_type").html();
    var date_range = $('input[name="daterange"]').val();
    var duration = $("#duration").val();
    var tutor_status = $("#tutor_status").val();
    var star = $("#star").val();
    $.get("/operation/user/get_tutorial_record_list/", {
        'user_id': user_id,
        'user_type': user_type,
        'duration': duration,
        'tutor_status': tutor_status,
        'star': star,
        'date_range': date_range
    }, displayWbRecord);
}


function displayWbRecord(data) {
    $(".wb_record_list").html("");

    var i = 1;

    $.each(data.tutor_record_info_list, function (key, value) {
        $(".wb_record_list").append(
            "<tr class='wb_record_list_row'> " +
            "<td>" + value.tutor_request_time + "</td>" +
            "<td>" +
            value.teacher_info + "<br/>" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.teacher_user_id + "'>" + value.teacher_telephone_num + "</a>" + "<br/>" +
            value.student_user_name + "<br/>" +
            "<a href='/operation/user/user_all_info_render/?user_id=" + value.student_user_id + "'>" + value.student_telephone_num + "</a>" + "<br/>" +
            "</td>" +
            "<td>" + value.duration + "</td>" +
            "<td>" + value.tutor_status + "</td>" +
            "<td>" +
            "<a class='fancybox-button' rel='fancy-button' href='" + value.image_store_path + "'>" +
            "<img width='50px' height='50px' src='" + value.image_store_path + "'>" +
            "</a>" +
            "</td>" +
            "<td width='20%'>" +
            "<canvas id='canvas_" + i + "' style='display: none;border: 1px solid #000;'>" + "</canvas>" +
            "<audio preload='none' controls='controls' src='" + value.audio_path + "' id='audio_" + i + "'/>" + "</audio>" + "<br/>" + "<a href='" + value.audio_path + "' target='_blank'>" + "下载音频" + "</a> " + "<a class='btn btn-primary' id='play_video' data-canvas-id='canvas_" + i + "'>" + "观看视频" + "</a>" + "</td>" +
            "<td>" + value.total_price + "</td>" +
            "<td>" + value.discount + "</td>" +
            "<td>" + value.paid_money + "</td>" +
            "<td style='word-break: break-all;width: 10%'>" +
            "<p>" + value.star + "颗星" + "</p>" +
            "<p>" + value.student_comment + "</p>" +
            "</td>" +
            "<td>" + value.teacher_comment + "</td>" +
            "</tr>"
        );

        $("#audio_" + i).audioPlayer();

        i++;

    });

    //页数显示
    var curPage = data.current_page;
    var maxPage = data.all_page;

    $("#curPage").html(curPage);
    $("#maxPage").html(maxPage);

    if (curPage == 1) {
        $(".prev-page").attr("disabled", "true");
    } else {
        $(".prev-page").removeAttr("disabled");
    }

    if (curPage >= maxPage) {
        $(".next-page").attr("disabled", "true");
    } else {
        $(".next-page").removeAttr("disabled");
    }
}

var lineIndexA = 1;
var lineIndexB = 1;


function displayVideo(data) {
    var canvas = document.getElementById("canvas_1"),
        context = canvas.getContext("2d");

    var message = data.data[lineIndexB].value.message;
    var info = message.line;
    var color = info.color;
    var width = info.width;
    var earser = info.earser;
    var points = info.points;

    context.beginPath();
    context.moveTo(points[lineIndexA - 1].x / 10, points[lineIndexA - 1].y / 10);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineTo(points[lineIndexA].x / 10, points[lineIndexA].y / 10);

    context.stroke();

    lineIndexA = lineIndexA + 1;

    if (lineIndexA > points.length - 1) {
        lineIndexA = 1;
        lineIndexB = lineIndexB + 1;
        if (earser) context.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (lineIndexB > data.data.length - 1) {
        return;
    }

    setTimeout(function () {
        displayVideo(data)
    }, 100);
}


$(function () {

    var user_id = $("#user_id").html();
    var user_type = $("#user_type").html();

    //导航选中
    $(".dropdown_col_3").addClass("active").siblings().removeClass("active");

    //自动加载
    $.get("/operation/user/get_tutorial_record_list/", {
        'user_id': user_id,
        'user_type': user_type
    }, displayWbRecord);


    //fancybox
    $(".fancybox-button").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        }
    });

    //视频加载
    $(document).on("click", "#play_video", function () {
        var canvas_id = $(this).data("canvas-id");
        $("#" + canvas_id).css('display', 'block');
        $.get("/operation/user/get_tutor_record_video_info/", {}, displayVideo);

    });


    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        var date_range = $('input[name="daterange"]').val();
        var duration = $("#duration").val();
        var tutor_status = $("#tutor_status").val();
        var star = $("#star").val();
        $.get("/operation/user/get_tutorial_record_list/", {
            'page': page,
            'user_id': user_id,
            'user_type': user_type,
            'duration': duration,
            'tutor_status': tutor_status,
            'star': star,
            'date_range': date_range
        }, displayWbRecord);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        var date_range = $('input[name="daterange"]').val();
        var duration = $("#duration").val();
        var tutor_status = $("#tutor_status").val();
        var star = $("#star").val();
        $.get("/operation/user/get_tutorial_record_list/", {
            'page': page,
            'user_id': user_id,
            'user_type': user_type,
            'duration': duration,
            'tutor_status': tutor_status,
            'star': star,
            'date_range': date_range
        }, displayWbRecord);
    });


    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        var date_range = $('input[name="daterange"]').val();
        var duration = $("#duration").val();
        var tutor_status = $("#tutor_status").val();
        var star = $("#star").val();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get("/operation/user/get_tutorial_record_list/", {
                'page': page,
                'user_id': user_id,
                'user_type': user_type,
                'duration': duration,
                'tutor_status': tutor_status,
                'star': star,
                'date_range': date_range
            }, displayWbRecord);
        }
    })

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            var date_range = $('input[name="daterange"]').val();
            var duration = $("#duration").val();
            var tutor_status = $("#tutor_status").val();
            var star = $("#star").val();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get("/operation/user/get_tutorial_record_list/", {
                    'page': page,
                    'user_id': user_id,
                    'user_type': user_type,
                    'duration': duration,
                    'tutor_status': tutor_status,
                    'star': star,
                    'date_range': date_range
                }, displayWbRecord);
            }

        }
    });

});
