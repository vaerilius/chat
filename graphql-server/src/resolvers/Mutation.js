import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import { generateToken } from '../utils/generateToken'
import { hashPassword } from '../utils/hashPassword'
import modifyUserInput from '../utils/modifyUserInput'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)
    // const modifiedData = modifyUserInput(args.data)
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async login(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({
      where: { email: data.email }
    })
    if (!user) {
      throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login')
    }

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return await prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    return await prisma.mutation.updateUser(
      { where: { id: userId }, data: args.data },
      info
    )
  },
  async createChannel(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.createChannel(
      {
        data: {
          ...args.data,
          admins: {
            connect: {
              id: userId
            }
          },
          users: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    )
  },
  async connectToChannel(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const channelExists = await prisma.exists.Channel({
      name: args.name
    })

    if (!channelExists) {
      throw new Error('Channel not exists ')
    }
    return prisma.mutation.updateChannel(
      {
        where: {
          name: args.name
        },
        data: {
          users: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    )
  },
  async disconnectToChannel(parent, args, { prisma, request }, info) {
    console.log(parent)
    const userId = getUserId(request)

    const channelExists = await prisma.exists.Channel({
      name: args.name
    })

    if (!channelExists) {
      throw new Error('Channel not exists ')
    }
    return prisma.mutation.updateChannel(
      {
        where: {
          name: args.name
        },
        data: {
          users: {
            disconnect: {
              id: userId
            }
          }
        }
      },
      info
    )

  }
}

export { Mutation as default }
