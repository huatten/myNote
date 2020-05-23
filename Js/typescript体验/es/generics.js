/**
 * 泛型：不预先确定的数据类型，具体类型在使用时才能确定
 * 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：
 *  1.类的实例成员
 *  2.类的方法
 *  3.函数参数
 *  4.函数返回值
 * 泛型的优点：
 *  1.函数和类可以轻松支持多种类型，增强程序扩展性和复用性
 *  2.不必写多条函数重载，冗长的联合类型声明，增强代码可读性
 *  3.灵活控制类型之间的约束
 */
{
    /**
     * 非泛型函数的类型: let Show: (arg: any) => any;
     * 泛型函数的类型:  let Hide: <T>(arg: T) => T  类型参数T
     */
    function show(arg) {
        return arg;
    }
    var Show = show; //let Show: (arg: any) => any;
    function hide(arg) {
        return arg;
    }
    var Hide = hide;
}
{
    function log(val) {
        console.log(val);
        //console.log(val.length) //Property 'length' does not exist on type 'T'.
        return val;
    }
    log('a');
    log(['a', 'b', 'c']);
    log(['a', 'b', 'c']);
}
{
    function echo(val) {
        return val;
    }
    var myEcho = echo;
}
{
    function print(val) {
        return val;
    }
    var myPrint = print;
    myPrint(100);
}
{
    /**
     * 泛型类
     */
    var Log = /** @class */ (function () {
        function Log() {
        }
        Log.prototype.run = function (val) {
            console.log(val);
            return val;
        };
        return Log;
    }());
    var logNum = new Log();
    logNum.run(100);
    var logStr = new Log();
    logStr.run('hello');
    var logObj = new Log();
    logObj.run({ a: 0 });
}
{
    function printf(arg) {
        console.log(arg);
        console.log(arg.length);
        return arg;
    }
    printf(3); //现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
    printf('hello'); //字符串包含lngth属性
    printf([1, 2, 3]); //数组包含length属性
    printf({ length: 100 }); //对象包含length属性
}
{
    /**
     * 泛型参数的默认类型
     * 我们可以为泛型中的类型参数指定默认类型
     * 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
     * 约束传入的第二个参数key必须存在于obj对象中该怎么实现呢？ key of 关键字
     */
    function getProperty(obj, key) {
        return obj[key];
    }
    var x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, 'a');
    getProperty(x, 'o'); //Argument of type '"o"' is not assignable to parameter of type '"a" | "b" | "c" | "d"
}
