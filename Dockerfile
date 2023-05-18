FROM node:19 AS ui-build
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN npm i -g @angular/cli
RUN cd frontend && npm install
RUN cd frontend && npm run build

FROM node:19 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/frontend/dist/devops-video-demo ./frontend/dist
COPY backend/package*.json ./
RUN npm install
COPY backend/server.js .

EXPOSE 8080

CMD ["node", "server.js"]