/**
 * Created by liao on 16/5/16.
 */
$(function () {

    var total = document.documentElement.clientHeight;
    var addH = (total - 400) / 2;
    if (total <= 400) {
        $(".login_title ").css("margin-top", "0");
    }
    else {
        $(".login_title ").css("margin-top", addH + "px");
    }

})