/**
 * 数据库相关
 */

// Sequelize是 ORM框架 用来操作数据库
const Sequelize = require('sequelize');
const config = require('./config');

// 第一步 创建sequelize实例
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {     // 连接池设置
        max: 5,     // 最大连接数
        min: 0,     // 最小连接数
        idle: 30000
    }
});

// 检测是否连接成功
// sequelize.authenticate().then(() => {
//     console.log('link success');
// }).catch(err => {
//     console.log('link err', err)
// })

// 第二步 定义模型User，告诉Sequelize如何映射数据库表：
const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,
    wl: Sequelize.SMALLINT,
    addItem: Sequelize.STRING(10),
}, {
    timestamps: false
});

// 第三步 将模型同步给数据库：两种方式
    // 1、同步单个模型 User.sync()
    // 2、同步所有模型 sequelize.sync()

User.sync().then(() => {
    // 添加数据
    const now = Date.now();
    User.create({
        id: 'g-' + now,
        name: 'Hi',
        gender: false,
        birth: '2007-07-07',
        createdAt: now,
        updatedAt: now,
        version: 0,
        addItem: 'a'
    })
    .then(function (p) {
        console.log('cb-created.' + JSON.stringify(p));
    })
    .catch(function (err) {
        console.log('cb-failed: ' + err);
    });
})



// 查询数据时
const userData = User.findAll({
    // where: {
    //     id: 'g-1601191727680'
    // }
})

module.exports = {
    userData
};

// .then(function (users) {
//     console.log("All users:", JSON.stringify(users, null, 2));
// })
// .catch(function (err) {
//     console.log('failed: ' + err);
// });

// // 更新数据，可以对查询到的实例调用save()方法：
// (async () => {
//     var p = await queryFromSomewhere();
//     p.gender = true;
//     p.updatedAt = Date.now();
//     p.version ++;
//     await p.save();
// })();

// // 如果要删除数据，可以对查询到的实例调用destroy()方法：
// (async () => {
//     var p = await queryFromSomewhere();
//     await p.destroy();
// })();