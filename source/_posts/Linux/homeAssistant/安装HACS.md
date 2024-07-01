---
title: home Assistant 安装HACS
date: 2024-07-01 15:52:18
categories: javascipt
tags: [Linux, home Assistant]
---


## 手动安装HACS

下载HACS压缩包

下载地址：[Releases · hacs/integration · GitHub](https://github.com/hacs/integration/releases)

![image-20240701150906463](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011509521.png)

打开samba，方便上传下载的HACS包。

![image-20240701151014448](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011510561.png)

搜索 samba

![image-20240701151038148](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011510244.png)

> 下载samba需要科学上网

简单安装配置之后，启动，过程简单不再展示

1. 上传HACS压缩包 Win11，在文件管理器打开：\\[xxx.xxx.xxx.xxx](http://xxx.xxx.xxx.xxx/)（HomeAssistant的IP）

进入config文件夹，建立 custom_components 和 www 文件夹

进入custom_components文件夹，建立hacs文件夹，把下载的HACS.zip压缩包所有文件解压到里面。

然后从配置中，进入系统、右上角电源标志、重启

![image-20240701151152255](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011511334.png)

从配置里添加集成，搜索HACS即可添加安装。

![image-20240701151247431](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011512537.png)

![image-20240701151302511](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011513612.png)

绑定设备,复制下面的code并打开github链接

![image-20240701151424134](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011514211.png)

点击上面github链接，输入上面出现的key

左侧自动出现HACS，安装全部完成。

![image-20240701151440407](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011514488.png)

![image-20240701151455769](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011514877.png)

![image-20240701151504365](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011515430.png)