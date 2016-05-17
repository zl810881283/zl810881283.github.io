---
layout: post
title: 使用 Pandoc Markdown 进行学术论文写作
category: Writing
tags: ["Markdown", "Pandoc", "Writting"]
keywords: Markdown, Pandoc, Writting
---



最近在忙于毕业论文写作。本人之前写论文直接使用 word，无奈 word 在频繁修改文档时，表格和插图很容易乱掉，并且无法解决多人协助，版本管理问题。加上有纯文本癖，我很快将目光转到 **LaTeX** 上。用了一段时间 **LaTeX** ，表格和插图不再混乱，参考文献引用也完全没有问题，对数学公式的支持几乎可以用完美来形容，版本管理和多人协作也可以通过 Git 来实现。但也发现了一些 **LaTeX** 在创作时的问题：

- 写作时无法集中精力到内容上：
使用 **LaTeX** 写作，特别当文档比较大并存在大量公式的时候，会存在一大堆的标签，文档结构不够清晰。

- 标签需要配对：
虽说标签配不是很大的问题。但编译报错，返回编辑器补全标签还是挺让人懊恼，容易打断写作思路。

- 无法做到所见即所得：
所见即所得是 Word 做的比较好的地方，使用 **LaTeX** 进行写作时候，你并不知道结果出来是什么样子的，一切只有编译以后才知道。你想修改 pdf 里看到一句话，还需要找对应 tex 文件的所在行。虽然可以使用搜索，但是毕竟还是没有所见即所得来的方便。

于是想要寻找一个 **LaTeX** 的替代解决方案，并非完全要放弃 **LaTeX**。因为科技论文写作不可避免要有许多数学符号和公式。而且许多期刊都提供了 **LaTeX** 模板，因此如果这种替代方案需要让我完全放弃 **LaTeX**，我也会有些犹豫的。

好在发现了 Markdown，更确切的说，是发现了 Markdown＋Pandoc 的组合。

## 认识 Markdown

Markdown 是一种用来写作的轻量级「标记语言」，它用简洁的语法代替排版，而不像一般我们用的字处理软件 Word 或 Pages 有大量的排版、字体设置。它使我们专心于码字，用「标记」语法，来代替常见的排版格式。例如此文从内容到格式，甚至插图，键盘就可以通通搞定了。

### Markdown 的优点

- 专注你的文字内容而不是排版样式。
- 利用 Pandoc 可以轻松转换成 doc、pdf、tex。
- 纯文本内容，兼容所有的文本编辑器与字处理软件。
- 可读，直观。适合所有人的写作语言。

### 简要语法规则

#### 标题
标题是每篇文章都需要也是最常用的格式，在 Markdown 中，如果一段文字被定义为标题，只要在这段文字前加 `#` 号即可。

{:.picture}
![标题](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/head.png)

```markdown
# 一级标题
```

```markdown
## 二级标题
```

```markdown
### 三级标题
```

以此类推，总共六级标题，建议在井号后加一个空格，这是最标准的 Markdown 语法。

#### 列表

熟悉 HTML 的同学肯定知道有序列表与无序列表的区别，在 Markdown 下，列表的显示只需要在文字前加上 `-` 或 `*` 即可变为无序列表，有序列表则直接在文字前加 `1.` `2.` `3.` 符号要和文字之间加上一个字符的空格。

{:.picture}
![列表](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/list.png)

#### 引用

如果你需要引用一小段别处的句子，那么就要用引用的格式。

```markdown
> 例如这样
```

只需要在文本前加入 `>` 这种尖括号（大于号）即可。

{:.picture}
![引用](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/ref.png)

#### 图片与链接

插入链接与插入图片的语法很像，区别在一个 `!` 号。

{:.picture}
![图片与链接](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/link.png)

#### 粗体与斜体

Markdown 的粗体和斜体也非常简单，用两个 `*` 包含一段文本就是粗体的语法，用一个 `*` 包含一段文本就是斜体的语法。

例如：**这里是粗体** *这里是斜体*

#### 表格

表格是我觉得 Markdown 比较累人的地方，例子如下：

```markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
这种语法生成的表格如下：

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



### 小结

什么是 Markdown？简单一句话就是：用纯文本写作，同时用直观的轻量级标记来格式化文档。

通过上一章节的讲解 Markdown 的基本语法已经比较清晰，只要多加练习，配合好用的工具，写起东西来肯定会行云流水。

Markdown 在网络写作方面十分热门，这主要源于其轻量级的设计，一篇使用 Markdown 写成的文档，即使不经过任何处理，你也能很清晰的了解文档结构，Markdown 本身的符号也不会影响到阅读。

正是由于 Markdown 的轻量级设计，让我选择了使用它来完成论文。然而 Markdown 并不能很好的处理如参考文献，交叉引用，而这些又是学术写作里必要的。同时 Markdown 的排版问题也令人头疼，我们总不能拿 css 写出学术论文模板里的样子吧。好在开源界传说中的高帅富社区，[haskell](http://www.haskell.org) 社区的作品 [Pandoc](http://pandoc.org/) 帮我们解决了这些问题。

## 认识 Pandoc

一句话：[Pandoc](http://pandoc.org/) 是一款文件格式转换软件，可以将 Markdown，HTML，LaTeX，Microsoft Word docx 格式的文档互相转换（但不仅仅可以转换这些格式，详细请看[这里](http://www.pandoc.org/index.html)）。

详细来说：[Pandoc](http://pandoc.org/) 来源于 [haskell](http://www.haskell.org) 社区。[haskell](http://www.haskell.org) 是什么？一种编程语言。每位资深的开发者学习它，都会有些不知所措，因为，它的编程思路不同于通常意义上类似于 C、Python、Java 这些流行的编程语言。它来自一群高智商的开发者的贡献，据说人人有 PHD 学位，是[函数式编程语言](http://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B8%E5%BC%8F%E7%B7%A8%E7%A8%8B)的典范。当然，[Pandoc](http://pandoc.org/) 作者 [John MacFarlane](http://johnmacfarlane.net/) 也不例外，他是一位来自美国加州大学伯克利分校的哲学教授，研究的是认识论这类高深议题:D。

文本格式转换，每位开发过这方面程序的技术青年，都知道它有多么痛苦；开发出的程序有多么丑陋。甚至可以说，这是个无底黑洞。事实证明，[haskell](http://www.haskell.org) 的确是干这脏活、累活的最恰当选择。



### 为什么选择 Markdown + Pandoc 组合

1. 轻量、简单易学、上手容易。实话说学 **LaTeX** 已经花了不少功夫，我不想再学习另一种复杂的语言，只是为了写作文章。Markdown 符合需求。

2. 能够顺利转换成 Word 文档。毕竟周围的人用 Word 还是不少，能够顺利和他们分享文档并批注也是我的基本需求之一。这点 Pandoc 可以解决。

3. 能够转成 TeX 文档。Pandoc 可以将 Markdown 转到 TeX 文件，这一点对我来说吸引力非常大，有了 Tex，我可以很方便的套用 **LaTeX** 模板

### Pandoc 的安装

首先你需要安装 **LaTeX** 环境。

* Windows 用户安装 [TeXlive](http://tug.org/texlive/)。

* Ubuntu 用户直接使用命令安装
    
```shell
sudo apt-get install texlive-full
```

* Max OS 用户安装 [MaxTeX](http://tug.org/mactex/)

具体安装过程不再说明，如遇到问题，请自行百度解决。这里假设已经安装好了 **LaTeX** 环境。

#### 最简单的安装办法

推荐不需要交叉引用，或者决定手动引用图表的用户使用。点击 [这里](https://github.com/jgm/pandoc/releases/tag/1.17.0.2) 选择合适的系统版本下载并安装。

#### 极客一点的做法

这一做法可以自行安装 pandoc 的插件，满足自己的需要。在这里我们主要需要 pandoc-crossref 来实现交叉引用。

##### 安装 Haskell 平台

在[这里](https://www.haskell.org/platform/)下载不同系统版本的 Haskell Platform，并安装。

接下来配置环境变量

* Windows 用户 请自行查阅网上资料

* Ubuntu 用户 将 `~/.cabal` 加入 `PATH` 中，即在 `~/.bashrc` 文件中增加一行（如果使用 `zsh` 请在 `~/.zshrc` 中添加）：

```shell
export PATH="~/.cabal:$PATH"
```

* Max OS 用户 将 `$HOME/Library/Haskell/bin` 加入 `PATH` 中，即在 `~/.bashrc` 文件中增加一行（如果使用 `zsh` 请在 `~/.zshrc` 中添加）：

```shell
export PATH="$HOME/Library/Haskell/bin:$PATH"
```

##### 安装 Pandoc 和相关插件/Filter

以下命令如遇到权限问题请在每行之前添加 `sudo`。


```shell
cabal install pandoc #安装 pandoc
cabal install pandoc-crossref #安装 pandoc 交叉引用支持
cabal install pandoc-citeproc #安装 pandoc 参考文献支持
```

### 命令简介

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex --template=cqu.latex main.md -o main.pdf
```

