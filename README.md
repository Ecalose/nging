# Nging V5 

![Nging's logo](https://github.com/admpub/nging/blob/master/public/assets/backend/images/nging-gear.png?raw=true)

<img src="https://stats.coscms.com/badge/UA-NGING-GIT.svg" style="vertical-align:middle" height="25" />
<a href="https://gitpod.io/#https://github.com/admpub/nging" target="_blank"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" height="25" style="vertical-align:middle" /></a>

> 注意：这是Nging V5源代码，旧版V4.x、V3.x、V2.x、V1.x已经转移到 [v4分支](https://github.com/admpub/nging/tree/v4) [v3分支](https://github.com/admpub/nging/tree/v3) [v2分支](https://github.com/admpub/nging/tree/v2) [v1分支](https://github.com/admpub/nging/tree/v1)

    Nging支持MySQL和SQLite3数据库

Nging是一个网站服务程序，可以管理和配置 Caddy 和 Nginx 站点，并附带了实用的周边工具，例如：计划任务、MySQL管理、Redis管理、FTP管理、SSH管理、服务器管理等。

## 赞助支持
[赞助支持](https://www.coscms.com/donation.html)


## 可执行文件下载

* [最新版下载地址](http://dl.webx.top/nging/latest/)

* [最新版备用地址](http://dl2.webx.top/nging/latest/)

## 安装方式

1. 安装Nging

    1). 自动安装方式:

    ```sh
    sudo wget https://raw.githubusercontent.com/admpub/nging/master/nging-installer.sh -O ./nging-installer.sh && sudo chmod +x ./nging-installer.sh && sudo ./nging-installer.sh

    # 如果是中国境内网络，可以选择采用以下命令：
    sudo wget https://gitee.com/admpub/nging/raw/master/nging-installer.sh -O ./nging-installer.sh && sudo chmod +x ./nging-installer.sh && sudo ./nging-installer.sh
    ```

    nging-installer.sh 脚本支持的命令如下

    命令 | 说明 | 示例
    :--- | :--- | :---
    `./nging-installer.sh` 或 `./nging-installer.sh install` | 安装(自动下载nging并启动为系统服务) | 安装默认最新基础版本: `./nging-installer.sh install` <br />安装指定版本: `./nging-installer.sh install 5.2.6` <br /><em>如有 Docker 容器管理需求，推荐通过指定版本号来安装 5.3.x 系列版本(也称之为先锋版):</em><br /> `./nging-installer.sh install 5.3.2`
    `./nging-installer.sh upgrade` 或 `./nging-installer.sh up` | 升级 | 升级到指定版本: `./nging-installer.sh up 5.2.6`
    `./nging-installer.sh uninstall` 或 `./nging-installer.sh un` | 卸载 | `./nging-installer.sh un`

    2). 手动安装方式:  
    下载相应平台的安装包，解压缩到当前目录，进入目录执行名为“nging”的可执行程序(在Linux系统，执行之前请赋予nging可执行权限)。 例如在Linux64位系统，分别执行以下命令：

    ```sh
    cd ./nging_linux_amd64
    chmod +x ./nging
    ./nging
    ```

    3). [Docker 安装方式](./README_docker.md)

2. 初始化配置Nging  
    打开浏览器，访问网址 <http://localhost:9999/setup> ，
    在页面中配置数据库和管理员账号信息进行安装。

    从 v5.2.5 和 v5.3.1 开始支持如下两种方式  

    * 1). 通过网页安装界面配置 (适用于已经启动 nging 的情形):  
    
        打开浏览器，访问网址 <http://localhost:9999/setup> ，
    在页面中配置数据库和管理员账号信息进行安装。

    * 2). 通过命令来配置 (适用于尚未启动 nging 的情形):  
        * 安装到 MySQL 数据库的方式  
            ```sh
            ./nging init --user=<数据库用户名> --password=<数据库密码> --host=<MySQL服务器主机地址> --database=<MySQL数据库名> --adminUser=<管理员用户名> --adminPass=<管理员密码,不少于8位> --adminEmail=<管理员E-mail>
            ```
            例如:  
            ```sh
            ./nging init --user=root --password="root" --host="127.0.0.1:3306" --database=nging --adminUser=admin --adminPass="admin123" --adminEmail="admin@coscms.com"
            ```
        * 安装到 SQLite 数据库的方式  
            ```sh
            ./nging init --type=sqlite --database=<数据库文件路径> --adminUser=<管理员用户名> --adminPass=<管理员密码,不少于8位> --adminEmail=<管理员E-mail>
            ```
            例如:  
            ```sh
            ./nging init --type=sqlite --database="config/nging.db" --adminUser=admin --adminPass="admin123" --adminEmail="admin@coscms.com"
            ```

        执行成功后，启动 nging。

