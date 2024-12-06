FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microServicio-Evaluacion.jar
ENTRYPOINT ["java", "-jar", "/microServicio-Evaluacion.jar"]