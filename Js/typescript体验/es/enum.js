/**
 * 枚举类型
 */
{
    /**
     * 数字枚举
     * 我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长 默认从 0 开始
     */
    var Direction = void 0;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    function run(direction) { }
    run(Direction.Up);
}
{
    /**
     * 字符串枚举
     * 字符串枚举没有自增长的行为，字符串枚举可以很好的序列化
     * 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字
     */
    var Direction = void 0;
    (function (Direction) {
        Direction["Up"] = "UP";
        Direction["Down"] = "DOWN";
        Direction["Left"] = "LEFT";
        Direction["Right"] = "RIGHT";
    })(Direction || (Direction = {}));
}
{
    /**
     * 异构枚举
     * 枚举可以混合字符串和数字成员
     * 除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做。
     */
    var BooleanLikeHeterogeneousEnum = void 0;
    (function (BooleanLikeHeterogeneousEnum) {
        BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
        BooleanLikeHeterogeneousEnum["Yes"] = "YES";
    })(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
}
{
    /**
     * 常数枚举
     * 常数枚举是使用 const enum 定义的枚举类型
     * 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
     */
    var Direction = void 0;
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));
    //上述编译结果：  var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    //假如包含了计算成员，则会在编译阶段报错： const enum Color { Red, Green, Blue = "blue".length };
}
{
}
