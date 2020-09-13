import functionChain from '../src/functionChain'

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
