FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]


