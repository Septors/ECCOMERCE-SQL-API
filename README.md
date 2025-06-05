# Сервіс до інтернет-магазину

Цей бекенд-проєкт є частиною системи інтернет-магазину з підтримкою авторизації, управління кошиком, товарами та замовленнями.    

# Технології:

-Node.js

-Express

-PostgreSQL з Prisma ORM

-JWT (access + refresh токени)

-bcrypt (хешування паролів)

-Joi (валідація)

-CORS, Helmet, cookie-parser

# Аутентифікація:

-POST /register — реєстрація нового користувача

-POST /login — вхід

-GET /profile — отримання профілю (за токеном)

-POST /refresh — оновлення токенів

-PATCH /change-password — зміна паролю

-DELETE /logout — вихід

# Кошик:

-GET /cart — отримати всі товари у кошику

-POST /cart — додати товар до кошика

-DELETE /cart/:id — видалити товар

-PATCH /cart — очистити кошик

# Товари

-GET /items — список товарів

-GET /items/:id — деталі товару

-POST /items — створення товару (роль ADMIN)

-PATCH /items/:id — оновлення товару (роль ADMIN)

-DELETE /items/:id — видалення товару (роль ADMIN)

# Замовлення:

-GET /orders — отримати замовлення користувача

-POST /orders — створити замовлення

-PATCH /orders — змінити статус замовлення

# Структура моделей (Prisma):

User      — користувачі з ролями USER/ADMIN

Item      — товари

Cart      — кошик з загальною сумою

ItemsCart — зв'язок товарів і кошика (кількість)

Order     — замовлення (user + cart)

#  Структура проєкту

-routes/ — маршрути для auth, cart, items, orders

-controllers/ — логіка обробки запитів

-middlewares/ — перевірка токенів, прав доступу, валідація

-services/ — логіка для роботи з базою

-utils/ — допоміжні функції

# Конфігурація:

Для запуску проекту потрібно створити файл .env в корені проєкту з наступними змінними:

DATABASE_URL=postgresql://user:password@host:port/dbname

ACCESS_SECRET=ваш_секрет_для_access_токена

REFRESH_SECRET=ваш_секрет_для_refresh_токена

#  Ігноровані файли (.gitignore)

У проекті є файл .gitignore з таким вмістом:

node_modules

.env

/generated/prisma

# Запуск:

npm install

npx prisma generate

npx prisma migrate dev

npm run dev


