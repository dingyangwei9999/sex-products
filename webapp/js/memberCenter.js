require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			$.post(erp.baseUrl +  'getmyProfile',{},function(response){
				console.log(response)

				// 名字写入
				$('.identity .name').text(response[0].nickname)
			});

			//点击左上角的X，跳转主页 
			$('.topExit').click(function(){
				window.location.href='../index.html';
			})

			// 点击'设置图标' 和 '我的资料'，跳转我的资料的界面
			$('.myData,.personalDataSet').click(function(){
				window.location.href='myProfile.html';
			})

			// 点击 收货管理地址,跳转
			$('.myDress').click(function(){
				window.location.href='address.html';
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
			





						
			
		})
	})
})