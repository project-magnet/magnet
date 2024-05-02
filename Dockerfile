FROM openjdk:17-jdk
#WORKDIR /app

# 서브모듈에 있는 application.yml을 복사합니다.
#COPY src/main/resources/submodule-config/application.yml application.yml

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
COPY build/generated /app/generated
# "-Dspring.profiles.active=docker",
ENTRYPOINT ["java","-Dspring.profiles.active=docker", "-jar", "app.jar"]