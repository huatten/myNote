//类型兼容性用于确定一个类型是否能赋值给其他类型
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
{
    var x = void 0;
    // y's inferred type is { name: string; location: string; }
    var y = { name: "TypeScript", from: "microsft" };
    x = y;
    //检查函数参数
    function greet(n) {
        console.log('Hello, ' + n.name);
    }
    greet(y);
}
{
    /**
     * 比较函数
     */
    var x = function (a) { return 0; };
    var y = function (b, s) { return 0; };
    y = x; //OK     x的每个参数在y中都能找到对应的参数，所以允许赋值。
    x = y; //Error  y有个必需的第二个参数，但是x并没有，所以不允许赋值
}
{
    /**
     * 可选参数和剩余参数
     * 可选的（预先确定的）和 Rest 参数（任何数量的参数）都是兼容的
     */
    var foo = function (x, y) { };
    var bar = function (x, y) { };
    var bas = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    foo = bar = bas;
    bas = bar = foo;
}
{
    /**
     * 枚举
     * 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
     * 不同枚举类型之间是不兼容的
     */
    var Status = void 0;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    var status_1 = Status.Ready;
    var num = 0;
    status_1 = num;
    num = status_1;
    //来自于不同枚举的枚举变量，被认为是不兼容的
    var Type = void 0;
    (function (Type) {
        Type[Type["Animal"] = 0] = "Animal";
        Type[Type["Person"] = 1] = "Person";
    })(Type || (Type = {}));
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    var type = Type.Animal;
    var color = Color.Blue;
    //type = color;  Error
}
{
    /**
     * 类
     * 仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查
     */
    var Animal = /** @class */ (function () {
        function Animal(name, numFeet) {
        }
        return Animal;
    }());
    var Size = /** @class */ (function () {
        function Size(meters) {
        }
        return Size;
    }());
    var a = void 0;
    var s = void 0;
    a = s; //ok
    s = a; //ok
    //私有的和受保护的成员必须来自于相同的类
    var Person = /** @class */ (function () {
        function Person() {
        }
        return Person;
    }());
    var Teacher = /** @class */ (function (_super) {
        __extends(Teacher, _super);
        function Teacher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Teacher;
    }(Person));
    ;
    var p = void 0;
    var t = void 0;
    p = t; //ok
    t = p; //ok
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
    var d = void 0;
    p = d; //error
    d = p; //error
}
