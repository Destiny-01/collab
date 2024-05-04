export const underscoreToCapital = (str: string | undefined) => {
  str = str?.replace(/_/g, " ");

  // Convert the first letter of each word to uppercase
  str = str?.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });

  return str;
};
