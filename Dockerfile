# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/dist/Jaco-Portfolio ./dist/Jaco-Portfolio

EXPOSE 4000

CMD ["node", "dist/Jaco-Portfolio/server/server.mjs"]
