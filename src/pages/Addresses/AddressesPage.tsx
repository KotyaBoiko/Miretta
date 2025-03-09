import AddressesList from '@/features/user/components/AddressesList/AddressesList';
import { useOutletContext } from 'react-router';
import { TOutletProfileData } from '../Profile/ProfilePage';
const AddressesPage = () => {
  const {menuItem, data}: TOutletProfileData = useOutletContext();
  return (
    <>
      <h2>{menuItem.title}</h2>
      <AddressesList data={data}/>
    </>
  )
}

export default AddressesPage