我一般使用上面的命令完成格式转换，具体语法如下：

* `-s`: standalone， 这个是pdf的默认选项，可以不管它。
* `-S`: smart，几乎也是默认选项，大致可以减少出错概率。
* `--filter pandoc-crossref`，使用交叉引用插件处理文档。
* `--filter pandoc-citeproc`，使用文献引用插件处理文档。注意顺序，这个必须在 `--filter pandoc-crossref` 后面
* `--biblio reference.bib` 告诉 Pandoc 文献的 bibtex 位置，这里我是直接放在同一目录下的，如在其他目录下，请使用相对路径或绝对路径。
* `--csl chinese-gb7714-2005-numeric.csl` 告诉 pandoc 使用的文献引用格式，这个 csl 文档直接在 zotero 上找的。
* `--latex-engine=xelatex` 我沒有使用默认的latex引擎，而是使用xelatex这个引擎。
* `--template=cqu.latex` 告诉 pandoc 使用模版，这个 `cqu.latex` 是我在默认模版上修改的。模板可以在[这里](https://github.com/jgm/pandoc-templates)找到。
* `main.md -o main.pdf` 告诉pandoc输入文档，`-o` 告诉 pandoc 输出文档。如果需要转换成别的格式，将 `pdf` 改成该格式对应后缀名即可。如转换成 Word 格式，将 `pdf` 改为 `docx`；转换成 **LaTeX** 格式，将 `pdf` 改为 `tex`。

## 写作

Pandoc扩展了Markdown语法，作者提供了[详尽的文档](http://www.pandoc.org/README.html)，严格按这个来写的话，应该不会出什么问题。

### Markdown，**LaTeX** 编辑工具

我个人使用 sublime text 3 配合 `OmniMarkupPreviwer` 和 `MarkDown Editing` 插件来编辑 Markdown。具体可参看 Mintisan 的[博文](http://www.jianshu.com/p/aa30cc25c91b)，这里不再叙述。

**LaTeX** 编辑工具同样也是 sublime text 3，配合 `LaTeXTools` 插件，**LaTeX** 的高亮和代码提示都可以完成。你可能会问，说好的用 Markdown 进行写作，还要配置 **LaTeX** 环境干嘛？在我的使用环境里，还需要较长编辑 **LaTeX** 模板和 `cls` 文件，所有 **LaTeX** 编辑环境必不可少。

### Pandoc Markdown 扩展语法

Pandoc 对 Markdown 语法进行了扩展以支持交叉引用和文献引用，下面我将演示 Pandoc Markdown 扩展语法。

#### 表格

表格体与标准 Markdown 语法无差异，当需要表格头时，只需在表格体下方插入一个 **空行**，并下一行以 `:` 开头，后面接上表头即可。如：

```markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

: Demonstration of simple table syntax.
```

将会生成

{:.picture.bordered}
![表格](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/table.png)

#### 图片

几乎和标准 Markdown 无差异，图片显示文档中的标注性文字即为 `[]` 中的文字。注意，这里还可以插入 eps 或者 pdf 之类的矢量图。

{:.picture.bordered}
![图片](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/figure.png)

#### 数学公式

在 Markdown 中使用数学公式，和直接在 **LaTex** 中使用并无太多区别，直接使用 `$`（行内公式）或是``$$``（行间公式）符号包裹即可。

{:.picture.bordered}
![公式](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/formula.png)

#### 参考文献

基本的文中引用格式是 [@citekey]，这里的 citekey 是 Paper，zotero 之类的文献管理软件生成的 bib 文件中的，基本的格式是 **作者的姓:年份+两个或以上的随机字母组合**，比如 `Smith:1990xh`。那么我们只需要在文中写 `[@Smith:1990xh]` Pandoc 会自动渲染，并将这条 reference 自动插入文末。

如果是直接引用，如 Smith (1990) pointed out "blabla" (p. 140)，可以写成：`@Smith:1990xh pointed out "blabla" (p. 140)` 如果有多个引用需要放在一起的话，需要用分号连接：`[@Smith:1990xh; @Smith:1990ts]` 如果是同一同作者的話，放心，pandoc 会自动將他们渲染成 (Smith, 1990a; 1990b) 

#### 交叉引用

首先我们需要标注锚点，图后面加上 `{#fig:figname}` ，表的后面加上 `{#tbl:tablename}`，公式后加上 `{#eq:eqname}` 即可。

```markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

: this is a table head{#tbl:tablename}
```

```markdown
![this is a figure](path/to/figure.png){#fig:figname}
```


```latex
$$\sqrt{x}$${#eq:eqname}
```

引用时与参考文献极为相似：图为 `@fig:figname`，表为 `@tbl:tabname`，公式为 `@eq:eqname` 即可。


{:.picture.bordered}
![交叉引用](/attachments/images/Academia-Writing-with-Markdown-Using-Pandoc/crossref.png)

### Quick Start Demo

在这里我把我的本科毕业设计论文使用的模板放在 [GitHub](https://github.com/zl810881283/Academia-Writing-with-Markdown-Using-Pandoc) 上，大家可以在这个基础上自行添加修改。

编译命令：

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex --template=cqu.latex main.md -o main.pdf
```

生成 docx 命令：

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex  main.md -o main.docx
```

需要注意的是，模板中需要的字体您的系统中可能没有，请自行安装缺失字体。

### 调试篇

Pandoc本质上并不会直接生成 pdf 文件，其生成过程为 Markdown -> **LaTeX** -> **pdf**。所以一旦出现任何期待意外的事，我们都可以使用

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex --template=cqu.latex main.md -o main.tex
```

生成 **LaTeX** 源文件，相信这对会使用 **LaTeX** 的人来说并没什么困难。

## 总结

好了，现在可以放心的用 Markdown ＋ Pandoc 的组合来写论文了，数学公式，图表和参考文献都没有问题。保留 Markdown 的轻量的同时，也可以无缝转换到其它文档格式。最关键的是，和 **LaTeX** 也有非常完美的结合。

总结起来，当我们需要和别人写作完成论文时，只需要修改 Markdown 文件。而 Markdown 是纯文本文件很方便用 CVS 诸如 Git 进行版本管理和多人协作。

当导师需要查阅修改时，使用如下命令进行 Markdown -> docx 转换。最后将修改同步回 Markdown 文件中即可。

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex  main.md -o main.doc
```

当论文需要发表时，使用如下命令进行 Markdown -> **LaTeX** -> pdf 转换，套用期刊或会议的 `cls` 文件完成排版。

```shell
pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex --template=template.latex main.md -o main.tex

pandoc --filter pandoc-crossref --filter pandoc-citeproc --biblio reference.bib --csl chinese-gb7714-2005-numeric.csl --latex-engine=xelatex --template=template.latex main.md -o main.pdf

```

注意我这里为什么转换成 tex 文件，如果你需要定制化排版一些东西，可以转换成 tex 文件对其进行修改，我想会使用 **LaTeX** 的人这都不是问题吧。

<style type="text/css">
    .picture{
        text-align: center;
    }
    .picture.bordered img{

        box-shadow: 0 2px 10px 2px rgba(0,0,0,.2);
    }
</style>
