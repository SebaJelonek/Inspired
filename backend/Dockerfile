# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Install tsc-alias globally for the build step
RUN npm install -g tsc-alias
# Compile TS, then immediately rewrite the paths in the compiled JS
RUN npx tsc && tsc-alias

# --- Stage 2: Production Runtime Stage ---
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript code (now with standard relative paths)
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# Run node completely natively
CMD ["node", "dist/index.js"]
