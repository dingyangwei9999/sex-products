require(['config'],function(){
	require(['jquery','sideshow','global'],function(){
		 // 页面之间传参
		//  var data = location.search.substring(1);
		// var arr = data.split('&');
		// // 遍历数组
		// var obj = {};
		// arr.forEach(function(item){
		// 	var arr = item.split('=');

		// 	console.log(arr)
		// 	obj[arr[0]] = decodeURI(arr[1]);
		// });
		// var obj = {
		// 	_id:'59278dc5386c5904e0a0ede8'

		// }
		// $('.btn_car').click(function(){
		// 	// 如何把对象作为参数传递到另外一个页面
		// 	// '?name=meinv&age=18&gender=female'
			
		// 	var res = '?';
		// 	for(var attr in obj){
		// 		res += attr + '=' + obj[attr] + '&'
		// 	}
		// 	res = res.slice(0,-1);



		// 	location.href="shoppingCart.html" + res

		// })
		
		
	 	// 跳转到购物车
	 	$('.detail_cart').on('click',function(){
	 		location.href="shoppingCart.html"
	 	})

	 	// 跳转到登录页面
	 	$('.detail_buy').on('click',function(){
	 		// window.sessionStorage.setItem('phone',"333")
	 	 	var key = window.sessionStorage.getItem('phone');
	 		if (key) {
	 			location.href="shoppingCart.html"
	 		}else{

	 			location.href="login.html"
	 		}
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
		});




		// 详情页背景颜色图
		var btn_choose=$('.good_choose');
		btn_choose.on('click',function(){
			$('.detail_pic').show();
			$('.detail_bottom').show();
		})
		var btn_closegood = $('.bottom_infoclose');
		btn_closegood.on('click',function(){
			$('.detail_bottom').hide();
			$('.detail_pic').hide();

		})


		 // 收藏按钮
		var btn_like=$('.like');
		btn_like.click(function(){
			var yRgb ="#FD19AE";
			if(!$('.like .iconfont').hasClass("yRgb") ){
				$('.like .iconfont').css('color',yRgb); 
			}else{
				$('.like .iconfont').css('color','#fff'); 
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

		// 拿取传参的参数
		var data_name = location.search.substring(1).slice(4);
		// var data_name='59278dc5386c5904e0a0ede8';
		// 数据的拿取
		$.ajax({
				url: erp.baseUrl + 'getProductsById',
				type: 'post',
				data: {'_id':data_name},
				dataType: 'json',
				success:function(response){
					console.log(response);
					// 轮播图
					response.bannerImg.forEach(function(item,index){
						var pic= `
			 				<div class="swiper-slide">
			 					<img src="../../upload/${item}">
			 				</div>
			 				
			 				`;
			 			$('.swiper-wrapper').append(pic);
					});

			 		// 标题
			 		$('.good_title').text(response.title);
			 		// 价格
			 		console.log(response.price)
			 		console.log($('#marketprice'))
			 		$('#marketpric').text(response.price);
			 		$('#marketprice').text(response.price);
			 		// 市场价
			 		$('#yuan').text(response.ori_price);
			 		// 库存
			 		$('#stock_nem').text(response.repertory);
			 		$('#stock').text(response.repertory);
			 		// 销量
			 		$('#salesNum').text(response.sales);
			 		//列表图
			 		response.listImg.forEach(function(item,index){
			 			console.log(item)
				 		var listImg =`
				 				<img src="../../upload/${item}">
				 		`
				 		$('#con_1').append(listImg);
			 		})


		 			var mySwiper = new Swiper ('.swiper-container', {
				    loop: true,  
				    pagination: '.swiper-pagination', 
				    autoplay:2000
					}) ;
				}
			});


		// session
		// sessionSorge.setItem(key,value)
	});
})