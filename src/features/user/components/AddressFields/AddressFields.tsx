import { CommonInput } from "@/components/ui/Input";
import WritableSelectInput from "@/components/ui/Input/WritableSelectInput/WritableSelectInput";
import { ICity, IDepartment, INovaPostResponse } from "@/redux/API/novaPost/types";
import { FC } from "react";
import { IAddress } from "../../types";
import classes from "./addressFields.module.scss";

type Props = {
  oldData?: IAddress;
  country: string;
  cityTitle: string;
  cityRef: string;
  cityDescription: string;
  address: string;
  postCode: string;
  postRef: string;
  postDescription: string;
  setCityRef: (value: string) => void;
  setCityTitle: (id: string) => void;
  setAddress: (value: string) => void;
  setPostRef: (value: string) => void;
  setPostCode: (id: string) => void;
  debouncedGetCities: (id: string) => void;
  debouncedGetDepartments: (id: string, cityRef: string) => void;
  cities: INovaPostResponse<ICity> | undefined;
  departments: INovaPostResponse<IDepartment> | undefined;

};

const AddressFields: FC<Props> = ({
  oldData,
  cities,
  departments,
  postDescription,
  cityDescription,
  country,
  cityTitle,
  cityRef,
  address,
  postCode,
  postRef,
  setCityRef,
  setCityTitle,
  setAddress,
  setPostRef,
  setPostCode,
  debouncedGetCities,
  debouncedGetDepartments,
}) => {

  const cityData = cities
    ? cities.data.map((i) => ({
        displayInfo: `${i.SettlementTypeDescription} ${i.Description} ${
          i.RegionsDescription ? i.RegionsDescription + " район" : ""
        } ${i.AreaDescription} область`,
        shortDisplayInfo: i.Description,
        id: i.Ref,
      }))
    : cityDescription
    ? [
        {
          displayInfo: cityDescription,
          shortDisplayInfo: cityTitle,
          id: cityRef,
        },
      ]
    : [];

  const departmentsData = departments
    ? departments.data.map((i) => ({
        displayInfo: i.Description,
        shortDisplayInfo: i.Number,
        id: i.SettlementRef,
      }))
    : postDescription
    ? [
        {
          displayInfo: postDescription,
          shortDisplayInfo: postCode,
          id: postRef,
        },
      ]
    : [];

  const departmentCompleted = departments
    ? !!departments.data.find(
        (i) => i.SettlementRef === postRef && i.CityRef === cityRef
      )
    : oldData
    ? postRef !== "" && oldData?.cityRef === cityRef
    : false;

  const cityCompleted =
    !!cities?.data.find((i) => i.Ref === cityRef) || oldData
      ? cityRef !== ""
      : false;

  return (
    <>
      <label className={classes.address__item}>
        Country
        <CommonInput
          type="text"
          placeholder="Ukraine"
          value={country}
          // onChange={setCountry}
          readOnly
        />
      </label>
      <label className={classes.address__item}>
        City
        <WritableSelectInput
          data={cityData}
          placeholder="Kyiv"
          value={cityTitle}
          onChange={setCityTitle}
          getData={debouncedGetCities}
          minLengthVisible={2}
          completed={cityCompleted}
          activeItem={cityRef}
          setActiveItem={(id) => setCityRef(String(id))}
        />
      </label>
      <label className={classes.address__item}>
        Address
        <CommonInput
          type="text"
          placeholder="Shevchenka St, 10"
          value={address}
          onChange={setAddress}
        />
      </label>
      <label className={classes.address__item}>
        Post Code
        <WritableSelectInput
          data={departmentsData}
          placeholder="143"
          value={postCode}
          onChange={setPostCode}
          getData={(d) => debouncedGetDepartments(d, cityRef)}
          minLengthVisible={1}
          completed={departmentCompleted}
          activeItem={postRef}
          setActiveItem={(id) => setPostRef(String(id))}
        />
      </label>
    </>
  );
};

export default AddressFields;
