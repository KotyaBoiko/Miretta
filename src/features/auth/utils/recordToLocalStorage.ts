export const recordToLocalStorage = (data:any) => {
  localStorage.setItem("authData", JSON.stringify(data));
};
