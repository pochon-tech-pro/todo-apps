## HasuraCloudのSetup
0. https://hasura.io/cloud/
1. Login
2. New Project ---> Free Tier ---> Create Free Project
3. General ---> Name ---> Hogehoge
4. Admin Secret ---> Copy
5. Launch Console
6. Data ---> Create Heroku Database ---> Heroku Icon Click
7. Public ---> Create Table

## ApolloClient & Graphql Code Generator Setup
0. `yarn add @apollo/client graphql`
1. `yarn add -D @graphql-codegen/cli @graphql-codegen/typescript`
2. yarn graphql-codegen init
   1. What type of application are you building? Application built with React
   2. Where is your schema?: hasura API url 
   3. Where are your operations and fragments?: `src/queries/**/*.ts`
   4. Pick plugins: Y
   5. Where to write the output: `types/generated/graphql.tsx`
   6. Do you want to generate an introspection file?: n
   7. How to name the config file? `codegen.yml`
   8. What script in package.json should run the codegen? gen-types
3. `mkdir src/queries`
4. `touch src/queries/queries.ts` ... Writing Schemas
5. `.env.local` Edit
   1. https://www.graphql-code-generator.com/docs/config-reference/require-field#customize-loaded-env-file
      1. Yaml上に定義した環境変数を読み込むためには、`--require dotenv/config` を自動生成実行オプションに追加する
      2. デフォルトだと、`.env`しか読まないので、`.env.local`を読み込ませるために、次のコマンドをNPMScriptに追記する.
      3. `"gen-types": "DOTENV_CONFIG_PATH=\"./.env.local\" graphql-codegen --require dotenv/config --config codegen.yml"`
6. `yarn gen-types`