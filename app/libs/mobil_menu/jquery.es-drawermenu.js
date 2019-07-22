/* Essence Drawermenu v 1.0.4
copyright 2016, Essence Webservice Ryo Inagaki
http://essencews.com
https://ryo0702.github.io/essence-drawermenu/
released under the MIT license
*/

;(function($) {
  $.fn.drawermenu = function(options) {

    var opts = $.extend({}, $.fn.drawermenu.defaults,options);

    var drawermenu = this;
    var status = false;
    var menu_position = opts.position;

    if(menu_position == 'right'){
      $(drawermenu).addClass('drawermenu-right');
    }

    if($(drawermenu).find("ul > li > ul").length){
      $(drawermenu).find("ul > li > ul").parent().children("a").append('<svg version="1.1" class="icon-down" id="down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56 28" style="enable-background:new 0 0 56 28;" xml:space="preserve"><polygon points="56,0 28,28 0,0 "/></svg>');
      $(drawermenu).find("ul > li > ul").parent().children("a").addClass('down');
      $(drawermenu).find("ul > li > ul").parent().children("a").attr("href","#");
    }

    // $(document).on("click",'.drawermenu a.down',function(){
    //   $(this).next("ul").slideToggle(100);
    // });
    $(document).on("click",'.drawermenu a',function(){
        if(menu_position == 'left'){
          $(drawermenu).animate({
            'left':'-250px'
          },opts.speed);
        }
        else{
          $(drawermenu).animate({
            'right':'-250px'
          },opts.speed);
        }
        status = false;
    });

    $(document).on("click",'.drawer-toggle',function(){
      if(status == false){
        $(".drawermenu-overlay").show();
        if(menu_position == 'left'){
          $(drawermenu).animate({
            'left':'0px'
          },opts.speed);
        }
        else{
          $(drawermenu).animate({
            'right':'0px'
          },opts.speed);
        }
        status = true;
      }
      else{
        if(menu_position == 'left'){
          $(drawermenu).animate({
            'left':'-250px'
          },opts.speed);
        }
        else{
          $(drawermenu).animate({
            'right':'-250px'
          },opts.speed);
        }
        status = false;
        $(".drawermenu-overlay").hide();
      }
    });

    $(document).on("click",'.drawermenu-overlay,.drawermenu-close',function(){
      if(status == true){
        if(menu_position == 'left'){
          $(drawermenu).animate({
            'left':'-250px'
          },opts.speed);
        }
        else{
          $(drawermenu).animate({
            'right':'-250px'
          },opts.speed);
        }
        status = false;
        $(".drawermenu-overlay").hide();
      }
    });
  }

  $.fn.drawermenu.defaults = {
    speed: 250,
    position:"left"
  };
})(jQuery);
