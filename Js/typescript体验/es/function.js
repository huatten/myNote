{
    /**
     * 有名函数和匿名函数
     */
    function sum(a, b) {
        return a + b;
    }
    var add_1 = function (a, b) {
        return a + b;
    };
}
{
    /**
     * 为函数定义类型
     * 我们可以给每个参数添加类型之后再为函数本身添加返回值类型
     * TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。
     */
    function mySum(a, b) {
        return a + b;
    }
    var myAdd = function (a, b) {
        return a + b;
    };
}
{
    /**
     * 书写完整的函数类型
     * 函数类型包含两部分：参数类型和返回值类型.当写出完整函数类型的时候，这两部分都是需要的。
     */
    var myAdd = function (a, b) { return a + b; };
    //我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性
    var mySum_1 = function (a, b) { return a + b; };
}
{
    /**
     * 推断类型
     */
    var myAdd = function (a, b) { return a + b; };
}
{
    /**
     * 可选参数和默认参数
     * 传递给一个函数的参数个数必须与函数期望的参数个数一致。
     */
    function buildName(firstName, lastName) {
        return firstName + "" + lastName;
    }
    var res1 = buildName("Jack"); //error  An argument for 'lastName' was not provided.
    var res2 = buildName("Jack", "Ma", "Sr."); //error  Expected 2 arguments, but got 3.
    var res3 = buildName("Jack", "Ma");
    //JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 
    //在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。
    //可选参数必须跟在必须参数后面，也就是说：可选参数后面不允许再出现必需参数了
    function createName(firstName, lastName) {
        if (lastName) {
            return firstName + "" + lastName;
        }
        else {
            return firstName;
        }
    }
    var name1 = createName("Jack");
    var name2 = createName("Jack", "Ma", "Sr."); //error  Expected 2 arguments, but got 3.
    var neme3 = createName("Jack", "Ma");
}
{
    /**
     * 剩余参数
     * 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。
     * 在JavaScript里，你可以使用 arguments来访问所有传入的参数。
     * 在TypeScript里，你可以把所有参数收集到一个变量里
     */
    function buildNames(firstName) {
        var restNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restNames[_i - 1] = arguments[_i];
        }
        return firstName + "" + restNames.join(" ");
    }
    var name_1 = buildNames("Jack", "Ma", "Kd", "Curry");
}
{
    var myName = void 0;
    myName = function (firstName, lastName) {
        return firstName + "" + lastName;
    };
}
{
    function fnReverse(x) {
        if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        }
    }
}
