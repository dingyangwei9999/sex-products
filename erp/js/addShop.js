require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$(function(){
			//点我增加图片功能
			$('.js_addImg').click(function(){
				$(this).remove();
				console.log(this);
				var str = '<input type="file" name="listImg" id="input">';
				var addinput = '';
				for(var i=0; i<14; i++){
					addinput += str;
				}
				addinput += '<p class="am-form-help">请选择要上传的文件...</p>';
				console.log(addinput);
				$(addinput).appendTo('.js_addinput');
			});

			//按钮:仅发布
			$('.am-btn-success').click(sendDB);
			//按钮:发布并刷新页面
			$('.am-btn-secondary').click(function(){
				sendDB() ? location.reload() : '';			
			});

			function sendDB(){
				//判断信息有无录入完整
				var $allInput = $('.am-form input[type=text]');
				var entering = true;
				$($allInput).each(function(index,elem){
					if($(elem).val()===''){
						alert('请填写完整信息');
						entering = false;
						return false;
					}
				});
				if(!entering){
					return false;
				}

				//信息填写完整继续执行
				var newShop = {};
				newShop.title = $('#title').val();
				newShop.price = $('#price').val();
				newShop.ori_price = $('#ori_price').val();
				newShop.freight = $('#freight').val();
				newShop.sales = $('#sales').val();
				newShop.repertory = $('#repertory').val();
				//分别将关键字和分类变换成数组
				var keyword = $('#keyword').val();
				var classify = $('#classify').val();
				keyword = keyword.split(/，|,|\s+/);
				classify = classify.split(/，|,|\s+/);
				newShop.keyword = keyword;
				newShop.classify = classify;
				newShop.description = $('#description').val();
				//将对象转换成json字符串，用于发送ajax请求
				newShop = JSON.stringify(newShop);
				// sessionStorage.setItem('shop',newShop);

				//提交表单，发送所有表单数据
				$('form').ajaxSubmit({
					type: 'post',
					data: {'newShop':newShop},
					dataType: 'json',
					url: erp.baseUrl + 'upload',
					success:function(data){
                        console.log(data);
                        window.location.reload();
                    },
                    error:function(XmlHttpRequest,textStatus,errorThrown){
                        console.log(XmlHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
				});	
				return true;
			}
		});
	});
});
