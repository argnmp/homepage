sudo kill `pgrep -f node`
git pull origin master
npm run build-all
nohup sudo node dist-server/server/app.js > out.log &
