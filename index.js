require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start(); apolloServer.applyMiddleware({ app: app });
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, });
    const connection = mongoose.connection;
    connection.once("open", () => { console.log("MongoDB database connection established successfully."); });
    app.get('/', (req, res) => { res.send('Home Page'); });
    app.listen(process.env.PORT, () => {console.log(`Running on port => ${process.env.PORT}`)});
}
startServer();