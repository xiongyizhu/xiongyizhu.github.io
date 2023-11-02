title: 使用Arthas热重载class文件
author: 熊义铸
date: 2023-11-03 00:14:23
tags:
---
#### 什么是[Arthas](https://arthas.aliyun.com/) 

Arthas 是一款线上监控诊断产品，通过全局视角实时查看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，包括查看方法调用的出入参、异常，监测方法执行耗时，类加载信息等，大大提升线上问题排查效率。

#### Arthas能做什么
1. 这个类从哪个 jar 包加载的？为什么会报各种类相关的 Exception？
2. 我改的代码为什么没有执行到？难道是我没 commit？分支搞错了？
3. 遇到问题无法在线上 debug，难道只能通过加日志再重新发布吗？
4. 线上遇到某个用户的数据处理有问题，但线上同样无法 debug，线下无法重现！
5. 是否有一个全局视角来查看系统的运行状况？
6. 有什么办法可以监控到 JVM 的实时运行状态？
7. 怎么快速定位应用的热点，生成火焰图？
8. 怎样直接从 JVM 内查找某个类的实例？

#### 更多教程建议直接查看[官方文档](https://arthas.aliyun.com/) 

####  安装Arthas
- 如果你的服务器能连外网，直接使用官方命令即可下载Arthas

```
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```

- 如果服务器无法直接连接外网，进入官网下载安装包
https://github.com/alibaba/arthas/releases
![](/images/pasted-1.png)

下载完成后使用远程工具将zip传到服务器（Linux），使用下面的命令解压
`unzip arthas-bin.zip`

解压完成后如下

![](/images/pasted-3.png)

使用如下命令启动arthas 
`java -jar arthas-boot.jar` （前提是已经配置好JAVA_HOME环境变量）

#### 可能遇到的错误，没有遇到这个错误请跳过该步骤
 Can not find java process. Try to run `jps` command lists the instrumented Java HotSpot VMs on the target system.
Please select an available pid.

可能是环境变量未正确配置，即使输入`java -version`能正确显示jdk版本

使用`echo $JAVA_HOME`打印环境变量，正常是能够输出值的，如果没有值说明未正确配置

使用` vi ~/.bash_profile`编辑环境变量

按`i`进入编辑模式，在末尾添加如下环境变量，注意把jdk地址替换成你自己的

```
PATH=$PATH:$HOME/.local/bin:$HOME/bin

export PATH
JAVA_HOME=/home/mycim/jdk1.8.0_212
export JAVA_HOME

PATH=$PATH:$HOME/bin:$JAVA_HOME/bin

```
编辑完成后输入冒号`:wq`保存，如果不想保存输入冒号`:q!`退出编辑

保存完成后输入`source ~/.bash_profile`刷新环境变量

再次使用`echo $JAVA_HOME`打印环境变量

![](/images/pasted-4.png)

完成上面这些步骤，该错误就解决了

#### 启动arthas

1. 进入arthas的解压目录，输入`java -jar arthas-boot.jar`命令启动arthas

![](/images/pasted-5.png)

2. 输入数字选择要操作的程序

我这里要替换的class文件在1里面，因此我选择1

#### 找到要热重载的class字节码文件

![](/images/pasted-6.png)
比如下面这个Action文件在mycim-webapp-wip模块


![](/images/pasted-8.png)
则在classes文件中的该模块下找到class文件，右键打开文件资源管理器

![](/images/pasted-9.png)

复制要热重载的class文件到服务器中

执行一下命令热重载字节码文件，注意换成你自己的目录

` retransform /home/mycim/arthas/class/EapData2EdcSaveAction.class`

会显示热重载成功

![](/images/pasted-10.png)

如果显示 找不到这个类

These classes are not found in the JVM and may not be loaded: 
![](/images/pasted-11.png)
可能选错了应用程序，输入stop结束当前arthas进程，重新启动arthas选择另一个应用即可。



