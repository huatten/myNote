//条件类型
// T extends U ? X : Y
//用来表示类型是不确定的, 如果U的类型可以表示T, 那么返回X, 否则Y.
{
    //Diff<'a' , 'a' | 'e'> | Diff<'b' , 'a' | 'e'> | Diff<'c' , 'a' | 'e'>
    // never                         'b'                        'c'
    // 'b' | 'c'
}
{
}
{
}
{
}
{
    function fn(s) {
        return { a: 1, b: s };
    }
}
{
    /**
     * InstanceType<T> => 获取构造函数类型的实例类型
     */
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
}
