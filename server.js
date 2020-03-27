import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs, resolvers } from "./graphql";

const app = express();
const corsOptions = {
  origin: "https://coronavirus-react.herokuapp.com/graphql",
  credentials: true
};
app.use(cors(corsOptions));
app.use(morgan("short"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4444;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Conected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});
server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`Playground available at localhost:${port}${server.graphqlPath}`);
});
