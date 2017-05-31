require(['config'],function(){
	require(['jquery','swiper','global'],function(){
		$(function(){
			// $('.footer').load('html/footer.html');
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

			var end = Date.parse('2017/5/28 07:34:10');
			

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
		    $.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'限时抢购'},
				dataType: 'json',
				async:false,
				success:function(response){
					var res = response.map(function(item){
						
						var reduce=parseInt(item.ori_price - item.price);
						return `
							<li>
								<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}">
									<img src="../../upload/${item.listImg[0]}" alt="">
								</a>
			 					<p>￥${item.price}</p>
			 					<p><s>￥${item.ori_price}</s></p>
			 					<p class="save">立省${reduce}</p>
	 						</li>
	 							` 
					}).join('')
					$('.time_product ul').append(res)
				}
			})

			//热门专区数据写入
			$.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'热门专区'},
				dataType: 'json',
				async:false,
				success:function(response){
					console.log(response)
					var a;
					//热门
					var $hot = $('<div/>').addClass('hot_product')
					var $h3 = $('<h3>')
					$h3.text('热门专区')
					var $picture=$('<div/>').addClass('picture')
					$hot.prepend($h3)
					$h3.after($picture)
			
					var hot = response.map(function(item,index){
							
							switch(index){
								case 0:
								a = 'first';
								break; 
								case 1:
								a = 'second';
								break;
							return `<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}" class="${a}">
			 				<img src="../../upload/${item.listImg[0]}" alt="">
			 						</a>`
							}
					}).join('')
					console.log(item)
					$picture.append(hot)
					$('.time_product').after($hot)
				}
			})

			//套套专区数据写入
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {"classify":'套套专区'},
			// 	dataType: 'json',
			// 	async:false,
			// 	success:function(response){
			// 		var a;
			// 		// var $condom=$('<div/>').addClass('condom_product')
			// 		// var $h3=$('<h3>')
			// 		// $h3.text('套套专区')
			// 		// var $picture=$('<div/>').addClass('pictures')
			// 		// $hot.prepend($h3)
			// 		// $h3.after($pictures)

			// 		var condom = response.map(function(item,index){
			// 			switch(index){
			// 				case 0:
			// 				a = 'first';
			// 				break; 
			// 				case 1:
			// 				a = 'second';
			// 				break;
			// 			}
			// 			return `<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}" class="${a}">
		 // 				<img src="../../upload/${item.listImg[0]}" alt="">
		 // 			</a>`
			// 		}).join('')
			// 		$('.pictures').append(condom)
			// 		// $('.time_product').after($condom)
			// 	}
			// })

			//女性专区数据写入
			$.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'女性专区'},
				dataType: 'json',
				async:false,
				success:function(response){
					var a;
					var female = response.map(function(item,index){
						switch(index){
							case 0:
							a = 'first';
							break; 
							case 1:
							a = 'second';
							break;
						}
						return `<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}" class="${a}">
		 				<img src="../../upload/${item.listImg[0]}" alt="">
		 			</a>`
					}).join('')
					$('.picture1').append(female)
				}
			})

			//男性专区数据写入
			
			$.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'男性专区'},
				dataType: 'json',
				async:false,
				success:function(response){
					var a;
					var male = response.map(function(item,index){
						switch(index){
							case 0:
							a = 'first';
							break; 
							case 1:
							a = 'second';
							break;
						}
						return `<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}" class="${a}">
		 				<img src="../../upload/${item.listImg[0]}" alt="">
		 			</a>`
					}).join('')
					$('.picture2').append(male)
				}
			})

			//猜你喜欢专区
			
			$.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'猜你喜欢'},
				dataType: 'json',
				async:false,
				success:function(response){
				
					var all = response.map(function(item){	
						var sale = '已售' + ' ' + item.sales;			
						return `<div class="prlist">
					 				<a href="http://localhost:888/webapp/html/detail.html?_id=${item._id}">
					 					<img src="../../upload/${item.listImg[0]}" alt="">
					 					<p class="detail">${item.title}</p>
					 					<p class="price">￥${item.price}
											<span class="sale">
												${sale}
											</span>
					 					</p>
					 				</a>
					 			</div>`
					}).join('')
					$('.you_like h3').after(all)
				}
			})

			//页面的数据传参
			// var obj = {
			// 	name:'非洲美女',
			// }

			// var $btn =$('.forth')
			// console.log($btn)

			// $btn.click(function(){
			// 	// 如何把对象作为参数传递到另外一个页面
			// 	// '?name=meinv&age=18&gender=female'

			// 	var res = '?';
			// 	for(var attr in obj){
			// 		res += attr + '=' + obj[attr] + '&'
			// 	}
			// 	res = res.slice(0,-1);



			// 	location.href="shoppingCart.html" + res
			// });
		});		
	});
});