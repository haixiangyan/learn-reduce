import normalize, {TUser} from '../src/normalize'

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
