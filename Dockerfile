# Stage 1: Build stage
FROM node:18-alpine AS builder

# Add metadata labels
LABEL org.opencontainers.image.title="Flowbite MCP"
LABEL org.opencontainers.image.description="Flowbite MCP server for UI components and theme generation"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/themesberg/flowbite-mcp"
LABEL org.opencontainers.image.licenses="MIT"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for building)
RUN npm ci

# Copy source files and data
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Copy data directory
COPY --from=builder /app/data ./data

# Set environment variables
ENV MCP_TRANSPORT_MODE=http
ENV MCP_PORT=3000
ENV MCP_HOST=0.0.0.0
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# Start server
CMD ["node", "build/index.js"]

