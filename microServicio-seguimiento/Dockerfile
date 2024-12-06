FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microServicio-seguimiento.jar
ENTRYPOINT ["java", "-jar", "/microServicio-seguimiento.jar"]