$(function(){
	var myPageNum=1;
	var myPageSize=5;
	//页面打开数据渲染页面
	function getData(){
	$.get('/product/queryProductDetailList',{page:myPageNum, pageSize:myPageSize},function(backData){
		console.log(backData);
		$('tbody').html(template('products',backData));
		  $(".pagination").bootstrapPaginator({
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
	//文件上传
	$('#fileUpload').fileupload({
		dataType:'json',
		done:function(e,data){
			$('<img style="width=100px;height=100px;"src="'+data.result.picAddr+'"/>').appendTo('form .form-group:last');
		}
	})
	//超出禁止选择图片
	$('#fileUpload').click(function(e){
		if($('form .form-group:last img').length==3){
			e.preventDefault();
			console.log('你点我啦');	
		}
	})
	//双击form最下面的图片删除自己
	$('form .form-group:last').on('dblclick','img',function(){
		console.log('你双击我啦');
		$(this).remove();
	})
	//数据验证
	  $('form').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            proName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            oldPrice: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            price: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            proDesc: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            size: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            statu: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            num: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            },
            brandId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
            // 数据验证
           
        }
}).on('success.form.bv',function(){
	e.preventDefault();
	//console.log('上传成功了');
	$.post('/product/addProduct',$('form').serialize(),function(backData){
		console.log(backData);
		//清空表单
		$('form input').val('');
		$('.modal-add').modal('hide');
		//重新渲染数据
		getData();
	})
})
	  })