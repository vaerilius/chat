import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
import { createUser, getUsers, getProfile, login } from './utils/operations'

const client = getClient()

describe('user tests', () => {
  beforeEach(seedDatabase)

  test('Should create a new user', async () => {
    const variables = {
      data: {
        name: 'new user',
        email: 'emai@email',
        password: '12345678'
      }
    }

    const response = await client.mutate({
      mutation: createUser,
      variables
    })

    const exists = await prisma.exists.User({
      id: response.data.createUser.user.id
    })
    expect(exists).toBe(true)
  })

  test('should expose public author profiles', async () => {
    const response = await client.query({
      query: getUsers
    })

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('jen')
  })

  describe('login', () => {
    test('should not login with bad credentials', async () => {
      const variables = { email: 'Jen@mail', password: 'red12345' }

      await expect(
        client.mutate({ mutation: login, variables })
      ).rejects.toThrow()
    })

    test('should not signup with short password', async () => {
      const variables = {
        data: { password: 'red', email: 'timo@mail', name: 'timo' }
      }

      await expect(
        client.mutate({ mutation: createUser, variables })
      ).rejects.toThrow()
    })
  })

  describe('Authenticated user tests', () => {
    test('should fetch user profile', async () => {
      const client = getClient(userOne.jwt)

      const { data } = await client.query({ query: getProfile })

      expect(data.me.id).toBe(userOne.user.id)
      expect(data.me.name).toBe(userOne.user.name)
      expect(data.me.email).toBe(userOne.user.email)
    })
  })
})
