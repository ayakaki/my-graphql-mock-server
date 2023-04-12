# my-graphql-mock-server

Apollo Serverを用いた GraphQL モックサーバ

## FEATURE
- 単数と複数のデータ返却機能
- レスポンスヘッダーとして`Set-Cookie`を返却

## HOW TO USE
- node_modulesをダウンロードしていない場合は、`npm ci`とコマンドする
- ターミナルにて`node server.ts`とコマンドする
- `localhost:4000`にアクセスする
- `Query your server`を押下し、遷移する
- 適切なクエリを送信する