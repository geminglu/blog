---
title: 在不使用js在情况下只用css实现瀑布流效果
date: 2024-06-13 16:56:38
categories: javascipt
tags: [js库, 前端]
---


![Untitled](images/2024-06-13164325.png)

使用到的是`grid` 布局，需要注意的是`grid-template-rows: masonry;` 目前只有`Firefox` 浏览器支持这个效果，而且还是一个实验性属性需要在设置里面开发实验性选项才行。

![Untitled](images/2024-06-13165006.png)

## 实例

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <style>
        #img {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 10px;
            grid-template-rows: masonry;
        }
        #img img {
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="img">
    </div>
    <script>
        const img =  document.getElementById('img')
        let ele = ''
        for (let i = 0; i < 14; i++) {
            ele += `<img src="./images/img (${i+1}).jpg" />`
            
        }
        img.innerHTML = ele

    </script>
</body>
</html>
```
