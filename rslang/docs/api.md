
    baseUrl - http://rslang.tk:3000/
    baseUrl - https://rocky-basin-33827.herokuapp.com/
    baseUrl - https://serene-falls-78086.herokuapp.com/
    
    /doc - документация api


getUserData - получение даных пользователя
  
  getUserData(url, token)
   
  addUrl:
  user - /users/{userId}
  user words - /users/{userId}/words
  user word - /users/{userId}/words/{wordId}
  user settings - /users/{userId}/settings
  user statistic - /users/{userId}/statistics

  \users\{id}\statistics и \users\{id}\settings
Объект optional у UserWord, Statistics, Settings имеет ограничение по размеру - не более 30 полей и общая длина объекта после JSON.stringify() не должна превышать 1500 символов. Структуру этих объектов вы разрабатываете сами исходя из требований и вашей реализации задачи.

getWords - слова

  GET для получения списка слов: https://rocky-basin-33827.herokuapp.com/words?page=2&group=0 - получить слова со 2-й страницы группы 0
Строка запроса должна содержать в себе номер группы и номер страницы. Всего 6 групп(от 0 до 5) и в каждой группе по 30 страниц(от 0 до 29). В каждой странице по 20 слов. Группы разбиты по сложности от самой простой(0) до самой сложной(5).

  getUserData(url)
  
  addUrl:
  words - /words?page=2&group=0 - получить слова со 2-й страницы группы 0
Строка запроса должна содержать в себе номер группы и номер страницы. Всего 6 групп(от 0 до 5) и в каждой группе по 30 страниц(от 0 до 29). В каждой странице по 20 слов. Группы разбиты по сложности от самой простой(0) до самой сложной(5).

  word - /words/{wordId}