import { trackAnalyticsEvent } from "@/analytics";
import { ScaleFactors } from "@/scalefactors";
import { Point } from "pigeon-maps";
import React, { useEffect, useState } from "react";
import { ConnectionConfig } from "../client";
import { createCity, removeCity } from "../offers";
import {
  City,
  getCities,
  lookupClosestCity,
  seedCityWithOffers,
} from "../queries";

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
  setIsUpdating(true);
  const city = await lookupClosestCity(config, point[1], point[0]);
  const cityConfig = {
    id: city.id,
    name: city.name,
    lonlat: [city.centerLon, city.centerLat] as Point,
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
  selectedCities: City[];
  onCreateCity: (lat: number, lon: number) => void;
  onRemoveCity: (cityId: number) => void;
  isUpdating: boolean;
  error: Error | undefined;
}

export const useUpdateCityList = (
  config: ConnectionConfig
): CityListHookReturnType => {
  const [selectedCities, setSelectedCities] = useState([] as City[]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(undefined as Error | undefined);
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

  useEffect(() => {
    getSelectedCitiesFromDatabase(
      config,
      setIsUpdating,
      setSelectedCities,
      setError
    );
  }, [config]);

  return {
    selectedCities,
    onCreateCity,
    onRemoveCity,
    isUpdating,
    error,
  };
};
