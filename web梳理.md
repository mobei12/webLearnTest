---
theme: github
---

### 准备工作

#### 服务器上的操作(阿里云或者腾讯云服务器)

1.  `cd ~/.ssh` 进入 ssh 登陆的配置文件夹
2.  `ls` 查看是否有 id_rsa.pub(公钥) 和 id_rsa(私钥) 文件,有的话 `vim authorized_keys` 查看是否有对应的公钥,有的话去 4,么有的话接着 3
3.  公私钥都没有,运行 `ssh-keygen -t rsa` 创建公私钥,并使用 `cat id_rsa.pub` 把公钥添加到 `authorized_keys` 文件中
4.  运行 `cat id_rsa`,会打印一长串私钥出来复制保存,**包括-----BEGIN RSA PRIVATE KEY-----和-----END RSA PRIVATE KEY-----**(注意必须要注意这个,我就是复制的时候没有复制全,连错了十几次才在找到这个原因),留待备用
5.  进入 ssh 文件夹,不同的机器可能安装位置不一样我的目录是 `/etc/ssh`
6.  打开 sshd_config ,`vim sshd_config`,找到 PermitRootLogin 将其设置为 yes,PubkeyAuthentication 将其设置为 yes,大概长这样

```bash
# Authentication:
#LoginGraceTime 2m
PermitRootLogin yes
#StrictModes yes
#MaxAuthTries 6
#MaxSessions 10
PubkeyAuthentication yes
```

7.保存,使用 service sshd restart 重启服务

#### github 上的操作

1.在 github 打开你要操作的项目地址,点击右上角的`Settings`,在左侧选择`Secrets->Actions`

2.在右侧选择`New repository secret`

3.输入 `name:"ACCESS_TOKEN",value:上面复制的私钥`,点击`Add secret`

4.接着 重复上两步,建立`HOST:你服务器的ip`、你的目标`TARGET:你服务器上放资源的地方`以及其他的你需要隐藏起来的信息,例如`USER:root`,`PASSWORD:123456`,看个人需求

---

准备工作基本完成,

### 便携自动化部署文档

1.在本地项目根目录创建`.github`文件夹,并在其中创建`workflows`文件夹,并在其中创建`main.yml`文件,内容如下

```yaml
    name: NodeJS with vuepro #随便起的名字

on:
    push: #在每次push时执行任务
        branches: [main] #只有在main分支上才会执行

jobs:
    build:
        runs-on: ubuntu-latest #指定构建的虚拟机版本
        steps:
            - name: Checkout #检出
              uses: actions/checkout@main #检出的依赖2
              with:
                  persist-credentials: false #不保存证书
            - name: Cache Node Dependencies #设置依赖缓存.
              id: cache
              uses: actions/cache@v1
              with:
                  path: node_modules
                  key: ${{runner.os}}-npm-caches-${{ hashFiles('package-lock.json')}}
            - name: Install Dependencies #安装依赖
              if: steps.cache.outputs.cache-hit != 'true'
              run: |
                  npm install --force
            - name: build project
              run: |
                  npm  run build
            - name: deploy file to server
              uses: easingthemes/ssh-deploy@v2.0.7 #dd
              env:
                  REMOTE_USER: 'root' #ssh user name
                  REMOTE_HOST: ${{secrets.HOST}} #目标地址,在github secrets中设置
                  ARGS: '-avz --delete' #参数
                  SSH_PRIVATE_KEY: ${{secrets.ACCESS_TOKEN}} #github access token
                  SOURCE: 'dist/' #源文件目录
                  TARGET: '/data/webStatic/dist' #目标文件目录
                  # 上面几个参数可以在github secrets中设置,然后用secrets.的模式引用
```

### 发布测试

1.把 main.yml 文件上传到 github,然后打开项目的 actions 页面,查看运行状态,如果没触发,看是不是分支不对

2.如果报错的话,看一下是否有缺少依赖,还是 token 啥的配置错了,

3.然后就可以看你的网页了
