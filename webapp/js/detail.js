require(['config'],function(){
	require(['jquery','sideshow'],function(){
		var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,  
	    pagination: '.swiper-pagination', 
	    autoplay:2000
	 	 }) 
		$(document).scroll(function(){
		 	if(scrollY>55){
		 		$('.detail_head').css('background','rgba(237, 237, 237, 0.5)');
		 		$('.pic_left').css('background','rgba(237, 237, 237, 0)');
		 		$('.btn_car').css('background','rgba(237, 237, 237, 0)');
		 		$('.btn_more').css('background','rgba(237, 237, 237, 0)');
		 	}else{
		 		$('.detail_head').css({
		 			background:'',
		 			opacity: 1
		 		});
		 		$('.pic_left').css('background','#F6F6F6');
		 		$('.btn_car').css('background','#F6F6F6');
		 		$('.btn_more').css('background','#F6F6F6');	
		 	}
		 });

		// 返回上一级按钮
		$('.pic_left').on('click',function(){
			window.history.back(-1);
			// window.history.go(-1);
		})

		// nav的切换
		var btn_nav = $('.nav');
		btn_nav.on('click',function(){
			var i=$(this).index();
			btn_nav.eq(i).addClass('navon').siblings().removeClass('navon');
			 $('.tab_con').eq(i).parents().children('.tab_con').hide();
			 $('.tab_con').eq(i).show();
			console.log($('.tab_con').eq(i));
		});




		// 详情页背景颜色图
		var btn_choose=$('.good_choose');
		btn_choose.on('click',function(){
			$('.detail_pic').show();
			$('.detail_bottom').show();
		})
		var btn_closegood = $('.bottom_infoclose');
		btn_closegood.on('click',function(){
			console.log(999)
			$('.detail_bottom').hide();
			$('.detail_pic').hide();

		})


		 // 收藏按钮
		var btn_like=$('.like');
		btn_like.click(function(){
			var yRgb ="#FD19AE";
			 var rgb = $('.like .iconfont').css('color'); 
			 console.log(rgb)
			if(rgb!=yRgb ){
				$('.like .iconfont').css('color',yRgb); 
			}else{
				$('.like .iconfont').removeClass(''); 
			}
	 		// $('.like .iconfont').css('color','#FD19AE');
	 	});

		 // 加入购物车
		var btn_addshoppCart=$('.addCart');
		 // 点击加入购物车出现的小按钮
		var shoppNum = $('#btn_addCart');
	 	var i=0;
	 	// 增加
	 	$('#btn_add').on('click',function(){
	 		i += 1;
	 		$('#bottom_total').text(i);
	 		console.log(i)
	 	});
	 	// 减少
	 	$('#btn_reduce').on('click',function(){
	 		i--;
	 		if (i<=1) {
	 			i=1;
	 		}
	 		$('#bottom_total').text(i);
	 	});
	 	// 确认按钮
		$('.bottom_confim').click(function(){
				console.log(333555)
			$('#btn_addCart').text(i);
			shoppNum.css('display','block');
			$('.detail_bottom').hide();
			$('.detail_pic').hide();
			//改变之后显示的数量
			$('#staNum').text(`数量为 ${i}`);
		})
		// 加入购物车
		btn_addshoppCart.on('click',function(){
			i+=1;    
		 	shoppNum.text(i);
		 	$('.pic_tu').text(i);
		 	shoppNum.css('display','block');
		 	$('.success').show(200).delay(400).hide(300);
		 	$('#staNum').text(`数量为 ${i}`);
		 	// $('.pic_tu').css('display','block');
		 	$('.good_choose').on('click',function(){
		 		console.log(i)
				$('#bottom_total').text(i);
			})
		})


		// 点击更多的按钮
		var btn_evenmore = $('.btn_more');
		btn_evenmore.on('click',function(){
			$('.hide_fun').toggle();

		})
	});
})
