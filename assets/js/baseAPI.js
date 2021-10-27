// 每次调用$.gei()函数或者是$.post()函数，$.ajax()函数等之前都会调用$.ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax()配置的对象
$.ajaxPrefilter(function(options){

    options.url = 'http://api-breakingnews-web.itheima.net'+ options.url;
    // http://api-breakingnews-web.itheima.net/api/reguser

}) 