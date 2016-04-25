---
layout: post
title: Auction Website Using ThinkJs - Requirement and Design
category: NodeJs
tags: [NodeJs, ThinkJs, ES7]
keywords: NodeJs, ThinkJs, ES7
---

[ThinkJs](https://thinkjs.org/), A Web framework beyond your dreams. It allows you Use the full ES6/7 features to develop Node.js applications.
I use this Web framework to build a project. In this project, The most popular technology(maybe) MTAN was used.
It is Mongodb, ThinkJs, Angular, NodeJs. As you see, Express was replaced by ThinkJs.

## Why ThinkJs

ThinkJs' features are listed follow: 

- Supports ES6/7 features

    Writing code with full ES6/7 features (Generator Function, Class, Async & Await etc.), and the Babel-compiled code will run on Node.js runtime stably.
    
- Rich database support

    Supports Mysql, Sqlite, Mongodb with highly encapsulated and easy to use methods, in which SQL injection filters are also implemented.
    
- Hook & Middleware
    
    Rich hooks and middlewares are provided for conduct the user requests.
    
- Hot Module Replacement(HMR)
    
    In development mode, HMR monitors file changes and replaces them in the active runtime, no need to restart Node.js.
    
- REST API

    Auto-generate REST API, no need extra coding. Data level authorization controlling that make you can allow or disallow data access to certain user
    
- and ...
    
    If you are interested, you can visit  [ThinkJs](https://thinkjs.org/en/)
     
## Project Analysis

It is a auction Website. Logic is not difficult. Maybe as follow:

- User Management

    User sign up, log in, authority manage, information manage, level system
    
    But it is easy to do, because only two role need. One is administrator, the other is common user.
    Common can only bid item and compete with other. 
    
- Auction Items

    Administrator user can publish item and set its attribute(CRUD).
    
    Item can set auction begin time and end time. Our system need stop auction automatically. I design to implement it by corn.
    
- Auction Competition 
    
    It may be the mostly difficult part. For Mongodb don't support transaction, two users can bid same price in the condition that submit same time, which is terrible.
    To solve it, I design keeping it serializable by using queue. But deploying on multicore CPU system would also lead to this problem, for NodeJs use signal thread model.
    TODO: deploying on solve multicore CPU
    
- Order Management
    
    For User need not pay online, I need not implement online payment. It is required to place order automatically, also planning to implement by corn.
    
## Technology Choose

### Front-end
 
Single Page Application(SPA) is popular for its good user experience. As my interest, technology first, [Angular 2](https://angular.io) is the first chosen.
For Angular 2 is currently in **Beta**, API may change and bugs may happen. I would like share something about Angular 2 next time (maybe next blog)

### Back-end 

No doubt that NodeJs and ThinkJs was choose. I prefer it for ES7 features. I can use async/await to speed up my development.

### Database

Mongodb is most popular NoSQL database. Although official document said don't think Mongodb as just **schemaless** database.
But **schemaless** is convenient for me when requirement change or having unthoughtful design.
 