import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import * as database from "./config/database"
import { ApolloServer, gql } from "apollo-server-express"

const startServer = async () => {
  dotenv.config()

  database.connect()

  const app: Express = express()
  const port: number | string = process.env.PORT || 3000

  //-graphQL
  //-tao kieu tra ve cua ham 
  const typeDefs = gql` 
    type Query {
      hello: String
    }
  `

  const resolvers = { //-viet ham vs kieu tra ve ben tren
    Query: {
      hello: () => {
        return "hello world"
      }
    }
  }

  const apolloServer = new ApolloServer({ //- tao ra server
    typeDefs,
    resolvers
  })

  await apolloServer.start()

  //tao api toi graphql
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  })

  app.listen(port, () => {
    console.log(`App listenning on port ${port}`)
  })
}

startServer()
