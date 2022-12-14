/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
  translation: {
    header: {
      appName: 'Hexlet Chat',
      logOut: 'Выйти',
    },
    login: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      footerText: 'Нет аккаунта? ',
      footerLink: 'Регистрация',
    },
    signUp: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      footerText: 'Есть аккаунт? ',
      footerLink: 'Авторизоваться',
    },
    chat: {
      header: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      channelList: {
        header: 'Каналы',
        channelControl: 'Управление каналом',
        removeChannel: 'Удалить',
        renameChannel: 'Переименовать',
      },
      messageField: {
        placeholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
        newMessage: 'Новое сообщение',
        submit: 'Отправить',
      },
    },
    modals: {
      add: {
        title: 'Добавить канал',
        channelName: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
      },
      remove: {
        title: 'Удалить канал',
        warning: 'Уверены?',
        cancel: 'Отменить',
        submit: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        channelName: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
      },
    },
    notFound: {
      pageNotFound: 'Страница не найдена',
      pageNotFoundAlt: 'Страница не найдена',
      textToLink: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    errorFound: {
      errorFound: 'Обнаружена ошибка: ',
      errorFoundAlt: 'Обнаружена ошибка',
      textToLink: 'Обновите ',
      link: 'страницу',
    },
    feedback: {
      incorrectLoginOrPassword: 'Неверные имя пользователя или пароль',
      passwordMatch: 'Пароли должны совпадать',
      usernameLength: 'от 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      required: 'Обязательное поле',
      uniqueName: 'Должно быть уникальным',
    },
    notices: {
      networkError: 'Ошибка соединения',
      serverError: 'Ошибка сервера. Попробуйте позже',
      unknownError: 'Что-то пошло не так',
      loadedDataError: 'Oшибка с загрузкой данных. Обновите страницу',
      userExists: 'Такой пользователь уже существует',
      addNewChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },
  },
};
