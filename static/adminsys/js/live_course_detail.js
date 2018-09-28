/**
 * Created by liao on 2016/11/9.
 Updated by xiaopang on 2016/12/17
 */

//展示已有信息
// function showDetail(id) {
//   $.get("/operation/content/get_post_detail_info/", {
//     'post_id': id
//   }, function(data) {
//     console.log(data);
//     $("#post_id_input").val(data.post_id);
//     $("#post_title").val(data.post_title);
//     $("#pic_show").attr('src', data.image_store_path);
//   })
// }

//修改检测
// function submitModifyCheck() {
//   if ($("#post_title").val() == '') {
//     swal("请输入帖子标题");
//     return false;
//   } else {
//     return true;
//   }
// }

$(function () {

    //缓存变量
    //标签选择方法
    var show_tabs = $('#show_tabs');
    var list_tabs = $('#list_tabs');
    // var list_tabs_li = list_tabs.find('ul li');

    //通过文本框添加标签
    var user_tabs = $('#user_tabs');
    var user_addTag = user_tabs.find('input');
    var user_addBtn = user_tabs.find('button');
    var oLi = $('<li></li>');

    //记录文本域的字数
    var course_brief = $('#course_brief');
    var course_num = $('#course_num');

    //图片回显
    var course_list = $('#course_list');
    var pic_course_detail = $('#pic_course_detail');
    var pic_course_info = $('#pic_course_info');

    var course_list_show = $('#course_list_show');
    var pic_course_detail_show = $('#pic_course_detail_show');
    var pic_course_info_show = $('#pic_course_info_show');

    //工具类
    var util = {
        //标签选择方法
        selectTag: function () {
            var flag = true;
            var list_tabs_li = list_tabs.find('ul li');

            list_tabs_li.click(function () {
                //控制标签个数
                var tagNum = show_tabs.find('ul .tab_active').length;
                console.log(tagNum);
                flag = true;
                if (tagNum > 1) {
                    flag = false;
                    swal({
                        type: 'error',
                        title: '标记的标签不得多于2个！'
                    });
                }
                if (flag) {
                    $(this).addClass('tab_active');
                    // show_tabs.find('ul li[data-index="' + $(this).get(0).dataset.index + '"]').css('display', 'inline-block');
                    show_tabs.find('ul li[data-index="' + $(this).get(0).dataset.index + '"]').show();
                    show_tabs.find('ul li[data-index="' + $(this).get(0).dataset.index + '"]').addClass('tab_active');
                }
            });
            show_tabs.find('ul li').click(function () {
                flag = true;
                $(this).hide();
                $(this).removeClass('tab_active');
                list_tabs.find('ul li[data-index="' + $(this).get(0).dataset.index + '"]').removeClass('tab_active');
            })
        },
        //通过文本框添加标签
        addTag: function () {
            var flag = true;

            user_addBtn.click(function () {
                //控制标签个数
                var tagNum = show_tabs.find('ul .tab_active').length;
                console.log(tagNum);
                flag = true;
                if (tagNum > 1) {
                    flag = false;
                    swal({
                        type: 'error',
                        title: '标记的标签不得多于2个！'
                    });
                }
                if (flag) {
                    var user_addTagVal = user_addTag.val();
                    oLi.html(user_addTagVal);

                    show_tabs.find('ul').append(oLi);
                    oLi.addClass('tab_active');
                    oLi.show();
                }
            });
            //将自己添加的标签隐藏
            oLi.click(function () {
                flag = true;
                // console.log($(this));
                $(this).hide();
                $(this).removeClass('tab_active');
                // $(this).remove();  //加上这个后，有二次点击不消失的bug
            })
        },
        //记录文本域的字数
        textareaNum: function () {
            course_brief.keyup(function () {
                var course_briefNum = course_brief.val().length;
                // console.log(course_briefNum);
                course_num.find('span').html(course_briefNum);
            })
        },
        //拿到复选框的值，将其转化成字符串的方式
        getCheckbox: function () {
            var checkbox_val = [];
            var checkbox_str = '';
            var checkboxed = $('input[name="resign"]:checked');
            checkboxed.each(function () {
                checkbox_val.push($(this).val());
            });
            checkbox_str = checkbox_val.join();
            return checkbox_str;
        },
        //图片地址获取
        getObjectURL: function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        //图片回显
        resShowPic: function (container, showContainer) {
            container.change(function () {
                var objUrl = util.getObjectURL(this.files[0]);
                // console.log(objUrl);
                if (objUrl) {
                    showContainer.attr('src', objUrl);
                }
            })
        }
    }

    //第一个、课程信息面板
    var courseInfo = {
        courseInfos: function (datas) {
            var course_id = $('#course_id');
            var course_name = $('#course_name');
            var course_list_show = $('#course_list_show');
            var pic_course_detail_show = $('#pic_course_detail_show');
            var pic_course_info_show = $('#pic_course_info_show');

            course_id.html(datas.course_id);
            course_name.val(datas.course_name);
            course_brief.html(datas.course_intro);
            course_list_show.attr('src', datas.course_detail_front_image_url);
            pic_course_detail_show.attr('src', datas.course_detail_intro_image_url);
            pic_course_info_show.attr('src', datas.course_list_image_url);
        },
        selectedInfo: function (container, datas) {
            //两个checkbox,遍历checkbox，对比value值，将其对应的选中
            // console.log(datas);
            if (datas.toString().indexOf(',') == -1) {
                for (var i = 0; i < container.length; i++) {
                    // console.log(container[i].value);
                    if (container[i].value == datas.toString()) {
                        container[i].checked = 'checked';
                    }
                }
            } else { //多内容选择
                for (var i = 0; i < container.length; i++) {
                    var arr = datas.toString().split(',');
                    for (var j = 0; j < arr.length; j++) {
                        if (container[i].value == arr[j]) {
                            container[i].checked = 'checked';
                        }
                    }
                }
            }
        },
        //初始化已经标记的标签
        showTags: function (datas) {
            var show_tabs_lis = $('#show_tabs').find('li');
            var list_tabs_lis = $('#list_tabs').find('li');

            for (var i = 0; i < show_tabs_lis.length; i++) {
                for (var j = 0; j < datas.length; j++) {
                    if (datas[j] == show_tabs_lis[i].dataset.index) {
                        show_tabs_lis.eq(i).show();
                        show_tabs_lis.eq(i).addClass('tab_active');
                    }
                }
            }
            for (var i = 0; i < list_tabs_lis.length; i++) {
                for (var j = 0; j < datas.length; j++) {
                    if (datas[j] == list_tabs_lis[i].dataset.index) {
                        list_tabs_lis.eq(i).show();
                        list_tabs_lis.eq(i).addClass('tab_active');
                    }
                }
            }

        },
        tagInfo: function (container, datas) {
            var html = '';
            for (var i = 0; i < datas.length; i++) {
                var curItem = datas[i];
                html += '' +
                    ' <li data-index="' + curItem + '">' + curItem + '</li>';
            }
            container.html(html);
        }
    };
    //第二个、课程详情面板
    var courseDetail = {
        courseDetails: function (container, datas) {
            var html = '';
            for (var i = 0; i < datas.length; i++) {
                var curItem = datas[i];
                html += '' +
                    '<ul>' +
                    ' <li style="display:none;" id="detail_classId">' + curItem.class_id + '</li>' +
                    ' <li>第' + (i + 1) + '节</li>' +
                    ' <li><input type="text" value="' + curItem.class_name + '" id="detail_className" name="" class="form-control" placeholder="课程名称"></li>' +
                    ' <li>' +
                    '   <select class="form-control" disabled>' +
                    '     <option id="detail_classTimes">' + curItem.class_time_duration + '分钟</option>' +
                    '   </select>' +
                    ' </li>' +
                    ' <li>' +
                    '   <input type="text" name="start_course_time" class="start_course_time" id="detail_classStart" value="' + curItem.class_start_time + '" id="start_course_time">' +
                    ' </li>' +
                    ' <li>' +
                    '   <a class="glyphicon glyphicon-save" href="' + curItem.courseware_url + '" download></a>' +
                    ' </li>' +
                    '</ul>';
            }
            container.html(html);
            //日期插件
            $('.start_course_time').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
        }
    };

    //第三个、展示信息面板
    var showInfo = {
        showInfos: function (datas) {
            var hiddenId = $('#hiddenId');
            var course_money = $('.course_money');
            var course_limit = $('.course_limit');

            hiddenId.val(datas.course_id);
            course_money.val(datas.price);
            course_limit.val(datas.max_enroll_num);
        }
    };
    //1、课程信息面板初始数据
    function courseInfoInit() {
        var subject_first = $('.subject_first');
        var grade_first = $('.grade_first');
        var version_list_inputs = $('#version_list input');
        var district_list_inputs = $('#district_list input');
        var show_tabs_ul = $('#show_tabs').find('ul');

        //解析url，接收course_id
        var url = window.location.href;
        var course_id = url.split('?course_id=')[1];
        var api = '/operation/user/get_course_detail_info/';
        var data = {
            course_id: course_id
        };
        $.get(api, data, function (res) {
            if (typeof res === 'string') {
                var res = JSON.parse(res);
            }
            console.log(res);
            courseInfo.courseInfos(res.course_detail_info_dict);
            subject_first.html(res.course_detail_info_dict.subject);
            grade_first.html(res.course_detail_info_dict.grade);
            courseInfo.selectedInfo(version_list_inputs, res.course_detail_info_dict.textbook_version);
            courseInfo.selectedInfo(district_list_inputs, res.course_detail_info_dict.region);

            courseInfo.showTags(res.course_detail_info_dict.tags);
        })
    }

    //2、课程信息面板标签数据
    function tagInfoInit() {
        var show_tabs_ul = $('#show_tabs').find('ul');
        var list_tabs_ul = $('#list_tabs').find('ul');
        var url = window.location.href;
        var course_id = url.split('?course_id=')[1];
        var api = '/operation/user/get_teacher_tags/';
        var data = {
            course_id: course_id
        };
        $.get(api, data, function (res) {
            if (typeof res === 'string') {
                var res = JSON.parse(res);
            }
            courseInfo.tagInfo(show_tabs_ul, res.all_tag_list);
            courseInfo.tagInfo(list_tabs_ul, res.all_tag_list);

            //页面初始化后有了页面基础的标签后，再去做后续的操作
            util.selectTag();
        })
    }

    //3、课程详情初始数据
    function courseDetailInit() {
        var course_content_list = $('#course_content_list');
        var url = window.location.href;
        var course_id = url.split('?course_id=')[1];
        var api = '/operation/user/get_course_detail_info/';
        var data = {
            course_id: course_id
        };
        $.get(api, data, function (res) {
            if (typeof res === 'string') {
                var res = JSON.parse(res);
            }

            courseDetail.courseDetails(course_content_list, res.course_detail_info_dict.course_details);
        });
    }

    //4、展示信息初始数据
    function showInfoInit() {
        var url = window.location.href;
        var course_id = url.split('?course_id=')[1];
        var api = '/operation/user/get_course_detail_info/';
        var data = {
            course_id: course_id
        };
        $.get(api, data, function (res) {
            if (typeof res === 'string') {
                var res = JSON.parse(res);
            }

            showInfo.showInfos(res.course_detail_info_dict);
        })
    }

    //页面初始化
    function initPage() {
        courseInfoInit();
        tagInfoInit();
        courseDetailInit();
        showInfoInit();
    }

    /*
     * 使用js模拟表单提交
     */
    var postInof = {
        //第一个、点击保存调用的接口
        postCourseInfo: function () {
            var api = '/operation/user/modify_live_course_base_info/';

            var course_id = $('#course_id').html();
            var course_name = $('#course_name').val();
            //三张图片
            var course_list_show = $('#course_list_show').attr('src');
            var pic_course_detail_show = $('#pic_course_detail_show').attr('src');
            var pic_course_info_show = $('#pic_course_info_show').attr('src');
            //两个下拉列表
            var subject_first = $('.subject_first').html();
            var grade_first = $('.grade_first').html();
            //两个复选框
            var version_list_inputs = $('#version_list input');
            var district_list_inputs = $('#district_list input');
            var version_arr = [];
            var district_arr = [];
            var tag_arr = [];
            var version_str = '';
            var district_str = '';
            var tag_str = '';

            var show_tabs_lis = $('#show_tabs').find('li');
            var course_brief = $('#course_brief').val();

            for (var i = 0; i < version_list_inputs.length; i++) {
                if (version_list_inputs[i].checked == true) {
                    version_arr.push(version_list_inputs[i].value);
                }
                version_str = version_arr.join();
            }
            for (var i = 0; i < district_list_inputs.length; i++) {
                if (district_list_inputs[i].checked == true) {
                    district_arr.push(district_list_inputs[i].value);
                }
                district_str = district_arr.join();
            }
            for (var i = 0; i < show_tabs_lis.length; i++) {
                if (show_tabs_lis.eq(i).hasClass('tab_active') == true) {
                    tag_arr.push(show_tabs_lis.eq(i).html());
                }
                tag_str = tag_arr.join();
            }

            var data = {
                course_id: course_id,
                course_name: course_name,
                course_detail_front_image_url: course_list_show,
                course_detail_intro_image_url: pic_course_detail_show,
                course_list_image_url: pic_course_info_show,
                subject: subject_first,
                grade: grade_first,
                textbook_version: version_str,
                region: district_str,
                tags: tag_str,
                course_intro: course_brief
            };
            $.post(api, data, function (res) {
                console.log(res);
                if (res.success == true) {
                    swal({
                        title: '保存成功！',
                        type: 'success'
                    })
                }
            })
        },

        //第二个、点击保存调用的接口
        postCourseDetail: function () {
            var api = '/operation/user/modify_live_class_base_info/';
            var course_content_list = $('#course_content_list');
            var dataInfos = {};
            var class_info_arr = [];
            var class_info_str = '';

            //将参数组装成相应的格式
            var oUl = course_content_list.find('ul');
            console.log(oUl);
            for (var i = 0; i < oUl.length; i++) {
                class_info_arr.push({
                    class_id: oUl.eq(i).find('#detail_classId').html(),
                    class_name: oUl.eq(i).find('#detail_className').val(),
                    class_time_duration: parseInt(oUl.eq(i).find('#detail_classTimes').html().replace('分钟', '')),
                    class_start_time: oUl.eq(i).find('#detail_classStart').val()
                })
            }
            class_info_str = JSON.stringify(class_info_arr);
            console.log(class_info_str);
            var data = {
                class_info_list: class_info_str
            }

            $.post(api, data, function (res) {
                console.log(res);
                if (res.success == true) {
                    swal({
                        title: '保存成功！',
                        type: 'success'
                    })
                }
            })
        },

        //第三个
        postShowInfo: function () {
            var api = '/operation/user/modify_publish_info/';
            var hiddenId = $('#hiddenId').val();
            var course_money = parseFloat($('.course_money').val());
            var course_limit = parseInt($('.course_limit').val());

            var data = {
                course_id: hiddenId,
                course_price: course_money,
                max_enroll_num: course_limit
            }

            $.post(api, data, function (res) {
                if (res.success == true) {
                    swal({
                        title: '保存成功！',
                        type: 'success'
                    })
                }
            })

        },

        //通过按钮
        passInfo: function () {
            var api = '/operation/user/operate_live_course_status/';
            var url = window.location.href;
            var course_id = url.split('?course_id=')[1];
            var data = {
                course_id: course_id,
                operate_type: 'pass'
            }

            $.post(api, data, function (res) {
                console.log(res);
                swal({
                    title: '通过！',
                    type: 'success',
                    showConfirmButton: false
                })
                setTimeout(function () {
                    window.location.href = '/operation/user/live_course_order_render/';
                }, 1000);
            })
        }
    }


    //导航选中
    $(".dropdown_col_2").addClass("active").siblings().removeClass("active");

    //提示工具
    $(document).tooltip();

    //tab标签页动态效果
    $('#myTab li a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    initPage();

    util.resShowPic(course_list, course_list_show);
    util.resShowPic(pic_course_detail, pic_course_detail_show);
    util.resShowPic(pic_course_info, pic_course_info_show);

    util.addTag();
    util.textareaNum();
    $('#saveBtn_1').click(postInof.postCourseInfo);
    $('#saveBtn_2').click(postInof.postCourseDetail);
    $('#saveBtn_3').click(postInof.postShowInfo);

    $('#pass').click(postInof.passInfo);
});