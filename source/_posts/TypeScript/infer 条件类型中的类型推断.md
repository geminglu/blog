---
layout: _page
title: infer 条件类型中的类型推断
date: 2024-04-18 11:48:31
categories: TypeScript
tags: [前端, TypeScript]
---


`infer` 关键字在条件类型中使用，用于从依赖于泛型参数的类型中推断（提取）泛型参数的类型。这允许您编写更灵活且可重用的类型定义。

例子一：

```ts
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

例子二：获取函数的返回类型

```ts
type returntpye<T> = T extends (...args: any) => infer R ? R : any;

type fn = (a: number, b: number) => string;
function pen() {
  return { a: 1, b: "2" };
}

type d = returntpye<fn>;
type r = returntpye<typeof pen>;
```

例子三：获取函数的第一个参数类型

```ts
type firstArgType<T> = T extends (first: infer R, ...args: any[]) => any
  ? R
  : any;

type fs = (a: string, b: number) => void;

type fst = firstArgType<fs>; // string

```
