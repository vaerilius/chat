import getUserId from '../utils/getUserId'

const Query = {
  users(parent, args, { prisma, request }, info) {
    // getUserId(request)
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  channels(parent, args, { prisma, request }, info) {
    // getUserId(request)
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }]
      }
    }
    return prisma.query.channels(opArgs, info)
  },
  messages(parent, args, { prisma, request }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }]
      }
    }
    return prisma.query.messages(opArgs, info)
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.query.user({ where: { id: userId } }, info)
  }
}

export { Query as default }
