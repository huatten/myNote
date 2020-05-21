/**
 * 泛型：不预先确定的数据类型，具体类型在使用时才能确定
 * 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：
 * 类的实例成员
 * 类的方法
 * 函数参数
 * 函数返回值
 */
{
    function log(val) {
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
