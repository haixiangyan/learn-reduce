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
