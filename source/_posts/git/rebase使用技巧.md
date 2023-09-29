---
layout: _drafts
title: rebase使用技巧
date: 2023-09-29 11:13:58
categories: git
tags: [Git]
---
## 变基时可用的命令
变基时有六个命令可用：

- `pick`

`pick`只表示包含提交。 在变基进行时重新排列`pick`命令的顺序会更改提交的顺序。 如果选择不包含提交，应删除整行。

- `reword`

`reword`命令类似于`pick`，但在使用后，变基过程就会暂停，让你有机会改变提交消息。 提交所做的任何更改都不受影响。

- `edit`

如果选择 `edit`提交，你将有机会修订提交，也就是说，可以完全添加或更改提交。 您也可以创建更多提交后再继续变基。 这样您可以将大提交拆分为小提交，或者删除在提交中执行错误更改。

- `squash`

此命令可用于将两个或以上的提交合并为一个。 下面的提交压缩到其上面的提交。 Git 让您有机会编写描述两次更改的新提交消息。

- `fixup`

这类似于 squash，但要合并的提交丢弃了其消息。 提交只是合并到其上面的提交，之前提交的消息用于描述两次更改。

- `exec`

这可让您对提交运行任意`shell`命令。
## 更改提交顺序
pick只是意味着包括提交。重新进行命令时，重新安排pick`命令的顺序会更改提交的顺序。如果选择不包括提交，则应删除整行。
我们先看一下当前提交的信息

![image.png](images/23412.png.png)

现在我们要改变一下`b`和`d`两次提交的顺序，`HRAD~2`表示选择离HEAD最近的3次提交。
```shell
git rebase -i HEAD~3
```
 接着git会弹出一个文本，
![image.png](images/23412.png)
下面就是vim操作了，只要交换第一行和第三行的位置就行，把光标移动到第一行快速按两下d键第一行就被剪切到剪切板中了，再把光标移动到d提交那行按下p就把刚才剪切的内容粘贴过来了，像这样操作把`191bc18`那次提交移动到第一行就行了，按下`shift + :`输入`wq`保存退出。
输入`git log`查看提交信息顺序改变了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662615374405-84daa4f5-ca28-4b4a-8091-063464f665c1.png#averageHue=%23fcfbfa&clientId=ue32db35e-e55b-4&from=paste&height=385&id=u26d7514c&originHeight=577&originWidth=1182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60888&status=done&style=none&taskId=u30308aca-dade-4034-9245-2de1112f19a&title=&width=788)
## 删除提交
比如我们要删除提交信息为c的那次提交，先看一下当前
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662684886830-a991a9b4-215c-4c6e-8517-6d9ed7ba73b5.png#averageHue=%23fcfbfa&clientId=u413c4319-4f0d-4&from=paste&height=402&id=u7a18d984&originHeight=603&originWidth=1178&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73746&status=done&style=none&taskId=u20b22ffc-d517-4fb6-b6c0-514882ca6f2&title=&width=785.3333333333334)
HEAD~2距离HEAD最近的两次提交
```shell
git rebase -i HEAD~2
```
只要删除提交信息为`c`的那行就行了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662685133209-c8a15c09-2b28-4af8-b2f2-bb612c682814.png#averageHue=%23f9f8f7&clientId=u413c4319-4f0d-4&from=paste&height=444&id=udce63aa5&originHeight=666&originWidth=1180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92591&status=done&style=none&taskId=udd42b336-a165-42fe-8815-ec7b56d62fd&title=&width=786.6666666666666)
保存后输入`git log`查看结果
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662685207320-04347028-0f62-4d2d-ba92-20e9e2fac0ac.png#averageHue=%23fbfbfa&clientId=u413c4319-4f0d-4&from=paste&height=305&id=u299d85bc&originHeight=457&originWidth=1180&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53721&status=done&style=none&taskId=u3223d659-0951-474e-9079-723e4ca5c5d&title=&width=786.6666666666666)
## record 修改提交消息(提交内容不变)
如果我们要修改`b`的那次提交的commit信息，可以使用`record`来修改commit信息，输入`git log`先看一下现在的commit是什么。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662685614666-0757006d-8642-4d75-8fa3-a2c3de76ecff.png#averageHue=%23fbfbfa&clientId=u413c4319-4f0d-4&from=paste&height=307&id=u921f8f5e&originHeight=460&originWidth=1176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53729&status=done&style=none&taskId=u5dffea41-0771-4d5a-84d0-ed003aa2aff&title=&width=784)
`c37146f7`可以快速定位到``c37146f7`` 后面提交的地方，但是列出的不包括指定的提交。
```shell
git rebase -i c37146f7
```
将`pack`定改为`r`,`r`是 record简写。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662688703343-ee80b1a2-4eeb-4c9d-97ca-39732c10b4d0.png#averageHue=%23f8f8f7&clientId=u413c4319-4f0d-4&from=paste&height=443&id=u709935db&originHeight=664&originWidth=1173&originalType=binary&ratio=1&rotation=0&showTitle=false&size=91899&status=done&style=none&taskId=u753ffffb-15f1-42b3-b89f-715fa92cdf0&title=&width=782)
接着`Esc`,`shift + ;``wq` 保存退出，git会弹出一个文本编辑器在第一行修改文本描述。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662688993829-505f2126-b3da-4ad0-99a9-9516315fc4bc.png#averageHue=%23f6f5f5&clientId=u413c4319-4f0d-4&from=paste&height=303&id=u71a302b7&originHeight=455&originWidth=1183&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54788&status=done&style=none&taskId=u6ffecc3e-6a61-401e-be13-d76aa7c1633&title=&width=788.6666666666666)
修改完成后保存退出，输入`git log`查看commit信息。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1662689153814-1b11f5f5-39dd-4f76-9c0d-df966477d668.png#averageHue=%23fbfbfa&clientId=u413c4319-4f0d-4&from=paste&height=313&id=u0dac04b7&originHeight=470&originWidth=1175&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55716&status=done&style=none&taskId=u4b12125e-071a-45f0-8698-7e785bfa51b&title=&width=783.3333333333334)
## edit修改提交
使用`edit`可以完全添加或更改提交。您还可以进行更多提交，然后再继续进行变基。这使您可以将大型提交拆分为较小的提交，或者删除在提交中所做的错误更改。
如果在`3d06118c`和`f18b62266`之间在添加一个提交要怎么做呢，
显示到`HEAD`最近到两次提交
```shell
git rebase -i HEAD~2
```
```shell
pick c37146f d
pick 3d06118 修改commit b

