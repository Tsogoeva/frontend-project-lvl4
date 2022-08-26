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
    feedback: {
      incorrectLoginOrPassword: 'Неверные имя пользователя или пароль',
      passwordMatch: 'Пароли должны совпадать',
      usernameLength: 'от {{min}} до {{max}} символов',
      passwordLength: 'Не менее {{min}} символов',
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
