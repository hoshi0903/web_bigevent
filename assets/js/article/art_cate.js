$(function(){
    initArtCateList()

    var form = layui.form
    var layer = layui.layer

    // 获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method: 'GET',
            url:'/my/article/cates',
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('获取文章列表失败！');
                }
                // layer.msg('获取文章列表成功！');
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr)
            }
        })
    }

    // 给添加类别按钮绑定事件
    var indexAdd = null;
    $('#btnAddCate').on('click',function(){
        indexAdd = layer.open({
            // type: 1 不带确定按钮的页面层 0是指信息框
            type: 1,
            // 弹出层宽高
            area: ['500px','250px'],

            // 弹出层标题设置
            title: '在添加文章分类',
            content: $('#dialog-add').html()
          })    
    })

    // 通过代理的形式，为form-add表单绑定submit事件，因为form-add是js动态添加的，在页面中是不存在的，要找存在的dom元素:body
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })

    // 通过代理的形式，为tpl-table表单绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        // $(selector).attr(attribute) attribute:规定要获取其值的属性。
        var id = $(this).attr("data-id");
        console.log('OK!');
        console.log(id);

        // 提示框
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            
            $.ajax({
                method:'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })
          })
    })

})