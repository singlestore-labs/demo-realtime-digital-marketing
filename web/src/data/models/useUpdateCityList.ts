import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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
} from "../recoil";

const getSelectedCitiesFromDatabase = async (
  config: ConnectionConfig,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<City[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  setIsUpdating(true);
  try {
    const cities = await getCities(config);
    setCities(cities);
  } catch (error) {
    setError(error as Error);
  }
  setIsUpdating(false);
};

const addCityToDatabase = async (
  config: ConnectionConfig,
  point: [number, number],
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<City[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  // The addCityToDatabase will add city with city details in cities table from martech database.
  // This is will also set new list after the update in selectedCities state

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
    setIsUpdating,
    setCities,
    setError
  );
  setIsUpdating(false);
};

const removeCityFromDatabase = async (
  config: ConnectionConfig,
  cityId: number,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCities: React.Dispatch<React.SetStateAction<City[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
) => {
  // The removeCityFromDatabase will remove city matching cityID from cities table in martech database.
  // This is will also set new list after the update in selectedCities state

  setIsUpdating(true);
  await removeCity(config, cityId);
  trackAnalyticsEvent("remove-city");
  await getSelectedCitiesFromDatabase(
    config,
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
  // The RTDM will fetch data that will be related to only this cities after update
  const [, setSelectedCities] = useRecoilState(selectedCities);
  const [, setError] = useRecoilState(errorUpdatingCities);
  const [, setIsUpdating] = useRecoilState(isUpdatingCities);
  const config = useRecoilValue(connectionConfig);

  const onCreateCity = async (lat: number, lon: number) => {
    await addCityToDatabase(
      config,
      [lat, lon],
      setIsUpdating,
      setSelectedCities,
      setError
    );
  };
  const onRemoveCity = async (cityId: number) => {
    await removeCityFromDatabase(
      config,
      cityId,
      setIsUpdating,
      setSelectedCities,
      setError
    );
  };

  const updateCityList = async () => {
    await getSelectedCitiesFromDatabase(
      config,
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
