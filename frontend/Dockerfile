# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source
COPY . .
RUN npm run build -- --logLevel error

# Production stage
FROM nginx:stable-alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to handle React routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
