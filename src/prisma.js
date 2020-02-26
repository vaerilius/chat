import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// const getData = async query => {
//   const result = await query
//   console.log(JSON.stringify(result, undefined, 2))
// }

// getData(prisma.query.Message(null, '{ id }'))

prisma.query.users(null, '{ id name email }').then(data => {
  console.log(JSON.stringify(data, undefined, 2))
})
prisma.query.messages(null, '{ id content }').then(data => {
  console.log(JSON.stringify(data, undefined, 2))
})
