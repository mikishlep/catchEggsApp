// utils/telegramApi/backBtn.js

export function initBackButton(onBack) {
    if (!window.Telegram?.WebApp) {
        console.warn("Telegram WebApp не найден");
        return;
    }

    // Универсальное включение кнопки назад
    const showBackButton = () => {
        const data = JSON.stringify({ is_visible: true });

        // Web (iframe)
        if (window.parent && window.parent !== window) {
            window.parent.postMessage(
                JSON.stringify({ eventType: 'web_app_setup_back_button', eventData: { is_visible: true } }),
                'https://web.telegram.org'
            );
        }

        // Desktop / Mobile
        if (window.TelegramWebviewProxy?.postEvent) {
            window.TelegramWebviewProxy.postEvent('web_app_setup_back_button', data);
        }
    };

    showBackButton();

    // Навешиваем обработчик
    if (typeof window.Telegram.WebApp.onEvent === 'function') {
        window.Telegram.WebApp.onEvent('back_button_pressed', () => {
            if (typeof onBack === 'function') onBack();
        });
    } else {
        console.warn("Метод onEvent не доступен");
    }
}

export function hideBackButton() {
    if (!window.Telegram?.WebApp) return;

    const hideData = JSON.stringify({ is_visible: false });

    // Web
    if (window.parent && window.parent !== window) {
        window.parent.postMessage(
            JSON.stringify({ eventType: 'web_app_setup_back_button', eventData: { is_visible: false } }),
            'https://web.telegram.org'
        );
    }

    // Desktop / Mobile
    if (window.TelegramWebviewProxy?.postEvent) {
        window.TelegramWebviewProxy.postEvent('web_app_setup_back_button', hideData);
    }
}