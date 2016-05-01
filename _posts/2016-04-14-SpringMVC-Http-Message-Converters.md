---
layout: post
title: SpringMVC Http Message Converters (双语)
category: SpringMVC
tags: [Spring, SpringMVC]
---

Quick note about spring mvc HTTP message converter. Especially thanks to this [post](http://www.baeldung.com/spring-httpmessageconverter-rest) by Eugen Paraschiv.

这里记录一些 SpringMVC HTTP 消息转换器的用法，以备快速查看。特别感谢 Eugen Paraschiv 的[博文](http://www.baeldung.com/spring-httpmessageconverter-rest)

## Http Message Converters

An example:

一些例子：

1. Client sends a GET request to /foos with two headers `Accept: application/json` and `Content-type: application/xml`. To tell server that the request body is in xml and we want the server to return json.

    客户端向 /foos 发送 GET 请求，请求头中有 `Accept: application/json` 和 `Content-type: application/xml`。 告诉服务器请求体是xml格式和希望服务器返回json。

2. Spring controller is hit. With `@RequestBody` annotation and `Content-type` of client, the request body will be converted from xml to specified java entity as argument of method by xml converter.

    Spring 的控制器来处理这次请求。因为有 `@RequestBody` 注解和客户端设置的 `Content-type`，请求体将会被xml转换器解析为java实体。

3. When spring controller returns a response. With `@ResponseBody` annotation and `Accept` of client, the return value/object will be converted from specified java entity to json by json converter.

    当 spring 控制器返回 response 时，因为有 `@ResponseBody` 注解和客户端设置的Accept`，返回的值或者对象将会被json转换器从java实体转换为json。

### Converters Type

By default, the following HttpMessageConverters instances are pre-enabled:

默认情况下，下面的 HttpMessageConverters 是开启的：

* StringHttpMessageConverter – converts Strings

    StringHttpMessageConverter - 转换字符串

* MappingJackson2HttpMessageConverter – converts to/from json

    MappingJackson2HttpMessageConverter - 从/向 json 转换

* Jaxb2RootElementHttpMessageConverter – converts to/from XML

    Jaxb2RootElementHttpMessageConverter - 从/向 xml 转换

* For the other converters - [Message Converters](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/remoting.html#rest-message-conversion)

    其他转换器 - [Message Converters](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/remoting.html#rest-message-conversion)

## Set Up

We must declare explicitly support for annotation-driven MVC controllers

我们必须显式声明支持注解驱动的 MVC 控制器

```java
<mvc:annotation-driven/>
```

We could also use [`@EnableWebMvc`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/config/annotation/EnableWebMvc.html) annotation to do the same thing.

我们也可以使用 [`@EnableWebMvc`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/config/annotation/EnableWebMvc.html) 来做相同的事。

## @RequestBody

`@RequestBody` indicates that the **body of the HTTP Request is deserialized to that particular Java entity as method argument**. 

`@RequestBody` 表示**HTTP请求体需要反序列化到一个特定的Java实体当做函数形参**。

```java
@RequestMapping(path = "/user")
public void test(@RequestBody User user) {
    ...
}
```

**`Content-Type` header specified by the Client will be used to determine the appropriate converter for it**. So `Content-Type: application/xml` here to choose a xml converter which will convert xml content in request body to user object in method argument.

**转换器由请求头中客户端规定的 `Content-Type` 决定**。所以这里的 `Content-Type: application/xml` 将会选择 xml 转换器来转换请求体中的 xml 内容到函数形参的 user 对象。

## @ResponseBody

`@ResponseBody` indicates that the return value of the method is serialized directly to **the body of the HTTP Response**. 

`@ResponseBody` 表示函数的返回值需要直接被序列到**HTTP Response 的返回体**。

```java
@RequestMapping(value = "/getJson")
public @ResponseBody User test(){

	User user = new User();
	user.setPassword("1234");
	user.setUserName("Zale");

	return user;
}
```

**`Accept` header specified by the Client will be used to choose the appropriate Http Converter to serialize the entity**. So `Accept: application/json` here to choose a json converter which will convert user object to json format in the HTTP response body.

**序列化实体的方式由请求头中客户端规定的 `Accept` 决定**。所以这里的 `Accept: application/json` 将会自动的将 user 对象转换为 json 格式放入 HTTP 返回体中。

```json
{
    "password": 1234,
    "username": "Zale"
}
```

## Refs

* [HttpMessageConverter in Spring](http://www.baeldung.com/spring-httpmessageconverter-rest)
* [极客学院-常用注解类](http://jiuye.jikexueyuan.com/play?id=2239&class_id=36)
* [Annotation Type RequestMapping](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)