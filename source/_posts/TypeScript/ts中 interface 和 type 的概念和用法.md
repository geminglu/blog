---
layout: interface
title: ts中 interface 和 type 的概念和用法
date: 2023-09-29 00:02:31
categories: TypeScript
tags: [前端, TypeScript]
---
## 概念
type : 类型别名
概念：可以给一个或多个数据类型（string、number、…）取一个别名；
举例：
```typescript
type dataType=number (给一个)
type dataType=number | string | turple
```
interface：接口
概念：定义参数或方法的数据类型；
## 两者的异同
### 相同点
都可以描述一个对象或者函数
interface
```typescript
interface User {
  name: string;
  age: number;
}

interface SetUser {
  (name: string, age: number): void;
}
```
type
```typescript
type User = {
  name: string;
  age: number
}

type SetUser = (name: string, age: number): void;
```
2.interface 和 type 都可以拓展，并且两者并不是互相独立的，也就是说 interface 可以 extends type, type 也可以 extends interface. 虽然效果差不多，但是语法不同。
interface extends interface
```typescript
interface Name {
  name: string;
}

interface User extends Name {
  age: number;
}

type extends type

type Name = {
  name: string;
}

type User = Name & { age: number }
```
interface extends type
```typescript
type Name = {
  name: string;
};

interface User extends Name {
  age: number;
}
```
type extends interface
```typescript
interface Name {
  name: string;
}

type User = Name & {
  age: number;
};
```
### 不同点
1.类型别名可以用于其它类型 （联合类型、元组类型、基本类型（原始值）），interface 不支持
```typescript
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union(联合)
type PartialPoint = PartialPointX | PartialPointY;

// tuple(元祖)
type Data = [PartialPointX, PartialPointY];

//primitive(原始值)
type Name = Number;

// typeof 的返回值
let div = document.createElement("div");
type B = typeof div;
```
2.interface 可以多次定义 并被视为合并所有声明成员 type 不支持
```typescript
interface Point {
  x: number;
}
interface Point {
  y: number;
}

const point: Point = { x: 1, y: 2 };

interface User {
  name: string;
  age: number;
}

interface User {
  sex: string;
}
//User 接口为：
{
  name: string;
  age: number;
  sex: string;
}
```
3.type 能使用 in 关键字生成映射类型，但 interface 不行。
```typescript
type Keys = "firstname" | "surname";

type DudeType = {
  [key in Keys]: string;
};

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek",
};
```
4.默认导出方式不同
```typescript
// inerface 支持同时声明，默认导出 而 type 必须先声明后导出
export default interface Config {
  name: string;
}
// 同一个 js 模块只能存在一个默认导出哦
type Config2 = { name: string };
export default Config2;
```
5.type 可以使用联合类型和交集，interface 不能使用联合类型和交集组合。
```typescript
type TPersonA = {
    name: string
}
type TPersonB = {
    age: number
}
// 交集
type PartialPerson = TPersonA & TPersonB;
// 并集 联合类型
type PartialPerson = TPersonA | TPersonB;
```
type 其他骚操作
```typescript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>; right: Tree<T> };
```
## 总结
一般来说，能用 interface 实现，就用 interface，如果不能就用 type。

