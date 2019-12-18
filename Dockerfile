# Using nodejs v12.x.x
FROM node:12

# Setting up working directory
WORKDIR /usr/src/app

# Copying working directory 
COPY . .

# Install dependencies
RUN npm install

# Build bundle
RUN npm run build

# Start the application
CMD [ "npm", "run", "start"]
