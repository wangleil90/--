node koa操作数据库

## 1、本机安装mysql：
https://dev.mysql.com/downloads/file/?id=497036

    安装驱动 npm i mysql2 -s

## 2、启动本机数据库(mac)：
系统偏好设置->mysql

通过dmg安装的mysql，需要修改环境变量，操作如下：

    编辑配置文件： vim ~/.zshrc
    添加命令：export PATH="/usr/local/mysql/bin:$PATH"
    在当前终端中生效：如在vscode中运行则可以在vscode中使用: source ~/.zshrc
    连接数据库：mysql -u root -p

## 3、创建 Sequelize 实例

## 4、测试连接数据库是否成功
    sequelize.authenticate().then(() => {
        console.log('link success');
    }).catch(err => {
        console.log('link err', err)
    })

Q：SequelizeConnectionError: Unknown database 'test'
solution：创建test表

## 5、创建test表
create database test