import { SetStateAction } from "react";

export const controlSavingSensitiveData = (
  condition: boolean,
  permission: React.Dispatch<SetStateAction<boolean>>,
  ban: React.Dispatch<SetStateAction<boolean>>,
  callback: () => void
) => {
  if (condition) {
    callback();
    ban(false);
  } else {
    permission(true);
  }
};
