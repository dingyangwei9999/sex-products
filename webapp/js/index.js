require(['config'],function(){
	require(['jquery','swiper'],function(){
		$(function(){
			//轮播图
			var mySwiper=new Swiper('.swiper-container',{
				loop : true,
				autoplay :2000,
				pagination : '.swiper-pagination'
			})
			//倒计时
			var $hour=$('.hour')
			var $min=$('.min')
			var $sec=$('.sec')

			var end = Date.parse('2017/5/26 07:34:10');
			console.log(end)

			// 页面进入时先执行一次
			// 显示时间
			showTimeLeft();


			var timer = setInterval(showTimeLeft,1000);

			function showTimeLeft(){
	
		 		var now = Date.now();

			 	// 把当前时间与秒杀时间进行对比
			 	var offsetTime = Math.floor((end - now)/1000);


			 	// 剩余秒数
			 	var secLeft = offsetTime%60;
		 		if (secLeft<10) {
		 			secLeft='0'+secLeft
			 	}else{
			 		secLeft=secLeft
			 	}

			 	// 剩余分钟数
			 	var minLeft = Math.floor(offsetTime/60)%60;
			 	if (minLeft<10) {
			 		minLeft='0'+minLeft
			 	}else{
			 		minLeft=minLeft
			 	}

			 	// 剩余小时数
			 	var hourLeft = Math.floor(offsetTime/60/60)%24;
			 	if (hourLeft<10) {
			 		hourLeft='0'+hourLeft
			 	}else{
			 		hourLeft=hourLeft
			 	}

				$hour.text(hourLeft);
				$min.text(minLeft);
				$sec.text(secLeft)
			 }

			 //滚动一定距离出现顶部的按钮	 
			var $btn=$('.toTop');
			var $main=$('.main');
			var $search = $('.searchFirst')
			var $searchs = $('.searchfix')
		    var $kuan = $('.search');

		    $main.scroll(function(){
		        var  scrollTop=  $main.scrollTop();
		        if(scrollTop>200){
		           $btn.fadeIn(1000)
		        }else{
		            $btn.fadeOut(1000)
		        }

		        if (scrollTop>=100) {
		        	$searchs.stop().animate({width:'90%'},500)
		        	$search.css('backgroundColor','pink')
		        }else{
		        	$searchs.stop().animate({width:'25%'},500)
		        	$search.css('backgroundColor','')
		        }
		    });
			 //返回顶部按钮
		    $btn.click(function(){
		        $main.animate({scrollTop:0},1000);
		    });

		    // //搜索框的跳转页面的实现
		    var $warp = $('.warp');
		    var $container = $('#container')
		    var $close = $('#closeBtn')
		    var $kuans = $('.searchfix')

		    $kuans.on('click',function(){    	
		    	$container.fadeOut();
		    	$warp.fadeIn();
		    })
		    $close.click(function(){
		    	$container.fadeIn();
		    	$warp.fadeOut();
		    })

		    //placeholder文字隐藏
		    $('.searchText').click(function(){
		    	$('.searchText').attr('placeholder','')
		    })
		    $('.searchText').blur(function(){
		    	$('.searchText').attr('placeholder','情趣内衣')
		    })

		    //读取数据
		})		
	});
});