import MainButton from '@/components/ui/Buttons/MainButton/MainButton';
import CommonInput from '@/components/ui/Input/CommonInput';
import { FC, useState } from 'react';

import classes from './addressEdit.module.scss';
import { useEditAddressMutation } from '../../API/userApi';
import { IAddress } from '../../API/types';
import Loader from '@/components/ui/Loader/Loader';
type Props = {
  close: () => void,
  addresses: IAddress[],
  oldData?: IAddress,
}

const AddressEdit:FC<Props> = ({close, addresses, oldData}) => {

  const [addAddress, {isLoading}] = useEditAddressMutation()

  const [country, setCountry] = useState(oldData ? oldData.country : '');
  const [city, setCity] = useState(oldData ? oldData.city : '');
  const [address, setAddress] = useState(oldData ? oldData.address : '');
  const [postCode, setPostCode] = useState(oldData ? oldData.postCode : '');

  const handleSave =  async() => {
    let newAddresses: IAddress[];
    let equal = false;

    if (oldData) {
      equal = true;
       newAddresses = addresses.map((i) => {
        if (i.priority === oldData.priority) {
          const newAddress = {
            country,
            city,
            address,
            postCode,
            priority: oldData.priority,
          }
          for (let key in oldData) {
            if(newAddress[key as keyof typeof oldData] !== oldData[key as keyof typeof oldData]) {
              equal = false;
              break;
            } 
          }
          return newAddress;
        } else {
          return i;
        }
       })
    } else {
      newAddresses = [...addresses, {
        country,
        city,
        address,
        postCode,
        priority: addresses.length + 1,
      }]
    }
    if (equal) {
      close()
      return;
    }
    await addAddress(newAddresses)
    close();
  }

  const handleCancel = () => {
    close()
  }

  return (
    <div className={classes.address__add}>
      <h3 className={classes.address__add_title}>Input your data</h3>
      <form onSubmit={(e) => e.preventDefault()} className={classes.address__add_form}>
        <label className={classes.address__add_item}>
          Country
          <CommonInput
            type="text"
            placeholder="Ukraine"
            value={country}
            onChange={setCountry}
          />
        </label>
        <label className={classes.address__add_item}>
          City
          <CommonInput
            type="text"
            placeholder="Kyiv"
            value={city}
            onChange={setCity}
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
          <MainButton width={'full'} action={handleSave}>{isLoading ? <Loader/> : 'Save'}</MainButton>
          <MainButton width={'full'} action={handleCancel}>Cancel</MainButton>
        </div>
      </form>
    </div>
  )
}

export default AddressEdit