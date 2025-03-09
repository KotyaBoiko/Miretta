import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { FC, useState } from "react";
import { IUser } from "../../API/types";
import AddressEdit from "../AddressEdit/AddressEdit";
import AddressItem from "../AddressItem/AddressItem";
import classes from './addressesList.module.scss';

type Props = {
  data: IUser,
}

const AddressesList:FC<Props> = ({data}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  return (
    <div>
      {data.addresses && data.addresses.map((address, i) => {
        return <AddressItem address={address} key={i} />;
      })}
      {isOpenAdd
        ? <AddressEdit addresses={data.addresses ? data.addresses : []} close={() => setIsOpenAdd(false)}/>
        : <MainButton className={classes.address__add} action={() => setIsOpenAdd(true)}>Add Address</MainButton>
      }
    </div>
  );
};

export default AddressesList;
