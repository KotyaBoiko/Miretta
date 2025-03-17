import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { CommonInput } from "@/components/ui/Input";
import { FC, useCallback, useState } from "react";

import WritableSelectInput from "@/components/ui/Input/WritableSelectInput/WritableSelectInput";
import Loader from "@/components/ui/Loader/Loader";
import { useLazyGetCitiesQuery } from "@/redux/API/novaPost/novaPostApi";
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
  const debouncedGetCities = useCallback(
    debounce((city: string) => {
      getCities(city)
    }, 300),
    [getCities]
  );
  const [country, setCountry] = useState(oldData ? oldData.country : "Ukraine");
  const [cityInput, setCityInput] = useState(oldData ? oldData.city : "")
  const [cityRef, setCityRef] = useState(oldData ? oldData.city : "");
  const [address, setAddress] = useState(oldData ? oldData.address : "");
  const [postCode, setPostCode] = useState(oldData ? oldData.postCode : "");
  const handleSave = async () => {
    let newAddresses: IAddress[];
    let equal = false;

    if (oldData) {
      equal = true;
      newAddresses = addresses.map((i) => {
        if (i.priority === oldData.priority) {
          const newAddress = {
            country,
            city: cityInput,
            address,
            postCode,
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
          city: cityInput,
          address,
          postCode,
          priority: addresses.length + 1,
        },
      ];
    }
    if (equal) {
      close();
      return;
    }
    await addAddress(newAddresses);
    close();
  };

  const handleCancel = () => {
    close();
  };

  const isCompletedChecking = () => {

    if (cities?.data.length === 1 && cities.data[0].Description == cityInput) {
      setCityRef(cities.data[0].Ref)
    }
    return !!cities?.data.find(i => i.Ref === cityRef)

  }

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
            data={cities ? cities.data.map((i) => ({
              displayInfo: `${i.SettlementTypeDescription} ${i.Description} ${i.RegionsDescription} ${i.AreaDescription}`,
              shortDisplayInfo: i.Description,
              id: i.Ref,
            })) : []}
            placeholder="Kyiv"
            value={cityInput}
            onChange={setCityInput}
            actionOnChange={debouncedGetCities}
            minLengthVisible={2}
            completed={!!cities?.data.find(i => i.Ref === cityRef)}
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
          <CommonInput
            type="text"
            placeholder="01001"
            value={postCode}
            onChange={setPostCode}
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
