FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY proxy.js ./
EXPOSE 8080 8081
CMD ["node", "proxy.js"]
