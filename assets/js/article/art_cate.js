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
                console.log(res);
                layer.msg('获取文章列表成功！');
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr)
            }
        })
    }
})