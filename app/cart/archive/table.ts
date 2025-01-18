import { IProduct } from '@/api/products/products.types';

// <td>${el.availability}</td>
// <td>${el.sales}</td>

export const getTable = (products: IProduct[]) => {
  return `<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 25.0221%;"><col style="width: 25.0221%;"><col style="width: 25.0221%;"><col style="width: 25.0221%;"></colgroup>
    <thead>
        <tr>
            <th>Код товара</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена за штуку</th>
            <th>Сумма</th>
            <th>Бренд</th>
            <th>Скидка</th>
            <th>Категории</th>
            <th>В наличии</th>
            <th>Продано</th>
        </tr>
        </thead>
        <tbody>
        ${products
          .map(
            (el: IProduct) => `
                <tr>
                    <td>${el.code}</td>
                    <td>${el.name}</td>
                    <td>${el.count}</td>
                    <td>${el.price}</td>
                    <td>${el.price * el.count}</td>
                    <td>${el.brand}</td>
                    <td>${el.discount}</td>
                    <td>none</td>
                   
                </tr>
            `
          )
          .join('')}
        </tbody>
        </table>
        `;
};
