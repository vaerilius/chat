import client from '../client'
import ApolloBoost, { gql } from 'apollo-boost'

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const reducer = (state = null, action: any) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user
    default:
      return state
  }
}

export const loginUser = () => {
  return async (dispatch: any) => {
    const variables = {
      data: {
        email: 'timo@mail',
        password: 'timo1234'
      }
    }
    const { data } = await client.mutate({ mutation: login, variables })
    console.log(data.login)

    dispatch({
      type: 'LOGIN_USER',
      user: data.login.user
    })
  }
}
export default reducer
