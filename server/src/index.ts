import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import cors from "cors";
import { DataSource } from "typeorm";
import {Products} from './entities/Products'

const main = async () => {
  const connectDB = await new DataSource({
    type: "mysql",
    database: "store_w_graphql",
    username: "root",
    password: "bugzy",
    logging: true,
    synchronize: false,
    entities: [Products],
  });

  connectDB.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(4001, () => {
    console.log("SERVER RUNNING ON PORT 4001...");
  });
};

main().catch((err) => {
  console.log(err);
});