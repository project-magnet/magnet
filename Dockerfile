# 베이스 이미지 설정
FROM amazoncorretto:17

# 작업 디렉토리 설정
WORKDIR /magnet

# 애플리케이션 JAR 파일 복사
COPY build/libs/magnet-0.0.1-SNAPSHOT.jar magnet.jar

#default
#LABEL authors="DLEHDDUF"

# Spring Boot 애플리케이션 포트 설정
EXPOSE 8080

# 환경 변수 설정
ENV SPRING_PROFILES_ACTIVE=production
#ENV SPRING_ACTIVE_PROFILES ${SPRING_ACTIVE_PROFILES}

# 애플리케이션 실행
#CMD ["java", "-jar", "magnet-0.0.1-SNAPSHOT.jar"]

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "magnet.jar"]