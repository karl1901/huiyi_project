// 页面滚动
(function ($) {
  $.fn.visible = function (partial) {
    var $t = $(this),
      $w = $(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

    return compareBottom <= viewBottom && compareTop >= viewTop;
  };
})(jQuery);

var win = $(window);

var allMods = $('.module');

allMods.each(function (i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass('already-visible');
  }
});

win.scroll(function (event) {
  allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('come-in');
    }
  });
});

// 回到顶部动画
$(function () {
  $(window).scroll(function () {
    //只要窗口滚动,就触发下面代码
    var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度
    if (scrollt > 200) {
      //判断滚动后高度超过200px,就显示
      $('#top').fadeIn(400); //淡出
    } else {
      $('#top').stop().fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
    }
  });
  $('#top').click(function () {
    //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
    $('html,body').animate({ scrollTop: '0px' }, 200);
  });
});
