---
title: Examples
icon: list
category:
  - Guide
pageInfo: false
breadcrumb: true
contributors: false
editLink: false
lastUpdated: false
backtotop: false
---
WARNING: This setup should not to use in production environment. Zookeeper keys and user credentials are hardcoded into the repository.

If you need test instance with MySQL and mysync, you could use the next script. Launch it in `./mysync/tests/images`
```bash
docker rm -f $(docker ps -aq)

cd ../../
GOOS=linux go build -tags netgo,osusergo -o ./tests/images/mysql/mysync ./cmd/mysync/...
docker build --tag=mysync-test-base8.0 tests/images/base --build-arg MYSQL_VERSION=8.0
cd tests/images/
VERSION=8.0 docker-compose up --build -d

docker cp images_zoo1_1:/etc/zk-ssl/ca.cert.pem .
docker cp images_zoo1_1:/etc/zk-ssl/server.crt .
docker cp images_zoo1_1:/etc/zk-ssl/server.key .

docker exec -it images_mysql1_1 mkdir -p /etc/zk-ssl
docker exec -it images_mysql2_1 mkdir -p /etc/zk-ssl
docker exec -it images_mysql3_1 mkdir -p /etc/zk-ssl

docker cp ca.cert.pem images_mysql1_1:/etc/zk-ssl/
docker cp ca.cert.pem images_mysql2_1:/etc/zk-ssl/
docker cp ca.cert.pem images_mysql3_1:/etc/zk-ssl/

docker cp server.crt images_mysql1_1:/etc/zk-ssl/
docker cp server.crt images_mysql2_1:/etc/zk-ssl/
docker cp server.crt images_mysql3_1:/etc/zk-ssl/

docker cp server.key images_mysql1_1:/etc/zk-ssl/
docker cp server.key images_mysql2_1:/etc/zk-ssl/
docker cp server.key images_mysql3_1:/etc/zk-ssl/

echo "Trying to add mysql1 to mysync..."
while
  timeout -k 70 60 docker exec images_mysql1_1 mysync host add mysql1
  [ $? != 0 ]
do
  echo "Let's try for another time..."
  sleep 2
done

echo "Trying to add mysql2 to mysync..."
while
  timeout -k 70 60 docker exec images_mysql1_1 mysync host add mysql2
  [ $? != 0 ]
do
  echo "Let's try for another time..."
  sleep 2
done

echo "Trying to add mysql3 to mysync..."
while
  timeout -k 70 60 docker exec images_mysql1_1 mysync host add mysql3
  [ $? != 0 ]
do
  echo "Let's try for another time..."
  sleep 2
done

docker exec images_mysql2_1 mysync host add mysql1
docker exec images_mysql2_1 mysync host add mysql2
docker exec images_mysql2_1 mysync host add mysql3

docker exec images_mysql1_1 mysql -e "CREATE TABLE test1.big_table (id integer, info text);"

docker exec images_mysql1_1 mysql -e "INSERT INTO test1.big_table (id, info) VALUES (1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');"
for ((a = 0; a < 8; a++)); do
  docker exec images_mysql1_1 mysql -e "INSERT INTO test1.big_table SELECT * FROM test1.big_table;"
done

docker exec images_mysql1_1 mysql -e "CREATE USER user1 IDENTIFIED BY 'password';"
docker exec images_mysql1_1 mysql -e "GRANT ALL ON test1.* TO user1;"
```
