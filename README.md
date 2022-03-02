## Introduction
express.js와 react.js의 server-side-rendering 을 활용한 홈페이지 입니다.

## How to start
```bash
npm run start-server
```

dist와 dist-server 폴더가 생성됩니다. dist는 react를 webpack으로 번들링 한 파일들이 들어가 있고, dist-server은 react ssr을 위하여 바벨로 컴파일 했습니다. dist-server은 dist에 대한 dependency를 가집니다. 따라서 이 구조를 유지해야 합니다.

## server
윈도우에서 
net start MongoDB 
net stop MongoDB
이 명령어로 DB를 사용가능합니다.

mongodb 접속
user : kimtahen

