https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md

RS Lang – приложение для изучения иностранных слов, включающее электронный учебник с базой слов для изучения, мини-игры для их повторения, страницу статистики для отслеживания индивидуального прогресса.

электронная версия учебника "4000 Essential English Words" - из этого учебника необходимо воспроизвести Word List
приложение Lingualeo - из этого приложения необходимо воспроизвести мини-игры "Саванна", "Аудиовызов", "Спринт".
Для доступа к играм "Аудиовызов" и "Спринт" понадобится Lingualeo Premium. Бесплатный доступ к Lingualeo Premium на один день откроется после 5 дней тренировки. Также для знакомства с геймплеем можно использовать видео: Саванна и Аудиовызов, Спринт

### Лучшие работы студентов предыдущего набора
(сейчас требования к заданию изменились)

https://rslang-team16-arcanar7.web.app/

https://rslang-team41-jekman87.netlify.app/

https://rslang-team5-alekchaik.netlify.app/

https://rslang-team11-kagafon.netlify.app/

https://rslang-team69-dimonwhite.netlify.app/

https://rslang-team26-evgender.netlify.app/

https://rslang-team64-viktorsipach.netlify.app/

### Исходные данные
Коллекция "4000 essential english words". Коллекция содержит 3600 часто употребляемых английских слов, изучение которых вам необходимо организовать. Слова в коллекции отсортированы от более простых и известных к более сложным. Первые 400 наиболее часто употребляемых слов в коллекцию не вошли. Считается, что это базовый запас взрослого человека, оставшийся от предыдущих попыток изучения языка. Вся коллекция разбита на шесть групп, в каждой группе 30 страниц, на каждой странице 20 слов для изучения.

## Структура приложения

- главная страница приложения

- электронный учебник со словарём

- мини-игры "Саванна", "Аудиовызов", "Спринт", "Своя игра"

- страница статистики

### Описание функциональных блоков

