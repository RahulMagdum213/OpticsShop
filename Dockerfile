# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy backend Maven files
COPY opticsshop/pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy backend source code
COPY opticsshop/src ./src

# Build Spring Boot application
RUN mvn clean package -DskipTests


# ---------- Run stage ----------
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy generated JAR
COPY --from=build /app/target/*.jar app.jar

# Render provides the PORT environment variable
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]