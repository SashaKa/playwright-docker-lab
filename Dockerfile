# Image version MUST match @playwright/test in package.json, otherwise browsers are not found.
FROM mcr.microsoft.com/playwright:v1.65.1-noble

WORKDIR /app

# Install deps first: this layer is cached until package*.json changes.
COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