#### 1 Главная страница приложения
выполняет функцию промо-страницы, её оформление определяет первое впечатление о приложении
главная страница приложения содержит:
- меню с навигацией по учебнику, ссылками на мини-игры и статистику. Меню или иконка меню отображается на всех страницах приложения
- описание возможностей и преимуществ приложения
- небольшое (5-7 минут) видео с демонстрацией работы приложения
- раздел "О команде" с фото и ссылками на гитхабы всех участников команды, описанием вклада в разработку приложения каждого из них. При желании данный раздел можно вынести в отдельную страницу
- footer со ссылками на гитхабы авторов приложения, год создания приложения, логотип курса со ссылкой на курс. footer отображается на всех страницах приложения за исключением мини-игр.

  #### 2 Электронный учебник
  - электронный учебник состоит из шести разделов, которым соответствуют шесть групп слов коллекции исходных данных. В каждом разделе 30 страниц. На каждой странице выводится:
  - меню или иконка меню
  - иконка настроек
  - список из 20 слов
  - ссылки на мини-игры "Саванна", "Аудиовызов", "Спринт", "Своя игра" для повторения изученных слов
  - навигация по страницам со стрелками для перехода к следующей и предыдущей страницам и номером текущей страницы 
  - также необходимо продумать навигацию по шести разделам учебника и предусмотреть небольшие различия в оформлении каждого раздела. Например, можно использовать для каждого раздела индикатор определённого цвета
  - при перезагрузке страницы открывается последняя открытая страница приложения
  
  ##### Настройки
  - в настройках учебника у пользователя есть возможность указать:
  - нужно ли отображать в списке слов перевод изучаемого слова и перевод предложений с ним
  - нужно ли отображать возле каждого слова кнопки, при клике по которым данное слово добавляется в раздел словаря "Сложные слова" или "Удалённые слова"
  
  ##### Список слов
  - для каждого слова отображается:
  - само слово, его транскрипция, его перевод
  - предложение с объяснением значения изучаемого слова, его перевод
  - предложение с примером использования изучаемого слова, его перевод
  - картинка-ассоциация к изучаемому слову
  - иконка аудио при клике по которой последовательно звучит произношение изучаемого слова, произношение предложения с объяснением его значения, произношение предложения с примером его использования
  - кнопки, при клике по которым изучаемое слово добавляется в разделы словаря "Сложные слова" или "Удалённые слова"
  - результат изучения/повторения слова в мини-играх
  - если слово добавлено в раздел словаря "Сложные слова", оно остаётся на странице учебника, и его стиль изменяется или возле него выводится индикатор, указывающий, что оно относится к сложным словам
  - если слово добавлено в раздел словаря "Удалённые слова", оно удаляется со страницы учебника. Если пользователь удалит со страницы все слова, страница удаляется
  
  ##### Словарь
  - словарь является частью учебника. В словаре есть разделы "Изучаемые слова", "Сложные слова", "Удалённые слова"
  - в раздел "Изучаемые слова" попадают слова, которые были задействованы в мини-играх, если мини-игры открывались кликом по ссылке на странице учебника или на странице раздела словаря "Сложные слова". Также в раздел "Изучаемые слова" попадают слова, которые пользователь отметил как сложные. Возле сложных слов есть индикатор или они выделены стилем, так же, как и на странице учебника
  - возле каждого слова в разделе "Изучаемые слова" указывается результат изучения - сколько раз слово было правильно угадано в мини-играх, сколько раз пользователь ошибался
  - для каждого раздела и каждой страницы учебника указывается количество изучаемых слов и общий результат их изучения
  - в разделы словаря "Сложные слова" и "Удалённые слова" слова попадают, если пользователь кликнул по соответствующим кнопкам возле слов на страницах учебника
  - страницы разделов словаря "Сложные слова" и "Удалённые слова" выглядят точно так же, как страницы учебника: формируются страницы, на каждой из которых список из 20 слов, создаётся новая страница, на страницах есть ссылки на мини-игры для повторения слов. Слова из разных разделов учебника попадают на разные страницы, на странице есть индикатор, указывающий, к какому разделу учебника она относитеся. Если слов больше 20, создаётся новая страница. Единственное отличие в списке слов вместо кнопок, при клике по которым изучаемое слово добавляется в разделы словаря "Сложные слова" или "Удалённые слова", в словаре возле слова отображается кнопка "Восстановить", которая удаляет слово из словаря и восстанавливает его на странице электронного учебника

   #### Мини-игры "Саванна", "Аудиовызов", "Спринт", "Своя игра"
   - мини-игры предназначены для изучения и повторения слов электронного учебника
   - мини-игры "Саванна", "Аудиовызов" и "Спринт" повторяют одноимённые мини-игры приложения Lingualeo
   - мини-игру с условным названием "Своя игра" вы придумываете сами
   - слова, которые используются в мини-играх, отличаются в зависимости от того, откуда вы открываете игру: по ссылке в меню или по ссылке на странице учебника
   - если мини-игра открывается по ссылке в меню, в ней есть возможность выбрать один из шести уровней сложности. Уровень сложности мини-игры определяет раздел учебника, слова из которого в ней будут использоваться,  
   - если мини-игра открывается по ссылке на странице учебника, она используется для повторения слов, размещённых на этой странице. В этом случае в игре нет возможности выбрать уровень сложности и используются те слова, которые размещены на данной странице учебника. Если 20 слов для мини-игры не хватает, в ней задействуются слова из предыдущих страниц учебника. Если предыдущих страниц нет или недостаточно, игру можно заканчивать досрочно, когда исчерпаются все доступные слова
   - слова, которые использовались в мини-играх, открытых по ссылке на странице учебника или на странице раздела словаря "Сложные слова", попадают в раздел словаря "Изучаемые слова"
    
    #### Страница статистики
    - на странице статистики отображается краткосрочная статистика по результатам каждого дня и долгосрочная статистика за весь период изучения
    - в краткосрочной статистике указывается количество изученных слов, процент правильных ответов и самая длинная серия правильных ответов по каждой мини-игре отдельно, а также общее количество изученных слов и процент правильных ответов за день
    - в долгосрочной статистике представлены два графика. На одном из них отображается количество изученных слов за каждый день изучения, на другом - увеличение общего количества изученных слов за весь период изучения по дням.

    #### Бекенд

   Что уже есть:
   
   создан репозиторий с бекендом на его основе создан ReactLearnWords API, позволяющий получить исходные данные
   
   создана ReactLearnWords wiki с инструкциями по созданию базы данных MongoDB, деплою бекенда на heroku, примерами получения исходных данных
   
   Что нужно сделать:
   создать свою копию бекенда. Для этого: форкните репозиторий с бекендом для создания базы данных MongoDB и деплоя бекенда на heroku следуйте туториалам ReactLearnWords wiki
   
   - вам необходимо добавить в бекенд возможность при регистрации нового пользователя указать его имя и загрузить фото

### Технические требования
- работа приложения проверяется в браузере Google Chrome последней версии
- необходимо использовать React
- можно использовать bootstrap, material design, css-фреймворки, html и css препроцессоры
- можно использовать js-библиотеки
- разрешается использовать jQuery только в качесте подключаемой зависимости для UI библиотек. Использование jQuery в основном коде приложения не допускается
- рекомендуется использовать TypeScript
- рекомендуется создать и использовать бекенд. Данная рекомендация связана с очень высоким спросом на фронтенд-разработчиков, знакомых хотя бы с основами node.js.
запрещено копировать код других студентов, демо, примеров, которые приводятся в задании. Этот запрет касается html, css, js кода. Можно использовать небольшие фрагменты кода со Stack Overflow, других самостоятельно найденных источников в интернете, за исключением github-репозиториев студентов курса. Возле использованного чужого фрагмента кода в комментарии указывается ссылка на источник.

### Как сабмитить задание
Участникам команд необходимо записаться в таблицу, ссылка на которую будет размещена в анонсах

Ссылку на pull request в rs app сабмитит только тимлид

Убедитесь, что pull request доступен для проверки. Для этого откройте ссылку, которую сабмитите в rs app, в режиме инкогнито браузера

