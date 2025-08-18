import { hapticFeedback } from '@telegram-apps/sdk';

// Cредняя вибрация
export function vibrateMedium() {
    if (hapticFeedback.impactOccurred.isAvailable()) {
      hapticFeedback.impactOccurred('medium');
    } else {
      console.log('Вибрации нет.');
    }
}