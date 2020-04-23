## JS求最大公约数

关于最大公约数的解释定义可以查看 [百度百科]([https://baike.baidu.com/item/%E6%9C%80%E5%A4%A7%E5%85%AC%E7%BA%A6%E6%95%B0/869308?fr=aladdin#1](https://baike.baidu.com/item/最大公约数/869308?fr=aladdin#1)) 。常见的求最大公约数的方法有下面几种：[质因数分解法](https://baike.baidu.com/item/质因数分解)、[短除法](https://baike.baidu.com/item/短除法/3640958)、[辗转相除法(欧几里德算法)](https://baike.baidu.com/item/辗转相除法/4625352)、[更相减损法](https://baike.baidu.com/item/更相减损法/10277459)、[尼考曼彻斯法(辗转相减法)](https://baike.baidu.com/item/尼考曼彻斯法)。

#### 1.质因数分解法

把每个数分别分解质因数，再把各数中的全部**公有质因数**提取出来**连乘**，所得的**积**就是这几个数的**最大公约数**。

假如需要求 30 和 42 两个正整数的最大公约数，用质因数分解法是这样进行的：

```javascript
30 = 2 * 3 * 5
42 = 2 * 3 * 7
//公有质因数是2和3，乘积是6
```

下面先实现一下如何将一个数进行质因数分解：

```javascript
function decompose(n){
  let handle = n;
  let res = [], i = 1;
  while(i < handle){
    i++;
    while(handle % i === 0){
      handle = handle / i;
      res.push(i)
    }
  }
  return res;
}
decompose(108); //[2, 2, 3, 3, 3]
```

得到了质因数，那么求最大质因数就简单了：

```javascript
function gcd(a, b){
  let m = decompose(a), n = decompose(b);
  let gcdarr = m.filter(item => n.some(ele => ele === item));
  return gcdarr.reduce(function(x, y){
     return x * y;
  }); 
}
```

#### 2.短除法

先用这几个数的公约数连续去除，一直除到所有的商互质为止，然后把所有的除数连乘起来，所得的积就是这几个数的最大公约数。

假如需要求 30 和 42 两个正整数的最大公约数，用质因数分解法是这样进行的：

![181587552884_ pic](https://user-images.githubusercontent.com/10781715/79973849-dc269e00-84ca-11ea-9219-8a0889c27bcd.jpg)

#### 3.辗转相除法

辗转相除法又叫做欧几里德算法，计算公式gcd(a,b) = gcd(b,a mod b)，扩展欧几里德算法可用于[RSA](https://baike.baidu.com/item/RSA)加密等领域。

假如需要求 30 和 42 两个正整数的最大公约数，用欧几里德算法，是这样进行的：

```javascript
// gcd(30, 42)								
30 % 42 = 30                    
42 % 30 = 12										
30 % 12 = 6											
12 % 6 = 0

// gcd(42, 30)
42 % 30 = 12
30 % 12 = 6
12 % 6 = 0
//至此最大公约数是 6，可以看到a > b时候可以少mod一次
```

用**除数**和**余数**反复做除法运算，当余数为**0**的时候，**取当前算式除数作为最大公约数**。

下面用 `while` 循环实现一下：

```javascript
function gcd (a, b){
  //利用es6数组解构方法巧妙地置换a和b的值，使a大于b 可减少循环次数
  if(a < b){
    [a, b] = [b, a];
  }
  while(b){
    var remainder = a % b;
    a = b;
    b = remainder;
  }
  //b如果为0,那么a和b的最大公约数一定是a
  return a; 
}
```

其实观察计算公式 `gcd(a,b) = gcd(b,a mod b)` 发现也可以用递归实现：

```javascript
function gcd(a, b){
  //利用es6数组解构方法巧妙地置换a和b的值，使a大于b 可减少循环次数
  if(a < b){
    [a, b] = [b, a];
  }
  //b如果为0,那么a和b的最大公约数一定是a
  if(b === 0){
    return a;
  }
  return arguments.callee(b, a%b);
}
```

仔细观察其实还可以利用三元表达式改造。

```javascript
function gcd(a, b){
  //利用es6数组解构方法巧妙地置换a和b的值，使a大于b 可减少循环次数
  if(a < b){
    [a, b] = [b, a];
  }
  //b如果为0,那么a和b的最大公约数一定是a
  return b ? arguments.callee(b, a%b) : a;
}
```

#### 4.更相减损术

更相减损术是出自《九章算术》的一种求最大公约数的算法，它原本是为约分而设计的，但它适用于任何需要求最大公约数的场合。原文是：可半者半之，不可半者，副置分母、子之数，以少减多，更相减损，求其等也。以等数约之。

使用步骤：

- 第一步：任意给定两个正整数；判断它们是否都是偶数。若是，则用2约简；若不是则执行第二步。

- 第二步：以较大的数减较小的数，接着把所得的差与较小的数比较，并以大数减小数。继续这个操作，直到所得的减数和差相等为止。

则第一步中**约掉的若干个2的积**与**第二步中等数**的乘积就是所求的最大公约数。

假如需要求 30 和 42 以及 98 和 63的最大公约数，用更相减损法，是这样进行的：

```javascript
//由于30和42均为偶数，首先用 2 约分得到15和21，此时均为奇数，故需辗转相减
21 - 15 = 6
15 - 6 = 9
9 - 6 = 3
6 - 3 = 3
//所以30和42的最大公约数等于 3 乘以第一步中约掉的2 等于 3 * 2 = 6

//由于63不是偶数，因此把98和63以大数减小数，并辗转相减
98 - 63 = 35
63 - 35 = 28
35 - 28 = 7
28 - 7 = 21
21 - 7 = 14
14 - 7 = 7
//所以，98和63的最大公约数等于7
```

下面用js代码上述过程实现：

```javascript
function gcd(a, b){
  var multiply = 1;
  var m = a, n = b;
  //1.均为偶数先用2简约，否则进行辗转相减
  while((m % 2 === 0) & (n % 2 === 0)){
  	m = m / 2;
    n = n / 2;
    multiply = multiply * 2;
  }
  //2.以大数减小数，得到的等数与减数比较，若不相等，则再用较大数减较小数 直到得到的等数与减数相等
  var large, little, diff;
  if(m > n){
    large = m;
    little = n;
  }else{
    large = n;
    little = m;
  }
  diff = large - little;
  while(diff !== little){
    if(diff < little){
      large = little;
      little = diff;
    }else{
      large = diff;
    }
    diff = large - little;
  }
  //第一步中约简掉的2与第二步中得到的等数的乘积就是两个数的最大公约数
  return diff * multiply;
}
```

#### 5.辗转相减法

辗转相减法（求最大公约数），即尼考曼彻斯法，其特色是做一系列减法，从而求得最大公约数，与更相减损术不同的是，我们不需要进行取半操作，只进行辗转相减运算。

使用思想：以较大的数减较小的数，接着把所得的差与较小的数比较，并以大数减小数。继续这个操作，直到所得的减数和差相减值为0。

假如需要求 30 和 42 以及 98 和 63的最大公约数，用辗转相减法，是这样进行的：

```javascript
//gcd(30, 42)									
42 - 30 = 12									
30 - 12 = 18									
18 - 12 = 6										
12 - 6 = 6										
6 - 6 = 0	 //此时6就是最大公约数了

//gcd(98, 63)			
98 - 63 = 35                   
63 - 35 = 28	
35 - 28 = 7
28 - 7 = 21
21 - 7 = 14
14 - 7 = 7
7 - 7 = 0  //此7就是最大公约数了
```

```javascript
//gcd(a, b) = gcd(max - min, max)
function gcd(a, b){
  if(a === b){
    return b;
  }
  var min = Math.min(a, b);  
  var max = Math.min(a, b);
  return arguments.callee(max - min, max);
}
```

#### 6.普通轮询

如果在不知道算法的情况下，当然可以使用暴力轮询了....

```javascript
function gcd(a, b){
  let commonfactor = 1, max = Math.max(a, b), min = Math.min(a, b);
  for(let i = 0; i < min; i++){
    if(max % i === 0 && min % i === 0){
      commonfactor = i;
    }
  }
  return commonfactor;
}
```

