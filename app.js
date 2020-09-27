const Koa = require('koa');
// 路由
const router = require('koa-router')();
// 解析post请求参数
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const {userData} = require('./server');

// console.log('userData', userData)


const app = new Koa();

// 解析post请求时参数，需要放在router前边
app.use(bodyParser());

// add router middleware:
app.use(router.routes());


getUrlsConfig();

function getUrlsConfig() {
    // 遍历urlsConfig 下的文件，拿到名称组成的数组
    const files = fs.readdirSync(__dirname + '/urlsConfig');
    // 过滤出.js文件:
    const jsFiles = files.filter(f => f.endsWith('.js'));

    for (const fileNmae of jsFiles) {
        // 导入每个js文件,拿到文件里的请求配置
        let urlsConfig = require(__dirname + '/urlsConfig/' + fileNmae);

        sendRequest(urlsConfig);
    }
}

function sendRequest(urlsConfig) {
    for (const prop in urlsConfig) {
        const {path, callBack} = urlsConfig[prop];

        switch (prop) {
            case 'get': {
                router.get(path, callBack);
            }
            case 'post': {
                userData.then(data => {
                    // console.log('post请求了', data)
                    router.post(path, (ctx, next) => callBack(ctx, next, data));
                })
            }
            default: {
                console.log(`invalid URL: ${path}`);
            }
        }
    }
}

// 在端口3000监听:
app.listen(3000);