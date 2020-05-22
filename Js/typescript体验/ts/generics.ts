/**
 * 泛型：不预先确定的数据类型，具体类型在使用时才能确定
 * 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：
 *  1.类的实例成员
 *  2.类的方法
 *  3.函数参数
 *  4.函数返回值
 * 泛型的优点：
 *  1.函数和类可以轻松支持多种类型，增强程序扩展性和复用性
 *  2.不必写多条函数重载，冗长的联合类型声明，增强代码可读性
 *  3.灵活控制类型之间的约束
 */

{
  /**
   * 非泛型函数的类型: let Show: (arg: any) => any;
   * 泛型函数的类型:  let Hide: <T>(arg: T) => T  类型参数T
   */
  function show(arg: any) {
    return arg;
  }
  let Show = show;   //let Show: (arg: any) => any;


  function hide<T>(arg: T): T {
    return arg;
  }
  let Hide = hide;
}

{
  function log<T>(val: T): T {
    console.log(val)
    //console.log(val.length) //Property 'length' does not exist on type 'T'.
    return val;
  }
  log<string>('a');
  log<string[]>(['a', 'b', 'c']);
  log(['a', 'b', 'c']);

}

{
  function echo<T>(val: T): T {
    return val;
  }
  type Echo = <T>(val: T) => T;
  let myEcho: Echo = echo;
}


{
  /**
   * 泛型接口
   * 使用含有泛型的接口来定义函数的形状 
   */
  interface Print<T> {
    (val: T): T;
  }
  function print<T>(val: T): T {
    return val;
  }
  let myPrint: Print<number> = print;
  myPrint(100);
}

{
  /**
   * 泛型类
   */
  class Log<T>{
    run(val: T) {
      console.log(val);
      return val;
    }
  }
  let logNum = new Log<number>();
  logNum.run(100);
  let logStr = new Log<string>();
  logStr.run('hello');
  let logObj = new Log<object>();
  logObj.run({ a: 0 })
}

{
  /**
   * 泛型约束
   * 我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。
   * 相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。
   * 为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束
   */
  interface lengthProp {
    length: number
  }
  function printf<T extends lengthProp>(arg: T): T {
    console.log(arg);
    console.log(arg.length);
    return arg;
  }
  printf(3) //现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
  printf('hello') //字符串包含lngth属性
  printf([1, 2, 3]) //数组包含length属性
  printf({ length: 100 }) //对象包含length属性
}

{
  /**
   * 泛型参数的默认类型
   * 我们可以为泛型中的类型参数指定默认类型
   * 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
   * 约束传入的第二个参数key必须存在于obj对象中该怎么实现呢？ key of 关键字
   */

  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  let x = { a: 1, b: 2, c: 3, d: 4 };
  getProperty(x, 'a');
  getProperty(x, 'o'); //Argument of type '"o"' is not assignable to parameter of type '"a" | "b" | "c" | "d"
}