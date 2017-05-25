require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			// 点击左上角 <  返回历史列表中 上一个url
			$('.back').click(function(){
				history.back();
			})

			$('.modification_btn').click(function(){
				// 点击确认修改，把数据传到数据库   存储在'sex数据库myProfile集合'
				$.post(erp.baseUrl +  'myProfile',{
					name:$('.name').val(),
					nickname:$('.nickname').val(),
					wechat:$('.wechat').val(),
					gender:$('input:radio:checked').val(),
					city:$('.city option:selected').text(),
					birthday:$('.date').val()
				},function(response){
					if(response.status){
						alert('修改失败')
					}// 修改失败 跳转主页
						
					else{
						alert(response.message);
						window.location.href = "memberCenter.html"
					}
				})
			})
		})
	})
})