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
--env CANDIDATE='192.168.31.51' \
-p 1935:1935 \
-p 5001:8080 \
-p 1985:1985 \
-p 8000:8000/udp \
-v $LOCAL_DOCKER_SRS_PATH\\conf:/usr/local/srs/conf/ \
-v $LOCAL_DOCKER_SRS_PATH\\objs:/usr/local/srs/objs/ \
registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5 objs/srs \
-c conf/rtc2rtmp.conf

// 若 IP 更改，修改 srs 启动脚本，常量 IP，本地 docker 配置文件 rtc2rtmp.conf

LOCAL_DOCKER_MYSQL_PATH=C:\\Users\\aaa\\Desktop\\docker\\mysql \
&& docker run -d \
-p 3306:3306 \
--name billd-live-mysql \
-e MYSQL_ROOT_PASSWORD=mysql123. \
-v $LOCAL_DOCKER_MYSQL_PATH/conf/my.cnf:/etc/my.cnf \
-v $LOCAL_DOCKER_MYSQL_PATH/data:/var/lib/mysql/ \
mysql:8.0

// ffmpeg 推流视频
ffmpeg -re -stream_loop -1 -i D:\\live-project\\todo\\spark-live-server\\src\\assets\\1.mp4 -vcodec copy -acodec copy -f flv 'rtmp://localhost//stream/1?push_key=638777&title=admin&uid=1'
