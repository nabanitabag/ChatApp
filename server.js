const { ApolloServer } = require('apollo-server');
const {sequelize} = require('./models');
const Msg = require('./models/messages')
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true})
.then(console.log("mongodb connected"))
.catch(err => console.log(err));
// The GraphQL schema
const typeDefs = require('./graphql/typeDefs');
// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  // sequelize.authenticate()
  // .then(() => console.log("Database connection established"))
});
