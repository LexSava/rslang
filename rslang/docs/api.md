
    baseUrl - https://serene-falls-78086.herokuapp.com
    
getUserData - получение даных пользователя
  
  getUserData(url, token)
   
  addUrl:
  user - /users/{userId}
  user words - /users/{userId}/words
  user word - /users/{userId}/words/{wordId}
  user settings - /users/{userId}/settings
  user statistic - /users/{userId}/statistics

getWords - слова
  
  getUserData(url)
  
  addUrl:
  words - /words?page=2&group=0 - получить слова со 2-й страницы группы 0
Строка запроса должна содержать в себе номер группы и номер страницы. Всего 6 групп(от 0 до 5) и в каждой группе по 30 страниц(от 0 до 29). В каждой странице по 20 слов. Группы разбиты по сложности от самой простой(0) до самой сложной(5).

  word - /words/{wordId}