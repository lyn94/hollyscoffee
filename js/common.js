/*
  function initResponsive(size1,size2)
  사이즈별로 html에 클래스를 변경함.
  size1: pc 너비값 (기본값: 1024)
  size2: mobile 너비값 (기본값:768)
*/
function initResponsive(size1,size2) {
	var num = 0;
	var html = $('html');
	size1 = size1 || 1024;
	size2 = size2 || 768;
	var breakPoint = {
		pcSize:size1,
		mobileSize:size2
	}
	var w1 = html.css('overflow-y','hidden').width();
	var w2 = html.css('overflow-y','scroll').width();

	if(w1 - w2 > 0) {
		breakPoint.pcSize -= 17;
		breakPoint.mobileSize -= 17;
	}


	$(window).resize(function() {
		var ts = $(this);
		var w = ts.width();
		/* 
			PC: 1024이상 : class="pc"
			Tablet: 800이상 ~ 1024미만 : class="tablet"
			Mobile: 800미만 : class="mobile"

			조건문을 이용하여
			html 태그에 사이즈별로 클래스 값이 
			바뀌도록 하시오.
		*/

		if (w >= breakPoint.pcSize) {
			html.removeClass('tablet mobile').addClass('pc');
		} else if (w >= breakPoint.mobileSize && w < breakPoint.pcSize) {
			html.removeClass('pc mobile').addClass('tablet');
		} else if(w < breakPoint.mobileSize) {
			html.removeClass('pc tablet').addClass('mobile');	
		}
	});
	$(window).trigger('resize');		
}






function gnbMenuInit() {
	function gnbMenu(option) {
		//pc 이벤트 등록
		var gnbZone = $(option.element);
		var gnbList = gnbZone.find('> ul > li');
		var gnbTarget = gnbList.find('> a');
		var pcEventType = option.pcEventType;
		gnbZone.find('> ul').on('mouseleave', function() {
			gnbList.find('ul').filter(':visible').hide();
		});
		$(document).on(pcEventType, gnbTarget.selector, function(e) {
			gnbZone = $(option.element);
			gnbList = gnbZone.find('> ul > li');
			gnbTarget = gnbList.find('> a');

			var ts = $(this);
			if ($('html').hasClass('pc')) { //PC
			  gnbList.find('ul').filter(':visible').hide();
			  ts.next('ul').show();
			} else { //Mobile
			  e.preventDefault();
			  var visibleSub = gnbList.find('ul').filter(':visible');
			  //console.log(gnbList);
			  if (ts.next('ul').is(':visible')) {//클릭한 서브메뉴가 보이면
				//console.log(gnbList);
				visibleSub.slideUp(300);
			  } else {//클릭한 서브메뉴가 닫혀있으면
				// console.log(2222);
				visibleSub.slideUp(300);
				ts.next('ul').slideDown(300);
			  }
			}
			
		});
	}
	function mobileMenuOpen(option) {
		var mobileMenuZone = $(option.element);
		var eventTarget = mobileMenuZone.find('a');
		eventTarget.on('click', function(e) {
			e.preventDefault();
			var mobileNavi = $('#tablet_nav');
			mobileNavi.animate({right:0},500);
		});
	}
	function mobileMenuClose(option) {
		var eventTarget = $(option.element);
		eventTarget.on('click', function(e) {
			e.preventDefault();
			var mobileNavi = $('#tablet_nav');
			mobileNavi.animate({right:'-1000px'},500);
		});
	}
	gnbMenu({element:'.pc #gnb', pcEventType:'mouseover'});
	gnbMenu({element:'.mobile #gnb', pcEventType:'click'});
	mobileMenuOpen({element:'.mobile_open_menu', eventType:'click'});
	mobileMenuClose({element:'.gnb_close_btn', eventType:'click'});
}


function scrollFixdGnb() {
	var body = $('body');
	var gnbOffsetTop = parseInt(body.css('background-position-y'));
	console.log(gnbOffsetTop);
	var win = $(window);
	win.on('scroll', function() {
		var ts = $(this);
		var sct = ts.scrollTop();
		// console.log(sct);
		if (sct >= gnbOffsetTop - 10) {
			body.addClass('gnbFixed');
		} else {
			body.removeClass('gnbFixed');
		}
	});
}
$(function() {
	initResponsive(801,801);
	gnbMenuInit();
	scrollFixdGnb();
});



