---
layout: _drafts
title: TypeScript 实用工具类型之 Pick 类型
date: 2023-09-28 23:54:33
categories: TypeScript
tags: [前端, TypeScript]
---
我们将在本系列的每一篇文章中分别深入研究常用工具类型的详细信息。在本部分中，我们将介绍如何使用 Pick<Type, Keys> 从基类型或接口中挑选一些属性，从而从现有类型生成新类型。
## 1.什么是对象类型转换？
对象类型转换是指从表示对象的现有类型或接口生成修改的类型。这样的转换与一个或多个属性相关。
TypeScript 有各种实用工具，允许我们实现不同类型的对象类型转换，比如从已有的类型中选择或省略属性。
当我们需要一堆相似的对象类型时，对象类型转换变得非常方便，否则必须单独定义它们。我们不需要单独定义每个类型，而是可以利用 TypeScript 的转换实用工具，通过要求进行小的调整，从现有类型生成新类型。通过这种方式，我们能够使我们的类型可重用，并在模块系统的任何地方随时生成它们。
对象类型转换不同于使用`extends`关键字的对象接口继承，特别是因为继承只能在对象接口上使用，而不能用于类型。尽管转换也可以使用相同的实用工具应用于对象接口，但它们通常用于创建新的对象类型。
我们将基于下面的场景构建本系列中的示例，该场景涉及几种不同类型的用户。虽然重点将放在对象类型上，但我们也将把接口纳入讨论。
![](/images/fbb07fa6ee1d71247edd65a7dfdb344a.png)
假设我们有一堆用户实体，它们与博客的交互方式各不相同。基本上，不管他们是访客用户、订阅者、编辑器还是管理员等等。上面的 ERD 显示了它们在后台的类型。
现在，如果我们想为前端 API 调用建模这些类型，我们可以为每个用户类型手动编写 TypeScript 类型——这显然违反了 DRY（不要写重复的代码）原则，因为我们为每个用户类型重复了几个公共属性。我们也可以使用接口继承，但这不在本系列的讨论范围之内。
所以，我们要做的是使用 TypeScript 的转换实用工具从基类型中生成我们需要的类型。为了进行正确的转换，我们需要方便地设置正确的基类型，然后将其与生成目标类型的实用工具配对。
例如，在本文中，我们将考虑`Pick<Type, Keys>`的用例。

## 2.什么是 TypeScript Pick？
### 2.1 用 Pick<Type, Keys> 选择项
对于图中的上述实体，将`SuperbUser`作为基类型是有意义的，因为它包含了存在于所有其他用户类型上的所有属性。
我们将首先定义 SuperbUser 的接口：
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
```
现在，如果我们想从`SuperbUser`生成一个`GuestUser`类型，我们只需要选择`userId`,`macAddress`和 `username`属性：
```typescript
type GuestUser = Pick<SuperbUser, 'userId' | 'macAddress' | 'username'>;
```
TypeScript`Pick`将基类型作为第一个参数，将我们想要从基类型中选取的键的并集作为第二个参数。使用这两种类型来声明实际对象会给我们提供具有各自属性的对象：
```typescript
const me: SuperbUser = {
  userId: 1,
  macAddress: '1.2.3.4',
  username: '夏安',
  email: 'xiaan@163.com',
  password: '12345678',
  firstName: 'an',
  lastName: 'xia',
  roles: ['Admin', 'Editor', 'Author']
};

const guest: GuestUser = {
  userId: 2,
  macAddress: '4.3.2.1',
  username: 'xxx'
};

console.log(me.roles); // ["Admin", "Editor", "Author"]
console.log(guest.username); // "xxx"
console.log(guest.roles); // undefined
```
`guest.roles`在运行时未定义，在此之前 TypeScript 就会抛出一个错误：
```typescript
// Property 'roles' does not exist on type 'GuestUser'.
```
### 2.2 只能用来生成类型
注意，我们将 GuestUser 定义为具有 type 关键字的类型，尽管我们使用接口作为基。这是因为 TypeScript Pick<Type, Keys> 只能用来生成类型而不是接口。如果我们试图用 interface 来定义它，TypeScript 会抛出一个错误：
```typescript
interface GuestUser = Pick<SuperbUser, 'userId' | 'macAddress' | 'username'>;
// 'Pick' only refers to a type, but is being used as a value here.
```
### 2.3 从类型中选择
转换对于类型比接口更有用，因为我们不能继承类型。如果我们将`SuperbUser`接口转换为一种类型，我们会得到相同的结果：
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

type GuestUser = Pick<SuperbUser, 'userId' | 'macAddress' | 'username'>;

const me: SuperbUser = {
  userId: 1,
  macAddress: '1.2.3.4',
  username: '夏安',
  email: 'xiaan@163.com',
  password: '12345678',
  firstName: 'an',
  lastName: 'xia',
  roles: ['Admin', 'Editor', 'Author']
};

const guest: GuestUser = {
  userId: 2,
  macAddress: '4.3.2.1',
  username: 'xxx'
};

console.log(me.roles); // ["Admin", "Editor", "Author"]
console.log(guest.username); // "xxx"
console.log(guest.roles); // undefined
```
### 2.4 谨慎使用
现在，如果希望为`Subscriber`实体派生一个类型，则需要选择除`roles`之外的所有属性。但是，列出作为第二个参数传递的`union`类型中的所有属性是没有意义的：
```typescript
// 工具类型的选择不当
type Subscriber = Pick<SuperbUser, 'userId' | 'macAddress' | 'username' | 'email' | ... >;
```
相反，我们可以直接忽略实用程序类型中传递的角色。正如我们将在下一篇文章中看到的，我们可以用`Omit<Type, Keys>`来实现这一点。

## 3.小结
在这篇文章中，我们发现当我们有共享属性的对象时，对象类型转换允许我们从基类型派生出类似的类型。我们看了一个例子，它使用 TypeScript Pick<> 从一个更大的类型中选择一些属性来创建一个新类型。我们发现，类型转换可以同时接受接口和类型作为其基础，但是生成的类型不能声明为接口。
当我们有更多的属性可以选择而更少的属性可以省略则可以使用`Omit<>`（与 `Pick<>`相反的工具类型）。我们将在下一篇文章中讨论它。

