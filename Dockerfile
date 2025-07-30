FROM node:lts-alpine3.21 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:lts-alpine3.21 AS runner
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY start.sh .

RUN chmod +x start.sh

RUN npm install --production

ENV DATABASE_URL="postgresql://myuser:mypassword@postgres_container:5432/mydatabase"

CMD ["sh", "./start.sh"]