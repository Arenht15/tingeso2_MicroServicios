FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microServicio-solicitud.jar
ENTRYPOINT ["java", "-jar", "/microServicio-solicitud.jar"]