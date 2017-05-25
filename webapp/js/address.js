require(['config'],function(){
	require(['jquery'],function(){
		$(function(){
			
			$('.new_address').click(function(){
				$('.new_address').hide();
				$('.address_main').show();
				$('.address_btn1').show();
				$('.address_btn2').show();
				$('.title').text('添加收货地址')
			})

			//确认按钮生成一个divy以及所有信息
			$('.address_btn1').click(function(){
			
			})

			//取消按钮
			$('.address_btn2').click(function(){
				$('.new_address').show();
				$('.address_main').hide();
				$('.address_btn1').hide();
				$('.address_btn2').hide();
				$('.title').text('收货地址管理')
			});
		});
	});
});