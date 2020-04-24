/*
* 基础类型
  boolean number string object array Tuple enum any undefined null void never
  ⚠️注意：上面列举的类型，是ts中表示类型的关键字，其中 object 其实是包含 array/Tuple/enum，
         在ts的概念中，这叫做 类型兼容。如： let array: object = [12,34]
*/
{
    // 字面量：直接声明，而非new关键词实例化出来的
    var n = 123;
    var s = 'str';
    var o = { a: '1', b: '2' };
    //非字面量
    var N = new Number(123);
    var S = new String('str');
    var O = new Object({ a: '1', b: '2' });
}
{
    /**
     * Boolean类型
     */
    var isDone = false;
}
{
    /**
     * Number类型
     */
    //整数小数都包括，同时支持2/8/10/16进制字面量
    var decLiteral = 6;
    var hexLiteral = 0xf00d;
    var binaryLiteral = 10;
    var octalLiteral = 484;
}
{
    /**
     * String类型
     */
    var name1 = "ts";
    var name2 = "hello " + name1;
}
{
    /**
     * Array类型
     */
    var arr1 = [1, 2, 3]; //方式一：元素类型后面接上[],表示由此类元素组成的数组
    var numbers = [1, 2, 3, "5"]; //number|string代表联合类型
    var arr2 = ['a', 'b', 'c']; //方式二：使用泛型, Array<元素类型>
}
{
    /**
     * Tuple类型
     */
    //元祖类型表示一个已知元素数量和类型的数组，各元素的类型不必相同
    //let list1: [number, string] = [6, '6', 6]; //error 数量不对，元祖中只声明有2个元素
    //let list2: [number, string] = [6, 6]; //error 第二个元素类型不对
    var list3 = [6, '6']; //ok
}
{
    /**
     * Enum类型
     */
    //枚举是js没有的类型，是对js标准数据类型的补充，编译后转化为对象，默认元素对值从0开始
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    ;
    //enum Color { Red = 0, Green = 1, Blue = 2 }; //跟第一条等价
    (function (Color) {
        Color[Color["Cat"] = 1] = "Cat";
        Color[Color["Dog"] = 2] = "Dog";
        Color[Color["Fish"] = 3] = "Fish";
    })(Color || (Color = {}));
    ; //手动赋值
    Color[2] === 'Dog'; //通过值反向得到键值 
}
{
    /**
     * Any类型
     */
    var notSure = 10;
    notSure = 'may be a string';
    notSure = true; //正确 定义为boolean类型
    notSure.ifItExist(); //正确
    notSure.toFixed(2); //正确 toFixed方法存在，但是在编译的时候不会检查
    var prettySure = 4;
    //prettySure.toFixed(2); //Property 'toFixed' does not exist on type 'Object'
}
{
    /**
     * Void类型
     */
    //与any类型相反表示没有任何类型，一般出现在函数中，用来标记函数没有返回值 
    //声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
    function fn(n) {
        console.log(n);
    }
}
{
    /**
     * Null 和 Undefined
     */
    //undefined和null两者各自有自己的类型分别叫做undefined和null
    //默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量
    var u = undefined;
    var n = null;
}
{
    /**
     * Never
     */
    //never类型表示的是那些永不存在的值的类型
    //例如：never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
    //never类型是任何类型的子类型，也可以赋值给任何类型
    //但是没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
    function error(message) {
        throw new Error(message);
    }
    // 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }
}
{
    /**
     * Object类型
     */
    //表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
    var o1 = [];
    var o2 = { a: 100 };
}