# Rebase f18b622..3d06118 onto f18b622 (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
```
将`c37146f`前面的`pick`修改为`e`，保存并退后后git会输出一下内容
```shell
Stopped at c37146f...  d
You can amend the commit now, with

  git commit --amend

Once you are satisfied with your changes, run

  git rebase --continue
```
此时可以看到`master`变成了`(master|REBASE 1/2)`。
新建一个`c.txt`文件并提交。
```shell
git add c.txt
git commit -m "c"
[detached HEAD c66dc69] c
 1 file changed, 1 insertion(+)
 create mode 100644 c.txt
```
接着继续rebase
```shell
git rebase --continue
Successfully rebased and updated refs/heads/master.
```
再次查看一下提交记录
```shell
git log

commit 2fc98daaf7552d7dbc8e9c078ad205026344674f (HEAD -> master)
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:35 2022 +0800

    修改commit b

commit c66dc69744c255f4827da269e92d8228f8ebd737
Author: you <youemail@outlook.com>
Date:   Fri Sep 9 10:26:37 2022 +0800

    c

commit c37146f70d8cc1632f818d2ea013a34550a1c792
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:43 2022 +0800

    d

commit f18b62266b664cd3228bd332f81a32dcd6a1ad1f
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:30 2022 +0800

    a
```
如果我们只想修改提交的内容，不添加commit要怎么办
参考上面的步骤在提交时加一个参数`git commit --amend`这样就不会多一个commit了。
```shell
git add c.txt
git commit --amend
>
Successfully rebased and updated refs/heads/master.
```
## squash合并提交
`squash`可以将两个或多个`commit`合并到一个commit中，被合并的commit会压缩到上一次的commit中，还可以更改这两个`commit`合并后新的`commit`信息。
如果我们要合并`e78c223`和`3437126`要怎么做呢，先看一下当前的提交信息
```shell
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:35 2022 +0800

    修改commit b

