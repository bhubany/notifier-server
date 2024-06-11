# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application 
RUN npm run build

# Stage 2: Create the final image
FROM node:20-alpine

WORKDIR /app

# Set env variables
ENV PORT = 3000

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

#Expose port
EXPOSE 3000

# Use this command to run built application
CMD [ "node", "dist/index.js" ]
