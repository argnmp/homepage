## Introduction
express.js + mongoDB + react.js(server-side-rendering) 을 활용한 개인 블로그 입니다.

## How to start

### client(REACT) 개발시
1. ./webpack.config.js 의 output.publicPath 를 주석처리해준다.
2. ./src/index.js 에서 ReactDom.hydrate 를 ReactDom.render로 바꾸어준다.
3. ./src/index.js 에서 서버에서 받는 **preloadedState** 부분을 주석처리하고 preloadedState를 직접 정의 해 준다.
4. **npm run start**로 실행 시 localhost:3000 에서 development server가 열린다.

### client + server(express.js + REACT) 개발시
1. ./webpack.config.js 의 output.publicPath를 **/dist**로 설정해준다. 
2. ./src/index.js 에서 ReactDom.render을 ReactDom.hydrate로 바꾸어준다.
3. ./src/index.js 에서 **preloadedState**을 서버에서 받을 수 있도록 정의해준다. 직접 정의한 preloadedState는 주석처리한다.
4. **npm run start-server** 로 실행 시 localhost:8000 에서 서버가 열린다.
```javascript
  "scripts": {
    "dev": "npx cross-env NODE_ENV=development webpack serve --mode development --open --hot",
    "build-server": "npm run clean-server && npx babel server --out-dir ./dist-server/server --config-file ./babel.server.js --copy-files && npx babel src --out-dir ./dist-server/src --config-file ./babel.server.js --copy-files && npm run build",
    "build": "npm run clean-client && webpack --mode production",
    "start-server": "npm run build-server && node ./dist-server/server/app.js",
    "start": "npm run dev",
    "clean-client": "npx rimraf dist",
    "clean-server": "npx rimraf dist-server"
  },
```
npm run start-server script를 보면 먼저 **npm run  build-server** 를 실행한다. 이 과정에서 ./dist-server/server 의 위치에 ./server 코드를 babel로 트랜스컴파일링 하여 폴더 전체를 복사한다. **--copy-files** 옵션을 통해서 폴더 내의 모든 파일을 같은 구조로 복사한다. 그리고 나서 ./src (frontend, react.js) 코드를 같은 과정을 통해서 ./dist-server/src 위치에 babel로 트랜스컴파일링 한다. 

server(express.js) 코드에서 react를 server-side-rendering을 하기 때문에 ./src 에 있는 react 코드가 필요하다. 따라서 기존에 ./src와 ./server 가 같은 위치에 있었으므로 이와 동일한 참조를 유지하기 위해서 ./dist-server/ 의 위치로 둘다 옮기는 것이다.

server 코드를 babel로 컴파일 한 이후에는 **npm run build** 코드를 실행한다. client 코드를 컴파일 하는 것이다. 이 과정에서 **webpack.config.js** 설정을 통해 번들링한다. webpack 설정의 output.publicPath를 ./dist로 설정해주는데, 그 이유는 express에서 static 파일을 ./dist 경로로 설정했기 때문이다. 또한 코드가 ./dist-server/server 에서 ./dist 를 참조하도록 작성되었다. 예를 들자면, 서버에서 react 코드의 마크 업을 렌더링하여 전송하는데, 클라이언트에서 이 html을 브라우저에서 실행하면 번들링된 javascript 파일을 요청해야하고, 이 javascript 파일은 express에서 ./dist의 경로로 배포하기 때문에 html에서도 ./dist 경로로 요청을 해야한다. html에서 요청을 ./dist 경로로 하게 만들어 주는 것이 webpack 설정의 output.publicPath이다.


### Database
database는 MongoDB를 사용하였다. 그리고 express 에서 mongoose 모듈을 통해 데이터베이스에 접근한다.

윈도우 에서는 아래의 명령어로 DB를 실행할 수 있고 멈출 수 있다.
```bash
net start MongoDB 
net stop MongoDB
```
MongoDB에서 database는 homepage를 사용한다. 따라서 .env 파일에 homepage database를 읽고 쓰는 권한이 주어진 사용자를 추가해주어야 한다.

