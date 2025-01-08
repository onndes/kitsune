import { regionalCentersCity } from '@/app/cart/regionsCenters';
import { ICity } from '@/types/novaPoshta.t';

export const filteredCities = (allCities: ICity[]) => {
  const filteredCities = regionalCentersCity.map((city) => {
    const matchedCity = allCities.find(
      (apiCity) => apiCity.Description === city.Description
    );
    return matchedCity || [];
  });
  return filteredCities as ICity[];
};
