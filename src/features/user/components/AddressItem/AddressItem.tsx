import { FC, useState } from "react";
import classes from "./addressItem.module.scss";
import LocationIcon from "@/assets/icons/location.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import { IAddress } from "../../types";
import { useEditAddressMutation, useGetUserQuery } from "../../API/userApi";
import AddressEdit from "../AddressEdit/AddressEdit";

type Props = {
  address: IAddress;
};

const AddressItem: FC<Props> = ({ address }) => {
  const [editAddress, {}] = useEditAddressMutation();
  const { data } = useGetUserQuery();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteAddress = async () => {
    const newAddresses = data!.addresses
    .filter((i) => i.priority !== address.priority)
    .sort((a, b) => a.priority - b.priority)
    .map((item, index) => ({ ...item, priority: index + 1 }));

    editAddress(newAddresses);
  };

  const addressText = `${address.country} ${address.city} ${address.address} ${address.postCode}`;
  return isEditing ? (
    <div className={classes.address__item}>
      <AddressEdit
        close={() => setIsEditing(false)}
        addresses={data!.addresses}
        oldData={address}
      />
    </div>
  ) : (
    <div className={classes.address__item}>
      <span className={classes.address__number}>
        Address №{address.priority}
      </span>
      <div className={classes.address__info}>
        <LocationIcon className={classes.address__icon} />
        <p className={classes.address__text}>{addressText}</p>
        <div className={classes.address__interactive}>
          <EditIcon
            className={`${classes.address__icon} ${classes.address__edit}`}
            onClick={() => setIsEditing(true)}
          />
          <DeleteIcon
            className={`${classes.address__icon} ${classes.address__delete}`}
            onClick={handleDeleteAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
