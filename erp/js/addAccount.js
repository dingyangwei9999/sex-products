require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$('#register').click(function(){
			var account = $('#account').val();
			var password = $('#password').val();
			$.ajax({
				url: erp.baseUrl + 'registerAdmin',
				data: {adminAccounts : account,password : password},
				dataType: 'json',
				type: 'post',
				success: function(response){
					console.log(response)
				}
			});
		});
	});
});