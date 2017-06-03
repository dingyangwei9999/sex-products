require(['config'],function(){
	require(['jquery','sideshow','global'],function(){		
	 	// 拿取传参的参数
		var data_name = location.search.substring(1).slice(4);
		var i=0;
		//获得sessionStorage中的商品信息
		var goods = sessionStorage.getItem('goods');
		//假如有则解析，没有则给空数组
		goods = goods ? JSON.parse(goods) : [];
		goods.forEach(function(item){
			console.log(goods)
			 	if (item._id === data_name ) {
			 		i = item.count;
			 		// 有值的时候就显示，没有就不显示
			 		if(i>0){
						$('#btn_addCart').show();
						session(i)
					}else{
						$('#btn_addCart').hide();
					}
			 	} 
		})
		function shop_session(){
			//是否找到商品
			var hasGoods = false;
			//遍历查找商品
			for(var foo=0; foo<goods.length; foo++){
				if(goods[foo]._id === data_name){
					hasGoods = true;
					goods[foo].count =i;
					break;
				}
			}
			//没有该商品则创建该商品id和数量
			if(!hasGoods){
				var shopCartObj = {
					_id:data_name,
			 		count:i
			 	}
			 	goods.push(shopCartObj);
			}

			//存入sessionStorage中
			window.sessionStorage.setItem('goods',JSON.stringify(goods));
	 	}
	 	// 跳转到购物车
	 	$('.detail_cart').on('click',function(){
	 		location.href=erp.htmlUrl+"shoppingCart.html"
	 	})
	 	$('#fun_shou').click(function(){
	 		location.href =	erp.webappUrl+ "index.html"
	 	})
	 	$('#fun_member').click(function(){
	 		location.href =	erp.htmlUrl+ "memberCenter.html"
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
		$('.pic_left').on('touchstart',function(){
			window.history.back(-1);
			// window.history.go(-1);
		})

		// nav的切换
		var btn_nav = $('.nav');
		btn_nav.on('click',function(){
			var ind=$(this).index();
			btn_nav.eq(ind).addClass('navon').siblings().removeClass('navon');
			 $('.tab_con').eq(ind).parents().children('.tab_con').hide();
			 $('.tab_con').eq(ind).show();
		});
		// 详情页背景颜色图
		var btn_choose=$('.good_choose');
		btn_choose.on('click',function(){
			$('.detail_pic').fadeIn(500);
			$('.detail_bottom').show();
		})
		var btn_closegood = $('.bottom_infoclose');
		btn_closegood.on('click',function(){
			$('.detail_bottom').hide();
			$('.detail_pic').fadeOut(300);

		})
		 // 收藏按钮
		var btn_like=$('.like');
	 	var flag =0;
	 	btn_like.click(function(){
	 		flag++;
	 		if(flag%2===1){
	 			$('.like .iconfont').css('color','#FD19AE'); 
	 		}else{
	 			$('.like .iconfont').css('color','#666666');
	 		}
	 	})
		 // 加入购物车
		var btn_addshoppCart=$('.addCart');
		// 点击加入购物车出现的小按钮
	 	$('#btn_add').on('click',function(){
	 		$(this).prev('input').text(function(){
	 			i = ++this.value;
	 			return i;
	 		})
	 		session(i);
	 		shop_session();
	 	});		
	 	// 减少按钮
	 	$('#btn_reduce').on('click',function(){
	 		i--;
	 		if(i<1){
	 			return 1
	 		}
	 		session(i);
	 		shop_session();
	 	});
	 	// 确认按钮
		$('.bottom_confim').click(function(){
			$('#btn_addCart').css('display','block');
			$('.detail_bottom').hide();
			$('.detail_pic').hide();
			$('bottom_total').val(i);
			session(i);
		})

		// 加入购物车
		btn_addshoppCart.on('click',function(){
			i++;
		 	$('#btn_addCart').show();
		 	$('.success').stop(true).show(200).delay(400).hide(300);
			shop_session();
			session(i);
		})
		// 重写数值session
		function session(i){
			$('#btn_addCart').text(i);
			$('#bottom_total').val(i);
			$('#staNum').text('数量为 : '+i);
		}
		// 点击更多的按钮
		var btn_evenmore = $('.btn_more');
		btn_evenmore.on('click',function(){
			$('.hide_fun').toggle();
		})

		var shop_preview;
		// 数据的拿取
		$.ajax({
				url: erp.baseUrl + 'getProductsById',
				type: 'post',
				data: {'_id':data_name},
				dataType: 'json',
				success:function(response){
					console.log(response)
					shop_preview = response.preview;
					// 轮播图
					response.bannerImg.forEach(function(item,index){
						var pic= `
			 				<div class="swiper-slide">
			 					<img src="${erp.baseUrl}upload/${item}">
			 				</div>
			 				
			 				`;
			 			$('.swiper-wrapper').append(pic);
					});
					// 底部图片的显示
					$('.info_left').append(`<img src="${erp.baseUrl}upload/${response.preview}">`);
			 		// 标题
			 		$('.good_title').text(response.title);
			 		// 价格
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
				 		var listImg =`
				 				<img src="${erp.baseUrl}upload/${item}">
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
		// 跳转到登录页面
	 	$('.detail_buy').on('click',function(){
	 	 	var key = window.sessionStorage.getItem('phone');
	 		if (key) {
	 			location.href="shoppingCart.html"
	 		}else{

	 			location.href="login.html"
	 		}
	 	 })
	});
})
