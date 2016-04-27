---
layout: post
title: Hibernate Session
category: Hibernate
tags: [Hibernate]
---

Session interface is a **single threaded** object between Java application and the persistence layer. Session opens a single database connection when it is created, and holds onto it until the session is closed. It is mainly to **offer CRUD operations on the persistent object** which is loaded by Hibernate from the database.

Session就是一个在Java应用层和持久化层的**单线程的**对象。Session在创建的时候就会打开一个数据库连接，并一直持有这个连接，直到Session被关闭。它主要用来为持久化对象上提供CRUD操作，而这些对象是由Hibernate从数据库中加载的。

More details, in Hibernate, Session interface wraps a JDBC connection, holds a mandatory (first-level) cache of persistent objects, allows Hibernate to automatically persist objects that are modified, and allows Hibernate to implement functionality such as lazy-loading.

详细点说，在Hibernate中，Session其实是包装了JDBC连接，它持有持久化对象的强制缓存（一级缓存），这样就允许Hibernate在对象被修改的时候自动的持久化对象，并让Hibernate可以实现一些如懒加载之类的功能。

## State of persistent object

Persistent objects should be in one of the following three states at a given point in time:

在任意时间，持久化对象只会是以下状态之一：

- **transient**: A new instance of a persistent class which is not associated with a Session and has no representation in the database and no identifier value. (ex. `Person p = new Person`). You can make a transient instance persistent by associating it with a Session.

    **瞬时态**：一个新的持久化类的实例对象，这个对象没有与任何的Session关联，没有表示数据库中的任何数据，没有唯一标识符（id）（如`Person p = new Person`）。你可以让一个瞬时态对象与一个Session关联，让其成为持久态。
    
- **persistent**: A persistent instance has a representation in the database, an identifier value and is associated with a Session.

    **持久态**：一个持久化对象在数据库中有相应的表示，有唯一标识符（id），和一个Session关联。
    
- **detached**: Once we close the Hibernate Session, the persistent instance will become a detached instance. But the reference of the object is still valid. You could continue to modify the object. These changes will not lost and will be inserted into database when associated with a Session which changes it back to persistent state.
    
    **游离态**：一旦我们关闭Hibernate Session，持久化对象将会变为游离态。但是对象的引用还是有效的，你可以继续修改对象。这些修改并不会丢失，当游离态对象与一个Session关联后将会变为持久态，而这些修改将会被插入数据库中。

## Open a Session

> Different version of Hibernate has different way to do it. The following is for Hibernate more than 3.x only.

> 不同版本的Hibernate有不同的方法，以下的方法只适用于Hibernate 3.x以上版本。

To open a Session, it's better to create an util class:

最好创建一个工具类来打开一个Session：

```java
public class HibernateUtils {
    private static SessionFactory sessionFactory;

    static {
        Configuration cfg = new Configuration().configure();
        sessionFactory = cfg.buildSessionFactory();
    }

    public static Session getSession() {
        return sessionFactory.getCurrentSession();
    }
}
```

To use `getCurrentSession()`, it needs to add in `hibernate.cfg.xml`:

为了可以使用`getCurrentSession()`，你需要在`hibernate.cfg.xml`中配置：

```xml
<property name="hibernate.current_session_context_class">thread</property>
```

### openSession vs getCurrentSession

#### openSession()

1. We can use it when we decided to manage the Session our self.
	
	我们打算自己管理Session的时候，可以使用它。

2. It does not try to store or pull the Session from the current context. Just a brand new one.

	它不会尝试存储或者从当前上下文中获取Session。仅仅创建一个新的Session。

3. **If we use this method, we need to `flush()` and `close()` the Session. It does not flush and close automatically**.

	**如果我们使用这个方法，我们需要使用`flush()`和`close()`来管理Session。Hibernate并不会为我们自动的刷新或者关闭Session。**

#### getCurrentSession()

The "CurrentSession" refers to a Hibernate Session bound by Hibernate behind the scenes, to the transaction scope. It **creates a brand new session** if does not exist or **uses an existing one** if one already exists. It automatically configured with both auto-flush and auto-close attributes as true means **Session will be automatically flushed and closed**. It's better to use `getCurrentSession()` method when our transaction runs long time or with multi calls of Session.

"CurrentSession"是Hibernate后台根据场景自动绑定到事务域的Session。如果当前没有可用Session，**将会自动创建**。如果有的话，**将会使用现有的**。他可以做到真正意义上的`Session自动刷新和关闭`。当我们的事务需要执行很长时间的时候或者需要调用很多次Session的时候，最好使用`getCurrentSession()`。

## save()

`save()` results in an SQL `INSERT`. It persists the given transient instance, first assigning a generated identifier. In brief, it adds/saves a new entity into database.

