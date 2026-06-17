docker compose -f infrastructure/docker/docker-compose.yml up -d

mvn -f backend/pom.xml clean install -DskipTests

neosoft@Ribhu-M1Pro backend % lsof -i :8082
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    18949 neosoft  111u  IPv6 0x688c8ee49005df6d      0t0  TCP *:us-cli (LISTEN)
neosoft@Ribhu-M1Pro backend % kill -9 18949
neosoft@Ribhu-M1Pro backend % lsof -i :8082