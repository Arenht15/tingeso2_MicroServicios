FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microServicio-credito.jar
ENTRYPOINT ["java", "-jar", "/microServicio-credito.jar"]