# ---------- BUILD STAGE ----------
# Uses Java 21 (from your pom.xml) and Maven
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# 1. Copy pom and mvnw first to leverage Docker layer caching for dependencies
COPY pom.xml ./
COPY .mvn/ .mvn/
COPY mvnw ./
RUN chmod +x mvnw
RUN ./mvnw -B dependency:go-offline

# 2. Copy source code and build the fat JAR
COPY src ./src
RUN ./mvnw -B -DskipTests package

# ---------- RUN STAGE ----------
# Uses a lightweight JRE-only image for a smaller, more secure final image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Security: Run as a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
