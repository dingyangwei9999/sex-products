require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			
			// 点击左上角 <  返回历史列表中 上一个url
			$('.back').click(function(){
				history.back();
			})

			// 手机号码写入,原资料也写入
			$('.inline .phone').text(sessionStorage.getItem('phone'));
			$.post(erp.baseUrl +  'getmyProfile',{phone:sessionStorage.getItem('phone')},function(response){
				var data = response[0];
				$('.name').val(data.name),
				$('.nickname').val(data.nickname),
				$('.wechat').val(data.wechat),
				$('input:radio:checked').val(data.gender),
				$('.city option:selected').text(data.city),
				$('.date').val(data.birthday)
			});


			$('.modification_btn').click(function(){
				// 点击确认修改，把数据传到数据库   存储在'sex数据库myProfile集合'
				$.post(erp.baseUrl +  'myProfile',{
					name:$('.name').val(),
					nickname:$('.nickname').val(),
					wechat:$('.wechat').val(),
					gender:$('input:radio:checked').val(),
					city:$('.city option:selected').text(),
					birthday:$('.date').val(),
					phone:sessionStorage.getItem('phone')
				},function(response){
					if(response.status){
						alert('资料填写成功')
						window.location.href = "memberCenter.html"
					}
						
					else{
						alert(response.message);
						window.location.href = "memberCenter.html"
					}
				})
			})
		})
	})
})




