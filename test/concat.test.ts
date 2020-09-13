import concat from '../src/concat'

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
