require(['config'],function(){
	require(['jquery','global','verificationNumbers','particleground'],function($){
		$(function(){
			//粒子背景特效
			//#5cbdaa
			$('body').particleground({
				dotColor: '#5cbdaa',
				lineColor: '#5cbdaa'
			});
			//创建验证码
			createCode();
			//通过按钮验证验证码
			$('.ver_btn').on('click',function(){
				validate();
			});

			//登录按钮事件
			$('.submit_btn').on('click',function(){
				//验证验证码是否通过
				if(!validate()){
					return false;
				}else{
					//通过则跳转页面
					$.post(erp.baseUrl +  'loginAdmin',{
						adminAccounts:$('.account').val(),
						password:$('.password').val()
					},function(response){
						console.log(response);
						var accountNum = response.data[0].adminAccounts;
						if(response.status){
							sessionStorage.setItem('account',accountNum)
							// 登录成功 跳转主页
							window.location.href = "listShop.html"
						}
						else{
							alert(response.message)
						}
					});
				}
			});
		});
	});
});