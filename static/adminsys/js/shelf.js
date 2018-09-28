/**
 * Created by liao on 16/7/21.
 */

//列表展示
function displayGoodsList(data) {
    $(".drag-table").html('');
    $.each(data.new_mall_goods_info_list, function (key, value) {
        var result = value.price_info.replace(new RegExp("\n", "gm"), "<br/>");
        $(".drag-table").append(
            "<article class='table_tbody_cont clearfix drag-item' data-goods-id='" + value.goods_id + "'>" +
            "<div class='td_first'>" + "&nbsp;" + "</div>" +
            "<div class='td_title'>" +
            "<img src='" + value.image_store_path + "' width='135' height='84' alt='' class='enlarge_img' />" +
            "<div class='td_title_img_info'>" +
            "<p>" + value.name + "</p>" +
            "</div>" +
            "</div>" +
            "<div class='td_state'>" + value.type + "</div>" +
            "<div class='td_goods_price'>" + result + "</div>" +
            "<div class='td_on_sale_time'>" + value.create_time + "</div>" +
            "<div class='td_operation'>" +
            "<a href='#' onclick='offSale(" + value.goods_id + ")' class='but_off_sell tooltips' data-toggle='tooltip' data-placement='bottom' title='下架' >" + "</a>" +
            "<a href='#' class='but_modify' data-toggle='modal' data-target='#changeModal' style='text-decoration:none' onclick='showDetail(" + value.goods_id + ")'>" +
            "<span class='tooltips' data-toggle='tooltip' data-placement='bottom' title='修改' style='color:#fff; >" + "..." +
            "</span>" +
            "</a>" +
            "<a href='#' class='but_top tooltips' data-toggle='tooltip' data-placement='bottom' title='置顶'>" + "</a>" +
            "</div>" +
            "</article>"
        );
        $(".all_num").html(data.all_num);
    })
}

//下架操作
function offSale(id) {
    $.post("/operation/reward/off_sale_goods/", {
        'goods_id': id
    }, function (data) {
        if (data.success) {
            swal("下架成功！");
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
    })
}

//展示商品详情
function showDetail(id) {
    $.get("/operation/reward/get_single_goods_detail_info/", {
        'goods_id': id
    }, function (data) {
        var detail = data.goods_detail_info_dict;
        $("#goods_id").html(id);
        $("#goods_title").val(detail.name);
        $("#goods_detail").val(detail.detail_description);
        $("#credits_one").val(detail.credits_one);
        $("#credits_two").val(detail.credits_two);
        $("#money_one").val(detail.money_one);
        $("#money_two").val(detail.money_two);

    })
}

$(function () {
    //自动加载
    $.ajax({
        'type': 'GET',
        'url': '/operation/reward/get_goods_info/',
        'beforeSend': function () {
            $(".loading_pic").append("<img src='/static/adminsys/img/hourglass.gif' width='50px' style='vertical-align:text-bottom' />")
        },
        'dataType': 'json',
        'success': function (data) {
            displayGoodsList(data)
        },
        'complete': function () {
            $(".loading_pic").css('display', 'none');
        }
    })

    //置顶操作
    $(document).on('click', '.but_top', function (event) {
        event.preventDefault();
        var item = $(this).parents('.drag-item');
        var top_item = $('.drag-table').children('.drag-item').eq(0);
        var prev = item.prev();
        if (prev.length == 0) {
            swal('已经置顶!');
            return
        }
        ;
        item.insertBefore(top_item);
    });

    //导航选中
    $(".dropdown_col_3").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //排序开关
    $("#mySwitch").bootstrapSwitch();

    $('#mySwitch').on('switchChange.bootstrapSwitch', function (event, state) {
        if (state == true) {
            $(".drag-item").css("background", "rgba(41, 182, 176, 0.1)").css("cursor", "move");
            $(".but_top").css("display", "block");
            $(".drag-table").sortable({
                placeholder: "ui-sortable-placeholder",
                disabled: false
            });
            $("#saveBtn").css("display", "inline-block");
        } else {
            $(".drag-item").css("background", "#fff").css("cursor", "auto");
            $(".but_top").css("display", "none");
            $(".drag-table").sortable({
                disabled: true
            });
            $("#saveBtn").css("display", "none");
        }
    });

    //排序保存
    $("#saveBtn").click(function (event) {
        event.preventDefault();
        var ids = new Array(); //声明一个存放id的数组
        $.each($(".drag-item"), function (i, val) {
            var id = $(this).data('goods-id');
            ids.push(id);
        })
        var id_list = ids.join("-");
        $.post("/operation/reward/modify_goods_order/", {
            'goods_id_order': id_list
        }, function (data) {
            if (data.success) {
                swal("排序成功", "2秒内自动刷新", "success");
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            }
        })
    });

    //修改保存
    $("#modifyBtn").click(function (event) {
        /* Act on the event */
        if ($("#goods_title").val() == '') {
            swal('请输入商品名称！');
        } else if ($("#goods_detail").val() == '') {
            swal('请输入商品详情！');
        } else if ($("#credits_one").val() == '') {
            swal('请输入所需学币（不需要的话输入0）')
        } else if ($("#money_one").val() == '') {
            swal('请输入所需人民币（不需要的话输入0）')
        } else if ($("#credits_one").val() == '0' && $("#money_one").val() == '0') {
            swal('请至少输入某种兑换方式')
        } else {
            console.log($("#goods_id").html());
            $.post("/operation/reward/modify_goods_info/",
                {
                    'goods_id': $("#goods_id").html(),
                    'name': $("#goods_title").val(),
                    'credits_one': $("#credits_one").val(),
                    'credits_two': $("#credits_two").val(),
                    'money_one': $("#money_one").val(),
                    'money_two': $("#money_two").val(),
                    'detail_description': $("#goods_detail").val()
                }, function (data) {
                    if (data.success) {
                        swal("修改成功", "2秒内自动刷新", "success");
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    } else {
                        swal(data.error_msg, "请稍后再试", "error");
                    }
                }, 'json')
        }
    });

    //新商品
    $(".add-items").click(function (event) {
        window.location.href = "/operation/reward/create_new_goods_render/";
    });


});
