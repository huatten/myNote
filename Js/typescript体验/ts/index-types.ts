//keyof
//使用索引类型，编译器就能够检查使用了动态属性名的代码。 
//例如，一个常见的JavaScript模式是从对象中选取属性的子集。

{
  let obj = {
    a: 1, b: 2, c: 3
  }
  function getValue(obj: any, keys: string[]): any {
    return keys.map(key => obj[key])
  }
  getValue(obj, ['a', 'b']);  // 1 , 2
  getValue(obj, ['e', 'f']);  // undefined, undefined  并未报错
}

{
  interface Obj {
    a: number,
    b: number,
    c: number
  }
  // keyof T => 索引类型查询操作符  对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。
  //在例子中就是 Obj 的属性名 即： ['a', 'b', 'c']
  let key: keyof Obj;

  //T[K] => 索引访问操作符  表示对象T的属性K所表示的类型   T[K][] 表示变量T取属性K的值的数组
  let value: Obj['a'];

  //T extends K  => 泛型约束  泛型变量可以通过继承某些类型获取某些属性
  function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
  }
  let obj = {
    a: 1, b: 2, c: 3
  }
  getValues(obj, ['a', 'b']);  // 1 , 2
  getValues(obj, ['e', 'f']);  // Error

  //首先看泛型，这里有T和K两种类型，根据类型推断，第一个参数obj就是obj，类型会被推断为 Obj
  //而第二个数组参数的类型推断（K extends keyof T），keyof关键字可以获取T，也就是Obj的所有属性名，即['a', 'b']。
  //而extends关键字让泛型K继承了Person的所有属性名，即['a', 'b']
  //这三个特性组合保证了代码的动态性和准确性
}