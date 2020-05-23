{
  /**
   * 在有些没有明确指出类型的地方，类型推论会帮助提供类型
   * 变量x的类型被推断为数字
   * 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时
   */
  let x = 3;  //let x: number
}

{
  /**
   * 为了推断x的类型，我们必须考虑所有元素的类型
   * 这里有两种选择： number和null
   * 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
   */
  let x = [0, 1, null];  //let x: number[]
}

{
  /**
   * 我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，因此不能推断出这个结果
   * 没有找到最佳通用类型的话，类型推断的结果为联合数组类型  let zoo: (Elephant | Rhino | Snake)[]
   */
  class Rhino { }
  class Elephant { }
  class Snake { }
  let zoo = [new Rhino(), new Elephant(), new Snake()];
  let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
}

{
  /**
   * 函数返回类型
   * 返回类型能被 return 语句推断，如下所示，推断函数返回为一个数字
   * function add(a: number, b: number): number
   */
  function add(a: number, b: number) {
    return a + b;
  }
}

{
  /**
   * 赋值
   * 函数参数类型/返回值也能通过赋值来推断
   * add 的类型是 Adder，他能让 add 的参数 a、b 是 number 类型
   */
  type Adder = (a: number, b: number) => number;
  let add: Adder = (a, b) => {
    //a = "hello"; Error：不能把 'string' 类型赋值给 'number' 类型
    return a + b;
  }
}

{
  /**
   * 结构化
   * 这些简单的规则也适用于结构化的存在（对象字面量)
   * 在下面这种情况下 obj 的类型被推断为 { a: number, b: number }：
   */
  const obj = {
    a: 123,
    b: 456
  }
  //obj.a = 'xxx';   Error：不能把 'string' 类型赋值给 'number' 类型

  const arr = [1, 2, 3]
  //arr[0] = 'a';    Error：不能把 'string' 类型赋值给 'number' 类型
}

{
  /**
   * 解构
   */
  const obj = {
    a: 123,
    b: 456
  }
  let { a } = obj;
  //a = 'abc';    Error：不能把 'string' 类型赋值给 'number' 类型

  const arr = [1, 2, 3];
  let [x, y, z] = arr;
  //x = 'hi';     Error：不能把 'string' 类型赋值给 'number' 类型

}

{
  /**
 * noImplicitAny
 * 选项 noImplicitAny 用来告诉编译器，当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 any 类型），你可以：
 * 1.通过显式添加 :any 的类型注解，来让它成为一个 any 类型；
 * 2.通过一些更正确的类型注解来帮助 TypeScript 推断类型。
 */

}