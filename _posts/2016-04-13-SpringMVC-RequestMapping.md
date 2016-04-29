---
layout: post
title: SpringMVC RequestMapping (双语)
category: SpringMVC
tags: [Spring, SpringMVC]
---

Quick note about request mapping annotations in SpringMVC controller

这里记录一些SpringMVC控制器的请求映射注解的用法，以备快速查看。

## @RequestMapping

Annotation for **mapping web requests onto specific handler classes and/or handler methods**. It means `DispatcherServlet` intercepts the request, then it switches request to the corresponding method determined by `@RequestMapping`.

这个注解是**映射web请求到一个处理类或者处理方法**。这也就是说 `DispatcherServlet` 会翻译这个请求，然后调用把请求路由到`@RequestMapping`标注的方法来处理。

- `@RequestMapping("path")` on class means all handling methods on this controller are relative to the given path.

    `@RequestMapping("path")` 标注在类上的时候，类中的所有处理方法都需要满足给出的路径。

- `@RequestMapping("path")` on method means mapping requests which match given path to this method

    `@RequestMapping("path")` 标注在方法上的时候，满足路径的请求会交由标注方法处理。

### Properties

- `value` indicates URL to map. If no other properties, we could use its simplified form `@RequestMapping("path")`.

    `value` 表示映射的URL。如果不需要设定其他属性，我可以使用简化形式 `@RequestMapping("path")`。

- `method` indicates HTTP methods. It will support all methods if not specified .

    `method` 表示HTTP方法。如果没有定义的话，将支持所有的请求方法。

```java
method = RquestMethod.GET
method = {RquestMethod.GET, RquestMethod.POST}
```

- `consumes` indicates Content-Type of the mapped request. A request will be mapped only when its Content-Type matches it.

    `consumes` 表示映射请求的Content-Type。只有当一个请求的Content-Type满足设定时才会映射。

```java
consumes = "application/json"
consumes = {"application/json", "text/html"}
```

- `produces` indicates the producible media types of the mapped request, **a request will be mapped only when Accept matches it**.

    `produces` 表示请求需要的返回数据类型，**一个请求只有满足Accept域满足设定时才会被映射**

```java
produces = "application/json"
produces = {"application/json", "charset=UTF-8"}
```

- `headers` indicates only the requests having these headers can be mapped.

    `headers` 表示只有当请求有相应的请求头才会被映射。

```java
headers = "content-type=text/*"
```

- `params` indicates only the requests having these parameters can be mapped. We could also add `!=` pr `==` to add conditions.

    `params` 表示只有请求有相应的参数才会被映射。我们可以使用`!=`后者`==`来添加条件

```java
// myParam exists and its value is myValue
params="myParam = myValue" 

// myParamA exists and its value is myValueA. // myParamB exists and its value is not myValueB
params = {"myParamA = myValueA", "myParamB ！= myValueB"}

// myParamA exists
params = "myParamA" 

// myParamA exists and myParamB does not exits
params = {"myParamA", "!myParamB"} 
```

### Example

```java
@Controller
@RequestMapping("/users") 
public class TestController {
	
    // Handler all /users GET request
    @RequestMapping(method = RequestMethod.GET) 
    public void functionA() {
        ...
    }

    // Handler all /users/new POST request
    @RequestMapping(value="/new", method = RequestMethod.POST)
    public void functionC() {
        ...
    }

}
```

### Ant-style path patterns to indicate map url.

- `/user/*/login`  matches /user/aaa/login
    
    `/user/*/login`  可以匹配 /user/aaa/login

- `/user/**/login` matches /user/login or /user/aaa/login or /user/aaa/bbb/login

    `/user/**/login` 可以匹配 /user/login 或 /user/aaa/login 或 /user/aaa/bbb/login

- `/user/login??`  matches /user/loginAA or /user/loginBB

    `/user/login??`  可以匹配 /user/loginAA 或 /user/loginBB

