---
layout: post
title: 使用 Sublime Text3 + Ctags + Cscope 替代 Source Insight
category: Linux Kernel
tags: ["Sublime Text", "Ctags", "Cscope", "MacOS"]
keywords: MacOS, Sublime Text, Ctags, Cscope, Source Insight
---

最近因课程学习 Linux 0.11 内核源码，需要查看并修改 Linux 内核代码。
Source Insight(以下简称SI)是 Windows 下的收费软件，界面丑陋，且无 MacOS 版本，所以考虑其替代方案。
后来发现 Sublime Text3(以下简称ST3) + Ctags + Cscope 可以取得很好的效果。
使用 ST3 基本可以实现全键盘操作，同时它又没有学习 Vim 的陡峭曲线，是个不错的选择。

## 安装方法：

### 安装Package Control for ST3

这里就不在叙述，如果未安装请自行百度。

### 安装 Ctags

- 从 [http://ctags.sourceforge.net/](http://ctags.sourceforge.net/) 下载源代码包后，解压缩生成源代码目录
- 然后进入源代码根目录执行 `./configure`
- 然后执行 `make`
- 编译成功后执行 `make install`
        
### 安装 Sublime Text Ctags 插件

- 通过 Preference -> Package Control -> Install Package安装Ctags插件 
- 通过 Preference -> Package Settings -> Ctags -> Settings Default 中的内容拷贝到 Setting User中，将 `command": ""` 中的 `""` 填入Ctags的路径位置 
- 在工程根目录上点击右键，选择`Ctags:Rebuild tags`

### 安装 Cscope 

> 如果不需要使用 C 函数符号查询,可以不安装 Cscope ,基本 Ctags 能满足 Linux 0.11 内核代码查看

-  从 [http://cscope.sourceforge.net/](http://cscope.sourceforge.net/) 下载源代码包后，解压缩生成源代码目录

后面就是 Linux 安装软件套路:

- 进入源代码根目录执行 `./configure`
- 然后执行 `make`
- 编译成功后执行 `make install`

### 安装 Sublime Text Cscope 插件

- 通过 Preference -> Package Control -> Install Package安装Cscope插件 
- 并在工程根目录下生成cscope.out文件 
- 打开CscopeSublime.sublime-settings文件(可能需要添加到 Package -> User 目录下)，将 `"executable": ""` 中的 `""` 填入Cscope.exe的路径位置,将 `"database_location": ""` 中的 `""`填入cscope.out的路径位置

## 功能实现

- 对于 symbol 函数的定义查询，ST3 自带此功能`Go to Definition`，且搜索结果有多个时可以预览，不用跳转到另一个文件。Ctags 也有此功能 `navigate_to_definition`，搜索结果比 ST3 要准确一些，但多结果时不支持预览。Csope 也有此功能 `Cscope: look up function defintion`，但搜索结果不支持双击点开。因此实际中多用 ST3 和 Ctags 来实现此功能 
- 对于 symbol 变量的定义查询，ST3 不支持，Ctags 有此功能，方法同其查询symbol函数的定义一致。Cscope 也可以用查询 symbol 函数定义的方法实现此功能，搜索结果不支持双击点开。因此实际中多用 Ctags 来实现此功能 
- 对于函数 caller 的查询，只有 Cscope 有此功能 `Cscope: look up function calling this function` 
- 全局搜索, ST3 可通过`Ctrl+Shift+F`实现，但搜索耗时较长。Cscope 可通过 `Cscope: look up symbol` 实现，因为已经通过 cscope.out 建立了索引，所以结果很快，但结果不一定全面

**注**：使用 Cscope 的功能时，需按 `enter` 键确定才会执行

**比较**：ST3 + Ctags + Cscope 的方案基本可以实现 Source Insight 的常用有效功能（除了查看类继承关系的 Relation Windows），且其速度更快，界面也更为清爽。ST3 相比于 SI 的其他优点还包括： 
- ST3 使用`Ctrl+P` 搜索文件时，使用的是模糊匹配，不像 SI 必须顺次拼写正确才行 
- ST3 支持 tab 模式，可方便的在多个文件间切换

## ST3实用技巧

- `Alt+O` 可以实现头文件和源文件之间的快速切换 
- 通过 View -> Side bar 可在左侧显示当前打开的文件列表 
- ST3 虽然不像 notepad++ 可以在 sidebar 上显示函数列表，但是可通过`Ctrl+R`查看 
- 通过 Preference -> Key binding user 可根据个人操作习惯自定义快捷键（包括 ST3 自带的和插件的） 
- 双击可选中光标所在单词，三击可选中光标所在行 
- `Ctrl+Shift+T` 可以打开之前关闭的 tab 页，这点同 chrome 是一样的

## 最好的方法

> 文章的最后说一个'最好'的方法

当然是直接使用 Intellij Clion , 作为一个不错的 c/c++ IDE,代码跳转,代码提示,自动 include 应有尽有

在 Intellij Clion 中直接导入内核源码,即可自动生成 CMakeList,并自动生成代码映射

> 当然 sublime text 的轻量级也是不少人选择他的原因