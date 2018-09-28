/**
 * Created by Administrator on 2016/12/7.
 */
//发送信息
function showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
    console.log(queryString);
    return true;
}

//返回信息
function showResponse(data) {
    if (data.success) {
        swal({
            title: "更新成功，2秒后自动刷新",
            type: "success",
            showConfirmButton: false
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    } else {
        swal({
            title: data.error_msg,
            type: "error"
        });
    }
}


//展示所有用户
function displayUser(data) {
    $(".user_list").html("");

    $.each(data.channel_info_list, function (key, value) {
        // console.log(value.id);
        $(".user_list").append(
            "<article class='table_tbody_cont clearfix drag-item'>" +
            "   <div class='td_xs'>" + "&nbsp;" + "</div>" +
            "   <div style='display:none'>" + value.id + "</div>" +
            "   <div class='td_20'>" + value.channel_package_name + "</div>" +
            "   <div class='td_10 text-center'><a href='" + value.url + "' target='_blank' class='glyphicon glyphicon-link tooltips' data-toggle='tooltip' data-placement='bottom' title='下载链接' ></a></div>" +
            "   <div class='td_10 text-center ellipsis'>" + value.current_version + "</div>" +
            "   <div class='td_10 text-center ellipsis'>" + value.channel_brief + "</div>" +
            "   <div class='td_15 text-center ellipsis' style='position:relative;'>" + "<p data-toggle='tooltip' style='position:absolute;top:20px;width:120px;height:40px;' data-placement='bottom' title='" + value.create_time + "'></p>" + value.create_time + "</div>" +
            "   <div class='td_15 text-center ellipsis' style='position:relative;'>" + "<p data-toggle='tooltip' style='position:absolute;top:20px;width:120px;height:40px;' data-placement='bottom' title='" + value.update_time + "'></p>" + value.update_time + "</div>" +
            "   <div class='td_10 text-center ellipsis'></div>" +
            "   <button class='btn btn-save updateBtn' type='button' data-toggle='modal' data-target='#wbModal' style='margin-top:30px;'>更新</button>" +
            "</article>"
        );
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
    //更新按钮事件
    $('.updateBtn').on('click', function() {
        var channel_id = $(this).parent().find('div:nth-child(2)').html();
        var updateModel = '' +
            "<div class='modal fade' id='wbModal'>" +
            "   <div class='modal-dialog' role='document'>" +
            "       <div class='modal-content'>" +
            "           <form action='/operation/channel/update_channel_package/' enctype='multipart/form-data' method='post' id='pkg_form'>" +
            "               <div class='form-horizontal'>" +
            "                   <div class='form-group'>" +
            "                       <label id='pkg_label' for='pkg_file'>选取渠道包文件：</label>" +
            "                       <input type='file' class='form-control' name='pkg_file' id='pkg_file'>" +
            "                       <input type='text' name='channel_id' value='" + channel_id + "' style='display: none'/>" +
            "                   </div>" +
            "               </div>" +
            "               <div class='modal-footer'>" +
            "                   <button class='btn btn-primary' type='submit' id='button1'>更新</button>" +
            "                   <button class='btn btn-secondary' data-dismiss='modal'>取消</button>" +
            "               </div>" +
            "           </form>" +
            "       </div>" +
            "   </div>" +
            "</div>";
        $(".user_list").append(updateModel);
        //更新操作
        var options = {
            beforeSubmit: showRequest, // pre-submit callback
            success: showResponse // post-submit callback
        };

        $('#pkg_form').submit(function () {
            $(this).ajaxSubmit(options);
            return false;
        });
    });
}


$(function () {

    //导航选中
    $(".dropdown_col_5").addClass("active").siblings().removeClass("active");

    $.ajax({
        'type': 'GET',
        'url': '/operation/channel/get_channel_list/',
        // 'data': {
        //     'page': 0
        // },
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayUser(data);
            console.log(data);
            $(function () {
                $("[data-toggle='tooltip']").tooltip();
            });
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    });


    var turnPage = {
        url: '/operation/channel/get_channel_list/'
    }
    //翻页
    $(".prev-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) - 1;
        $.get(turnPage.url, {
            'page': page
        }, displayUser);

    });

    $(".next-page").click(function () {
        var curPage = $("#curPage").html();
        var page = parseInt(curPage) + 1;
        $.get(turnPage.url, {
            'page': page
        }, displayUser);
    });

    $(".skipBtn").click(function () {
        var page = parseInt($('#skipPage').val());
        var maxPage = $("#maxPage").html();
        if (page <= 0 || page > maxPage) {
            swal("跳转页错误!")
        } else {
            $.get(turnPage.url, {
                'page': page
            }, displayUser);
        }
    });

    $('#skipPage').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            var page = parseInt($('#skipPage').val());
            var maxPage = $("#maxPage").html();
            if (page <= 0 || page > maxPage) {
                swal("跳转页错误!")
            } else {
                $.get(turnPage.url, {
                    'page': page
                }, displayUser);
            }
        }
    });
});


