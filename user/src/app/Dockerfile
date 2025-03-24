FROM node:20
WORKDIR /user/src/app
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 3306
CMD ["npm", "start"]