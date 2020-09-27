const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

const fn_signin = async (ctx, next, data) => {
    console.log('next', next)
    const {name = '', password = ''} = ctx.request.body;
    // ctx.response.body = '<script>alert("小明")</script>';
    // ctx.response.body = `hi,${name}, 登录成功；密码${password}`;
    ctx.response.body = data;
};

module.exports = {
    get: {
        method: 'GET',
        path: '/',
        callBack: fn_index
    },
    post: {
        method: 'POST',
        path: '/signin',
        callBack: fn_signin
    }
};