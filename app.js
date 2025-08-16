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

// Можно добавить дополнительные функции:
// - Загрузка предыдущих данных
// - Расчет зарплаты в реальном времени
// - Валидация ввода
