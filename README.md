## 安装依赖

```bash
pnpm i
```

## 项目启动

```bash
npm run dev
```

//启动 srs

LOCAL_DOCKER_SRS_PATH=C:\\Users\\aaa\\Desktop\\docker\\srs \
&& docker run -d --rm \
--name sparklive-srs \
--env CANDIDATE='192.168.0.139' \
-p 1935:1935 \
-p 5001:8080 \
-p 1985:1985 \
-p 8000:8000/udp \
-v $LOCAL_DOCKER_SRS_PATH\\conf:/usr/local/srs/conf/ \
-v $LOCAL_DOCKER_SRS_PATH\\objs:/usr/local/srs/objs/ \
registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5 objs/srs \
-c conf/rtc2rtmp.conf

LOCAL_DOCKER_MYSQL_PATH=C:\\Users\\aaa\\Desktop\\docker\\mysql \
&& docker run -d \
-p 3306:3306 \
--name billd-live-mysql \
-e MYSQL_ROOT_PASSWORD=mysql123. \
-v $LOCAL_DOCKER_MYSQL_PATH/conf/my.cnf:/etc/my.cnf \
-v $LOCAL_DOCKER_MYSQL_PATH/data:/var/lib/mysql/ \
mysql:8.0

ffmpeg -re -stream_loop -1 -i D:\\live-project\\todo\\spark-live-server\\src\\assets\\1.mp4 -vcodec copy -acodec copy -f flv 'rtmp://localhost//stream/1?push_key=638777&title=admin&uid=1'

flv 拉流地址： http://192.168.0.139:5001/stream/1
