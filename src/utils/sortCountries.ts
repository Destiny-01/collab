import { getDistance } from "geolib";
import CountryJson from "../data/country-lat.json";
import { UserDocument } from "../models/User";
import axios from "axios";

export async function synonyms(word1: string) {
  const apiUrl = `https://api.datamuse.com/words?ml=${word1}&max=25`;

  try {
    const response = await axios.get(apiUrl);

    return response.data.map((entry: any) => entry.word);
  } catch (error) {
    return false;
  }
}
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
  users: UserDocument[]
) => {
  const { ref_country_codes } = CountryJson as CountryJSONType;
  console.log(selectCountry, ref_country_codes && ref_country_codes[0]);
  const selectCountryCoordinates = ref_country_codes.find(
    (code) => code.country === selectCountry
  );

  if (!selectCountryCoordinates) {
    return users;
  }

  const sortedUsers = users.sort((userA, userB) => {
    const coordinatesA = ref_country_codes.find(
      (code) => code.country === userA?.country
    );
    const coordinatesB = ref_country_codes.find(
      (code) => code.country === userB?.country
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

  console.log(sortedUsers, "lolkjui");
  return sortedUsers;
};

export const sortByInterests = async (
  interests: string[] | undefined,
  users: UserDocument[]
) => {
  if (!interests) {
    return null;
  }
  const interestSynonyms: string[] = [];
  for (const interest of interests) {
    const synonymsForInterest = await synonyms(interest);
    interestSynonyms.push(...synonymsForInterest);
  }

  users.sort((a, b) => {
    const aScore = calculateInterestMatchScore(a, interestSynonyms);
    const bScore = calculateInterestMatchScore(b, interestSynonyms);

    return bScore - aScore; // Sorting in descending order of score
  });

  console.log("users", users);
  return users;
};

function calculateInterestMatchScore(
  user: UserDocument,
  interestSynonyms: string[]
): number {
  const userInterests = user.interests; // Assuming you have an array of interests in your user document

  let score = 0;
  for (const interest of userInterests) {
    if (interestSynonyms.includes(interest)) {
      score += 1; // Synonym match
    }
  }

  return score;
}
