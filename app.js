// Инициализация WebApp Telegram
const tg = window.Telegram.WebApp;

// Расширяем WebApp на весь экран
tg.expand();

// Обработчик отправки формы
document.getElementById('workForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = {
        hours: parseInt(document.getElementById('hours').value),
        orders: parseInt(document.getElementById('orders').value),
        night_orders: parseInt(document.getElementById('nightOrders').value),
        timestamp: new Date().toISOString()
    };
    
    // Валидация данных
    if (formData.hours <= 0 || formData.orders < 0 || formData.night_orders < 0) {
        showError("Пожалуйста, введите корректные значения");
        return;
    }
    
    // Отправляем данные в бот
    tg.sendData(JSON.stringify(formData));
    
    // Закрываем WebApp после отправки
    tg.close();
});

// Показать ошибку
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.marginTop = '10px';
    errorElement.style.textAlign = 'center';
    
    const form = document.getElementById('workForm');
    form.appendChild(errorElement);
    
    // Автоматическое удаление ошибки через 3 секунды
    setTimeout(() => {
        if (form.contains(errorElement)) {
            form.removeChild(errorElement);
        }
    }, 3000);
}


// Расчет в реальном времени
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateSalary);
});

function calculateSalary() {
    const config = {
        hourRate: 500,
        orderRate: 200,
        nightBonus: 300
    };
    
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const orders = parseInt(document.getElementById('orders').value) || 0;
    const nightOrders = parseInt(document.getElementById('nightOrders').value) || 0;
    
    const total = (hours * config.hourRate) + 
                 (orders * config.orderRate) + 
                 (nightOrders * config.nightBonus);
    
    // Показываем результат пользователю
    console.log(`Предварительный расчет: ${total} руб.`);
}

// Проверка окружения Telegram
function initWebApp() {
    if (!window.Telegram?.WebApp) {
        showError("Это приложение работает только в Telegram");
        return false;
    }
    
    window.Telegram.WebApp.expand();
    return true;
}

// Основная функция
document.addEventListener('DOMContentLoaded', function() {
    if (!initWebApp()) return;
    
    const form = document.getElementById('workForm');
    if (!form) {
        console.error("Форма не найдена");
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            const data = {
                hours: parseInt(document.getElementById('hours').value),
                orders: parseInt(document.getElementById('orders').value),
                night_orders: parseInt(document.getElementById('nightOrders').value || 0),
                user_id: window.Telegram.WebApp.initDataUnsafe.user?.id
            };
            
            if (isNaN(data.hours) || isNaN(data.orders)) {
                throw new Error("Заполните обязательные поля");
            }
            
            console.log("Отправка данных:", data);
            window.Telegram.WebApp.sendData(JSON.stringify(data));
            window.Telegram.WebApp.close();
            
        } catch (error) {
            console.error("Ошибка:", error);
            showError(error.message);
        }
    });
});

// Показ ошибок
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.replaceWith(errorDiv);
    } else {
        document.getElementById('workForm').appendChild(errorDiv);
    }
    
    setTimeout(() => errorDiv.remove(), 3000);
}
