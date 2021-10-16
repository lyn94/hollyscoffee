/*지도에 위치 표시*/
function mapArea() {
    var MapStore = $("#MapStore");
    var mapArea = MapStore.find('area');
    var mapImg = MapStore.next('div').find('img');
    mapArea.on('mouseenter', function() {
        var ts = $(this);
        var idx = mapArea.index(ts);
        mapImg.hide().eq(idx).show();
    });
    
    MapStore.on('mouseleave', function() {
        mapImg.hide();
    });
}
$(function(){
    
     mapArea();

});

$(function() {
    var menuopen = $(".menuopen");
    var drill_root = $(".drill_root");
    
   /* $(document).on('click',function(){
				$(".depth1_link").hide();
			});*/
    
    
  
    /*mobile size gnb menu*/
    /* 넓이가 0이었다가 원래 넓이로 돌아오면서 보여지기*/
    var drill_root_h = drill_root.height();
    drill_root.css({height:0, overflow:'hidden'});
    menuopen.click(function(){
        //.animate().toggle();
        //parseInt(drill_root.css('margin-top')) > -1000
        if(drill_root.height()>0) {
					/*drill_root.animate({
                        display:'none'
                    },500);*/
                    /*drill_root.animate({'margin-top':'-1000px'}, 1000);*/
                    drill_root.stop(true).animate({'height':0}, 500);
				} else {
					/*drill_root.animate({
                        display:'block'
                    },500);*/
                    drill_root.stop(true).animate({'height':drill_root_h}, 500);
				}
        
    
        });
    
    
});



$(function() {
    
    var depth1_link = $(".depth1_link");
    var depth1_link_h = depth1_link.height();
    var depth2 = $(".depth2");
    var depth2_h = depth2.height();
    
    depth1_link.click(function(){
        $(this).children(".depth2").toggle();
        depth1_link.css({"display":"block"});
        });
    
});
   

$(function(){
     
     var newListWrap = $('.new_list.tabmenu-wrap');
        var target = newListWrap.find('> a');
        target.on('click',function(e) {
            e.preventDefault();
            var ts = $(this); //클릭한 요소=a.tab-btn-1
            newListWrap.find('> div').hide(); // 숨기는것 먼저
            newListWrap.find('> div').filter(ts.attr('href')).show();
        });     
 });  
        
/*
$(function(){
       var win = $(window);
        win.on('scroll', function(){
            var ts = $(this); // window
            var sct = ts.scrollTop(); // 스크롤의 이동거리 값
            var quick = $('.quick-menu');
            quick.stop(true).animate({top:sct},'800');
        });
    });*/


	$(window).scroll(function() {
            if ($(this).scrollTop() > 10) {
                $('.MOVE_TOP_BTN').fadeIn(500);
            } else {
                $('.MOVE_TOP_BTN').fadeOut(500);
            }
        });
        





$(function(){
    var noLink = $('.drill_root .depth1 .depth1_link > a');
    noLink.on('click', function(e){
        e.preventDefault();
    });
});

// 화면 resize
$(function() {
	var w = 0;
    var flag = 0; 
    $(window).resize(function(){
        w = $(window).width();
        w = w+17;
		//화면이 641 이상일 때 : pc화면, 태블릿 화면
        if ( w>=641 && flag==0 ) { 
            $(".menuopen, .drill_root>.depth1").css({"display":"none"});
            
            flag = 1;
        } else if ( w>=641 && flag==1 ) { 
            return false;
			// 화면이 641 이하일 때 : mobile화면 
        } else if ( w<641 && flag==1 ) { 
            $(".menuopen, .drill_root>.depth1, .drill_root, .drill_root>.depth1 li").css({"display":"block"});
            flag = 0;
        } else {
            return false;
        }
    });
});

$(function() {
            $('ul.tab li').click(function() {
                var activeTab = $(this).attr('data-tab');
                $('ul.tab li').removeClass('current');
                $('.tabcontent').removeClass('current');
                $(this).addClass('current');
                $('#' + activeTab).addClass('current');
            })
        });







    
    
    