/* function imgReplace(): 이미지 바꾸기
	element : 선택요소
	src1 : 기존의 이름
	src2 : 바꿀 이름
*/
function imgReplace(element, src1, src2) {
	element.attr('src', function(idx,attr) {
		return attr.replace(src1,src2);
	});
}



/*tapMenu 만들기*/
		$.fn.tabMenu = function (option) {
			var option = option || {};
			option.mode = option.mode || 'text';
			option.btnWidth = option.btnWidth || 110;
			option.btnHeight = option.btnHeight || 50;
			option.containerWidth = option.containerWidth || 360;
			option.containerHeight = option.containerHeight || 300;
			option.activeBg = option.activeBg || '#000';
			option.normalBg = option.normalBg || '#ccc';
			option.activeColor = option.activeColor || '#fff';
			option.normalColor = option.normalColor || '#000';
			option.eventType = option.eventType || 'click';


			var ts = $(this);
			var tabBtn = ts.find('>a');
			var listWrap = ts.find('>div');
			var moreBtn = listWrap.find('>a');
			var listWrapUL= listWrap.find('>ul');
			var listWrapLI = listWrapUL.find('>li');
			var listWrapDate = listWrapLI.find('> span');
			var activeTabBtn = tabBtn.filter(':first')
			
			
			/*클릭 했을 때 해당 ul의 내용으로 바뀌게*/
			tabBtn.on(option.eventType, function(e){
				e.preventDefault();
				var target = $(this);
				if (option.mode == 'text') {//텍스트일 경우
					activeTabBtn.css({
						color:option.normalColor,
						backgroundColor:option.normalBg
					});
					target.css({
						color:option.activeColor,
						backgroundColor:option.activeBg
					});

				} else {//이미지일 경우
					var activeTabBtnImg = activeTabBtn.find('img');
					activeTabBtnImg.attr('src',
					activeTabBtnImg.attr('src').replace(activeText, noActiveText))

					var targetImg = target.find('img');
					targetImg.attr('src',
					targetImg.attr('src').replace(noActiveText, activeText))
				}
				
				listWrap.hide();
				target.next('div').show();
				activeTabBtn = target;

				
			});

			ts.css({
				width:option.containerWidth,
				minHeight:option.containerHeight,
				position:'relative',
				paddingTop: option.btnHeight + 10
			});


			tabBtn.css({
				position:'absolute',
				top:'0'
			});


			$.each(tabBtn, function(idx, element) { // 각각의 element = tabBtn에 css 적용하기, idx 자리에는 tabBtn의 인덱스값이 들어옴
				$(element).css({
					left: idx * option.btnWidth
				});				
			});


			moreBtn.css({
				position:'absolute',
				top: '0',
				right : '25px',
			});


			listWrapLI.css({
				//height:30,
				//lineHeight:'30px',
				position:'relative',
				textOverflow: 'ellipsis',
				overflow: 'hidden',
				whiteSpace:'nowrap',
				paddingRight: listWrapDate.width()+10
			});


			listWrapDate.css({
				position:'absolute',
				right:0,
				top:0
			});


			listWrap.not(':first').hide();

			if (option.mode == 'text') {// 택스트인 경우
				tabBtn.css({
					backgroundColor :option.normalBg,
					width : option.btnWidth,
					height : option.btnHeight,
					textAlign : 'center',
					lineHeight:option.btnHeight + 'px',
					color: option.normalColor
				}).filter(':first').css({
					color: option.activeColor,
					backgroundColor: option.activeBg
				});
			} else {// 이미지인 경우
					var tabBtnImg = tabBtn.find('img');
					var tabBtnImgSrc_1 = tabBtnImg.eq(0).attr('src');
					var tabBtnImgSrc_2 = tabBtnImg.eq(1).attr('src');

					var dotIndex = tabBtnImgSrc_2.indexOf('.');
					var noActiveText = tabBtnImgSrc_2.substring(dotIndex);
					var activeText = tabBtnImgSrc_1.substring(dotIndex);
					console.log(activeText);
			}
		};