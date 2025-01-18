import { regionalCentersCity } from '@/app/cart/common/regionalCity';
import { ICity } from '@/api/novaPoshta/novaPoshta.types';

export const filteredCities = (allCities: ICity[]) => {
  const filteredCities = regionalCentersCity.map((city) => {
    const matchedCity = allCities.find(
      (apiCity) => apiCity.Description === city.Description
    );
    return matchedCity || [];
  });
  return filteredCities as ICity[];
};
