> 代码仓库：[https://github.com/Haixiang6123/learn-reduce](https://github.com/Haixiang6123/learn-reduce)

## 前言

第一眼看 `Array.reduce` 这个函数总感觉怪怪的，用法也得花几分种才弄懂，懂了之后也不知道应用场景是啥。最近写项目的时候才慢慢对这个函数有更多的理解，可以算是 Array 类型下最强大的函数之一了。

## API 用法

API 的用法分有无初始值两种情况：

### 没有初始值

```js
const array = [1, 2, 3]

array.reduce((prev, curt) => {
  return prev + curt
}) // 1 + 2 + 3 = 6
```

### 有初始值

```js
const array = [1, 2, 3]

array.reduce((prev, curt) => {
  return prev + curt
}, 99) // 99 + 1 + 2 + 3 = 105
```

`reduce` 这个函数的主要功能是**将多个东西合成一个东西**。大家都做过小学奥数吧，就类似于这样

![](https://upload-images.jianshu.io/upload_images/2979799-b9aac0219bbc719c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

reduce 所提供的功能就是这个加号，至于这怎么个加法，是由你来决定的。加法的过程可以形象地理解成贪吃蛇一样

![](https://upload-images.jianshu.io/upload_images/2979799-244ac1c985fddfdb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
🐍 (prev) + 💩(curt) + 💩 (curt) + 💩(curt) = 🛫 (return value)
```

已有的蛇身就是 prev 参数，要吃掉的豆子就是 curt，吃完豆子的状态就是回调函数的返回值，整个 reduce 函数返回值就是这条🐍死了之后的状态。

## 应用场景

`reduce` 这个函数最难的点是想不出有什么使用场景。下面就做个抛砖引玉：

那我们先来思考一个问题：上面的例子只展示了数字的加法嘛，而 JS 里有 7 种基本数据类型：number, string, object, symbol, null, boolean, undefined。如果这些类型相加会怎么样呢？

除了这些基本类型，object 里也有 Array，Function，Object，Promise 这些类型，将这些类型做加法是不是也可以作为很多应用场景呢？

还有另一个点就是，除了加法，我还可以做减法，甚至做 comparasion，max，min 等操作。

将上面这 3 点都用起来，不难发现单单一个 `reduce` 就可以有几十种玩法。下面就选几种比较典型的例子给大家一些灵感。

所有的代理（包括源码和测试代码）都放在这里：[https://github.com/Haixiang6123/learn-reduce](https://github.com/Haixiang6123/learn-reduce)

## max

Python 有这样的语法：`max([1, 2, 3] // => 3`，JS 是没有的，使用 reduce 就可以简单地实现上面的功能：

```ts
type TComparator<T> = (a: T, b: T) => boolean

function max<T>(array: T[], largerThan?: TComparator<T>): T {
  return array.reduce((prev, curt) => {
    return largerThan(prev, curt) ? prev : curt
  })
}

export default max
```

用例

```ts
describe('max', () => {
  it('返回简单元素最大值', () => {
    const array = [1, 2, 3, 4, 5]

    const result = max<number>(array, (a, b) => a > b)

    expect(result).toEqual(5)
  })
  it('返回复杂对象的最大值', () => {
    const array: TItem[] = [
      {value: 1}, {value: 2}, {value: 3}
    ]

    const result = max<TItem>(array, (a, b) => a.value > b.value)

    expect(result).toEqual({value: 3})
  })
})
```

## findIndex

JS 有一个 `Array.indexOf` 的 API，但是对于像 `[{id: 2}, {id: 3}]` 这样的数据结构就不行了，我们一般希望传一个回调去找对应的对象的下标。使用 reduce 可以这么写：

```ts
type TEqualCallback<T> = (item: T) => boolean

function findIndex<T>(array: T[], isEqual: TEqualCallback<T>) {
  return array.reduce((prev: number, curt, index) => {
    if (prev === -1 && isEqual(curt)) {
      return index
    } else {
      return prev
    }
  }, -1)
}

export default findIndex
```

用例

```ts
describe('findIndex', () => {
  it('可以找到对应的下标', () => {
    const array: TItem[] = [
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 3, value: 3},
    ]

    const result = findIndex<TItem>(array, (item) => item.id === 2)

    expect(result).toEqual(1)
  })
})
```

## filter

使用 `reduce` 一样可以重新实现 Array 下的一些 API，比如 `filter`：

```ts
type TOkCallback<T> = (item: T) => boolean

function filter<T>(array: T[], isOk: TOkCallback<T>): T[] {
  return array.reduce((prev: T[], curt: T) => {
    if (isOk(curt)) {
      prev.push(curt)
    }

    return prev
  }, [])
}

export default filter
```

用例

```ts
describe('filter', () => {
  it('可以过滤', () => {
    const array: TItem[] = [{id: 1}, {id: 2}, {id: 3}]

    const result = filter<TItem>(array, (item => item.id !== 1))

    expect(result).toEqual([{id: 2}, {id: 3}])
  })
})
```

## normalize

在写 redux 的时候，我们有时可能会需要将数组进行 Normalization，比如

```
[{id: 1, value:1}, {id: 2, value: 2}]
=>
{
  1: {id: 1, value: 1}
  2: {id: 2, value: 2}
}
```

使用 `reduce` 可以先给个初始值 `{}` 来存放，然后每次只需要将 `id => object` 就可以了：

```ts
export type TUser = {
  id: number;
  name: string;
  age: number;
}

type TUserEntities = {[key: string]: TUser}

function normalize(array: TUser[]) {
  return array.reduce((prev: TUserEntities, curt) => {
    prev[curt.id] = curt

    return prev
  }, {})
}

export default normalize
```

用例

```ts
describe('normalize', () => {
  it('可以 normalize user list', () => {
    const users: TUser[] = [
      {id: 1, name: 'Jack', age: 11},
      {id: 2, name: 'Mary', age: 12},
      {id: 3, name: 'Nancy', age: 13}
    ]

    const result = normalize(users)

    expect(result).toEqual({
      1: users[0],
      2: users[1],
      3: users[2]
    })
  })
})
```

## assign

上面例子也只是对 number 做相加，那对象“相加”呢？那就是 `Object.assign` 嘛，所以用 `reduce` 去做对象相加也很容易：

```ts
function assign<T>(origin: T, ...partial: Partial<T>[]): T {
  const combinedPartial = partial.reduce((prev, curt) => {
    return { ...prev, ...curt }
  })

  return { ...origin, ...combinedPartial }
}

export default assign
```

用例

```ts
describe('assign', () => {
  it('可以合并多个对象', () => {
    const origin: TItem = {
      id: 1,
      name: 'Jack',
      age: 12
    }

    const changeId = { id: 2 }
    const changeName = { name: 'Nancy' }
    const changeAge = { age: 13 }

    const result = assign<TItem>(origin, changeId, changeName, changeAge)

    expect(result).toEqual({
      id: 2,
      name: 'Nancy',
      age: 13
    })
  })
})
```

虽然这有点脱裤子放屁，但是如果将数组的里的每个对象都看成 `[middleState, middleState, middleState, ...]`，初始值看成 `prevState`，最终生成结果看成成 `nextState`，是不是很眼熟？那不就是 redux 里的 reducer 嘛，其实也是 reducer 名字的由来。

## concat

说了对象“相加”，数组“相加”也简单：

```ts
function concat<T> (arrayList: T[][]): T[] {
  return arrayList.reduce((prev, curt) => {
    return prev.concat(curt)
  }, [])
}

export default concat
```

用例

```ts
describe('concat', () => {
  it('可以连接多个数组', () => {
    const arrayList = [
      [1, 2],
      [3, 4],
      [5, 6]
    ]

    const result = concat<number>(arrayList)

    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })
})
```

## functionChain

函数的相加不知道大家会想到什么，我是会想到链式操作，如 `a().b().c()....`，使用 `reduce` 实现，就需要传入这样的数组：`[a, b, c]`。

```ts
function functionChain (fnList: Function[]) {
  return fnList.reduce((prev, curt) => {
    return curt(prev)
  }, null)
}

export default functionChain
```

用例

```ts
describe('functionChain', () => {
  it('可以链式调用数组里的函数', () => {
    const fnList = [
      () => 1,
      (prevResult) => prevResult + 2,
      (prevResult) => prevResult + 3
    ]

    const result = functionChain(fnList)

    expect(result).toEqual(6)
  })
})
```

## promiseChain

既然说到了链式调用，就不得不说 Promise 了，数组元素都是 promise 也是可以进行链式操作的：

```ts
function promiseChain (asyncFnArray) {
  return asyncFnArray.reduce((prev, curt) => {
    return prev.then((result) => curt(result))
  }, Promise.resolve())
}

export default promiseChain
```

这里要注意初始值应该为一个 resolved 的 Promise 对象。

用例

```ts
describe('functionChain', () => {
  it('可以链式调用数组里的函数', () => {
    const fnList = [
      () => 1,
      (prevResult) => prevResult + 2,
      (prevResult) => prevResult + 3
    ]

    const result = functionChain(fnList)

    expect(result).toEqual(6)
  })
})
```

## compose

最后再来说说 `compose` 函数，这是实现 middeware /洋葱圈模型最重要的组成部分.

![](https://upload-images.jianshu.io/upload_images/2979799-f3f3004ea0e046ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

为了造这种模型，我们不得不让函数疯狂套娃：

```
mid1(mid2(mid3()))
```

要构造上面的套娃，这样的函数一般叫做 `compose`，使用 `reduce` 实现如下：

```ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((aFunc, bFunc) => (...args) => aFunc(bFunc(...args)))
}

export default compose
```

用例

```ts
describe('compose', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('可以 compose 多个函数', () => {
    const aFunc = () => console.log('aFunc')
    const bFunc = () => console.log('bFunc')
    const cFunc = () => console.log('cFunc')

    compose(aFunc, bFunc, cFunc)()

    expect(console.log).toHaveBeenNthCalledWith(1, 'cFunc')
    expect(console.log).toHaveBeenNthCalledWith(2, 'bFunc')
    expect(console.log).toHaveBeenNthCalledWith(3, 'aFunc')
  })

  it('可以使用 next', () => {
    const aFunc = (next) => () => {
      console.log('before aFunc')
      next()
      console.log('after aFunc')

      return next
    }
    const bFunc = (next) => () => {
      console.log('before bFunc')
      next()
      console.log('after bFunc')

      return next
    }
    const cFunc = (next) => () => {
      console.log('before cFunc')
      next()
      console.log('after cFunc')

      return next
    }

    const next = () => console.log('next')

    const composedFunc = compose(aFunc, bFunc, cFunc)(next)
    composedFunc()

    expect(console.log).toHaveBeenNthCalledWith(1, 'before aFunc')
    expect(console.log).toHaveBeenNthCalledWith(2, 'before bFunc')
    expect(console.log).toHaveBeenNthCalledWith(3, 'before cFunc')
    expect(console.log).toHaveBeenNthCalledWith(4, 'next')
    expect(console.log).toHaveBeenNthCalledWith(5, 'after cFunc')
    expect(console.log).toHaveBeenNthCalledWith(6, 'after bFunc')
    expect(console.log).toHaveBeenNthCalledWith(7, 'after aFunc')
  })
})
```

## 总结

上面的例子仅仅给出了 `reduce` 实现的最常见的一些工具函数。

就像第2点说的不同类型和不同操作有非常多的组合方式，因此使用 `reduce` 可以玩出很多种玩法。希望上面给出的这些可以给读者带来一些思考和灵感，在自己项目里多使用 `reduce` 来减轻对数组的复杂操作。
