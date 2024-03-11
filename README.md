# Тестовое задание от компании "Сектор Бизнеса" на должность backend Node.js разработчик

## Задание

### Разработайте API используя следующий стек технологий:

- Node.js
- Express.js
- MySQL

### Ваше API должно иметь следующие методы:

- Регистрация пользователя (POST /user/register)
- Авторизация пользователя (POST /user/login)
- Редактирование пользователя (PUT /profile/[id])
- Получение пользователя (GET /profile/[id])
- Получение всех пользователей с пагинацией (GET /profiles?page=1, 10 на страницу)

### Требования:

- У каждого пользователя должно быть ID, Имя, Фамилия, Email, Пароль, Пол (Мужской, Женский), Фото, Дата регистрации.
- При регистрации указывает только Имя, Email, Пароль.
- При редактировании можно менять всю информацию кроме ID, Пароля, Дата регистрации.
- При получение всех пользователей с пагинацией сортировать по дате регистрации.
- В базе данных хранить только название файла, все фото должны лежать в папке и раздаваться статически.

### Хорошо если будет:

- Валидация входных параметров
- Используется ORM (Любая)
- Используется JWT
- Пароль будет хранится как хеш
- Проверка фото по размеру, и формату (до 10 мб, .jpg, .png)
- Весь код не будет в контроллерах

После завершения работы сделайте экспорт базы данных и положите в корень проекта. Опубликуйте код на github.

### Реализовано

- [x] Регистрация пользователя
- [x] Авторизация пользователя
- [x] Редактирование пользователя
- [x] Получение данных одного пользователя по **id**
- [x] Получение данных всех пользователей
- [x] Структура таблицы пользователей соответствует установленной заданием
- [x] Выполнены требования к регистрации и авторизации
- [x] При получении пользователи сортируются по дате регистрации
- [x] В базе данных хранятся только названия фото, сами же они должны находиться в отдельной папке
- [x] Валидация входных параметров
- [x] Для работы с базой данных используется **ORM Sequelize**
- [x] Для аутентификации используются **JWT токены**
- [x] Пароли хранятся в виде хеша
- [x] При редактированиии профиля производится проверка фото по размеру и формату
- [x] Код вынесен в соответствущие обработчики

### Дополнительно

- [x] Добавлен маршрут для получения фото пользователя (с аутентификацией)
- [x] Добавлен маршрут для обновления **JWT токена**
- [x] Добавлен глобальный обработчик ошибок

## Разработанное приложение

**Для работы приложения необходим Node.js версии 20.0.0 и выше**

### Установка

Первым делом выполните форк репозитория, а затем клонируйте его себе на рабочую станцию и перейдите на нужную ветку.
Теперь в терминале выполните команду:
```bash
npm install
```
После завершения установки всех необходимых модулей переименуйте файл **.env.example** в **.env**. Откройте его и установите необходимые значения для переменных окружения.

Создайте в корневом каталоге программы папку, в которой будут храниться фотографии и запишите ee название в переменную окружения **PHOTO_DIR** в файле **.env**.

В папке **Dump20240312** расположена экспортированная база данных, использовавшаяся при разработке приложения. Необходимо выполнить ее импорт в вашу БД.

### Работа с приложением

Приложение имеет 7 конечных точек для взаимодействия, они разделены по 3 контроллерам.

Api для регистрации, авторизации и обновления JWT токена реализованы в контроллере **UserController**.
``` javascript
@JsonController()
export class UserController {

    @Post("/user/register")
    register(@Body({ required: true }) body: Register) {
        return registerHandler(body);
    }

    @Post("/user/login")
    login(@Res() response: express.Response, @Body({ required: true }) data: Login) {
        return login(data, response);
    }

    @Authorized()
    @Post("/refresh")
    refresh(@Req() request: express.Request, @Res() response: express.Response) {
        return refreshJWTToken(request, response);
    }
}
```

Api для редактирования данных пользователя и получения одного или нескольких пользователей реализованы в контроллере **ProfileController**.
``` javascript
@JsonController()
export class ProfileController {
    @Put("/profile/:id")
    @UseBefore(bodyParser.urlencoded())
    @Authorized()
    update(@UploadedFile("file", { options }) file: Express.Multer.File,
        @Req() request: Express.Request,
        @Body() body: Update,
        @Param("id") id: string) {
        return updateProfile(body, id, file, request);
    }

    @Get("/profile/:id")
    @Authorized()
    getOne(@Param("id") id: string) {
        return getOneProfile(id);
    }

    @Get("/profiles")
    @Authorized()
    getAll(@QueryParam("page", {
        isArray: false,
        type: Number,
        required: false
    })
    page: number = 1) {
        return getAllProfiles(page);
    }
}
```

Api для получения фото расположен в **PhotoController**.
``` javascript
@JsonController()
export class PhotoController {
    @Get("/photo/:file")
    @Authorized()
    gegtPhoto(@Res() res: express.Response, @Param("file") file: string) {
        return getPhoto(file, res);
    }
}
```

Методы помеченные декоратором **@Authorized** недоступны без использования JWT токена. Его наличие проверяется в методе **authCheck**.

**Для получения доступа к Api требующим авторизации, необходимо отправить JWT токен в заголовке authorization. Данные в заголовке должны иметь следующй вид: Bearer \<token\>.**

**При авторизации посредством метода login, accessToken будет отправлен в заголовке ответа authorization, а refreshToken в cookie в виде "refreshToken=\<token\>.**