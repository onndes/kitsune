import { db } from '@/firebase';
import { IWarehouse } from '@/types/novaPoshta.t';
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

export const uploadWarehouses = async (warehouses: IWarehouse[]) => {
  try {
    const batchSize = 500;
    console.log('State: uploading warehouses');
    for (let i = 19000; 9 < warehouses.length; i += batchSize) {
      const batch = warehouses.slice(i, i + batchSize);
      const writeBatchRef = writeBatch(db);

      batch.forEach((branch) => {
        const branchRef = doc(
          collection(db, `postOffices/${'novaPost'}/warehouses`),
          branch.Ref
        );
        // setDoc(writeBatchRef, branchRef, branch);
        writeBatchRef.set(branchRef, branch);
      });

      await writeBatchRef.commit();
      console.log(
        `Загружено ${i + batch.length} из ${warehouses.length} отделений`
      );
    }
    console.log('Все данные успешно загружены!');
  } catch (error) {
    console.error('🐞 [uploadWarehouses][23] error:', error);
    throw error;
  }
};

export const fetchAllWarehouses = async () => {
  console.log('State: fetching warehouses');
  const startTime = performance.now();
  const warehousesRef = collection(db, 'postOffices/novaPost/warehouses');
  const q = query(
    warehousesRef,
    where('SettlementRef', '==', 'e718a680-4b33-11e4-ab6d-005056801329'),
    where('Number', '==', '22'),
    limit(40)
  );
  const snapshot = await getDocs(q);
  console.log(`Всего документов: ${snapshot.size}`);
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Получение документов заняло: ${duration.toFixed(2)} мс`);
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
  //   console.log(`Всего документов: ${snapshot.docs}`);
};
