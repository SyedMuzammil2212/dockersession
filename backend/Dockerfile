FROM eclipse-temurin:21-jdk AS build

WORKDIR /backend

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn/

RUN chmod +x mvnw

COPY src ./src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /backend/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
