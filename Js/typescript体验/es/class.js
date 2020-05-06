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
    /**
     * 类
     */
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello" + this.greeting;
        };
        return Greeter;
    }());
    var greeter = new Greeter("Ts");
}
{
    /**
     * 继承：类从基类中继承了属性和方法
     *  Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。
     * 派生类通常被称作 子类，基类通常被称作 超类。
     */
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.move = function (distance) {
            if (distance === void 0) { distance = 0; }
            console.log("Animal moved " + distance + "m");
        };
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.bark = function () {
            console.log("wang!");
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.bark();
    dog.move(100);
}
{
    /**
     * super()
     * 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。
     * 在构造函数里访问 this的属性之前，我们 一定要调用 super()。
     */
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        Animal.prototype.move = function (distance) {
            if (distance === void 0) { distance = 5; }
            console.log(this.name + " moved " + distance + "m.");
        };
        return Animal;
    }());
    var Snack = /** @class */ (function (_super) {
        __extends(Snack, _super);
        function Snack(name) {
            return _super.call(this, name) || this;
        }
        Snack.prototype.move = function (distance) {
            if (distance === void 0) { distance = 5; }
            _super.prototype.move.call(this, distance);
        };
        return Snack;
    }(Animal));
    var Hourse = /** @class */ (function (_super) {
        __extends(Hourse, _super);
        function Hourse(name) {
            return _super.call(this, name) || this;
        }
        Hourse.prototype.move = function (distance) {
            if (distance === void 0) { distance = 45; }
            _super.prototype.move.call(this, distance);
        };
        return Hourse;
    }(Animal));
    var sam = new Snack("Sammy");
    var tom = new Hourse("Tommy");
    sam.move();
    tom.move(34);
}
{
    /**
     * public
     * TypeScript里，成员都默认为 public
     */
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        Animal.prototype.move = function (distance) {
            if (distance === void 0) { distance = 10; }
            console.log(this.name + " moved " + distance + "m.");
        };
        return Animal;
    }());
}
{
    /**
     * private
     * 当成员被标记成 private时，它就不能在声明它的类的外部访问
     */
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    var cat = new Animal("Cat");
    console.log(cat.name); //Property 'name' is private and only accessible within class 'Animal'
}
{
    /**
     * protected
     * protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
     */
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name, food) {
            var _this = _super.call(this, name) || this;
            _this.food = food;
            return _this;
        }
        Dog.prototype.getElevator = function () {
            return "name is " + this.name + ", like eat " + this.food;
        };
        return Dog;
    }(Animal));
    var wc = new Dog("wangcai", "bone");
    console.log(wc.getElevator());
    console.log(wc.name); //Property 'name' is protected and only accessible within class 'Animal' and its subclasses
}
{
    var Animal = /** @class */ (function () {
        //构造函数也可以被标记成 protected
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name, food) {
            var _this = _super.call(this, name) || this;
            _this.food = food;
            return _this;
        }
        Dog.prototype.getElevator = function () {
            return "name is " + this.name + ", like eat " + this.food;
        };
        return Dog;
    }(Animal));
    var wc = new Dog("wangcai", "bone");
    var hc = new Animal("cat"); //Constructor of class 'Animal' is protected and only accessible within the class declaration
}
{
    /**
     * readonly
     * 使用 readonly关键字将属性设置为只读的。
     * 只读属性必须在声明时或构造函数里被初始化。
     */
    var Octoptus = /** @class */ (function () {
        function Octoptus(theName) {
            this.numberOfLegs = 9;
            this.name = theName;
        }
        return Octoptus;
    }());
    var dat = new Octoptus("Man whit 8 legs");
    dat.name = "hahhahaa"; //Cannot assign to 'name' because it is a read-only property
}
{
    //参数属性可以方便地让我们在一个地方定义并初始化一个成员
    var Octoptus = /** @class */ (function () {
        function Octoptus(name) {
            this.name = name;
            this.numberOfLegs = 9;
            this.name = name;
        }
        return Octoptus;
    }());
}
{
    /**
     * getter setter
     * TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
     */
    var passcode_1 = "sceret passcode";
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Object.defineProperty(Animal.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (newName) {
                if (passcode_1 && passcode_1 == "secret passcode") {
                    this._name = newName;
                }
                else {
                    console.log("Unauthorized!");
                }
            },
            enumerable: true,
            configurable: true
        });
        return Animal;
    }());
    var ani = new Animal();
    ani.name = "Dogs";
}
{
    /**
     * static 静态属性
     */
    var Gird_1 = /** @class */ (function () {
        function Gird(scale) {
            this.scale = scale;
        }
        Gird.prototype.calculateDistanceFromOrigin = function (point) {
            var xDist = (point.x - Gird.origin.x);
            var yDist = (point.y - Gird.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        };
        Gird.origin = { x: 0, y: 0 };
        return Gird;
    }());
    var gird1 = new Gird_1(1.0); //1x scale
    var grid2 = new Gird_1(5.0); //5x scale
    console.log(gird1.calculateDistanceFromOrigin({ x: 10, y: 20 }));
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 20 }));
}
{
    /**
     * abstract 抽象类
     * 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
     */
    var Ainmal = /** @class */ (function () {
        function Ainmal() {
        }
        Ainmal.prototype.move = function () {
            console.log("roaming...");
        };
        return Ainmal;
    }());
}
{
    /**
     * 构造函数
     */
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    }());
    var greeter = void 0;
    greeter = new Greeter("wworld");
    greeter.greet();
}
{
    /**
     * interface and class
     */
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var point3d = { x: 1, y: 2, z: 3 };
}
