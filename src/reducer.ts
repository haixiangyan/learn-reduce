type TState = {
  list: number[]
  loading: boolean
}

type THandler = (prevState: TState, curtState: TState) => TState

function reducer(stateList: TState[], handler: THandler): TState {
  return stateList.reduce(handler)
}

export default reducer
