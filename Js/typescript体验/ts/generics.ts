/**
 * 泛型：不预先确定的数据类型，具体类型在使用时才能确定
 * 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：
 * 类的实例成员
 * 类的方法
 * 函数参数
 * 函数返回值
 */

{
  function log<T>(val: T): T {
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
  function print<T>(val: T): T {
    return val;
  }
  interface Print<T> {
    (val: T): T;
  }
  let myPrint: Print<number> = print;
  myPrint(100);
}