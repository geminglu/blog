---
layout: 规范
title: commit 规范
date: 2023-09-29 11:12:24
categories: git
tags: [Git]
---
## 什么是约定式提交
约定式提交（Conventional Commits）是一种用于代码版本控制的规范，旨在通过明确和标准化提交信息来提高代码协作质量和效率。其基本原则是通过规定提交信息的结构和语义来提高代码版本控制的可读性、可维护性和自动化程度。
约定式提交规范通常要求提交信息包括一个描述性的"类型"、一个可选的"作用域"、一个用于简洁说明的"主题"，以及可选的"正文"和"尾部"等组成部分。这些组成部分的格式和语义都是根据规范要求进行约定的，比如使用"feat"来表示新功能、"fix"表示修复错误、"docs"表示文档变更等。
通过遵循约定式提交规范，开发人员可以更容易地理解和管理代码的变更历史，同时也为自动化工具提供了更多可靠的信息，例如自动生成版本号、发布日志和代码库更新等操作。
提交说明的结构如下所示:
原文：
```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```
译文：
```
<类型>[可选 范围]: <描述>
[可选 正文]
[可选 脚注]
```
提交说明包含了下面的结构化元素，以向类库使用者表明其意图：

1. fix: 类型 为 fix 的提交表示在代码库中修复了一个 bug（这和语义化版本中的 `PATCH`[1] 相对应）。
2. feat: 类型 为 feat 的提交表示在代码库中新增了一个功能（这和语义化版本中的 `MINOR`[2] 相对应）。
3. BREAKING CHANGE: 在脚注中包含 BREAKING CHANGE: 或 <类型>(范围) 后面有一个 ! 的提交，表示引入了破坏性 API 变更（这和语义化版本中的 `MAJOR`[3] 相对应）。破坏性变更可以是任意 类型 提交的一部分。
4. 除 fix: 和 feat: 之外，也可以使用其它提交 类型 ，例如 \@commitlint/config-conventional[4]（基于 Angular 约定[5]）中推荐的 build:、chore:、 ci:、docs:、style:、refactor:、perf:、test:，等等。
5. 脚注中除了 BREAKING CHANGE: <description> ，其它条目应该采用类似 git trailer format[6] 这样的惯例。

其它提交类型在约定式提交规范中并没有强制限制，并且在语义化版本中没有隐式影响（除非它们包含 BREAKING CHANGE）。可以为提交类型添加一个围在圆括号内的范围，以为其提供额外的上下文信息。例如 feat(parser): adds ability to parse arrays.。
### 示例
包含了描述并且脚注中有破坏性变更的提交说明
```shell
feat: allow provided config object to extend other configs
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

包含了 ! 字符以提醒注意破坏性变更的提交说明

```shell
feat!: send an email to the customer when a product is shipped
```

包含了范围和破坏性变更 ! 的提交说明

```shell
feat(api)!: send an email to the customer when a product is shipped
```

包含了 ! 和 BREAKING CHANGE 脚注的提交说明

```
chore!: drop support for Node 6
BREAKING CHANGE: use JavaScript features not available in Node 6.
```

不包含正文的提交说明

```
docs: correct spelling of CHANGELOG
```

包含范围的提交说明

```
feat(lang): add polish language
```

包含多行正文和多行脚注的提交说明

```
fix: prevent racing of requests
Introduce a request id and a reference to latest request. Dismissincoming responses other than from latest request.
Remove timeouts which were used to mitigate the racing issue but areobsolete now.
Reviewed-by: ZRefs: #123
```
### type 类型概览
| 值 | 描述 |
| --- | --- |
| feat | 新增一个功能 |
| fix | 修复一个Bug |
| docs | 文档变更 |
| style | 代码格式（不影响功能，例如空格、分号等格式修正） |
| refactor | 代码重构 |
| perf | 改善性能 |
| test | 测试 |
| build | 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等） |
| ci | 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等 |
| chore | 变更构建流程或辅助工具 |
| revert | 代码回退 |

## 为什么需要约定式提交？
Git提交信息需要遵循Angular约定是为了使提交信息格式清晰、易于阅读和理解，从而提高代码协作的效率。Angular约定包括以下三个部分：

1. 标题（header）：用一行简短的描述来总结更改内容，并使用特殊关键字指定更改类型和影响范围。
2. 正文（body）：提供更详细的更改描述，包括更改原因、影响和解决方案等信息。
3. 页脚（footer）：提供一些附加信息，如相关链接、关联的BUG编号等。

通过遵循Angular约定，可以使提交信息更加规范化和易于管理，从而方便其他团队成员阅读和理解更改的含义，从而提高团队协作效率。此外，遵循Angular约定的提交信息还可以更好地与许多自动化工具进行集成，如自动化版本控制、代码审查工具等。
## 如何遵守约定式提交？