- `/user/{userId}` matches /user/123 or /user/342  (使用 `@PathVariable` 获取用户id)

    `/user/{userId}` 可以匹配 /user/123 或 /user/342  (使用 `@PathVariable` 获取用户id)

## @PathVariable

**It can be used on a method argument to bind it to the value of a URI template variable**. The argument can be of any simple type such as int, long, Date, etc. Spring automatically converts to the appropriate type or throws a `TypeMismatchException` if it fails to do.

**它标注在方法参数上，可以绑定URI模板参数**。参数类型可以是任何的简单类型，如int，long，Date。Spring将会自动转换到适合的类型，当失败的时候，会抛出`TypeMismatchException`异常。

> If we do not specify the url placeholder name like `@PathVariable('name')`, we must keep method parameter name  same as url placeholder.

> 如果我们没有指定占位符如`@PathVariable('name')`，我们必须让函数形参名和URL中的占位符相同。

```java
@Controller
@RequestMapping("/users") 
public class TestController {

    // Handler all /users/{id} GET request
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public void functionA(@PathVariable int id) {
        ...
    }

    // Or if you want another parameter name
    //@RequestMapping(value="/{id}", method = RequestMethod.GET)
    //public void functionB(@PathVariable("id") int anotherName) {
    //	// ToDo
    //}
}
```

A more complex example:


一个更复杂的例子：

```java
@Controller
@RequestMapping("/users/{userId}")
public class TestController {

  	@RequestMapping("/book/{bookId}")
  	public void test(@PathVariable String userId, @PathVariable String bookId) {
        ...
  	}

}
```

## @RequestParam 

It is used to **bind request parameters to a method parameter in the controller**. Do not mix it with `@PathVariable` which is used to obtain placeholders from the URI only.

用来**绑定请求参数到控制器里函数的形参**。不要和`@PathVariable`混淆，`@PathVariable`只是用来从URI中获取占位符的值。

As usual, we do it like this `request.getParameter("name")`, now with annotation:

通常，我们不喜欢使用这样的方式`request.getParameter("name")`，而现在我们可以使用这个注解。

```java
@RequestMapping(value="/user/{userId}/books", method = RequestMethod.GET)
public void test(
	@PathVariable("userId") int user,
    @RequestParam(value = "date", required = false) Date dateOrNull) {
  	    ...
  	}
}
```

It has three properties:

它有三个属性：

1. `value` is the key to get value from Request

    `value`是Request中的键

2. `required` is to indicate whether Request must have this parameter. By default is true.

    `required`设定是否需要Request必须有这个参数。默认值为true。

3. `defaultValue` is to set default value when parameter in Request does not exist.

    `defaultValue`当Request中没有这个参数时的默认值。

> Same as `@PathVariable('name')`. If we do not specify `value`. We must need to keep method parameter name the same as key.

> 就像`@PathVariable('name')`一样，如果我们制定`value`。我必须让形参名和键一样。

## @CookieValue

Same as `@RequestParam` but bind cookie values to a method parameter. It also has three properties `value`, `required` and `defaultValue` which are also the same 

大体上和`@RequestParam`一样，不同之处是绑定cookie中的值到形参。它也有三个属性`value`，`required`和`defaultValue`。

```java
@RequestMapping(value="/user", method = RequestMethod.GET)
public void test(@CookieValue("foo") String valueFromCookie) {
  	...
}
```

## @RequestBody and @ResponseBody

Check another note [SpringMVC-Http-Message-Converters](/articles/2016/04/SpringMVC-Http-Message-Converters.html)

请查看另外一篇博文[SpringMVC-Http-Message-Converters](/articles/2016/04/SpringMVC-Http-Message-Converters.html)


## Ref

* [极客学院-常用注解类](http://jiuye.jikexueyuan.com/play?id=2239&class_id=36)
* [Annotation Type RequestMapping](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)