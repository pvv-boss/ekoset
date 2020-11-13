export const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
export const phoneTest = /^(\+7|8){0,1}[\s|\-]*?[\(]{0,1}[\d]{3}[\)]{0,1}[\s|\-]*?[\d]{3}[\s|\-]*?[\d]{4}$/
export const passwordStrenghtTest = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
export const invalidEmailMessage = 'Неверно указан email'
export const invalidPasswordMessage = 'Пароль должен содержать не менее 8 символов, среди них: цифры, прописные и строчные буквы'

