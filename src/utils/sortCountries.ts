import { getDistance } from "geolib";
import CountryJson from "../data/country-lat.json";
import { User } from "../models/User";

interface CountryJSONType {
  ref_country_codes: [
    {
      country: string;
      alpha2: string;
      alpha3: string;
      numeric: number;
      latitude: number;
      longitude: number;
    }
  ];
}

export const sortUserByCountries = (
  selectCountry: string | undefined,
  users: User[]
) => {
  const { ref_country_codes } = CountryJson as CountryJSONType;
  const selectCountryCoordinates = ref_country_codes.find(
    (code) => code.country === selectCountry
  );

  if (!selectCountryCoordinates) {
    return null;
  }

  const sortedUsers = users.sort((userA, userB) => {
    const coordinatesA = ref_country_codes.find(
      (code) => code.country === userA?.details?.country
    );
    const coordinatesB = ref_country_codes.find(
      (code) => code.country === userB?.details?.country
    );

    if (!coordinatesA || !coordinatesB) {
      return 0; // Handle cases where coordinates are not available
    }

    const distanceA = getDistance(selectCountryCoordinates, {
      latitude: coordinatesA.latitude,
      longitude: coordinatesA.longitude,
    });

    const distanceB = getDistance(selectCountryCoordinates, {
      latitude: coordinatesB.latitude,
      longitude: coordinatesB.longitude,
    });

    return distanceB - distanceA; // Sorting in descending order
  });

  console.log(sortedUsers);
  return sortedUsers;
};
