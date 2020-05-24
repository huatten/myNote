/**
 * 交叉类型
 * 交叉类型是将多个类型合并为一个类型，注意是 并集 ，不是交集。
 * 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 */
{
    var mixins = function (age, love) {
        return Object.assign(age, love);
    };
    var me = mixins({ name: 'huatten', age: 19 }, { love: "TS", age: 10 });
    console.log(me); //{age: 10, love: "TS", name: "huatten"}
}
