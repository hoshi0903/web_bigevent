$(function(){
    
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage;

    // 定义一个查询的参数对象，将来请求数据的时候，需要将参数对象数据提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }

    
    initTable()
    initCate()

    // 通过template.defaults.imports来定义过滤器
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    //   三元表达式
    return n > 9 ? n : '0' + n
  }


    // 获取文章列表的数据
    function initTable(){
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
               if(res.status !== 0) {
                   return layer.msg('获取文章列表失败！')
               }
            //使用模板引擎渲染列表的数据
            console.log(res);
            var htmlStr = template('tpl-table',res)
            console.log(htmlStr);
            $('tbody').html(htmlStr)

            // 调用渲染分页的方法
            renderPage(res.total)
            }

        })
    }

    // 初始化文章分类的方法
    function initCate() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res){
          if(res.status !== 0) {
            return layer.msg('获取分类数据失败！')
          }
          // 调用模板引擎渲染分类数据的可选项
          console.log(res);
          var htmlStr = template('tpl-cate',res)
          console.log(htmlStr);
          $('[name=cate_id]').html(htmlStr)

          // 通过layui重新渲染表单区域
          form.render()
        }
      })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('sumbit',function(e){
      e.preventDefult()

      // 获取表单中选中项的值
      var cate_id = $('[name=cate_id]').val()
      var state = $('[name=state]').val()

      // 为查询参数中的对象 q 的对应属性赋值
      q.cate_id = cate_id;
      q.state = state;

      // 根据最新的筛选条件 重新渲染表格的数据
      initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {

    //使用laypage.render()方法来渲染分页的结构
      laypage.render({
        elem: 'pageBox', //分页容器的id
        count: 8, //总数据条数
        limit: q.pagesize, //每页显示几条的条数
        curr: q.pagenum, //默认被选择的分页
        layout: ['count','limit','prev', 'page', 'next','skip'],
        limits: [2,3,5,10],
        // 分页发生切换的时候，触发jump回调

        // 点击页码的时候触发jump回调；
        // 只要调用了 laypage.render(),触发jump回调；
        jump: function(obj,first){
          console.log(obj.curr);
          
          // 把最新的页码值赋值到 q 这个查询参数中
          q.pagenum = obj.curr

          // 把最新的条目数赋值到q.pagesize中
          q.pagesize = obj.limit

          // 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
          if(!first) {
                      // 根据最新的 q 获取对应的数据列表，并重新渲染表格
            initTable()
          }
        }
      });  
  }

  // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click','.btn-delete',function(){
    // 获取按钮的个数长度
    var len = $('.btn-delete').length
    // 获取的文章的ID
    var id = $(this).attr('data-id')
    layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        method: 'GET',
        url: '/my/article/dilete/ + id',
        success: function(res){
          if(res.status !== 0) {
            return layer.msg('删除文章失败！')
          }


          // 当数据删除后，需要判断当前页是否还有剩余的数据如果没有则-1，跳到前一页，再调用initTable()
          if(len === 1){
            // 页码值最小必须是1
            q.pagenum = q.pagenum === 1 ? 1: q.pagenum - 1
            initTable() 
          }

          layer.msg('删除文章成功！')


        }
      })
      layer.close(index);
    })
  })
})