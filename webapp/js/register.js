require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			//返回登陆界面
			$('.backToLogin').on('touchstart',function(){
				window.location.href='login.html'
			})
			

			// 表单字体颜色变回黑色
			$('input').keyup(function(){
				$(this).css({color:'#000'});
			})
			$('form a').on('touchstart',function(){
				window.location.href='resgisterProtocol.html'
			})

			// 点击注册，发送表单数据验证
			$('.register_btn').click(function(){
				// 获取表单输入值
				var phone = $('.phone').val();
				var psd = $('.password').val();
				var psd2 = $('.password2').val();
				// 写正则表达式，规范格式
				if(!/^1[34578]\d{9}$/.test(phone)){
					$('.phone').css({color:'#f00'});
					alert('该手机号不存在');
					return false;
				}
				if(!/^\S{6,12}$/.test(psd)){
					$('.password').css({color:'#f00'});
					alert('密码格式有误');
					return false;
				}
				if(psd2 !=psd){
					$('.password2').css({color:'#f00'});
					alert('两次密码不一致');
					return false;
				}	

				$.post(erp.baseUrl +  'register',{
					phone:phone,
					password:psd
				},function(response){
					if(response.status){
						alert(response.message);
					}
					else{
						alert('恭喜您，已注册成功');
						window.location.href = "login.html";
					}
				})
			})
		})
	})
})