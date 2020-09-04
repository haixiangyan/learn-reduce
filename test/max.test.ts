import max from '../src/max'

describe('max', () => {
  it('返回简单元素最大值', () => {
    const array = [1, 2, 3, 4, 5]

    const result = max(array, (a, b) => a > b)

    expect(result).toEqual(5)
  })
  it('返回复杂对象的最大值', () => {
    const array = [
      {value: 1}, {value: 2}, {value: 3}
    ]

    const result = max(array, (a, b) => a.value > b.value)

    expect(result).toEqual({value: 3})
  })
})
