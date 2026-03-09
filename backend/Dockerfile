
# С помощью директивы AS можно дать образу имя
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm ci
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /app/package*.json ./
# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает «пропустить dev-зависимости»
RUN npm ci --only=production
# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./dist/
EXPOSE 3000
# Указываем команду для запуска приложения
CMD ["node", "./dist/main.js"]