require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$(function(){
			console.log(erp.baseUrl);
			// //根据id查找商品
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsById',
			// 	type: 'post',
			// 	data: {'_id':'592653fa929b510c502acc42'},
			// 	dataType: 'json',
			// 	success:function(response){
			// 		console.log(response);
			// 	}
			// });
			// //查找所有商品
			$.ajax({
				url: erp.baseUrl + 'getProducts',
				type: 'post',
				dataType: 'json',
				success:function(response){
					addProducts(response);
				}
			});

			//表格中产生的事件
			$('#tbody')
			//点击删除按钮事件
			.on('click','#btn_del',function(){
				var $tr = $(this).closest('tr');
				var _id = $tr.attr('data-_id');
				$.ajax({
					url: erp.baseUrl + 'delProducts',
					type: 'post',
					data: {"_id":_id},
					dataType: 'json',
					success:function(response){
						console.log(response);
						//数据库删除成功后移除DOM节点
						if(response.status){
							$tr.remove();
						}
					}
				});
			})
			//input失去焦点修改数据库
			.on('blur','input',function(){
				console.log(this)
				$self = $(this);
				var $val = $self.val();
				var $key = $self.closest('td').attr('class');
				var $tr = $self.closest('tr');
				var _id = $tr.attr('data-_id');
				if($key === 'keyword' || $key === 'classify'){
					console.log('=========',$key);
					// var keyword = $key;
					// var classify = $('#classify').val();
					$val = $val.split(/，|,|\s+/);
					// classify = classify.split(/，|,|\s+/);
				}
				console.log($key,$val);
				$.ajax({
					url: erp.baseUrl + 'updataProducts',
					type: 'post',
					data: {"_id":_id,"data":JSON.stringify({[$key]:$val})},
					dataType: 'json',
					success:function(response){
						console.log(response);
						//数据库删除成功后移除DOM节点
						// if(response.status){
						// 	$tr.remove();
						// }
					}
				});				
			});
			//通过数据查找商品(用于keyword,classify)
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {"classify":'紫'},
			// 	dataType: 'json',
			// 	success:function(response){
			// 		console.log(response);
			// 	}
			// });
			
			//搜索功能
			$('.js_search').on('click',function(){
				var keyword = $('input.js_keyword').val();
				//获取select选择的option
				var searchKey = $('#select').val();
				//设置ajax请求发送的路由,默认不搜商品id
				var router = 'getProductsByArr';
				//设置是否开启全局搜索,默认取消
				var fuzzy = false;

				if(searchKey === "_id"){
					router = 'getProductsById';
				}else if(searchKey === "searchAll"){
					fuzzy = true;
				}
				console.log(keyword,searchKey,router,fuzzy);
				$.ajax({
					url: erp.baseUrl + router,
					type: 'post',
					data: {[searchKey]:keyword,"fuzzy":fuzzy},
					dataType: 'json',
					success:function(response){
						console.log(response);
						//成功请求后先清空页面内容再插入元素
						$('#tbody').empty();
						addProducts(response);
					}
				});
			});

			//向表体插入数据
			function addProducts(data){
				//判断data是否为数组，如果搜索的是商品ID，data类型为对象，为对象时push进arr,不为对象，引用给arr,arr肯定是数组，进行遍历
				var arr = [];
				if(data instanceof Array){
					arr = data;
				}else{
					//查找商品ID时如果没找到则不push
					if(data._id){
						arr.push(data);
					}
				}
				console.log('arr,',arr,'data',data,data instanceof Array);
				$('#tbody').append(
					arr.map(function(elem, index) {
						return `
						<tr data-_id="${elem._id}">
                <td class="t_check"><input type="checkbox" /></td>
                <td id="t_preview" class="preview"><img src="../upload/${elem.preview}"></td>
                <td class="_id"><a title="${elem._id}">${elem._id}</a></td>
                <td class="title"><input type="text" name="" value="${elem.title}" id="resetSty"></td>
                <td class="price"><input type="text" name="" value="${elem.price}" id="resetSty"></td>
                <td class="ori_price"><input type="text" name="" value="${elem.ori_price}" id="resetSty"></td>
                <td class="repertory"><input type="text" name="" value="${elem.repertory}" id="resetSty"></td>
                <td class="sales"><input type="text" name="" value="${elem.sales}" id="resetSty"></td>
                <td class="freight"><input type="text" name="" value="${elem.freight}" id="resetSty"></td>
                <td class="classify"><input type="text" name="" value="${elem.classify}" id="resetSty"></td>
                <td class="keyword"><input type="text" name="" value="${elem.keyword}" id="resetSty"></td>
                 <td class="prefecture"><input type="text" name="" value="${elem.prefecture}" id="resetSty"></td>
                <td class="t_del"><span class="am-btn am-btn-default am-btn-xs am-text-danger am-round" id="btn_del"><i class="am-icon-trash-o"></i></span></td>
              </tr>
						`;
					})
				);
			}
		});
	});
});