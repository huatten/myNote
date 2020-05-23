var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
{
    /**
     * 在有些没有明确指出类型的地方，类型推论会帮助提供类型
     * 变量x的类型被推断为数字
     * 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时
     */
    var x = 3; //let x: number
}
{
    /**
     * 为了推断x的类型，我们必须考虑所有元素的类型
     * 这里有两种选择： number和null
     * 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
     */
    var x = [0, 1, null]; //let x: number[]
}
{
    /**
     * 我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，因此不能推断出这个结果
     * 没有找到最佳通用类型的话，类型推断的结果为联合数组类型  let zoo: (Elephant | Rhino | Snake)[]
     */
    var Rhino = /** @class */ (function () {
        function Rhino() {
        }
        return Rhino;
    }());
    var Elephant = /** @class */ (function () {
        function Elephant() {
        }
        return Elephant;
    }());
    var Snake = /** @class */ (function () {
        function Snake() {
        }
        return Snake;
    }());
    var zoo = [new Rhino(), new Elephant(), new Snake()];
    var zoo = [new Rhino(), new Elephant(), new Snake()];
}
{
    /**
     * 函数返回类型
     * 返回类型能被 return 语句推断，如下所示，推断函数返回为一个数字
     * function add(a: number, b: number): number
     */
    function add(a, b) {
        return a + b;
    }
}
{
    var add_1 = function (a, b) {
        //a = "hello"; Error：不能把 'string' 类型赋值给 'number' 类型
        return a + b;
    };
}
{
    /**
     * 结构化
     * 这些简单的规则也适用于结构化的存在（对象字面量)
     * 在下面这种情况下 obj 的类型被推断为 { a: number, b: number }：
     */
    var obj = {
        a: 123,
        b: 456
    };
    //obj.a = 'xxx';   Error：不能把 'string' 类型赋值给 'number' 类型
    var arr = [1, 2, 3];
    //arr[0] = 'a';    Error：不能把 'string' 类型赋值给 'number' 类型
}
{
    /**
     * 解构
     */
    var obj = {
        a: 123,
        b: 456
    };
    var a = obj.a;
    //a = 'abc';    Error：不能把 'string' 类型赋值给 'number' 类型
    var arr = [1, 2, 3];
    var _a = __read(arr, 3), x = _a[0], y = _a[1], z = _a[2];
    //x = 'hi';     Error：不能把 'string' 类型赋值给 'number' 类型
}
{
    /**
   * noImplicitAny
   * 选项 noImplicitAny 用来告诉编译器，当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 any 类型），你可以：
   * 1.通过显式添加 :any 的类型注解，来让它成为一个 any 类型；
   * 2.通过一些更正确的类型注解来帮助 TypeScript 推断类型。
   */
}
