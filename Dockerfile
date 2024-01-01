## 베이스 이미지 설정
#FROM openjdk:17-jdk-alpine
##FROM amazoncorretto:17
#
## 작업 디렉토리 설정
#WORKDIR /app
#
## 애플리케이션 JAR 파일 복사
#COPY build/libs/magnet-0.0.1-SNAPSHOT.jar magnet.jar
#
##default
#LABEL authors="DLEHDDUF"
#
## 인자 설정 - JAR_File
#ARG JAR_FILE=build/libs/*.jar
##ARG SPRING_ACTIVE_PROFILES
#
## jar 파일 복제
#COPY ${JAR_FILE} app.jar
#
## Gradle 설치
#RUN apt-get update && apt-get install -y \
#    curl \
#  && curl -s "https://get.sdkman.io" | bash \
#  && source "$HOME/.sdkman/bin/sdkman-init.sh" \
#  && sdk install gradle
#
## 필요한 패키지 설치
#RUN gradle bootJar
#
## Spring Boot 애플리케이션 포트 설정
#EXPOSE 8080
#
## 환경 변수 설정
#ENV SPRING_PROFILES_ACTIVE=production
##ENV SPRING_ACTIVE_PROFILES ${SPRING_ACTIVE_PROFILES}
#
## 애플리케이션 실행
##CMD ["java", "-jar", "magnet-0.0.1-SNAPSHOT.jar"]
#
## 애플리케이션 실행
#ENTRYPOINT ["java", "-jar", "magnet-0.0.1-SNAPSHOT.jar"]