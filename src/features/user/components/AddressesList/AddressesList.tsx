import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import AddressItem from "../AddressItem/AddressItem";
import classes from './addressesList.module.scss'
const AddressesList = () => {
  const numbers = [1, 2, 3];
  return (
    <div>
      {numbers.map((i) => {
        return <AddressItem order={i} key={i} />;
      })}
      <MainButton className={classes.address__add}>Add Address</MainButton>
    </div>
  );
};

export default AddressesList;
