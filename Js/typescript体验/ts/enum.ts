/**
 * 枚举类型
 */

{
  /**
   * 数字枚举
   * 我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长 默认从 0 开始
   */
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }
  function run(direction: Direction): void { }
  run(Direction.Up);
}

{
  /**
   * 字符串枚举
   * 字符串枚举没有自增长的行为，字符串枚举可以很好的序列化
   * 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字
   */
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
}

{
  /**
   * 异构枚举
   * 枚举可以混合字符串和数字成员
   * 除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做。
   */
  enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES"
  }
}

{
  /**
   * 常数枚举
   * 常数枚举是使用 const enum 定义的枚举类型
   * 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
   */
  const enum Direction {
    Up,
    Down,
    Left,
    Right
  }
  //上述编译结果：  var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
  //假如包含了计算成员，则会在编译阶段报错： const enum Color { Red, Green, Blue = "blue".length };
}

{
  /**
   * 外部枚举
   * 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
   */

  declare enum Direction {
    Up,
    Down,
    Left,
    Right
  }
  declare const enum Directions {
    Up,
    Down,
    Left,
    Right
  }
}