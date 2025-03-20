#download the latest postgrres image from docker
FROM postgres:latest
#create a new directory at this location inside the container
RUN mkdir -p /docker-entrypoint-initdb.d
#copy the SQL dump file to this location, postgres inside the container looks here 
# by default on startup for postgres .sql or .dmp files
COPY docker1_dump.sql /docker-entrypoint-initdb.d/
#enviroment variables for database name,user, and password.
ENV POSTGRES_DB=docker1
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
#expose the port 5432 which is default for postgres,
# im not sure if you can use a differnt port.
EXPOSE 5432