// Берём элемент DOM для вывода таймера
const timerShow = document.getElementById("timer");

//Функция для добавления незначащих нулей (года / месяца / дня / часов / минут / секунд /)
function format(val) {
    if (val < 10) {
        return `0${val}`
    }
    return val;
}

// Функция для вычисления разности времени
function diffSubtract(date1, date2) {
    return date2 - date1;
}

// Массив данных о времени
const endDate = {
    "year": "2023", // Год
    "month": "05", // Номер месяца
    "day": "31", // День
    "hours": "00", // Час
    "minutes": "00", // Минуты
    "seconds": "00" // Секунды
}

const endDateStr = `${endDate.year}-${endDate.month}-${endDate.day}T${endDate.hours}:${endDate.minutes}:${endDate.seconds}`;

// Запуск интервала таймера
timer = setInterval(function() {
    // Получение времени сейчас
    const now = new Date();
    // Получение заданного времени
    const date = new Date(endDateStr);
    // Вычисление разницы времени 
    const msLeft = diffSubtract(now, date);
    if (msLeft <= 0) {
        // Выключаем интервал
        clearInterval(timer);
        // Выводим сообщение об окончании
        alert("Время закончилось");
    } else {
        // Получаем время зависимое от разницы
        const res = new Date(msLeft);
        // Делаем строку для вывода
        const strTimer = `${format(res.getUTCDate() - 1)} : ${format(res.getUTCHours())} : ${format(res.getUTCMinutes())} : ${format(res.getUTCSeconds())}`;
        // Выводим время
        timerShow.innerHTML = strTimer;
    }
}, 1000)




// Функция для отправки данных формы на сервер
function submitForm(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    const email = document.getElementById('email').value;

    // Создаем объект с данными формы
    const formData = {
        email: email,
    };

    // Отправляем данные на сервер с использованием fetch и метода POST
    fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка при отправке данных формы.');
            }
        })
        .then(data => {
            // Обработка успешного ответа от сервера
            console.log(data);
            alert('Данные успешно отправлены!');
        })
        .catch(error => {
            // Обработка ошибок
            console.error(error);
            alert('Произошла ошибка при отправке данных формы.');
        });
}

// Получаем ссылку на форму
const form = document.getElementById('subscription-form');

// Назначаем обработчик события отправки формы
form.addEventListener('submit', submitForm);