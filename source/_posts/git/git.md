---
title: 什么是Git
date: 2023-09-29 11:07:38
categories: git
tags: [Git]
---

## SVN与Git的最主要的区别? 
SVN的存储需要依赖一个服务器，而git所有的东西是放在线上的。节约成本，省时省力。
git 是分布式的，svn 是集中式。
git 按照源数据的方式存储内容，svn 是按照文件的形式存储
git 和 svn 中的分支不同。
git 没有全局版本号，svn 有。
git 内容的完整性优于 svn。

## 命令
| 查看配置列表 | git config --list |
| --- | --- |
| 设置用户名 | git config --global user.name "gml" |
| 设置邮箱 | git config --global user.email "18451487672@qq.com" |
| 创建项目 | git init |
| 将文件上传到git暂存区 | git add index.html |
| 上传所有文件到暂存取 | git add .；git add --all；git add -A |
| 把暂存区提交到版本仓库中(历史版本) | git commit -m "引号里写描述信息" |
| 查看当前状态 | git status |
| 查看历史区的所有版本 | git log |
| 回退历史版本 | git reset --hard id |
| 与远程仓库建立连接 | git remote add origin [https://github.com/geminglu/gml_Electricity-project.git](https://github.com/geminglu/gml_Electricity-project.git) |
| 删除远程连接mo | git remote rm origin |
| 默认提交到master分区 | git push -u origin master |
| 克隆远程仓库，第一次拉去要克隆 | git clone 克隆的地址 |
| 把最新的代码从这个远程信息位置拉取回来，第二次直接git pull就可以 | git pull |
| 删除原创分支“new” | git push origin -d new |


## git的分支
对于我的地理功能单独开辟一个分支进行操作
当你的文件被git管理以后，会自动创建一个叫做master的分支
当我需要做某些功能的时候，我会去创建一个新分支进行开发
在开发完毕以后，会把这个分支的内容合并到master分支上
常用的分支名称：
master主要分支：主项目分支
只存在可以向外发布的完整版代码
deveLop主开发分支：存储项目所有代码
只存放开发完毕的代码
feature-xxx 主功能分支
存放一个一个功能
feature-xxx  解决bug的分支
用来进行修复bug
hotfix-xxx 临时解决
git分支的指令
git branch 查看当前分支
git branch 分支名称创建一个新分支
git checkout 分支名称切换分支


git 撤销，放弃本地修改
如果在修改时发现修改错误，而要放弃本地修改时，
一，
未使用 git add 缓存代码时。
可以使用 git checkout -- filepathname (比如： git checkout -- readme.md  ，不要忘记中间的 “--” ，不写就成了检出分支了！！)。放弃所有的文件修改可以使用 git checkout .  命令。
此命令用来放弃掉所有还没有加入到缓存区（就是 git add 命令）的修改：内容修改与整个文件删除。但是此命令不会删除掉刚新建的文件。因为刚新建的文件还没已有加入到 git 的管理系统中。所以对于git是未知的。自己手动删除就好了。
二，
已经使用了  git add 缓存了代码。
可以使用  git reset HEAD filepathname （比如： git reset HEAD readme.md）来放弃指定文件的缓存，放弃所以的缓存可以使用 git reset HEAD . 命令。
此命令用来清除 git  对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失，而是回到了如（一）所示的状态。继续用（一）中的操作，就可以放弃本地的修改。

三，
已经用 git commit  提交了代码。
可以使用 git reset --hard HEAD^ 来回退到上一次commit的状态。此命令可以用来回退到任意版本：git reset --hard  commitid 
你可以使用 git log 命令来查看git的提交历史。git log 的输出如下,之一这里可以看到第一行就是 commitid：

git config --globalcore.autocrlf false

来自 <[https://www.jianshu.com/p/60aefab47a36](https://www.jianshu.com/p/60aefab47a36)> 



![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1648730713030-7bc43fc2-ab75-4a04-a4a8-24cd95e9de17.png#averageHue=%231e3236&clientId=u631ea93a-f0b4-4&from=paste&id=uddb36b25&originHeight=1466&originWidth=2076&originalType=url&ratio=1&rotation=0&showTitle=false&size=601206&status=done&style=none&taskId=u8fe00cea-e32c-4bb9-be69-cfc3be347fd&title=)
## 提交前缀规范
feat：新增功能或页面；
delete：删除功能或文件；
fix： 修复问题/BUG；
mod：不确定分类的修改；
docs：修改文档；
refactor：代码重构，未新增任何功能和修复任何bug；
build：改变构建流程，新增依赖库、工具等（例如webpack、gulp、npm修改）；
style：仅仅修改了空格、缩进、注释等，不改变代码逻辑的变动；
perf：改善性能和体现的修改；
chore：变更构建流程或辅助工具，非src和test的修改；
test：测试用例的新增、修改；
ci：自动化流程配置修改；
revert：回滚到上一个版本；
## FQA
##### vscode文件状态
| 新建文件没有被git追踪 | U |
| --- | --- |
| 修改文件状态 | M |


##### 跳过esLink代码检查：
```git
git commit -m "本次修改注释" --no-verify
```
--no-verify可以简写成 -n

##### 合并指定提交：
```git
git cherry-pick commit_id
```
先通过git branch xx 切换到要合并的分支在使用 cherry-pick + hard id；hard id可以写多个。
cherry-pick w34..d534 表示w34到d534的区间。

##### 查看当前分支的提交图
```git
git log --graph --all
```
##### 查看历史记录
```git
 git log
 #or
 git log --oneline
 #or
 git reflog
```
##### 切换版本
`--hard`后面带上索引可以指定切换到某个版本，可以使用`HEAD`来控制版本的前进和后退，`^`表示回退一个版本`^^`表示向后回退两个版本，如果回退版本多的话就要写很多`^`这是我们可以使用`~`代替要回退到几个版本如`HEAD~3`
```git
git reflog
git reset --hard 1daabbf # 回退到指定版本
#or
git reset --hard HEAD^^ # 向后回退两个版本
#or
git reset --hard HEAD~3 # 向后回退三个版本

```
`hard`、`mixed`、`soft`三者的区别：
--hard：

- 会同时移动版本库、暂存区和工作区；

--soft：

- 仅移动版本库的HEAD指针，代码会退回到暂存区；

--mixed：

- 移动版本库的HEAD指针；
- 重置暂存区；
- 代码会退回到工作区；
##### 比较差异
使用`diff`比较文件差异，如果后面不带参数会比较工作区和暂存区的差异，如果不带文件名会比较所以文件
```git
git diff
```
##### git stash
`git stash`将工作区和暂存区的代码储藏起来，需要注意的是没有被`git`追踪的文件（刚创建的文件）不会储藏，使用`git add[文件名]`让git追踪这个文件再进行`stash`就可以对新增的文件进行储藏了 。可以使用`git stash save "measge"`添加储藏信息。
```git
git stash 
# or
git stash save "measge"
```
###### 查看储藏的列表
```git
git stash list
```
###### 弹出储藏
将储藏列表中最新的内容弹出到当前分支上，并且删除储藏列表中的记录，
![image.png](https://cdn.nlark.com/yuque/0/2022/png/25669443/1654655076261-ff6ba01e-40f3-4f21-a579-d8057df9f9e2.png#averageHue=%23f9f6f4&clientId=u89786573-24b5-4&from=paste&height=301&id=u0022dd6b&originHeight=452&originWidth=833&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131003&status=done&style=none&taskId=ua97b2bad-9951-4b05-9a99-db6d142e3ab&title=&width=555.3333333333334)
看pop后面有一行是Dropped，在储藏列表删除了这个缓存
如果pop出来的内容有冲突，git会中断此次pop并告知你需要进行冲突解决
也可以指定储藏中的记录通过在`git stash pop`后面加上`git stash list`中的名称
```git
# 弹出最新储藏
git stash pop

# 弹出指定的储藏记录
git stash pop stash@{0}
```
###### 应用储藏
`git stash apply`与`pop`类似，但他不会删除储藏记录，也可以指定储藏记录。
```git
# 应用最新储藏
git stash apply

# 应用指定的储藏记录
git stash apply stash@{0}
```
###### 删除储藏
使用`git stash drop`删除单个储藏或`git stash clear`删除全部储藏。
```git
# 删除指定储藏
git stash drop [储藏名]

# 删除全部储藏
git stash clear
```
###### 显示与当前工作区的差异
```git
# 显示差异
git stash show [储藏名]
```
