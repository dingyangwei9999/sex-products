require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			$('footer').load('footer.html');
			$.post(erp.baseUrl +  'getmyProfile',{phone:sessionStorage.getItem('phone')},function(response){
				console.log(response)

				// 名字写入
				$('.identity .name').text(response[0].nickname)
			});

			// 判断显示隐藏 照相图库ul
			$('.personalDataSet').on('touchstart',function(){
				$('.personalDataSet ul').stop().slideToggle();
			})
			$('body').on('touchstart',function(){
				if($('.personalDataSet ul').css('height')!='0px'){
					$('.personalDataSet ul').slideUp();
				}	
			})

			// 点击'照相'，打开摄像头,拍摄相片替代头像
			$('.personalDataSet .Camera').click(function(){
				navigator.camera.getPicture(function(_src){
					$('.headPortrait img').attr('src',_src)
				},function(err){console.log(err)},{
					quality:50,
					destinationType:Camera.DestionationType.FILE_URI,
					saveToPhotoAlbum:true
				})
			})
			// 点击'图库'，打开相册,选取图片替代头像
			$('.personalDataSet .Picture').click(function(){
				navigator.camera.getPicture(function(_src){
					$('.headPortrait img').attr('src',_src)
				},function(err){console.log(err)},{
					quality:50,
					sourceType:Camera.SourceType.PHOTPLIBRARY,
					destinationType:Camera.DestionationType.FILE_URI,
					mediaType:Camera.MediaType.PICTURE

				})
			})


			// 点击 '我的资料'，跳转我的资料的界面
			$('.myData').click(function(){
				window.location.href='myProfile.html';
			})

			// 点击 收货管理地址,跳转
			$('.myDress').click(function(){
				window.location.href='address.html';
			})

			// 点击 购物车,跳转
			$('.myCarList').click(function(){
				window.location.href='shoppingCart.html';
			})

			// 点击 我的优惠券,跳转
			$('.myCoupon').click(function(){
				alert('您没有优惠券')
			})

			// 点击 我的收藏,跳转
			$('.mycollect').click(function(){
				alert('您没有收藏任何商品')
			})


			// 点击 我的订单，跳转 订单界面
			$('.orderTop').click(function(e){
				window.location.href='myOrder.html?i=0';
			})
			
			$('.daifukuan').click(function(){
				window.location.href='myOrder.html?i=1';
			})
			$('.daifahuo').click(function(){
				window.location.href='myOrder.html?i=2';
			})
			$('.daishouhuo').click(function(){
				window.location.href='myOrder.html?i=3';
			})
			$('.daituikuan').click(function(){
				window.location.href='myOrder.html?i=4';
			})

			$('.logout').on('touchend',function(){
				sessionStorage.removeItem('phone');
				window.location.href='login.html'
			})

			
		})
	})
})






