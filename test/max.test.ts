import max from '../src/max'

describe('max', () => {
  it('返回最大值', () => {
    const array = [1, 2, 3, 4, 5]

    const result = max(array, (a, b) => a > b)

    expect(result).toEqual(5)
  })
})
