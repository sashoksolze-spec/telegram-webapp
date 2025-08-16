// Проверяем, открыто ли в Telegram Web App
if (window.Telegram && Telegram.WebApp) {
    const webApp = Telegram.WebApp;

    webApp.expand(); // Развернуть на весь экран
    webApp.enableClosingConfirmation(); // Запросить подтверждение закрытия

    document.getElementById("sendDataBtn").addEventListener("click", () => {
        webApp.sendData("Данные отправлены в бота! ✅");
        webApp.close(); // Закрыть Web App
    });
} else {
    console.log("Открыто вне Telegram");
