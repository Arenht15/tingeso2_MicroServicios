FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microServicio-User.jar
ENTRYPOINT ["java", "-jar", "/microServicio-User.jar"]