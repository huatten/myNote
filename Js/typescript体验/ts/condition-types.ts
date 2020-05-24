//条件类型
// T extends U ? X : Y
//用来表示类型是不确定的, 如果U的类型可以表示T, 那么返回X, 否则Y.
{
  type TypeName<T> =
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    T extends undefined ? 'undefined' :
    T extends Function ? 'function' :
    'object';

  type T1 = TypeName<string>  // type T1 = "string"
  type T2 = TypeName<string[]>  // type T2 = "object"

  // (A | B) extends U ? X : Y
  // (A extends U ? X : Y) | (B extends U ? X : Y)
  type T3 = TypeName<string | string[]>  // type T3 = "string" | "object"

  type Diff<T, U> = T extends U ? never : T;

  type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>  //  type T4 = "b" | "c"
  //Diff<'a' , 'a' | 'e'> | Diff<'b' , 'a' | 'e'> | Diff<'c' , 'a' | 'e'>
  // never                         'b'                        'c'
  // 'b' | 'c'
}

{
  /**
   * Exclude<T, U>  =>  从T中剔除可以赋值给U的类型。
   * 注意：Exclude类型是建议的Diff类型的一种实现。
   * 我们使用Exclude这个名字是为了避免破坏已经定义了Diff的代码，
   * 并且我们感觉这个名字能更好地表达类型的语义。
   */
  type Exclude<T, U> = T extends U ? never : T
  type T5 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>  //  type T5 = "b" | "d"
}

{
  /**
   * Extract<T, U>  =>  提取T中可以赋值给U的类型。
   */
  type Extract<T, U> = T extends U ? T : never
  type T6 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>  //  type T6 = "a" | "c"
}

{
  /**
   * NonNullable<T>  => 从T中剔除null和undefined。
   */
  type NonNullable<T> = T extends null ? never : T
  type T7 = NonNullable<'a' | 'b' | 'c' | null | undefined>  //  type T7 = "a" | "b" | "c"

}

{
  /**
   * ReturnType<T>  => 获取函数返回值类型
   */
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  function fn(s: string) {
    return { a: 1, b: s };
  }
  type T8 = ReturnType<() => string>  //  type T8 = string
  type T9 = ReturnType<(s: string) => void>  //  type T9 = void
  type T10 = ReturnType<typeof fn>  //  type T10 = { a: number;  b: string; }
  type T11 = ReturnType<any>  // type T11 = any
  type T12 = ReturnType<never>  // type T12 = never
  type T13 = ReturnType<string>  // Error
  type T14 = ReturnType<Function>  // Error
}

{
  /**
   * InstanceType<T> => 获取构造函数类型的实例类型
   */
  class Animal {
    eat: void
  }
  type T15 = InstanceType<typeof Animal>;  // type T15 = Animal
  type T16 = InstanceType<any>;  // type T16 = any
  type T17 = InstanceType<never>;  // type T17 = never
  type T18 = InstanceType<string>;  // Error
  type T19 = InstanceType<Function>;  // Error
}