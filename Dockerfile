
#FROM amazoncorretto:17

#COPY build/libs/magnet-0.0.1-SNAPSHOT.jar magnet.jar
#
#ENTRYPOINT ["java", "-jar", "magnet.jar"]

FROM openjdk:17-jdk
#WORKDIR /app
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]