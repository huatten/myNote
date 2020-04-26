/**
 * 高级类型入门
 */
//通过基础类型组合而来的, 我们可以叫他高级类型. 包含: 交叉类型 / 联合类型 / 接口等等
/**
   * 接口(interface)
   * 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，
   * 而具体如何行动需要由类（classes）去实现
  */
{
    var jack = {
        name: "Jack",
        age: 18
    };
    //我们定义了一个接口 Person，接着定义了一个变量 jack，它的类型是 Person。这样，我们就约束了 jack 的形状必须和接口 Person 一致。
    //接口一般首字母大写！！
    //定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的！！！
    //可见，赋值的时候，变量的形状必须和接口的形状保持一致。
}
{
    var jack = {
        name: "Jack",
        age: 18
    };
    var cat = {
        name: "Cat",
        age: 18,
        weight: 4 //Type '{ name: string; age: number; weight: number; }' is not assignable to type 'Animal'.Object literal may only specify known properties, and 'weight' does not exist in type 'Animal'.
    };
}
{
    var jack = {
        name: "Jack",
        age: 18,
        gender: "male"
    };
    var cat = {
        name: "Cat",
        age: 18,
        love: "fish"
    };
    var tom = {
        name: "Tom",
        age: 18,
        gender: "male"
    };
}
{
    var jack = {
        id: 9527,
        name: "Jack",
        age: 18,
        gender: "male"
    };
    jack.id = 132; //error  Cannot assign to 'id' because it is a read-only property
}
{
    // 声明函数遵循接口定义
    var mySearch = function (source, substring) {
        var res = source.search(substring);
        return res > -1;
    };
}
{
    var myArray = ["a", "b"];
    var myStr = myArray[0]; //"a"
}
{
    var Jack = /** @class */ (function () {
        function Jack() {
            this.id = 9527;
            this.name = "Jack";
            this.age = 18;
            this.love = "sleep";
        }
        Jack.prototype.read = function (name) {
            console.log(name);
        };
        Jack.prototype.say = function (age) {
            return age;
        };
        return Jack;
    }());
}
{
    var jack = {};
    jack.name = "Jack";
    jack.age = 18;
    jack.sex = "male";
    jack.score = 100;
}
{
    function getCounter() {
        var counter = function (start) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }
    var c = getCounter();
    c(10);
    c.reset();
    c.interval = 10;
}
