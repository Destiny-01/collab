import { toast } from "react-toastify";

export const underscoreToCapital = (str: string | undefined) => {
  str = str?.replace(/_/g, " ");

  // Convert the first letter of each word to uppercase
  str = str?.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });

  return str;
};

export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied Link successfully");
    })
    .catch((err) => {
      console.error("Error copying text to clipboard: ", err);
    });
}
