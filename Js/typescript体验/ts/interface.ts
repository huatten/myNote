/**
 * 高级类型入门
 */
//通过基础类型组合而来的, 我们可以叫他高级类型. 包含: 交叉类型 / 联合类型 / 接口等等

/**
   * 接口(interface)
   * 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，
   * 而具体如何行动需要由类（classes）去实现
  */
{
  interface Person {
    name: string;
    age: number;
  }
  let jack: Person = {
    name: "Jack",
    age: 18
  }
  //我们定义了一个接口 Person，接着定义了一个变量 jack，它的类型是 Person。这样，我们就约束了 jack 的形状必须和接口 Person 一致。
  //接口一般首字母大写！！
  //定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的！！！
  //可见，赋值的时候，变量的形状必须和接口的形状保持一致。
}
{
  /**
   * 可选属性
   * 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
   * 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
   * 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
   */
  interface Person {
    name: string;
    age: number;
    address?: string;
  }
  let jack: Person = {
    name: "Jack",
    age: 18
  }

  //但是不允许添加未定义的属性：
  interface Animal {
    name: string;
    age?: number;
  }
  let cat: Animal = {
    name: "Cat",
    age: 18,
    weight: 4 //Type '{ name: string; age: number; weight: number; }' is not assignable to type 'Animal'.Object literal may only specify known properties, and 'weight' does not exist in type 'Animal'.
  }
}

{
  /**
   * 任意属性
   */
  //如果 Person 带有上面定义的类型的name和age属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它
  //使用 [propName: string] 定义了任意属性取 string 类型的值
  interface Person {
    name: string,
    age?: number,
    [propName: string]: any
  }
  let jack: Person = {
    name: "Jack",
    age: 18,
    gender: "male"
  }

  //需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集！！！！！
  interface Animal {
    name: string;
    age?: number; //Property 'age' of type 'number' is not assignable to string index type 'string'.
    [propName: string]: string;
  }
  let cat: Animal = {
    name: "Cat",
    age: 18,
    love: "fish"
  }
  //任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

  //因此，一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
  interface Student {
    name: string;
    age?: number;
    [propName: string]: string | number;
  }
  let tom: Student = {
    name: "Tom",
    age: 18,
    gender: "male"
  }
}

{
  /**
   * 只读属性
   */
  //有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
  }

  let jack: Person = {
    id: 9527,
    name: "Jack",
    age: 18,
    gender: "male"
  }
  jack.id = 132;  //error  Cannot assign to 'id' because it is a read-only property
}

{
  /**
   * 函数类型
   */
  //接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

  // 声明接口
  interface SearchFn {
    (source: string, substring: string): boolean;
  }
  // 声明函数遵循接口定义
  const mySearch: SearchFn = (source: string, substring: string): boolean => {
    const res = source.search(substring);
    return res > -1;
  }
}

{
  /**
   * 可索引的类型
   */
  //与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，
  //比如a[10]或ageMap["daniel"]。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
  interface StringArray {
    [index: number]: string
  }
  const myArray: StringArray = ["a", "b"];
  const myStr: string = myArray[0]; //"a"
}

{
  /**
   * 类类型的实现接口  使用关键字 implements
   */
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
    read(name: string): void;
    say(age: number): number;
  }
  class Jack implements Person {
    id = 9527;
    name = "Jack";
    age = 18;
    love = "sleep";
    read(name: string) {
      console.log(name);
    }
    say(age: number) {
      return age;
    }
  }
}

{
  /**
   * 接口继承
   */
  //接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
  //一个接口可以继承多个接口，创建出多个接口的合成接口。
  interface Person {
    name: string;
    age: number;
  }
  interface Gender {
    sex: string;
  }
  interface Student extends Person, Gender {
    score: number;
  }
  let jack = <Student>{};
  jack.name = "Jack";
  jack.age = 18;
  jack.sex = "male";
  jack.score = 100;
}

{
  /**
   * 混合类型
   */
  //接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }
  function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
  }
  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 10;
}