import reducer from '../src/reducer'

describe('reducer', () => {
  it('可以 reduce 状态', () => {
    const stateList = [
      { list: [1], loading: true },
      { list: [2], loading: true },
      { list: [3], loading: true },
      { list: [], loading: false },
    ]

    const newState = reducer(stateList, ((prevState, curtState) => {
      return {
        list: [...prevState.list, ...curtState.list],
        loading: prevState.loading && curtState.loading
      }
    }))

    expect(newState).toEqual({ list: [1, 2, 3], loading: false })
  })
})
