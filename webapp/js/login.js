require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){

			//点击快速注册，跳转注册界面
			$('.rapidRegistration').click(function(){
				window.location.href='register.html'
			})

			// 点击验证码登录
			$('.loginCode').click(function(){
				alert('暂不支持此功能')
			})

			// 表单字体颜色变回黑色
			$('input').keyup(function(){
				$(this).css({color:'#000'});
			})

			$('.login_btn').click(function(){
				// 获取表单输入值
				var phone = $('.phone').val();
				var psd = $('.password').val();
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

				$.post(erp.baseUrl +  'login',{
					phone:$('.phone').val(),
					password:$('.password').val()
				},function(response){
					var phoneNum = resposne.data[0].phone;
					if(response.status){
						sessionStorage.setItem('phone',phoneNum);
						// 登录成功 跳转主页
						window.location.href = "../index.html"
					}
					else{
						alert(response.message)
					}
				})
			})
		})
	})
})