# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose port
EXPOSE 8080

# Start API Gateway
CMD ["node", "server.js"]
