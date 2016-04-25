---
layout: post
title: Website with NodeJs Using ThinkJs
category: NodeJs
tags:[NodeJs, ThinkJs, ES7]
description: some word here
keywords: NodeJs, ThinkJs, ES7
---

[ThinkJs](https://thinkjs.org/), A Web framework beyond your dreams. It allows you Use the full ES6/7 features to develop Node.js applications.
I use this Web framework to build a project. In this project, The most popular technology(maybe) MTAN was used.
It is Mongodb, ThinkJs, Angular, NodeJs. As you see, Express was replaced by ThinkJs.

## Why ThinkJs

### ThinkJs' Features 

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
     
### Project Analysis

It is a auction Website. Logic is not difficult. Maybe as follow:

- User Management

    User sign up, log in, authority manage, information manage, level system
    
    But it is easy to do, because only two role need. One is administrator, the other is common user.
    Common can only bid item and compete with other. Administrator user can publish item and set its attribute
    
- Auction Items
    
    Item can set auction begin time and end time. Our system need stop auction automatically
