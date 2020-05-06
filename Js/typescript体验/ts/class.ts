{
  /**
   * 类
   */
  class Greeter {
    greeting: string
    constructor(message: string) {
      this.greeting = message
    }
    greet() {
      return "Hello" + this.greeting
    }
  }
  let greeter = new Greeter("Ts")
}

{
  /**
   * 继承：类从基类中继承了属性和方法
   *  Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 
   * 派生类通常被称作 子类，基类通常被称作 超类。
   */
  class Animal {
    move(distance: number = 0) {
      console.log(`Animal moved ${distance}m`)
    }
  }
  class Dog extends Animal {
    bark() {
      console.log("wang!")
    }
  }
  const dog = new Dog()
  dog.bark()
  dog.move(100)
}

{
  /**
   * super()
   * 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。
   * 在构造函数里访问 this的属性之前，我们 一定要调用 super()。
   */
  class Animal {
    name: string
    constructor(theName: string) {
      this.name = theName
    }
    move(distance: number = 5) {
      console.log(`${this.name} moved ${distance}m.`)
    }
  }
  class Snack extends Animal {
    constructor(name: string) {
      super(name)
    }
    move(distance: number = 5) {
      super.move(distance)
    }
  }
  class Hourse extends Animal {
    constructor(name: string) {
      super(name)
    }
    move(distance: number = 45) {
      super.move(distance)
    }
  }
  let sam = new Snack("Sammy")
  let tom: Animal = new Hourse("Tommy")

  sam.move()
  tom.move(34)
}

{
  /**
   * public
   * TypeScript里，成员都默认为 public
   */
  class Animal {
    public name: string
    public constructor(theName: string) {
      this.name = theName
    }
    public move(distance: number = 10) {
      console.log(`${this.name} moved ${distance}m.`)
    }
  }
}

{
  /**
   * private
   * 当成员被标记成 private时，它就不能在声明它的类的外部访问
   */
  class Animal {
    private name: string
    constructor(theName: string) {
      this.name = theName
    }
  }
  const cat = new Animal("Cat");
  console.log(cat.name) //Property 'name' is private and only accessible within class 'Animal'
}

{
  /**
   * protected
   * protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
   */
  class Animal {
    protected name: string
    constructor(theName: string) {
      this.name = theName
    }
  }
  class Dog extends Animal {
    private food: string
    constructor(name: string, food: string) {
      super(name)
      this.food = food
    }
    public getElevator() {
      return `name is ${this.name}, like eat ${this.food}`
    }
  }
  let wc = new Dog("wangcai", "bone")
  console.log(wc.getElevator())
  console.log(wc.name) //Property 'name' is protected and only accessible within class 'Animal' and its subclasses
}
{
  class Animal {
    protected name: string
    //构造函数也可以被标记成 protected
    protected constructor(theName: string) {
      this.name = theName
    }
  }
  class Dog extends Animal {
    private food: string
    constructor(name: string, food: string) {
      super(name)
      this.food = food
    }
    public getElevator() {
      return `name is ${this.name}, like eat ${this.food}`
    }
  }
  let wc = new Dog("wangcai", "bone")
  let hc = new Animal("cat"); //Constructor of class 'Animal' is protected and only accessible within the class declaration
}

{
  /**
   * readonly
   * 使用 readonly关键字将属性设置为只读的。 
   * 只读属性必须在声明时或构造函数里被初始化。
   */
  class Octoptus {
    readonly name: string
    readonly numberOfLegs: number = 9
    constructor(theName: string) {
      this.name = theName
    }
  }
  let dat = new Octoptus("Man whit 8 legs")
  dat.name = "hahhahaa" //Cannot assign to 'name' because it is a read-only property

}

{
  //参数属性可以方便地让我们在一个地方定义并初始化一个成员
  class Octoptus {
    readonly numberOfLegs: number = 9;
    constructor(readonly name: string) {
      this.name = name
    }
  }
}

{
  /**
   * getter setter
   * TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
   */
  let passcode = "sceret passcode"
  class Animal {
    private _name: string
    get name(): string {
      return this._name
    }
    set name(newName: string) {
      if (passcode && passcode == "secret passcode") {
        this._name = newName
      } else {
        console.log("Unauthorized!")
      }
    }
  }
  let ani = new Animal()
  ani.name = "Dogs"
}

{
  /**
   * static 静态属性
   */
  class Gird {
    static origin = { x: 0, y: 0 }
    constructor(public scale: number) { }
    calculateDistanceFromOrigin(point: { x: number; y: number }) {
      let xDist = (point.x - Gird.origin.x)
      let yDist = (point.y - Gird.origin.y)
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
    }

  }
  let gird1 = new Gird(1.0)  //1x scale
  let grid2 = new Gird(5.0)  //5x scale
  console.log(gird1.calculateDistanceFromOrigin({ x: 10, y: 20 }))
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 20 }))
}

{
  /**
   * abstract 抽象类
   * 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
   */
  abstract class Ainmal {
    abstract makeSound(): void
    move(): void {
      console.log("roaming...")
    }
  }
}

{
  /**
   * 构造函数
   */
  class Greeter {
    greeting: string
    constructor(message: string) {
      this.greeting = message
    }
    greet() {
      return "Hello, " + this.greeting;
    }
  }
  let greeter: Greeter
  greeter = new Greeter("wworld")
  greeter.greet()
}

{
  /**
   * interface and class
   */
  class Point {
    x: number
    y: number
  }
  interface Point3d extends Point {
    z: number
  }
  let point3d: Point3d = { x: 1, y: 2, z: 3 }
}