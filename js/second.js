$(function(){
	var myPageNum=1;
	var myPageSize=5;
	//页面打开数据渲染页面
	function getData(){
	$.get('/category/querySecondCategoryPaging',{page:myPageNum, pageSize:myPageSize},function(backData){
		console.log(backData);
		$('tbody').html(template('second',backData));
		  $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total/backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        // 为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum =page;
                        // 重新获取数据
                        getData();
                    }
                });
	})
	}
	getData();
})