`save()`会导致一个SQL`INSERT`语句的执行。它会持久化一个瞬时态对象。它会生成一个唯一标识符（id）。总的来说，它会向数据库中增加/存储一个新实体。

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user = new User(); 

user.setName("Zale"); 
user.setAge(20);

session.save(user);

tx.commit();
// Because getCurrentSession(), so no need session.close();
```

But be careful here, `save()` does not guarantee the same, it returns an identifier, and if an `INSERT` has to be executed to get the identifier, **this `INSERT` happens immediately**, no matter if you are inside or outside of a transaction. This is not good in a long-running conversation with an extended Session/persistence context.

但是这里需要小心，`save()`并不保证事务，它将返回持久化后的对象的统一标识符（id），如果一个`INSERT` 语句需要被执行来获得统一标识符（id），不管是否在事务内，**这个`INSERT`将会立即执行**。当我们需要继承Session/persistence context来实现长会话流程的时候，这样是不好的。

## persist()

`persist()` also makes a transient instance persistent. However, it doesn't guarantee that the identifier value will be assigned to the persistent instance immediately, the assignment might happen at flush time. It also guarantees that it will not execute an `INSERT` statement if it is called outside of transaction boundaries. This is useful in long-running conversations with an extended Session/persistence context.

`persist()`同样可以让你一个瞬时态的对象变为持久态。但是它并不保证统一标识符（id）的值会立即赋值给持久化对象，这个赋值可能会被延迟到Session flush的时候。它保证当他在一个事务外被调用的时候不会触发`INSERT`语句。当我们需要继承Session/persistence context来实现长会话流程的时候，这样做是很有用的。

## load() and get()

`load()` and `get()` result in an SQL `SELECT BY ID`. It returns the persistent instance of the given entity class with the given identifier.(`load()` returna a "proxy")

`load()`和`get()`都会导致SQL`SELECT BY ID`语句的执行。他们都会根据给定的统一标识符（id）返回实体类的持久化对象（`load()`返回的是一个"代理"）

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user = (User) session.load(User.class, 1); // 1 is the identifier in the database
// User user = (User) session.get(User.class, 1); 

tx.commit();
// Because we use getCurrentSession, so no need to run session.close();
```

### Difference between load() and get()

* `load()` returns a **"proxy" without hitting the database** (lazy loading). In Hibernate, "proxy" is an object with the given identifier value, its properties are not initialized yet, it just look like a temporary fake object. If no row found , it will **throws an exception** - ObjectNotFoundException.
	
	`load()`返回一个**"代理"而不会命中数据库**（也就是懒加载）。在Hibernate中，代理是一个有给定的统一标识符（id）对象，他的其他字段并没有被初始化，他看起来就像是一个零时的空壳对象。如果没有找到对应行，它将**抛出一个异常** - ObjectNotFoundException

* `get()` always **hits the database and returns the real object** instead of a proxy. If no row found , **it return `null`**.

	`get()`总是**命中数据库和返回真实的对象**而不是一个代理。如果没有找到对应行，**它将返回`null`**

### Which one to use

If I'm not sure whether the object exists or not, I use `get()` to avoid an exception. If I'm sure, I prefer `load()`.

如果我们不能确保对象是否存在，应该使用`get()`来避免异常，如果确保对象存在，建议使用`load()`来改善性能。

## update() and saveOrUpdate()

Which function will result in SQL `UPDATE`? We could find `update()` or `saveOrUpdate()`. But we need to know firstly, there is no need to call these functions to do update. When we `get()/load()` a persistent object, and then call setters to modify something. After transaction `commit()` or session `flush()`. Database will be updated.

哪一个函数会导致SQL`UPDATA`？我们翻阅官方API可以看到`updata()`或者`saveOrUpdate()`。但是我们首先需要知道，我们并不是需要调用这些函数来实现更新数据库。当我们使用`get()/load()`获得的持久化对象，然后使用setters修改属性，当事务`commit()`或者session `funsh()`，数据库也会更新。

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user = (User) session.load(User.class, 1);
user.setAge(30);

session.flush();
// or tx.commit(); it does the same thing
// Because getCurrentSession(), so no need session.close();
```

### update() 

So why we need `update()`? In fact, it's mainly used to updated a detached object which was ever a persistent object and now session is closed. When `update()` a detached object, **it will become persistent again**.

那我们为什么需要`updata()`？实际上，这主要是为了更新游离态对象。还记得什么样的对象是游离态对象吗？游离态对象曾经是一个持久态对象，但是现在它对应的session关闭了。当对游离态对象使用`update`，**它将会再次变为持久态**。

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user = (User) session.get(User.class, 2);

tx.commit();
// Because getCurrentSession(), so first session is closed here

....

// Now user is in detached state. And we update it!
user.setAge(new Integer(27));

// We open a second session
Session secondSession = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

// Update!
secondSession.update(user);

// Commit!
tx.commit();
// Because getCurrentSession(), so no need secondSession.close();
```

