require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$(function(){
			//发送请求获得商品分类和首页专区(不需要传data)
			$.ajax({
				url: erp.baseUrl + 'getBaseInfo',
				type: 'post',
				dataType: 'json',
				success: function(response){
					console.log(response);
					var inputValOfPrefecture = '';
					var inputValOfClassify = '';
					response.forEach(function(item){
						inputValOfPrefecture += item.prefecture;
						inputValOfClassify += item.classify;
						console.log(item)
					});
					$('.prefecture').val(inputValOfPrefecture);
					$('._classify').val(inputValOfClassify);
				}
			});
			$('.js_prefecture').click(function() {
				var $self = $(this);
				var currentInput = $('.prefecture');
				//切换按钮颜色
				$self.toggleClass('am-btn-danger').toggleClass('am-btn-success');
				//更换input的disable状态
				var status = !currentInput.attr('disabled');
				currentInput.attr('disabled',status);
				//更换按钮文字
				status ? $self.text('添加/删除 专区') : $self.text('确定修改 (多个专区用中/英逗号或空格分隔)');
				console.log(status);
				//根据按钮状态判断是否发送请求
				if(!status){
					currentInput.focus();
				}else{
					var inputVal = currentInput.val();
					inputVal = JSON.stringify(inputVal.split(/，|,|\s+/));
					console.log(inputVal,typeof inputVal);
					//发送修改专区数目
					$.ajax({
						url: erp.baseUrl + 'updateBaseInfo',
						type: 'post',
						dataType: 'json',
						data: {'prefecture':inputVal},
						success: function(response){
							console.log(response);
						}
					});
				}
			});
			$('.js_classify').click(function() {
				var $self = $(this);
				var currentInput = $('._classify');
				//切换按钮颜色
				$self.toggleClass('am-btn-danger').toggleClass('am-btn-success');
				//更换input的disable状态
				var status = !currentInput.attr('disabled');
				currentInput.attr('disabled',status);
				//更换按钮文字
				status ? $self.text('添加/删除 分类') : $self.text('确定修改 (多个分类用中/英逗号或空格分隔)');
				console.log(status);
				//根据按钮状态判断是否发送请求
				if(!status){
					currentInput.focus();
				}else{
					var inputVal = currentInput.val();
					inputVal = JSON.stringify(inputVal.split(/，|,|\s+/));
					console.log(inputVal,typeof inputVal);
					//发送修改分类数目
					$.ajax({
						url: erp.baseUrl + 'updateBaseInfo',
						type: 'post',
						dataType: 'json',
						data: {'classify':inputVal},
						success: function(response){
							console.log(response);
						}
					});
				}
			});
		});
	});
});