Если задание не засабмитить до дедлайна, оно не попадёт на распределение при кросс-чеке и за него не будут выставлены баллы

### Требования к оформлению приложения
#### особое внимание обратите на качество оформления приложения. 
Как прототип можно использовать подходящие шаблоны, размещённые на behance, dribbble, pinterest

Качественное приложение характеризуется проработанностью деталей, вниманием к типографике (не больше трёх шрифтов на странице, размер шрифта не меньше 14 рх, оптимальная контрастность шрифта и фона), тщательно подобранным контентом
вёрстка адаптивная. Минимальная ширина страницы, при которой проверяется корректность отображения приложения - 500рх

Интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации
единство стилей всех страниц приложения - одинаковые шрифты, стили кнопок, отступы, одинаковые элементы на всех страницах приложения имеют одинаковый внешний вид и расположение. Цвет элементов и фоновые изображения могут отличаться. В этом случае цвета используются из одной палитры, а фоновые изображения из одной коллекции.

#### Требования к мини-играм
- все игры выполнены в одном стиле, при этом в оформлении каждой игры есть индивидуальные отличия (цветовая схема, фоновый рисунок, эффекты анимации и т. д.)
мини-игру можно развернуть во весь экран
- по окончанию каждой игры выводятся результаты мини-игры
- одинаковые элементы игр, такие как результаты мини-игры, блок выбора уровня сложности, стартовый экран, если он есть, и т.д. идентичны по внешнему виду, расположению на странице, функционалу
- управлять игрой можно как мышкой, так и клавишами на клавиатуре, как это реализовано в оригинальных играх
- если мини-игра запускается из меню, в ней можно выбрать один из шести уровней сложности, которые отличаются тем, слова какой из шести частей коллекции исходных данных в ней задействованы
- если мини-игра запускается со страницы учебника, в ней используются слова из той страницы учебника, на которой размещена ссылка на игру. Если размещённых на странице слов для игры недостаточно, задействуются слова с предыдущих страниц

### Критерии оценивания

Максимальный балл за задание 600

500 баллов за приложение

100 баллов за презентацию

Для удобства проверки необходимо записать и разместить на YouTube небольшое (5-7 мин) видео для проверяющих с объяснением как реализован каждый пункт из перечисленных в критериях оценки. Особое внимание обратите на те пункты критериев оценки, которые проверяющий проверить не сможет, например, на то как вы реализовали базу данных, как задеплоили бекенд, как выглядит долгосрочная статистика и т.д. Ссылку на видео можно добавить в описание pull request или в footer приложения добавить иконку YouTube со ссылкой на видео.

При оценивании приложения проверяются все требования, описанные в пунктах Описание функциональных блоков, Требования к оформлению приложения, Требования к мини-играм. Если какие-то из перечисленных требований не выполняются, снимаем часть баллов. В комментарии к оценке необходимо указать какие пункты не выполнены или выполнены частично.

#### Вёрстка, дизайн, UI +40
- вёрстка, дизайн, UI главной страницы приложения +10
- вёрстка, дизайн, UI электронного учебника +10
- вёрстка, дизайн, UI страницы статистики +10
- оригинальный интересный качественный дизайн приложения +10

#### Главная страница приложения +40
- меню +10
- описание возможностей и преимуществ приложения +10
- видео с демонстрацией работы приложения +10
- раздел "О команде" +10

#### Электронный учебник +50
- страницы и разделы учебника +10
- настройки +10
- список слов +20
- навигация по страницам и разделам учебника +10

#### Словарь +40
- раздел "Изучаемые слова" +20
- раздел "Сложные слова" +10
- раздел "Удалённые слова" +10

#### Мини-игры +200  (максимум +50 баллов за каждую игру)

Мини-игра может оцениваться в 30, 40 или 50 баллов. 

При оценке предложенной командой игры, её сложность, интересность, полезность, качество реализации сравнивается с другими мини-играми и оценивается по сравнению с ними.

- игра в основном соответствует прототипу, является его упрощённой версией +30

- игра полностью повторяет прототип и детали его работы. Выполняются все перечисленные в задании требования к мини-играм +40

- игра является улучшенной версией прототипа как с точки зрения внешнего вида и оформления, так и удобства работы. Присутствует дополнительный функционал, улучшающий качество приложения +50

#### Страница статистики +40

- краткосрочная статистика +20

- долгосрочная статистика +20

#### Бекенд +60

- собственная копия бекенда размещена на heroku или другом бесплатном хостинге +20

- приложение использует данные из собственного API +10

- при регистрации нового пользователя можно указать его имя. При перезагрузке клиента данные о пользователе сохраняются +10

- при регистрации нового пользователя можно загрузить фото +10

- реализована авторизация и разавторизация пользователя. Основная часть приложения доступна без авторизации. Авторизация необходима только для хранения долгосрочной статистики и формирования словаря +10

#### Дополнительный функционал +30**

- реализован не указанный в задании дополнительный функционал. Оценивается оригинальная идея, вклад в улучшение качества приложения, полезность, сложность и качество выполнения +20

- написано не меньше 10 юнит-тестов, использующих различные методы jest +10
