//Readonly, Pick, Record等等...
//映射类型比较像修改类型的工具函数, 

{
  // 1.Readonly<T>, 让属性都变成只读的
  interface Obj {
    a: number,
    b: string,
    c: boolean
  }
  type ReadonlyObj = Readonly<Obj>;
  /*
    type ReadonlyObj = {
      readonly a: number;
      readonly b: string;
      readonly c: boolean;
    }
  */
  //打开node_modules/typescript/lib文件夹可以找到lib.es5.d.ts, 在这我们能找到Readonly的定义:
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }
  //从源码可以看出Readonly是一个可索引类型的泛型接口：
  //1.索引签名为P in keyof T : 其中keyof T就是一个一个索引类型的查询操作符,表示类型T所有属性的联合类型
  //2.P in : 相当于执行了一个for in操作,会把变量P依次绑定到T的所有属性上
  //3.索引签名的返回值就是一个索引访问操作符 :  T[P]  这里代表属性P所指定的类型
  //4.最后再加上Readonly就把所有的属性变成了只读


  // 2.Partial<T>, 让属性都变成可选的
  type PartialObj = Partial<Obj>;
  /**
   type PartialObj = {
      a?: number;
      b?: string;
      c?: boolean;
    }
   */
  //内部实现
  //可选和只读映射类型的实现几乎一样,只是属性变为可选
  type Partial<T> = {
    [P in keyof T]?: T[P];
  }


  //3. Pick<T,K>, 只保留自己选择的属性, K代表要保留的属性键值  如：抽取接口Obj中的属性a和b,形成新类型
  type PickObj = Pick<Obj, 'a' | 'b'>;

  /**
   type PickObj = {
      a: number;
      b: string;
    }
   */
  //内部实现原理
  //第一个参数T,表示要抽取的目标对象
  //第二个参数K,具有一个约束:K一定要来自T所有属性字面量的联合类型,
  //即映射得到的新类型的属性一定要从K中选取
  type Pick<T, K extends keyof T> = { [P in K]: T[P]; }

  /********以上三种映射类型官方称为同态,意思是只作用于obj属性而不会引入新的属性***** */

  //4. Record<K,T>, 创建一个类型,K代表键值的类型, T代表值的类型
  //映射出的新类型所具有的属性由Record的第一个属性指定
  //而这些属性类型为第二个参数指定的已知类型
  type RecordObj = Record<'x' | 'y', Obj>
  /**
   type RecordObj = {
        x: Obj;
        y: Obj;
    }
   */

   
  //5. Required<T>, 让属性都变成必选
  interface Obj2 {
    a?: number,
    b?: string
  }
  type RequiredObj = Required<Obj2>;
  /**
   type RequiredObj = {
        a: number;
        b: string;
    }
   */
}