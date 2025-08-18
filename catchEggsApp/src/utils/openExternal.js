export function openExternal(link) {
    if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(link);
    } else {
        window.open(link, '_blank');
    }
}