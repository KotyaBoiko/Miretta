import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICity, IDepartment, INovaPostResponse } from "./types";

const API_KEY_NOVA_POST = import.meta.env.VITE_API_KEY_NOVA_POST;

export const novaPostApi = createApi({
  reducerPath: "novaPostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.novaposhta.ua/v2.0/json/",
  }),
  endpoints: (builder) => ({
    getCities: builder.query<INovaPostResponse<ICity>, string>({
      query: (str) => ({
        url: "",
        method: "POST",
        body: {
          apiKey: API_KEY_NOVA_POST,
          modelName: "AddressGeneral",
          calledMethod: "getCities",
          methodProperties: {
            Page: "1",
            FindByString: str,
            Limit: "10",
          },
        },
      }),
    }),
    getDepartments: builder.query<INovaPostResponse<IDepartment>, { department: string; city: string }>({
      query: ({ department, city }) => ({
        url: "",
        method: "POST",
        body: {
          apiKey: API_KEY_NOVA_POST,
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: city,
            WarehouseId: department,
          },
        },
      }),
    }),
  }),
});

export const { useLazyGetCitiesQuery, useLazyGetDepartmentsQuery } = novaPostApi;