commit 34371265e7df46cd5b877339ad4d1b3a4d8a315e
Author: you <youemail@outlook.com>
Date:   Fri Sep 9 10:26:37 2022 +0800

    c

commit c37146f70d8cc1632f818d2ea013a34550a1c792
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:43 2022 +0800

    d

commit f18b62266b664cd3228bd332f81a32dcd6a1ad1f
Author: you <youemail@outlook.com>
Date:   Thu Sep 8 13:13:30 2022 +0800

    a
(END)
```
```shell
git rebase - i HEAD~2
>
pick 3437126 c
pick e78c223 修改commit b

# Rebase c37146f..e78c223 onto c37146f (2 commands)
#
# Commands:
# p, pick <commit> = use commit
...
```
因为需要将`e78c223`合并到他的上次提交，需要把`e78c223`前面的`pick`改为`s`
```shell
git rebase - i HEAD~2
>
pick 3437126 c
s e78c223 修改commit b

# Rebase c37146f..e78c223 onto c37146f (2 commands)
#
# Commands:
# p, pick <commit> = use commit
...
```
保存并退出，git会弹出新的文本框
```shell
# This is a combination of 2 commits.
# This is the 1st commit message:

c

# This is the commit message #2:

修改commit b

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```
修改commit信息
```shell
# This is a combination of 2 commits.
# This is the 1st commit message:

新的commit c

# This is the commit message #2:

新的commit 修改commit b

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```
保存并退出，变基完成
```shell
git log
>
commit 88a2a47912f3fe643d486739b000dfae776ed493 (HEAD -> master)
Author: you <youeamil@outlook.com>
Date:   Fri Sep 9 10:26:37 2022 +0800

    新的commit c

    新的commit 修改commit b

commit c37146f70d8cc1632f818d2ea013a34550a1c792
Author: you <youeamil@outlook.com>
Date:   Thu Sep 8 13:13:43 2022 +0800

    d

commit f18b62266b664cd3228bd332f81a32dcd6a1ad1f
Author: you <youeamil@outlook.com>
Date:   Thu Sep 8 13:13:30 2022 +0800

    a
```
常看commit修改 `git show 88a2a47`
```shell
git show 88a2a47
>
commit 88a2a47912f3fe643d486739b000dfae776ed493 (HEAD -> master)
Author: you <youemail@outlook.com>
Date:   Fri Sep 9 10:26:37 2022 +0800

    新的commit c

    新的commit 修改commit b

diff --git a/b.txt b/b.txt
new file mode 100644
index 0000000..63d8dbd
--- /dev/null
+++ b/b.txt
@@ -0,0 +1 @@
+b
\ No newline at end of file
diff --git a/c.txt b/c.txt
new file mode 100644
index 0000000..d36cf97
--- /dev/null
+++ b/c.txt
@@ -0,0 +1 @@
+ccccc
\ No newline at end of file
```
## fixup合并提交，只保留较早的提交信息
使用`fixup`会把相邻的commit合并到上一次的commit中，会保留上次的commit信息，`fixup`不可以编辑commit信息
查看距离`HEAD`最近的两次提交
```shell
git rebase -i HEAD~2
>
pick c37146f d
pick 88a2a47 新的commit c

# Rebase f18b622..88a2a47 onto f18b622 (2 commands)
```
将`88a2a47`前面`pick`改为`f`，`88a2a47`修改的内容就会合到`c37146f`上面.
```shell
pick c37146f d
f 88a2a47 新的commit c

# Rebase f18b622..88a2a47 onto f18b622 (2 commands)
```
```shell
git log
>
commit c6dcdbc2c174b6480aa6d76ca3cfa3ec5b6a7ea5 (HEAD -> master)
Author: you <youeamil@outlook.com>
Date:   Thu Sep 8 13:13:43 2022 +0800

    d

commit f18b62266b664cd3228bd332f81a32dcd6a1ad1f
Author: you <youeamil@outlook.com>
Date:   Thu Sep 8 13:13:30 2022 +0800

    a
```
