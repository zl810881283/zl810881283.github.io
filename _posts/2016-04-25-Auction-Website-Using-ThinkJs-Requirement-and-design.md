---
layout: post
title: Auction Website Using ThinkJs - Requirement and Design (双语)
category: NodeJs
tags: [NodeJs, ThinkJs, ES7]
keywords: NodeJs, ThinkJs, ES7
---

[ThinkJs](https://thinkjs.org/), A Web framework beyond your dreams. It allows using the full ES6/7 features to develop Node.js applications. I developed an auction Website with it, in which one of the most popular technology MTAN was used. MTAN is short for Mongodb, ThinkJs, Angular, NodeJs. As you see, Express was replaced by ThinkJs.

[ThinkJs](https://thinkjs.org/)，是一个超乎你想象的Web开发框架。它允许你完全使用ES6/7的特性来开发Node.js应用。我使用这个框架开发了一个拍卖网站，这个拍卖网站使用最热的技术之一：MTAN。MTAN是Mongodb, ThinkJs, Angular, NodeJs的缩写，正如你看到一样Express被ThinkJs取代。

## Why ThinkJs

ThinkJs' features are listed following: 

ThinkJs的特性如下：

- Supports ES6/7 features

    支持 ES6/7 特性

    Writing code with full ES6/7 features (Generator Function, Class, Async & Await etc.), and the Babel-compiled code will run on Node.js runtime stably.

    可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。
    
- Rich database support

    支持丰富的数据库

    Supports Mysql, Sqlite, Mongodb with highly encapsulated and easy to use methods, in which SQL injection filters are also implemented.

    支持 Mysql、SQLite、MongoDB 等常见的数据库，提供了很多简单易用、高度封装的方法，自动防止 SQL 注入。
    
- Hook & Middleware
    
    钩子 & 中间件

    Rich hooks and middlewares are provided for conducting the user requests.

    系统提供了大量的钩子和中间件，可以方便地对请求进行控制和修改。

    
- Hot Module Replacement(HMR)
    
    热部署

    In development mode, HMR monitors file changes and replaces them in the active runtime, no need to restart Node.js.

    开发模式下，文件修改后立即生效，无需重启 Node.js 服务。
    
- REST API

    REST API

    Auto-generate REST API, no need extra coding. Data level authorization controlling that make you can allow or disallow data access to certain user

    自动生成 REST API，而无需写任何的代码。也可以根据接口定制，隐藏部分数据和进行权限控制。
    
- and ...
    
    还有...

    If you are interested, you can visit [ThinkJs](https://thinkjs.org/en/)

    如果你对此感兴趣，你可以访问[ThinkJs](https://thinkjs.org/en/)
     
## Project Analysis

It is a auction Website. Logic is not complex. Including:

这是一个拍卖网站，逻辑并不复杂，包括如下：

- User Management

    用户管理

    User sign up, login, authority manage, information manage, level system.
    
    用户注册，登录，权限管理，用户信息管理，等级系统。

    Authority manage is easy to do, because only two role need. One is administrator, the other is common user. Common can only bid item and compete with others. 

    权限系统很容实现，因为只需要两个角色。一个是管理员，另外一个是普通用户，普通用户只能和其他用户竞价。

    
- Auction Items Management

    拍卖物品管理

    Administrator user can publish item and set its attribute(CRUD).
    
    管理员可以发布拍卖物品，并可以修改它的属性(CRUD)。

    Item can set auction begin time and end time. Our system need stop auction automatically. I design to implement it by corn.
    
    可以设置物品的开始竞拍时间和结束时间。我们的系统需要自动的停止竞拍，我设想使用corn来实现这个。

- Auction Competition Subsystem
    
    竞拍子系统

    It may be the mostly difficult part. For Mongodb don't support transaction, two users can bid same price in the condition that submit same time, which is terrible. To solve it, I design keeping it serializable by using queue. But deploying on multicore CPU system would also lead to this problem, for NodeJs use signal thread model. PS: If you know how to solve deploying on multicore CPU, tell me please.
    
    这可能是最复杂的一块。Mongodb不支持事务，可能会让两个出价相同的用户同时提交，这是很糟糕的，不能容忍的。为了解决这个问题，我设想使用队列让竞拍保持序列化。因为NodeJs是单线程模型，当部署在多核CPU系统上的时候，还是有可能会发生这个问题。PS：如果你有解决方案，请告诉我。

- Order Management
    
    订单管理

    For User need not pay online, I need not implement online payment. It is required to place order automatically, also planning to implement by corn.

    因为用户不需要在线支付，所以我不需要实现在线支付。但是我需要实现自动下订单的功能，我设想用corn来实现。
    
## Technology Choose

### Front-end
 
Single Page Application(SPA) is popular for its good user experience. Out of my interest, technology first, [Angular 2](https://angular.io) is the first chosen. For Angular 2 is currently in **Beta**, API may change and bugs may happen. I would like sharing something about Angular 2 next time (maybe next blog)

单页面应用(SPA)因为它的好的用户体验而非常火热。出于我的兴趣：技术优先，[Angular 2](https://angular.io)当然就是我的首选。因为当前Angular 2处于**Beta**阶段，API可能会改变，也有可能有很多的坑需要踩。我打算在近期写一篇关于Angular 2的博文。

### Back-end 

No doubt that NodeJs and ThinkJs was choose. I prefer it for ES7 features. I can use async/await to speed up my development.

毫无疑问选择NodeJs和ThinkJs，我非常喜欢ES7的特性。我可以使用async/await来加速我的开发。

### Database

Mongodb is most popular NoSQL database. Although official document said that don't think Mongodb as just **schemaless** database. But **schemaless** is convenient for me when requirement change or having unthoughtful design.

Mongodb是最热门的NoSQL数据库。虽然官方文档说，不要认为Mongodb仅仅是一个**无模式**的数据库。但是因为需求可能需要变化，而且一开始的设计可能会设计不周到，**无模式**对我来说很方便。
 