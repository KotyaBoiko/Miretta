import React, { SetStateAction } from "react";

export const toggleAuthType = (
  setAuthType: React.Dispatch<SetStateAction<"signIn" | "signUp">>
) => {
  setAuthType((type) => {
    if (type === "signIn") {
      return "signUp";
    } else {
      return "signIn";
    }
  });
};
