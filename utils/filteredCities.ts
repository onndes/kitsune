import { ICity } from '@/api/novaPoshta/novaPoshta.types';
import { regionalCitiesData } from '@/app/cart/common/regionsCenterData';

export const filteredCities = (allCities: ICity[]) => {
  const filteredCities = regionalCitiesData.map((city) => {
    const matchedCity = allCities.find(
      (apiCity) => apiCity.Description === city.Description
    );
    return matchedCity || [];
  });
  return filteredCities as ICity[];
};
