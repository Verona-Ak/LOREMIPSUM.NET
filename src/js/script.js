window.addEventListener('DOMContentLoaded', function(e) {
    'use strict';

    // Скроллбар. Подключение библиотеки //
    $(".nano").nanoScroller({preventPageScrolling: true, alwaysVisible: true});

    // Кастомный select //

    // Сворачивание/разворот селекта
    $(document).on('click', '.select__button', function() {
        this.classList.toggle('is-active');
        this.classList.contains('is-active') ? this.nextElementSibling.classList.add('is-visible') : this.nextElementSibling.classList.remove('is-visible');
    });

    // Выбор из списка
    $(document).on('click', '.select__item', function() {
        // Выбор элемента
        selectItem(this);
        // Синхронизация работы кастомного и дефолтного селектов
        selectSynchronization(this);
    });

    function selectItem(item) {
        // Все элементы из текущего селекта
        const allItems = item.closest('.select__list').children;

        // Убираем "is-selected" со всех элементов и добавляем к выбранному
        for(let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove('is-selected');
            if(allItems[i] == item) {
                allItems[i].classList.add('is-selected');
            }
        }

        // Вставляем выбранный элемент в кнопку select
        const selectBtns = document.querySelectorAll('.select__button');

        for(let i = 0; i < selectBtns.length; i++) {
            if(item.closest('.select') == selectBtns[i].closest('.select')) {
                // Вставляем название в span и делаем кнопку не активной
                selectBtns[i].children[0].textContent = item.getAttribute('data-value');
                selectBtns[i].classList.remove('is-active');
                break;
            }
        }
    }

    function selectSynchronization(item) {
        const defaultSelect = document.querySelectorAll('select');

        for(let i = 0; i < defaultSelect.length; i++) {
            // Берём только тот деф. селект, кот. соответствует выбранному элементу из кастомного селекта
            if(item.closest('.select') == defaultSelect[i].closest('.select')) {
                const optionsMass = defaultSelect[i].children;
            
                for(let j = 0; j < optionsMass.length; j++) {
                    optionsMass[j].select = false;
                    optionsMass[j].removeAttribute('selected');

                    if(optionsMass[j].value == item.getAttribute('data-value')) {
                        optionsMass[j].select = true;
                        optionsMass[j].setAttribute('selected', 'selected');
                    }
                }
            }
        }
    }

    // Если клик мимо кнопки select и моми скроллбара (+ закрытие селекта при выборе варианта)
    window.addEventListener('click', function(e) {
        if(e.target) {
            if(!e.target.closest('.select__button') && 
            !e.target.classList.contains('select__button') &&
            !e.target.closest('.nano-pane') &&
            !e.target.classList.contains('nano-pane')) {
                $('.select__button').removeClass('is-active');
                $('.select__custom-item').removeClass('is-visible');
            } else {
                $('.select__custom-item').each(function(index, elem) {
                    if(elem.closest('.select') != e.target.closest('.select')) {
                        $(elem).removeClass('is-visible');
                        $(elem).prev().removeClass('is-active');
                    }
                });
            }   
        }
    }); 



    // Работа ползунка //
    $(document).on('input', '.range__input', function() {
        const rangePercent = document.querySelectorAll('.range__percent');

        rangePercent.forEach((elem) => {
            if(elem.closest('.range') == this.closest('.range')) {
                elem.textContent = this.value + ' %';
            }
        });
    });


    // Кастомный input file //
    $(document).on('change', '.form__file-input', function() {
        this.files && this.files.length > 0 ? this.closest('.form__file-label').classList.add('is-active') : this.closest('.form__file-label').classList.remove('is-active');
    });


    // Меню на планшетах и мобильных //
    const hamburgerHeader = document.querySelector('.header__hamburger'),
        mobileHamburger = document.querySelector('.mobile-menu__hamburger');

    checkHamburger();
    // При изменения размера окна
    window.addEventListener('resize', checkHamburger);

    hamburgerHeader.addEventListener('click', () => {
        if(hamburgerHeader.classList.contains('has-popup')) {
            scrollLock.addScrollableSelector('.mobile-menu__wrapper-outer');
            scrollLock.disablePageScroll();
            $('#mobile').fadeIn('400');
        }
    });

    mobileHamburger.addEventListener('click', () => {
        scrollLock.enablePageScroll();
        $('#mobile').fadeOut('400');
    });

    function checkHamburger() {
        window.matchMedia('(max-width: 1024px)').matches ? hamburgerHeader.classList.add('has-popup') : hamburgerHeader.classList.remove('has-popup');
    }
});
