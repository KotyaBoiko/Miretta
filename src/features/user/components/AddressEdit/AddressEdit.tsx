import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import Loader from "@/components/ui/Loader/Loader";
import {
  useLazyGetCitiesQuery,
  useLazyGetDepartmentsQuery,
} from "@/redux/API/novaPost/novaPostApi";
import { debounce } from "@/utils/debounce";
import { FC, useCallback, useEffect, useState } from "react";
import { useEditAddressMutation } from "../../API/userApi";
import { IAddress } from "../../types";
import AddressFields from "../AddressFields/AddressFields";
import classes from "./addressEdit.module.scss";

type Props = {
  close: () => void;
  addresses: IAddress[];
  oldData?: IAddress;
  isPartForm?: boolean;
};

const AddressEdit: FC<Props> = ({ close, addresses, oldData }) => {
  const [addAddress, { isLoading }] = useEditAddressMutation();
    const [getCities, { data: cities }] = useLazyGetCitiesQuery();
    const [getDepartments, { data: departments }] = useLazyGetDepartmentsQuery();
  
    const debouncedGetCities = useCallback(
      debounce((city: string) => {
        getCities(city);
      }, 300),
      [getCities]
    );
    const debouncedGetDepartments = useCallback(
      debounce((department: string, city: string) => {
        getDepartments({ department, city });
      }, 300),
      [getDepartments]
    );

  const [country, setCountry] = useState(oldData ? oldData.country : "Україна");

  const [cityDescription, setCityDescription] = useState(
    oldData ? oldData.cityDescription : ""
  );
  const [cityRef, setCityRef] = useState(oldData ? oldData.cityRef : "");
  const [cityTitle, setCityTitle] = useState(oldData ? oldData.cityTitle : "");

  const [address, setAddress] = useState(oldData ? oldData.address : "");

  const [postRef, setPostRef] = useState(oldData ? oldData.postCode : "");
  const [postCode, setPostCode] = useState(oldData ? oldData.postCode : "");
  const [postDescription, setPostDescription] = useState(
    oldData ? oldData.postDescription : ""
  );

  useEffect(() => {
    if (cityRef !== "" && cities) {
      const newCity = cities.data.find((i) => i.Ref === cityRef);
      if (!newCity) return;
      setCityDescription(
        `${newCity.SettlementTypeDescription} ${newCity.Description} ${
          newCity.RegionsDescription
            ? newCity.RegionsDescription + " район"
            : ""
        } ${newCity.AreaDescription} область`
      );
    }
  }, [cityRef]);

  useEffect(() => {
    if (postRef !== "" && departments) {
      const newDepartment = departments.data.find(
        (i) => i.SettlementRef === postRef
      );
      if (!newDepartment) return;
      setPostDescription(newDepartment.Description);
    }
  }, [postRef]);

  const handleSave = async () => {
    let newAddresses: IAddress[];
    let equal = false;

    if (oldData) {
      equal = true;
      newAddresses = addresses.map((i) => {
        if (i.priority === oldData.priority) {
          const newAddress = {
            country,
            cityDescription,
            cityTitle,
            cityRef,
            address,
            postDescription: postDescription,
            postRef: postRef,
            postCode: postCode,
            priority: oldData.priority,
          };
          for (let key in oldData) {
            if (
              newAddress[key as keyof typeof oldData] !==
              oldData[key as keyof typeof oldData]
            ) {
              equal = false;
              break;
            }
          }
          return newAddress;
        } else {
          return i;
        }
      });
    } else {
      newAddresses = [
        ...addresses,
        {
          country,
          cityDescription,
          cityTitle,
          cityRef,
          address,
          postDescription: postDescription,
          postRef: postRef,
          postCode: postCode,
          priority: addresses.length + 1,
        },
      ];
    }
    if (equal) {
      close();
      return;
    }
    if (cityDescription === "" || postDescription === "") {
      alert("Address is not correct");
      return;
    }
    console.log(newAddresses);
    await addAddress(newAddresses);
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <div className={classes.address__add}>
      <h3 className={classes.address__add_title}>Input your data</h3>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={classes.address__add_form}
      >
        <AddressFields
          oldData={oldData}
          country={country}
          cityTitle={cityTitle}
          cityRef={cityRef}
          cityDescription={cityDescription}
          address={address}
          postCode={postCode}
          postRef={postRef}
          postDescription={postDescription}
          setCityTitle={setCityTitle}
          setCityRef={setCityRef}
          setAddress={setAddress}
          setPostCode={setPostCode}
          setPostRef={setPostRef}
          cities={cities}
          departments={departments}
          debouncedGetCities={debouncedGetCities}
          debouncedGetDepartments={debouncedGetDepartments}
        />
        <div className={classes.address__add_controls}>
          <MainButton width={"full"} action={handleSave}>
            {isLoading ? <Loader /> : "Save"}
          </MainButton>
          <MainButton width={"full"} action={handleCancel}>
            Cancel
          </MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddressEdit;