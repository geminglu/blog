---
title: 虚拟机安装openWRT作为旁路由
date: 2024-07-01 15:53:38
categories: Linux
tags: [Linux, openWRT]
---


虚拟机安装openWRT可以作为旁路由使用，在open WRT上安装科学上网插件可以实现局域网下的所有设备使用魔法。

## 下载

打开这个地址https://mirror-03.infra.openwrt.org/

![屏幕截图 2024-06-29 143010](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011525367.png)

下载完成后解压会得到一个`openwrt-23.05.3-x86-64-generic-ext4-combined-efi.img` 文件，然后需要使用`StarWind V2V Converter` 将img文件转为vmdk文件

下载[StarWind V2V Converter](https://www.starwindsoftware.com/starwind-v2v-converter#download)，

打开`StarWind V2V Converter` 选择`Local file`

![image-20240701152624023](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011526150.png)

选择刚才的`openwrt-23.05.3-x86-64-generic-ext4-combined-efi.img`

![image-20240701152641370](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011526483.png)

选择转换后的目标文件位置

![image-20240701152656726](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011526842.png)

选择目标镜像的格式

![image-20240701152710690](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011527803.png)

![image-20240701152722589](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011527708.png)

可以修改文件的输出目录

![image-20240701152736202](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011527311.png)

## 新建虚拟机

![image-20240701152754087](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011527194.png)

![image-20240701152802254](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528350.png)

![image-20240701152811105](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528202.png)

![image-20240701152818989](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528084.png)

![image-20240701152827951](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528049.png)

![image-20240701152836410](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528519.png)

![image-20240701152844767](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011528876.png)

## 设置网络

![image-20240701152900765](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011529890.png)

```
vim /etc/config/network
```

![image-20240701152921867](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011529958.png)

```
reboot
```

## 添加新的硬盘

```bash
opkg update
opkg install block-mount kmod-fs-ext4 kmod-usb-storage kmod-usb-ohci kmod-usb-uhci e2fsprogs fdisk
reboot
fdisk -l
```

![image-20240701153008336](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011530424.png)

![image-20240701153021903](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011530008.png)

格式化`/dev/sdb`分区

```
mkfs.ext4 /dev/sdb
```

![image-20240701153045367](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011530466.png)

![image-20240701153100568](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531644.png)

![image-20240701153114753](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531834.png)

![image-20240701153126690](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531758.png)

![image-20240701153135828](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531891.png)

## 安装中文包

![image-20240701153151572](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531629.png)

![image-20240701153158962](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011531023.png)

刷新浏览器

## 安装SFTP

![image-20240701153210218](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011532303.png)

## 安装iStore

iStore 是一个开源且标准的 OpenWRT 软件中心实现，是属于易有云团队的固件 [**iStoreOS**](https://github.com/istoreos) 的一部分。详情请跳转至[这里](https://github.com/linkease/istore)

iStore 的设计目标：

1. 方便用户安装插件
2. 每个插件都有教程，方便初学者入门使用插件
3. 适配所有的 OpenWRT 皮肤，以及移动端
4. 全部基于 OpenWRT 的标准接口开发，不用以前 KoolShare LEDE 的特有的插件风格的软件中心

iStore 的无法弥补的缺陷：

1. 因为 OpenWRT 版本特别多，导致不同平台的插件依赖不一样。所以即使你的系统能安装 iStore，iStore 里面的插件不一定能安装
2. 我们需要固件开发者自主集成 iStore，并解决 iStore 里面的各种插件的依赖

简单来说，iStore比较适合新手或者不想特别折腾的同学，里面集成了各种应用，根据自身需求，直接点击安装即可，直接跳过下载安装依赖以及安装软件包等繁琐步骤。

> 21版本的固件安装 iStore 需要依赖 `luci-compat`

使用opkg安装

```bash
opkg install luci-compat
```

如果安装失败就到[dl.openwrt.ai](https://dl.openwrt.ai/packages-23.05/x86_64/luci/)下载，注意版本。

访问iSotre软件包地址[**](https://istore.linkease.com/repo/all/store/)https://istore.linkease.com/repo/all/store/**

![image-20240701153432419](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011534485.png)

下载上述的几个文件。

打开“系统”>”**Software**” 选怎`Upload Package…` 依次安装刚才下载的一个`ipk`包，如果安装`luci-app-openclash` 报错可以才试一次。

![image-20240701153442140](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011534217.png)

## 安装v2rayA

![image-20240701153514829](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011535922.png)

在“服务”菜单下选择“V2rarA”开启服务并进入web界面

![image-20240701153529644](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011535774.png)

进入web管理页面后点击“import”添加订阅链接

![image-20240701153558940](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011535042.png)

![image-20240701153610944](https://cdn.jsdelivr.net/gh/geminglu/drawingBoard@main/img/202407011536035.png)

如果想要将openWRT作为旁路由使用的话需要关闭主路由的DHCP服务不然会和旁路由DHCP冲突，旁路由（openWRT）连接主路由的接口要设置成静态IP网关是主路由的地址，旁路由需要开启DHCP服务。这样就设置好了主路由下连接设备的ip都是由旁路由分配的所有的数据都会经过旁路由，这时就可以在旁路由上安装一些科学上网的插件或者是广告过滤插件等。