### saveOrUpdate()

It means either `save()` or `update()` the given instance on the basis of identifier exists or not. When we are not sure whether the instance was ever persistent (so whether an identifier exists or not). USE IT! If the instance has an identifier, `update()` will be run to update it in databas. If no identifier, `save()` will be run to add an identifier and insert it into database.

正如函数名一样，具体是``save()``还是``update()``取决于对象的统一标识符（id）是否存在。当我们不确定实例是否曾经持久化（也就是不确定统一标识符是否存在），使用它就没错了！如果实例有标识符`updata()`将会被调用来更新数据库。如果没有标识符，`save()`将会被调用来插入到数据库并为对象添加统一标识符。

## merge()

`merge()` is also used to update a detached object. It copies the state of the given object onto the persistent object with the same identifier. 

`merge()`也是用来更新游离态对象，它会将给定对象状态复制到相同统一标识符（id）的持久化对象。

The difference with `update()` is that `update()` tries to reattach the instance, meaning that there is no other persistent object with the same identifier attached to the Session right now otherwise NonUniqueObjectException is thrown. `merge()`, however, just copies all values to a persistent instance in the Session (which will be loaded if it is not currently loaded). The input object is not changed. So `merge()` is more general than `update()`, but may use more resources.

它和`update()`不同之处是`update()`会尝试将对象持久化，这也就是说，如果Session当前没有与给定对象一样唯一标识符（id）的对象，如果有的话将会抛出 NonUniqueObjectException。而`merge()`，仅仅将所有值复制到Session中的持久化对象中（如果没有则立即加载）。输入的对象并没有变化。所以来说它比`update()`用途更广泛，但是也会消耗更多的资源。

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user1 = (User) session.get(User.class, 2);

tx.commit(); 
// Because getCurrentSession(), so no need session.close();

....
user1.setAge(30);

session = HibernateUtils.getSession(); 
tx= session.beginTransaction(); 

User user2 = (User) session.get(User.class, 2); // Same id as user1

session.update(user1); // It throws NonUniqueObjectException because in the session, another persistent object with the same id already exists. user1 == user2 false

tx.commit();
// Because we use getCurrentSession, so no need session.close();
```

So if in this situation, we should use `merge()`, it needs to merge user1 with user2:

所以在这种情况下，我们需要使用`merge()`，我们需要合并user1和user2

```java
User user2 = (User) session.get(User.class, 2);
User user3 = (User) session.merge(user1);

// user3 == user2 true
```

So here `merge()` returns the **same reference** of user2.

所以这里`merge()`返回**和user2相同的引用**。

## delete()

`delete()` results in SQL `DELETE`

`delete()`会导致SQL`DELETE`语句的执行

```java
Session session = HibernateUtils.getSession();
Transaction tx = session.beginTransaction();

User user = (User) session.get(User.class, 1);
session.delete(user);

tx.commit();
// Because getCurrentSession(), so no need session.close();
```

## find()

No `find()` in current version! We must use `Query` or `Criteria` to achieve it.

在当前版本不再有`find()`！ 我们需要使用`Query`或者`Criteria`来实现它。

## flush()

`session.flush()` forces Hibernate to **synchronize the in-memory state of the Session with the database**. 

`session.flush()`强制Hibernate**将内存中的状态同步到数据库**。

By default, Hibernate will flush changes automatically for you:

默认情况下，Hibernate将会自动刷新：

* Before some query executions
	
	在一些查询之前

* When a transaction is committed

	当事务提交的时候

We could also set flush mode, by default is AUTO:

我们同样也可以设置刷新模式，默认情况是AUTO：

```java
// The Session is flushed before every query.
session.setFlushMode(FlushMode.ALWAYS);
// The Session is sometimes flushed before query execution in order to ensure that queries never return stale state.
session.setFlushMode(FlushMode.AUTO);
// The Session is flushed when Transaction.commit() is called. 
session.setFlushMode(FlushMode.COMMIT);
// The Session is only ever flushed when Session.flush() is explicitly called by the application.
session.setFlushMode(FlushMode.MANUAL);
```

Be careful, **`setFlushMode()` must be invoked before `session.beginTransaction()`**.

需要注意，**`setFlushMode()`必须在`session.beginTransaction()`之前被调用**。

## Ref

- [Tutorialspoint - Point](http://www.tutorialspoint.com/hibernate/hibernate_sessions.htm)
- [Hibernate API](https://docs.jboss.org/hibernate/orm/3.2/api/org/hibernate/Session.html)
- [Stackoverflow save() vs persist()](http://stackoverflow.com/questions/5862680/whats-the-advantage-of-persist-vs-save-in-hibernate)