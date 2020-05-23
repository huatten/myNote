//类型兼容性用于确定一个类型是否能赋值给其他类型

{
  /**
   * 基本规则： 如果x要兼容y，那么y至少具有与x相同的属性
   * 这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 
   * 在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
   * y有个额外的from属性，但这不会引发错误。 只有目标类型（这里是Name）的成员会被一一检查是否兼容。
   */
  interface Name {
    name: string
  }
  let x: Name;
  // y's inferred type is { name: string; location: string; }
  let y = { name: "TypeScript", from: "microsft" }
  x = y

  //检查函数参数
  function greet(n: Name) {
    console.log('Hello, ' + n.name);
  }
  greet(y);
}

{
  /**
   * 比较函数
   */
  let x = (a: number) => 0;
  let y = (b: string, s: string) => 0;
  y = x;  //OK     x的每个参数在y中都能找到对应的参数，所以允许赋值。
  x = y; //Error  y有个必需的第二个参数，但是x并没有，所以不允许赋值
}

{
  /**
   * 可选参数和剩余参数
   * 可选的（预先确定的）和 Rest 参数（任何数量的参数）都是兼容的
   */
  let foo = (x: number, y: number) => { };
  let bar = (x?: number, y?: number) => { };
  let bas = (...args: number[]) => { };
  foo = bar = bas;
  bas = bar = foo;
}

{
  /**
   * 枚举
   * 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
   * 不同枚举类型之间是不兼容的
   */
  enum Status {
    Ready,
    Waiting
  }
  let status = Status.Ready;
  let num = 0;

  status = num;
  num = status;

  //来自于不同枚举的枚举变量，被认为是不兼容的
  enum Type {
    Animal,
    Person
  }
  enum Color {
    Red,
    Blue,
    Green
  }
  let type = Type.Animal;
  let color = Color.Blue;

  //type = color;  Error
}

{
  /**
   * 类
   * 仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查
   */
  class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
  }
  class Size {
    feet: number;
    constructor(meters: number) { }
  }
  let a: Animal;
  let s: Size;

  a = s; //ok
  s = a; //ok

  //私有的和受保护的成员必须来自于相同的类
  class Person {
    protected feet: number;
  }
  class Teacher extends Person { };
  let p: Person;
  let t: Teacher;

  p = t; //ok
  t = p; //ok

  class Dog {
    protected feet: number;
  }
  let d: Dog;

  p = d;  //error
  d = p;  //error
}