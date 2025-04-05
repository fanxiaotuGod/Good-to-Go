FROM node:16

WORKDIR /usr/src/app

# Copy package.json and package-lock.json from backend folder
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your backend source code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
