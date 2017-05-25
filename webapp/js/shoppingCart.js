require(['config'],function(){
	require(['jquery','baseUrl'],function(){
		// 收藏
		$('.move_fav').click(function(){
			$('.dialog').show();
			console.log(99)
		})
		// 删除按钮
		$('.del').click(function(){
			$('.dialog').show();
		})
		// 删除按钮里面的取消
		$('.quxiao').click(function(){
			$('.dialog').hide();
			console.log(99)
		})
		// 左边的点击按钮
		$('.check').click(function(){
			if($('#pic_cart i').hasClass("check")){//如果当前隐藏  
		      	$('#pic_cart i').removeClass().addClass('checkon');
	        }else{ 
		       	$('#pic_cart i').removeClass().addClass('check');
	    	}
		})
		// 添加按钮
		$('.plus').click(function(){
			$('.num_text')
		})
	});
});