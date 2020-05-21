{
  /**
   * 有名函数和匿名函数
   */
  function sum(a: number, b: number): number {
    return a + b;
  }
  let add = function (a: number, b: number): number {
    return a + b;
  }
}

{
  /**
   * 为函数定义类型
   * 我们可以给每个参数添加类型之后再为函数本身添加返回值类型
   * TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。
   */
  function mySum(a: number, b: number): number {
    return a + b;
  }
  let myAdd = function (a: number, b: number): number {
    return a + b;
  }
}

{
  /**
   * 书写完整的函数类型
   * 函数类型包含两部分：参数类型和返回值类型.当写出完整函数类型的时候，这两部分都是需要的。
   */
  let myAdd: (a: number, b: number) => number = function (a: number, b: number): number { return a + b }

  //我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性
  let mySum: (baseValue: number, increment: number) => number = function (a: number, b: number): number { return a + b }
}

{
  /**
   * 推断类型
   */
  let myAdd: (baseValue: number, increment: number) => number = function (a, b) { return a + b };
}

{
  /**
   * 可选参数和默认参数
   * 传递给一个函数的参数个数必须与函数期望的参数个数一致。
   */
  function buildName(firstName: string, lastName: string): string {
    return firstName + "" + lastName
  }
  let res1 = buildName("Jack") //error  An argument for 'lastName' was not provided.
  let res2 = buildName("Jack", "Ma", "Sr.")  //error  Expected 2 arguments, but got 3.
  let res3 = buildName("Jack", "Ma")

  //JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 
  //在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。
  //可选参数必须跟在必须参数后面，也就是说：可选参数后面不允许再出现必需参数了
  function createName(firstName: string, lastName?: string): string {
    if (lastName) {
      return firstName + "" + lastName
    } else {
      return firstName
    }
  }
  let name1 = createName("Jack")
  let name2 = createName("Jack", "Ma", "Sr.")  //error  Expected 2 arguments, but got 3.
  let neme3 = createName("Jack", "Ma")
}

{
  /**
   * 剩余参数
   * 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 
   * 在JavaScript里，你可以使用 arguments来访问所有传入的参数。
   * 在TypeScript里，你可以把所有参数收集到一个变量里
   */
  function buildNames(firstName: string, ...restNames: string[]): string {
    return firstName + "" + restNames.join(" ")
  }
  let name = buildNames("Jack", "Ma", "Kd", "Curry")
}

{
  /**
   * 用接口定义函数的形状
   */
  interface NameFunc {
    (firstName: string, lastName: string): string;
  }
  let myName: NameFunc;
  myName = function (firstName: string, lastName: string) {
    return firstName + "" + lastName;
  }
}

{
  /**
   * 重载
   * 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
   * TypeScript 中的函数重载没有任何运行时开销。它只允许你记录希望调用函数的方式，并且编译器会检查其余代码。
   * 比如实现 数字123 反转 成为321   字符串hello 反转成为olleh
   * 可直接使用联合类型，然而这样有一个缺点，就是不能够精确的表达
   */
  function fnReverse(x: string): string;
  function fnReverse(x: number): number;
  function fnReverse(x: string | number): string | number {
    if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    }
  }
}