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