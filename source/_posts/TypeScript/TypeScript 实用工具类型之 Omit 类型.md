---
layout: _post
title: TypeScript 实用工具类型之 Omit 类型
date: 2023-09-28 23:23:12
categories: TypeScript
tags: [前端, TypeScript]
---
在本文中，我们将讨论 TypeScript 中使用`Omit<>`的对象类型转换。这是 TypeScript 实用工具类型系列的第二部分。
在上一篇文章（[TypeScript 实用工具类型之 Pick 类型](https://www.yuque.com/geminglu/web/tub1ueqfotbudiub)）中，我们介绍了一个例子，在这个例子中，我们通过 `Pick<>`从基本类型`SuperbUser`中选择一些属性来派生一个`GuestUser`类型。之后暗示过，如果要选择的属性数量大于被丢弃的属性数量，那么选择就会变得不那么方便。在这种情况下，我们应该使用`Omit<>`。
在这篇文章中，我们将通过为`Subscriber`实体创建一个类型来考虑一个`Omit<>`的例子。
## 1.示例
像`Pick<>`一样，`Omit<>`接受基类型作为第一个参数，接受要省略的键的联合类型作为第二个参数，并返回排除这些属性的派生类型。
回过头来看 ERD，`Subscriber`实体具有与`SuperbUser`相同的所有属性——除了 `roles`：
![](/images/df060b0f2d93412b3f9fb9363b565243.png)
从`SuperbUser`派生`Subscriber`类型显然需要我们只忽略`roles`属性，而不是选择其他所有属性：
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

type Subscriber = Omit<SuperbUser, 'roles'>;
```
因此，在本例中，TypeScript 的`Omit<>`比`Pick<>`更方便。我们现在可以创建一个`subscriber`对象，它的字段中删除了`roles`属性:
```typescript
const subscriber: Subscriber = {
  userId: 4,
  macAddress: '132546',
  username: 'xiaan',
  email: 'xiaan@163.com',
  password: '12345678',
  firstName: 'an',
  lastName: 'xia'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "132546",
  "username": "xiaan",
  "email": "xiaan@163.com",
  "password": "12345678",
  "firstName": "an",
  "lastName": "xia"
}
*/

console.log(subscriber.roles); // undefined
```
现在，让我们试着向 subscriber 添加 roles属性：
```typescript
subscriber.roles = ['Reader', 'Commenter']; // Property 'roles' does not exist on type 'Subscriber'.

console.log(subscriber.roles); // ["Reader", "Commenter"]
```
TypeScript 抛出一个错误：
```typescript
// Property 'roles' does not exist on type 'Subscriber'.
```
## 2. 应用于 Interface
就像在`Pick<>`中一样，我们可以使用`SuperbUser`的接口，结果是一样的：
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

type Subscriber = Omit<SuperbUser, 'roles'>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: '132546',
  username: 'xiaan',
  email: 'xiaan@163.com',
  password: '12345678',
  firstName: 'an',
  lastName: 'xia'
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "132546",
  "username": "xiaan",
  "email": "xiaan@163.com",
  "password": "12345678",
  "firstName": "an",
  "lastName": "xia"
}
*/

console.log(subscriber.roles); // undefined
```
## 3. 谨慎使用
与 Pick<> 一样，Typescript Omit 的第二个参数也接受键的并集。因此，如果需要省略任何其他属性，可以使用操作符 | 将它们添加到第二个参数中：
```typescript
type Subscriber = Omit<SuperbUser, 'roles' | 'firstName' | ...>;
```
当需要省略的属性多于需要选取的属性时，应该避免使用`Omit<>`，而使用`Pick<>`。
## 4.小结
在本文中，我们通过一个示例深入研究了`Omit<>`，该示例通过从基本类型`SuperbUser`中省略一个属性来为 Subscriber 实体派生一个类型。我们看到，`Omit<>` 与`Pick<>`相反，当我们想从基类型中选取更多属性并较少省略时，`Omit<>`更加方便。
在下一篇文章中，我们将介绍使用`Partial`的对象类型转换。

