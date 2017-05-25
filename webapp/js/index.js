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

	    







		//  var $document=$('document')
		// $document.ontouchstart = function(e){
		//    //事件的touches属性是一个数组，其中一个元素代表同一时刻的一个触控点，从而可以通过touches获取多点触控的每个触控点
		//    //由于我们只有一点触控，所以直接指向[0]
		//    var touch = e.touches[0];
		//    console.log(touch)
		//    //获取当前触控点的坐标，等同于MouseEvent事件的clientX/clientY
		//    var x = touch.clientX;
		//    var y = touch.clientY;
		//    console.log(x,y)
		// };

		// $document.ontouchmove = function(e){
		//    //可为touchstart、touchmove事件加上preventDefault从而阻止触摸时浏览器的缩放、滚动条滚动等
		//    // e.preventDefault();
		//    console.log(e.pageY)
		// };
		})
		
	});
});