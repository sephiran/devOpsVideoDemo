FROM node:18.12.1

# Create app directory
WORKDIR /usr/src/app

# Copy app
COPY . .

# Install
RUN npm install
# Build
#RUN apt-get update
#RUN apt-get install python3
#RUN export PYTHON=usr/bin/python3.10
#RUN apt-get -y install build-essential
RUN cd frontend && npm install
RUN cd frontend && npm run build
RUN mv frontend/dist frontend/static
RUN mv frontend/static backend/src/main/resources
RUN rm -r frontend

# Docker Run Command
EXPOSE 8080
CMD [ "node", "server.js" ]