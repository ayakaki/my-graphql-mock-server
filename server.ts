const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

// スキーマの定義
const typeDefs = gql`
  type Account {
    userName: String
    email: String
  }

  type Food{
    name: String
    price: Int
  }

  type Query {
    account: Account
    foods: [Food]
  }

  type Mutation {
    updateAccount(userName: String, email: String): Account
    addFood(name: String!, price: Int!): Food
  }
`;

// データの定義
const account = {
  userName: 'John',
  email: 'abc@example.com'
}

const foods = [
  {
    name: 'Banana',
    price: 100,
  },
  {
    name: 'Apple',
    price: 200,
  }
]

// リゾルバの定義
const resolvers = {
  Query: {
    account: () => {
      return account;
    },
    foods: () => {
      return foods;
    },
  },
  Mutation: {
    updateAccount: (_, { userName, email }) => {
      if (userName) account.userName = userName;
      if (email) account.email = email;
      return account;
    },
    addFood: (_, { name, price }) => {
      const newFood = { name, price };
      foods.push(newFood);
      return newFood;
    }
  }
};
// Apolloサーバーのインスタンス作成
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // インターロギングを有効にする
});

const app = express();

// CORS設定
app.use(cors({
  origin: '*', // 任意のオリジンを許可する場合。実際のアプリケーションでは、信頼できるオリジンのみを許可するようにしてください。
  exposedHeaders: ['session-token'], // session-token ヘッダーをクライアントに公開
}));

// ミドルウェアでセッショントークンをレスポンスヘッダーに追加
app.use(server.graphqlPath, (req, res, next) => {
  res.setHeader('session-token', 'your-session-token-here');
  next();
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  // サーバーを起動
  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
})();
