# Film React Nest

Full-stack приложение для афиши фильмов (React + NestJS)

## 🚀 Деплой

Проект развернут и доступен по адресам:

- **Сайт (фронтенд)**: [http://158.160.223.181](http://158.160.223.181)
- **API**: [http://158.160.223.181/api/afisha/films](http://158.160.223.181/api/afisha/films)
- **Документация API (Swagger)**: [http://158.160.223.181/api/docs](http://158.160.223.181/api/docs)
- **pgAdmin** (только через SSH-туннель): `http://localhost:8080`

## 🛠️ Технологии

- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Infrastructure**: Docker, GitHub Actions, Yandex Cloud

## 📦 CI/CD

Автоматическая сборка и публикация Docker-образов настроена через GitHub Actions:

- `ghcr.io/alekigsm/film-backend:latest`
- `ghcr.io/alekigsm/film-frontend:latest`
- `ghcr.io/alekigsm/film-nginx:latest`

## 🧪 Локальный запуск

```bash
# Клонировать репозиторий
git clone https://github.com/alekigsm/film-react-nest.git
cd film-react-nest

# Запустить в dev-режиме
docker-compose up -d

# FILM!

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` 
* `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/practicum`.  

MongoDB должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.




