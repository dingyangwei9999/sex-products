$('header').load('commonHeader.html');
$('.nav-navicon').load('commonLeftNav.html',function(){
	//左栏鼠标滑动动态效果
	$(".sideMenu").slide({
		titCell:"h3", //鼠标触发对象
		targetCell:"ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
		effect:"slideDown", //targetCell下拉效果
		delayTime:300 , //效果时间
		triggerTime:150, //鼠标延迟触发时间（默认150）
		defaultPlay:true,//默认是否执行效果（默认true）
		returnDefault:true //鼠标从.sideMen移走后返回默认状态（默认false）
	});

	//判断是否已登录
	var account = sessionStorage.getItem('account');
	$('.showAccount').text('欢迎系统管理员：' + account);
	if(!account){
		alert('请登录后再访问');
		window.location.href = "login.html";
	}

	//退出
	$('#logout').click(function(){
		sessionStorage.removeItem('account');
		window.location.href ='login.html';
	});
});
