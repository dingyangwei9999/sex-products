require(['config'],function(){
	require(['jquery','global'],function(){
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
		$(function() {
					totl();
					adddel();
						//全选
					$('.check_all' ).click(function() {
						all = $(this).prop("checked")
						$(".Each").each(function() {
							$(this).prop("checked", all);
						})
					})
		})
	 	// // 合计
	 	function totl() {
				var sum = 0;
				$(".total").each(function() {
					console.log($('.price').text());
					sum += parseFloat($('.price').text());
					console.log(sum)	
					$(".toal").text(222);

				})
			}
		function adddel(){
			//小计和加减
			$(".plus").each(function() {
				$(this).click(function() {
					// console.log($(this))
					var $multi	 = 0;
					var vall = $(this).prev().val();
					vall++;
					$(this).prev().val(vall);
					$multi = parseFloat(vall) * parseFloat($(this).parent().prev().text());
					$(this).parent().next().text(Math.round($multi));
					totl();
				})

			})
			//减
			$(".sub").each(function() {
				$(this).click(function() {
					var $multi1 = 0;
					var vall1 = $(this).next().val();
					vall1--;
					if(vall1 <= 0) {
						vall1 = 1;
					}
					$(this).next().val(vall1);
					$multi1 = parseFloat(vall1) * parseFloat($(this).parent().prev().text());
					$(this).parent().next().text(Math.round($multi1));
					totl();
				})

			})
		}
	});
});