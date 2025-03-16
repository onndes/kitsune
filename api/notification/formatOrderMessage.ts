import { IOrderSubmissionData } from '@/app/cart/formOrder.t';

export function formatOrderMessage(order: IOrderSubmissionData): string {
  return `
  📦 *Новий заказ*
  👤 Клієнт: ${order.surname} ${order.name} ${order.middleName || ''}
  📞 Номер телефону: ${order.number}
  ✉️ Email: ${order.email}
  🗺️ Місто: ${order.city}
  🏠 ${
    order.warehouse
      ? `Склад: ${order.warehouse}`
      : `Адреса: ${order.address || 'Не вказано'}`
  }
  🚚 Доставка: ${order.delivery}
  📦 Варіант доставки: ${order.variantsDelivery}
  🎟️ Промокод: ${order.voucher || 'Не вказано'}
  💬 Коментар: ${order.comments || 'Немає'}
    `.trim();
}