安装成功后，通过 <http://localhost:9999/> 使用管理员账号登录。

## Nging手动升级步骤

0. 备份数据库和旧版可执行文件；
1. 停止旧版本程序的运行；
2. 将新版本所有文件复制到旧版文件目录里进行覆盖；
3. 启动新版本程序；
4. 登录后台检查各项功能是否正常；
5. 升级完毕

## 从 V3 升级
将 `config/config.yaml` 文件内的 `caddy`、 `ftp`、`download` 配置块移动到 `extend` 块内(ftp改名为ftpserver)。即：
```
extend {
    caddy {
        // 内容略...
    }
    ftpserver {
        // 内容略...
    }
    download {
        // 内容略...
    }
}
```

## 开机自动运行

1. 首先，安装为服务，执行命令 `./nging service install`
2. 启动服务，执行命令 `./nging service start`

与服务相关的命令：

命令 | 说明 | 其它用例
:--- | :--- | :---
`./nging service install` | 安装服务 | Nging 默认使用 9999 端口，在安装为服务时，可以指定自定义端口 `./nging service install -p 9998`
`./nging service start` | 启动服务 | 无
`./nging service stop` | 停止服务 | 无
`./nging service restart` | 重启服务 | 无
`./nging service uninstall` | 卸载服务 | 无

## Ⅰ、[功能介绍](docs/README.md)

## Ⅱ、先睹为快

### 手机端界面展示：

|[![登录界面](https://gitee.com/admpub/nging/raw/master/preview/mobile/login.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/login.png)|[![两步验证界面](https://gitee.com/admpub/nging/raw/master/preview/mobile/u2f.png?raw=true)](https://gitee.com/admpub/nging/raw/master/mobile/u2f.png)|[![面板首页](https://gitee.com/admpub/nging/raw/master/preview/mobile/index.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/index.png)|
|:--:|:--:|:--:|
|[![负载统计图](https://gitee.com/admpub/nging/raw/master/preview/mobile/chart_cpu.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/chart_cpu.png)|[![网速统计图](https://gitee.com/admpub/nging/raw/master/preview/mobile/chart_net.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/chart_net.png)|[![菜单界面](https://gitee.com/admpub/nging/raw/master/preview/mobile/menu.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/menu.png)|
|[![数据库管理界面](https://gitee.com/admpub/nging/raw/master/preview/mobile/database.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/database.png)|[![系统配置界面](https://gitee.com/admpub/nging/raw/master/preview/mobile/config.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/config.png)|[![控制台终端](https://gitee.com/admpub/nging/raw/master/preview/mobile/term.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/mobile/term.png)|

### PC端界面展示：

#### 运行

[![安装](https://gitee.com/admpub/nging/raw/master/preview/preview_cli.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_cli.png)

#### 安装：

[![安装](https://gitee.com/admpub/nging/raw/master/preview/preview_install.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_install.png)

#### 登录：

[![登录](https://gitee.com/admpub/nging/raw/master/preview/preview_login.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_login.png)

#### 系统信息：

[![系统信息](https://gitee.com/admpub/nging/raw/master/preview/preview_sysinfo.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_sysinfo.png)

#### 实时状态：

[![实时状态](https://user-images.githubusercontent.com/512718/59155431-376ebe00-8abc-11e9-8d29-cee91978e574.png)](https://user-images.githubusercontent.com/512718/59155431-376ebe00-8abc-11e9-8d29-cee91978e574.png)


#### 在线编辑文件：

[![在线编辑文件](https://gitee.com/admpub/nging/raw/master/preview/preview_editfile.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_editfile.png)

#### 添加计划任务：

[![添加计划任务](https://gitee.com/admpub/nging/raw/master/preview/preview_task.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_task.png)

#### MySQL数据库管理：

[![MySQL数据库管理](https://gitee.com/admpub/nging/raw/master/preview/preview_listtable.png?raw=true)](https://gitee.com/admpub/nging/raw/master/preview/preview_listtable.png)


## Ⅲ、[开发指引](docs/developer.md)


请注意，本系统的源代码基于AGPL协议发布，不管您使用本系统的完整代码还是部分代码，都请遵循AGPL协议。  
> 如果需要更宽松的商业授权协议，请联系我购买授权。
