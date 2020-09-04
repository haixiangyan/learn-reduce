import assign from '../src/assign'

type TItem = {
  id: number;
  name: string;
  age: number;
}

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
