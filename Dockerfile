# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Copy the built application
COPY --from=builder /app/dist/Jaco-Portfolio ./dist/Jaco-Portfolio

# Use a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 angularjs && \
    chown -R angularjs:nodejs /app

USER angularjs

EXPOSE 4000

CMD ["node", "dist/Jaco-Portfolio/server/server.mjs"]
