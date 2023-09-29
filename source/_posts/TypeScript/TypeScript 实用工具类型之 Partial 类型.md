---
layout: _post
title: TypeScript 实用工具类型之 Partial 类型
date: 2023-09-28 23:23:12
categories: TypeScript
tags: [前端, TypeScript]
---
在本文中，我们将使用`Partial<>`来讨论 TypeScript 中的对象类型转换。这是 TypeScript 实用工具类型系列的第三部分。
在上一篇文章（[TypeScript 实用工具类型Omit类型](https://www.yuque.com/geminglu/web/ykexs5ltnnr5d2tg)），我们介绍了一个示例，在该示例中，我们通过省略基本类型`SuperbUser`的一个属性（使用`Omit<>`）来派生`Subscriber`类型。
在这篇文章中，我们将考虑一个 TypeScript Partial<> 的例子，通过修改我们的`Subscriber`类型来假设一个更现实的场景。
## 1.场景概述
对于我们的博客，我们会有不允许点赞或评论文章的 GuestUser。我们将允许 Subscriber 点赞和评论。所以，情况是这样的：

- GuestUser 必须用他们的 email 注册并成为 Subscriber 。
- 他们会在发送到自己邮箱的 email 中收到设置 password 的链接。
- 然后他们能够设置他们的 password，firstName 和 lastName。


在这种情况下，我们之前派生的 Subscriber 类型不能以我们想要的方式交付我们的需求：
```typescript
type Subscriber = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: '1.2.3',
  username: 'xiaan',
  email: 'xiaan@163.com'
};

console.log(subscriber);
/*
From TypeScript Error:
"Type '{ userId: number; macAddress: string; username: string; email: string; }' is missing the following properties from type 'Subscriber': password, firstName, lastName"

From console:
{
  "userId": 4,
  "macAddress": "1.2.3",
  "username": "xiaan",
  "email": "xiaan@163.com"
}
```

TypeScript 指出`subscriber`与`Subscriber`类型不一致。这是因为它默认将所有字段设置为必需的。如果我们设置`password`，`firstName`和`lastName`为可选，则不会报错：
```typescript
type Subscriber = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password?: string,
  firstName?: string,
  lastName?: string,
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: '1.2.3',
  username: 'xiaan',
  email: 'xiaan@163.com'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "1.2.3",
  "username": "xiaan",
  "email": "xiaan@163.com"
}
```
但是这需要首先手动定义`Subscriber`，然后再设置各个可选属性。在实际的 API 中，手动定义形状并不是一个好主意。
## 2.Partial
我们希望消除这种麻烦，并更轻松地从`Omit<>`返回的类型中完成此工作。所以我们要做的是用`Partial`将返回类型的所有属性设置为可选的：
```typescript
type SuperbUser = {
  userId: number,
  macAddress: string,
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  roles: ('Admin' | 'Editor' | 'Author')[]
};

type Subscriber = Partial<Omit<SuperbUser, 'roles'>>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: '1.2.3',
  username: 'xiaan',
  email: 'xiaan@163.com'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "1.2.3",
  "username": "xiaan",
  "email": "xiaan@163.com"
}
```
现在我们可以自由的为`password`，`firstName`和`lastName`赋值。
```typescript
subscriber.password = '12345678';
subscriber.firstName = 'an';
subscriber.lastName = 'xia';

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "1.2.3",
  "username": "xiaan",
  "email": "xiaan@163.com",
  "password": "12345678",
  "firstName": "an",
  "lastName": "xia"
}
```
但是，就像之前一样，如果我们添加了不属于`Subscriber`的属性，TypeScript 会再次报错：
```typescript
subscriber.roles = ['Reader', 'Commenter'];

console.log(subscriber);
// Property 'roles' does not exist on type 'Partial<Omit<SuperbUser, "roles">>'.
```
因此，使用 TypeScript 派生`partial`类型的好处包括它对对象属性的部分赋值的支持，这是 JavaScript 允许的，而默认 TypeScript 不允许。
## 3.使用 Interface
如果我们使用基本`SuperbUser`类型的接口，我们会得到相同的结果：
```typescript
interface SuperbUser {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ('Admin' | 'Editor' | 'Author')[]
};

type Subscriber = Partial<Omit<SuperbUser, 'roles'>>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: '1.2.3',
  username: 'xiaan',
  email: 'xiaan@163.com'
};

subscriber.password = '12345678';
subscriber.firstName = 'an';
subscriber.lastName = 'xia';

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "1.2.3",
  "username": "xiaan",
  "email": "xiaan@163.com",
  "password": "12345678",
  "firstName": "an",
  "lastName": "xia"
}
*/
```
我们还可以将`Omit<>`的返回类型重构为中介类型`StrictSubscriber`，并将其作为 TypeScript Partial 的参数传递：
```typescript
type StrictSubscriber = Omit<SuperbUser, 'roles'>;
type Subscriber = Partial;
```
## 4. 小结
在这篇文章中，我们介绍了使用实用转换器 partial 的使用，不过手动将类型的某些属性设置为可选更可取，特别是在处理从 API 返回的类型时。
