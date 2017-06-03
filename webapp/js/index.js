require(['config'],function(){
	require(['jquery','swiper','global'],function(){
		$(function(){
			$('.footer').load(erp.htmlUrl+'footer.html');
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
		        	$search.css('backgroundColor',$main_color)
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
		    });
		    $close.click(function(){
		    	// $container.fadeIn();
		    	// $warp.fadeOut();
		    	window.location.reload();
		    });

		    //placeholder文字隐藏
		    $('.searchText').click(function(){
		    	$('.searchText').attr('placeholder','')
		    });
		    $('.searchText').blur(function(){
		    	$('.searchText').attr('placeholder','情趣内衣')
		    });


		    //nav-list的 a标签localhost更改为erp
		    var $nav_list_A = $('.nav-list a');
		    // console.log($nav_list_A)
		    $nav_list_A.each(function(index,item){
				$(item).attr('href',erp.htmlUrl + $(item).attr('href'));
		    });

		    //读取数据
		    $.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'限时抢购'},
				dataType: 'json',
				// async:false,
				success:function(response){
					console.log('---------');
					// console.log(response)
					var res = response.map(function(item){
						console.log(item)
						var reduce=parseInt(item.ori_price - item.price);
						return `
							<li>
								<a href="${erp.htmlUrl}detail.html?_id=${item._id}">
									<img src="${erp.baseUrl}upload/${item.preview}" alt="">
								</a>
			 					<p>￥${item.price}</p>
			 					<p><s>￥${item.ori_price}</s></p>
			 					<p class="save">立省${reduce}</p>
	 						</li>
	 							` 
					}).join('')
					$('.time_product ul').append(res)
				}
			});


		    /*
		    	getProductsAdvanced
		    	查找商品信息，可以限制数量，可以排序，用于分页
		        skip：查找起始位置 skip:1
		        limit：得到结果的个数 limit:1
		        sort：根据给定条件排序 1升序-1降序 (必须JSON.strigify否则后台parse出错,会取消排序
		        格式："sotr":JSON.strigify({price:1}))
    			省略则按数据库默认

    			示例：
		     */
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsAdvanced',
			// 	type: 'post',
			// 	dataType: 'json',
			// 	data: {"classify":"女性","skip":1,"limit":5,"sort":JSON.stringify({price:1})},
			// 	success: function(response){
			// 		console.log(response)
			// 	}
			// });

		    //发送请求，获取数据库中所有专区
			$.ajax({
				url: erp.baseUrl + 'getBaseInfo',
				type: 'post',
				dataType: 'json',
				success: function(response){
				    //得到数据库中首页的专区
	    			var prefecture = [];
	    			//遍历response以获得专区
					response.forEach(function(item){
						prefecture = item.prefecture;
					});
					prefecture.forEach(function(elem){
						//此处elem就是需要查询专区 (如女性专区)
						console.log(elem);
						$.ajax({
							url: erp.baseUrl + 'getProductsAdvanced',
							type: 'post',
							//limit为5 只拿5个数据
							data: {"prefecture":elem,"limit":5},
							dataType: 'json',
							// async:false,
							success:function(response){
								var a;
								var female =`
								<div class="prefectureDiv">
						 			<h3>${elem}
										<a href="${erp.htmlUrl}classify_female.html">更多&nbsp;&nbsp;>
						 				</a>
						 			</h3>
						 			<div class="pic">
						 				<div class="picture1 clearfix">`;
								female += response.map(function(item,index){
									switch(index){
										case 0:
										a = 'first';
										break; 
										case 1:
										a = 'second';
										break;
									}
									return `
				 						<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
					 						<img src="${erp.baseUrl}upload/${item.preview}" alt="">
					 					</a>
										`;
								}).join('');
								female += `</div></div></div>`;
								$('.prefectureBox').append(female);
							}
						});
					});
				}
			});


			// //热门专区数据写入
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {},
			// 	dataType: 'json',
			// 	// async:false,
			// 	success:function(response){
			// 		console.log(response)
			// 		var a;
			// 		//热门
			// 		var $hot = $('<div/>').addClass('hot_product')
			// 		var $h3 = $('<h3>')
			// 		//套套
			// 		var $condom = $('<div/>').addClass('condom_product')
			// 		var $h3 = $('<h3>')

			// 		$h3.text('热门专区')
			// 		var $picture=$('<div/>').addClass('picture')
			// 		$hot.prepend($h3)
			// 		$h3.after($picture)
			
			// 		var hot = response.map(function(item,index){
			// 			if(response[index].classify == '热门专区'){
							
			// 				switch(index){
			// 					case 3:
			// 					a = 'first';
			// 					break; 
			// 					case 4:
			// 					a = 'second';
			// 					break;
			// 				}
			// 				return `<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
			//  				<img src="../../upload/${item.listImg[0]}" alt="">
			//  						</a>`
			// 			}else if(response[index].classify == '套套专区'){
			// 				console.log(index)

			// 				switch(index){
			// 					case 8:
			// 					a = 'first';
			// 					break; 
			// 					case 9:
			// 					a = 'second';
			// 					break;
			// 				}
			// 				return `<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
			//  				<img src="../../upload/${item.listImg[0]}" alt="">
			//  						</a>`
			// 			}
			// 		}).join('')
			// 		$picture.append(hot)
			// 		$('.time_product').after($hot)
			// 	}
			// })

			// //套套专区数据写入
			// // $.ajax({
			// // 	url: erp.baseUrl + 'getProductsByArr',
			// // 	type: 'post',
			// // 	data: {"classify":'套套专区'},
			// // 	dataType: 'json',
			// // 	async:false,
			// // 	success:function(response){
			// // 		var a;
			// // 		// var $condom=$('<div/>').addClass('condom_product')
			// // 		// var $h3=$('<h3>')
			// // 		// $h3.text('套套专区')
			// // 		// var $picture=$('<div/>').addClass('pictures')
			// // 		// $hot.prepend($h3)
			// // 		// $h3.after($pictures)

			// // 		var condom = response.map(function(item,index){
			// // 			switch(index){
			// // 				case 0:
			// // 				a = 'first';
			// // 				break; 
			// // 				case 1:
			// // 				a = 'second';
			// // 				break;
			// // 			}
			// // 			return `<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
		 // // 				<img src="../../upload/${item.listImg[0]}" alt="">
		 // // 			</a>`
			// // 		}).join('')
			// // 		$('.pictures').append(condom)
			// // 		// $('.time_product').after($condom)
			// // 	}
			// // })

			// //女性专区数据写入
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {"classify":'女性专区'},
			// 	dataType: 'json',
			// 	// async:false,
			// 	success:function(response){
			// 		var a;
			// 		var female = response.map(function(item,index){
			// 			switch(index){
			// 				case 0:
			// 				a = 'first';
			// 				break; 
			// 				case 1:
			// 				a = 'second';
			// 				break;
			// 			}
			// 			return `<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
		 // 				<img src="../../upload/${item.listImg[0]}" alt="">
		 // 			</a>`
			// 		}).join('')
			// 		$('.picture1').append(female)
			// 	}
			// })

			// //男性专区数据写入
			
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {"classify":'男性专区'},
			// 	dataType: 'json',
			// 	// async:false,
			// 	success:function(response){
			// 		var a;
			// 		var male = response.map(function(item,index){
			// 			switch(index){
			// 				case 0:
			// 				a = 'first';
			// 				break; 
			// 				case 1:
			// 				a = 'second';
			// 				break;
			// 			}
			// 			return `<a href="${erp.htmlUrl}detail.html?_id=${item._id}" class="${a}">
		 // 				<img src="../../upload/${item.listImg[0]}" alt="">
		 // 			</a>`
			// 		}).join('')
			// 		$('.picture2').append(male)
			// 	}
			// })

			// //猜你喜欢专区
			
			$.ajax({
				url: erp.baseUrl + 'getProductsAdvanced',
				type: 'post',
				data: {"limit":20},
				dataType: 'json',
				// async:false,
				success:function(response){
				
					var all = response.map(function(item){	
						var sale = '已售' + ' ' + item.sales;			
						return `<div class="prlist">
					 				<a href="${erp.htmlUrl}detail.html?_id=${item._id}">
					 					<img src="${erp.baseUrl}upload/${item.preview}" alt="">
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