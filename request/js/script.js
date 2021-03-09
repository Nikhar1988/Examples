window.addEventListener('DOMContentLoaded', function() {

   
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
      

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

     const modalTimerId = setTimeout(openModal, 50000);
    // Закомментировал, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
    ).render();

        //Form

    const forms = document.querySelectorAll('form'); // получаем HTML объект для работы
    
    const message = { // варианты реализаций уведомления.
        loading:'img/form/spinner.svg', // задаем путь нашему спинеру.
        success:'Спасибо! Скоро мы свами свяжемся',
        failure:'Что-то пошло не так...'
    }
    
    forms.forEach((item) => { // задаем действаия для каждого элемента нашей HTML коллекции.
        postData(item);
    });


    function postData(form) { // данной функций мы используем POST запрос при помощи старого способа отправки который уже не используется. 
        form.addEventListener('submit', (e) => { // сбрасываем базовые настройки браузера по перезагруске страницы.
            e.preventDefault();

        const statusMessage = document.createElement('img'); //создааем тег img
        statusMessage.src = message.loading; // присваеваем значения атрибуту тега.
        statusMessage.style.cssText =`
            display: block;
            margin: 0 auto;   
        `; // дописываем дополнительные свойсва нашему созданному элементу.
        form.insertAdjacentElement('afterend', statusMessage); // добавляем созданный элемент в верстку спомощью вот такого хитрого метода.

        const request = new XMLHttpRequest(); //создаем объект XMLHttpRequest();

        request.open('POST', 'server.php'); //request.open(method, url, async, login, password); - метод .open открывает соединение с сервером в котором мы заносим параметры запроса.
        /*Method - записывает тип запроса 'GET' или 'POST'.
        Url - адрес запроса. Путь формируется относительно файла HTML.
        Async - асинхронный или нет запрос.
        login, password - логин и пароль запроса.*/
               
        request.setRequestHeader( 'Content-type', 'application/json'); // пишем заголовок запроса в которой указали тип файла контента и кодировку HTML.

        const formData = new FormData(form); /*Когда мы используем связку XMLHttpRequest и FormData то заголок использовать 
         ненужно он прописывается автоматически, но это если мы в обычном формате делаем запрос если JSON то надо.*/

       const object = {}; // объект для POST запроса

        formData.forEach((value, key) => { // Перевод обычного формата FormData в формат JSON. 
            object[key] = value;  
        });

        const json = JSON.stringify(object); 
        
        request.send(json);


        /*Свойства request:
        request.status - показывает статус запроса(цифровой)
        request.statusText - показывает статус запроса(описанный словами)
        request.response - ответ нашего запроса
        request.readyState - статус запроса(ниже приведена таблица)*/

        request.addEventListener('load', () => { // - не отслеживает состояние а выводит итоговое значение ответа от сервера.
        /*request.addEventListener('readystatechange', () => {}) - данное событие отслеживает состояние нашего запроса на данный момент. Мы же не знаем когда нам ответит сервер.*/    
            
                if (request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);    
                form.reset(); // сбрасываем форму.
                statusMessage.remove();
                
            } else {
                showThanksModal(message.failure);
            }
        });




        });

    }

    function showThanksModal(massage) { //отвечает за появления окна после отправки формы
        const prevModalDialog = document.querySelector('.modal__dialog'); //место на которое будет вешатся окно

        prevModalDialog.classList.add('hide'); //прячем текущую реализаию
        openModal();  //открываем родителя .modal__dialog  
        /* function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            //clearInterval(modalTimerId);
        }*/

    const thanksModal = document.createElement('div'); // заменяем верстку в коде тем самым будем показывать другое окно(окно уведомления).
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${massage}</div> 
            </div>
        
        `; // устанавливам элементы из прошой реализации окна крестик и текст.

        modal.append(thanksModal); //добавляем элемент с версткой в тег родителя.
        setTimeout(() => { //асинхронная операция так как нам надо скрыть окно через некоторое время
             thanksModal.remove(); // удаляем элемент из верстки через 4 сек.
             prevModalDialog.classList.add('show'); // показывает начальную реализацию модального окна запроса
             prevModalDialog.classList.remove('hide');   
             closeModal(); // закрываем окно родителя в который добавляли новый элемент.
            /* function closeModal() {
                modal.classList.add('hide');
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }*/
        },4000)
    }

    

});



  

     
    
    
   
