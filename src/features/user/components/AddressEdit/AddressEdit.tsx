import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { CommonInput } from "@/components/ui/Input";
import { FC, useCallback, useEffect, useState } from "react";

import WritableSelectInput from "@/components/ui/Input/WritableSelectInput/WritableSelectInput";
import Loader from "@/components/ui/Loader/Loader";
import {
  useLazyGetCitiesQuery,
  useLazyGetDepartmentsQuery,
} from "@/redux/API/novaPost/novaPostApi";
import { debounce } from "@/utils/debounce";
import { useEditAddressMutation } from "../../API/userApi";
import { IAddress } from "../../types";
import classes from "./addressEdit.module.scss";
type Props = {
  close: () => void;
  addresses: IAddress[];
  oldData?: IAddress;
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
    [getCities]
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
        <label className={classes.address__add_item}>
          Country
          <CommonInput
            type="text"
            placeholder="Ukraine"
            value={country}
            // onChange={setCountry}
            readOnly
          />
        </label>
        <label className={classes.address__add_item}>
          City
          <WritableSelectInput
            data={
              cities
                ? cities.data.map((i) => ({
                    displayInfo: `${i.SettlementTypeDescription} ${
                      i.Description
                    } ${
                      i.RegionsDescription
                        ? i.RegionsDescription + " район"
                        : ""
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
                : []
            }
            placeholder="Kyiv"
            value={cityTitle}
            onChange={setCityTitle}
            actionOnChange={debouncedGetCities}
            minLengthVisible={2}
            completed={
              !!cities?.data.find((i) => i.Ref === cityRef) || oldData
                ? cityRef !== ""
                : false
            }
            activeItem={cityRef}
            setActiveItem={(id) => setCityRef(String(id))}
          />
        </label>
        <label className={classes.address__add_item}>
          Address
          <CommonInput
            type="text"
            placeholder="Shevchenka St, 10"
            value={address}
            onChange={setAddress}
          />
        </label>
        <label className={classes.address__add_item}>
          Post Code
          <WritableSelectInput
            data={
              departments
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
                : []
            }
            placeholder="143"
            value={postCode}
            onChange={setPostCode}
            actionOnChange={(v) => debouncedGetDepartments(v, cityRef)}
            minLengthVisible={1}
            completed={
              departments
                ? !!departments.data.find(
                    (i) => i.SettlementRef === postRef && i.CityRef === cityRef
                  )
                : oldData
                ? postRef !== "" && oldData?.cityRef === cityRef
                : false
            }
            activeItem={postRef}
            setActiveItem={(id) => setPostRef(String(id))}
          />
        </label>
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
