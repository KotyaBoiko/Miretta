import { API } from "@/firebase/API";
import { baseApi } from "@/redux/API/baseApi";
import { TCollection } from "./components/collectionItem/type";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<TCollection[], void>({
      async queryFn() {
        try {
          const data = await API.getAllDocs<TCollection>("collections")
          data.sort((a, b) => a.code - b.code);
          return {data}
        } catch (error) {
          return {error}
        }
      }
    })
  })
})

export const {useGetCollectionsQuery} = collectionApi;
