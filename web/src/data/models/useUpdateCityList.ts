import * as React from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

import { trackAnalyticsEvent } from "@/analytics";
import { ConnectionConfig } from "@/data/client";
import { createCity, removeCity } from "@/data/offers";
import {
  City,
  getCities,
  lookupClosestCity,
  seedCityWithOffers,
} from "@/data/queries";
import { ScaleFactors } from "@/scalefactors";

import {
  connectionConfig,
  errorUpdatingCities,
  isUpdatingCities,
  selectedCities,
  selectedCity,
} from "../recoil";

const getSelectedCitiesFromDatabase = async (
  config: ConnectionConfig,
  selectCityHook: [number, SetterOrUpdater<number>],
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<Array<City>>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  const [lastSelectedCityId, setLastSelectedCityId] = selectCityHook;
  setIsUpdating(true);
  try {
    // Fetch cities from database in singlestoreDB.
    const cities = await getCities(config);
    setCities(cities);

    // Update lastSelectedCityId in case it is not found in selected cities from database.
    const doesLastSelectedCityExist = cities.find(
      (c) => c.id === lastSelectedCityId
    );
    if (!doesLastSelectedCityExist) {
      setLastSelectedCityId((cities[0] && cities[0].id) || -1);
    }
  } catch (error) {
    setError(error as Error);
  }
  setIsUpdating(false);
};

const addCityToDatabase = async (
  config: ConnectionConfig,
  point: [number, number],
  selectCityHook: [number, SetterOrUpdater<number>],
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<Array<City>>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  // The addCityToDatabase will add city along with city details in cities table from martech database.
  // This will also automatically update selectedCities in recoil after the new city is added.

  setIsUpdating(true);
  const city = await lookupClosestCity(config, point[1], point[0]);
  const cityConfig = {
    id: city.id,
    name: city.name,
    lonlat: <[number, number]>[city.centerLon, city.centerLat],
    diameter: city.diameter,
  };
  await createCity(config, cityConfig);
  trackAnalyticsEvent("create-city");
  await seedCityWithOffers(config, cityConfig, ScaleFactors[0]);
  await getSelectedCitiesFromDatabase(
    config,
    selectCityHook,
    setIsUpdating,
    setCities,
    setError
  );
  setIsUpdating(false);
};

const removeCityFromDatabase = async (
  config: ConnectionConfig,
  cityId: number,
  selectCityHook: [number, SetterOrUpdater<number>],
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<Array<City>>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  // The removeCityFromDatabase will remove city matching cityID from cities table in martech database.
  // This will also automatically update selectedCities in recoil after the city is removed.

  setIsUpdating(true);
  await removeCity(config, cityId);
  trackAnalyticsEvent("remove-city");
  await getSelectedCitiesFromDatabase(
    config,
    selectCityHook,
    setIsUpdating,
    setCities,
    setError
  );
  setIsUpdating(false);
};

export interface CityListHookReturnType {
  onCreateCity: (lat: number, lon: number) => void;
  onRemoveCity: (cityId: number) => void;
  updateCityList: () => void;
}

export const useUpdateCityList = (): CityListHookReturnType => {
  // The useUpdateCityList hook provides functionality to add or remove cities from cities database.
  // The RTDM will only fetch analytical data that will are related to city from the cities database.
  const [_selectedCities, setSelectedCities] = useRecoilState(selectedCities);
  const [_error, setError] = useRecoilState(errorUpdatingCities);
  const [_isUpdating, setIsUpdating] = useRecoilState(isUpdatingCities);
  const selectCityHook = useRecoilState(selectedCity);
  const config = useRecoilValue(connectionConfig);

  const onCreateCity = async (lat: number, lon: number) => {
    await addCityToDatabase(
      config,
      [lat, lon],
      selectCityHook,
      setIsUpdating,
      setSelectedCities,
      setError
    );
  };
  const onRemoveCity = async (cityId: number) => {
    await removeCityFromDatabase(
      config,
      cityId,
      selectCityHook,
      setIsUpdating,
      setSelectedCities,
      setError
    );
  };

  const updateCityList = async () => {
    await getSelectedCitiesFromDatabase(
      config,
      selectCityHook,
      setIsUpdating,
      setSelectedCities,
      setError
    );
  };

  return {
    onCreateCity,
    onRemoveCity,
    updateCityList,
  };
};
