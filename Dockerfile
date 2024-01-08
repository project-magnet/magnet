# 베이스 이미지 설정
FROM amazoncorretto:17

# 애플리케이션 JAR 파일 복사
COPY build/libs/magnet-0.0.1-SNAPSHOT.jar magnet.jar

# 애플리케이션 실행
# 환경 변수 직접 넣어주기
ENTRYPOINT ["java", "-Dspring.profiles.active=production","-jar", "magnet.jar"]