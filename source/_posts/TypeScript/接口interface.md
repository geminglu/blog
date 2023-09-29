---
layout: _drafts
title: 接口interface
date: 2023-09-28 23:54:33
categories: TypeScript
tags: [前端, TypeScript]
---
## 1.接口的定义
在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到了限制和规范作用。接口定义了某些类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里面的方法实现细节，它只规定这些类里必须提供某些方法，提供这些方法的类可以满足实际需要。typescript中的接口类似于Java，同时还增加了跟灵活的接口类型，包括属性、函数、可索引和类等。
## 2.接口类型

   - 属性类型接口
   - 函数类型接口
   - 可索引接口
   - 类类型接口
   - 接口的继承
## 3.示例
### 属性类接口
定义JSON规范
```typescript
interface FullName {
  readonly id?: number;
  user: string
  password: string
  age?: number
}
function prontName(name: FullName): void {
  console.log(name.user, name.password, name.age || '');
}
let Name: FullName = {
  id: 1,
  user: "张三",
  password: "123"
}
// prontName("zhansan")    // 错误写法 必须传入对象
// prontName({user:"zhansan",password:123})    // 错误写法 password必须是string类型
// prontName({user:"lisi"}) // 错误写法 必须和接口定义的一样不可缺少属性
// prontName({user:"wangwu",password:"123",sex:true})  // 错误写法 sex不在FillName中
prontName({ user: "张三", password: "123" })  // 正确写法,age可传可不传
prontName({ user: "张三", password: "123", age: 18 })  // 正确写法
// Name.id = 2  // 错误写法，id是只读的不可以修改
```
### 函数类型接口
约束函数的形参和返回值
```typescript
interface sumType {
  (a: number, b: number): number
}
// let sum: sumType = function (a, b) {
//     return "a+b+" + a + b   // 错误写法，函数必须返回number类型
// }
// console.log(sum(1, 2));
// let sum: sumType = function (a, b) {
//     return "a+b+" + a + b
// }
// console.log(sum(1, "2"));   // 错误写法，函数的实参波许是string类型
// let sum: sumType = function(a:string, b:number):number {    // 错误写法，函数中定义的形参和返回值必须和接口中定义的一直
//     return a + b
// }
// console.log(sum(1, 2));
let sum: sumType = function (a:number, b:number):number {
  return a + b;
}
console.log(sum(1,2)); // 正确写法
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
return x + y;
};
let user: (name: string) => string = function (name){
  return name
}
console.log(mySum(3, 4));
console.log(user("张三"));  // 正确写法
```
>  注意：这里的'=>'不要和ES6中的'=>'混淆了，在 TypeScript 的类型定义中，'=>'用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。在ES6中'=>'叫做箭头函数。

### 可索引接口
对数组、对象进行约束
对数组的约束
```typescript
interface userArr{
  [index: number]: string //数组的index都是number类型
}
// let arr:userArr = ["张三", 23]   // 错误写法，数组的值必须都是string类型
let arr:userArr = ["张三", "李四"]
```

对对象的约束
```typescript
interface userObj{
  [index: string]: number // 对象的可以是string类型
}
// let Obj:userObj = {name:"zhangsan"}  // 错误写法，对象的value必须是number类型
let Obj:userObj = {age: 123}    // 正确写法
```
### 类类型接口
```typescript
interface Animal{
  name: string
  hobby(str: string): void
}
// class person implements Animal{  // 错误写法，必须有name属性
//     user: string
//     constructor(name: string){
//         this.user = name
//     }
//     hobby(str: string){
//         console.log(this.user + "喜欢" + str || "篮球");
//     }
// }
// class person implements Animal{
//     name: string
//     constructor(name: string){
//         this.name = name
//     }
//     hobby(str: number){  // 错误写法，hobby参数类型必须是string类型
//         console.log(this.name + "喜欢" + str || "篮球");
//     }
// }
class person implements Animal{
  name: string
  constructor(name: string){
    this.name = name
  }
  hobby(str: string){
    console.log(this.name + "喜欢" + str || "篮球");
  }
}
// 正确写法
const Person = new person("张三")
Person.hobby("打游戏")
```
### 接口的继承
TS中的继承与ES6中的class继承类似，子接口可以继承父接口使用父接口定义的规则
```typescript
interface dom {
  move(): void;
}
interface Human extends dom {
  name: string;
  age: number;
}
// let jack: Human = { // 错误写法，因为Human接口继承了dom接口所以move不可以缺少
//     // age: 18,
//     name: 'Jack',
// }
let jack: Human = {
  age: 18,
  name: 'Jack',
  move() { console.log('move') }
}
// 正确的写法
```

