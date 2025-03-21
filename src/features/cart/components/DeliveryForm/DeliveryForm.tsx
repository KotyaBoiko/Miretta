import { CommonInput } from "@/components/ui/Input";
import SelectInput from "@/components/ui/Input/SelectInput/SelectInput";
import AddressFields from "@/features/user/components/AddressFields/AddressFields";
import { auth } from "@/firebase/firebase-config";
import {
  useLazyGetCitiesQuery,
  useLazyGetDepartmentsQuery,
} from "@/redux/API/novaPost/novaPostApi";
import { useAppSelector } from "@/redux/types";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import { debounce } from "@/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import classes from "./deliveryForm.module.scss";

const DeliveryForm = () => {
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

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector((state) => state.user);
console.log(user)
  const userAddresses =
    user.addresses === undefined
      ? undefined
      : user.addresses.length === 0
      ? undefined
      : user.addresses;

  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.surname || "");
  const [mobile, setMobile] = useState(user.phone || "");
  const [country, setCountry] = useState(
    userAddresses ? userAddresses[0].country : "Україна"
  );
  const [address, setAddress] = useState(
    userAddresses ? userAddresses[0].address : ""
  );

  const [cityDescription, setCityDescription] = useState(
    userAddresses ? userAddresses[0].cityDescription : ""
  );
  const [cityRef, setCityRef] = useState(
    userAddresses ? userAddresses[0].cityRef : ""
  );
  const [cityTitle, setCityTitle] = useState(
    userAddresses ? userAddresses[0].cityTitle : ""
  );

  const [postRef, setPostRef] = useState(
    userAddresses ? userAddresses[0].postCode : ""
  );
  const [postCode, setPostCode] = useState(
    userAddresses ? userAddresses[0].postCode : ""
  );
  const [postDescription, setPostDescription] = useState(
    userAddresses ? userAddresses[0].postDescription : ""
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

  const [activeElement, setActiveElement] = useState(0);
  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenList(false);
      }
    };

    if (isOpenList) {
      document.body.classList.add("modal-active");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("modal-active");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.classList.remove("modal-active");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenList]);

  useEffect(() => {
    if (userAddresses) {
      setCountry(userAddresses[activeElement].country);
      setCityDescription(userAddresses[activeElement].cityDescription);
      setCityRef(userAddresses[activeElement].cityRef);
      setCityTitle(userAddresses[activeElement].cityTitle);
      setAddress(userAddresses[activeElement].address);
      setPostCode(userAddresses[activeElement].postCode);
      setPostRef(userAddresses[activeElement].postRef);
      setPostDescription(userAddresses[activeElement].postDescription);
      debouncedGetDepartments(userAddresses[activeElement].postCode, userAddresses[activeElement].cityRef);
      debouncedGetCities(userAddresses[activeElement].cityTitle);
    }
  }, [activeElement]);

  return (
    <>
      {auth.currentUser ? (
        <div className={classes.cart__autofill}>
          <span className={classes.cart__autofill_title}>Autofill:</span>
          {userAddresses ? (
            <SelectInput
              data={userAddresses.map((i) => `Address ${i.priority}`)}
              activeElementIndex={activeElement}
              onChoose={setActiveElement}
            />
          ) : (
            <Link to={USER_ROUTES_NAMES.Addresses}>Add addresses</Link>
          )}
        </div>
      ) : (
        ""
      )}
      <form className={classes.cart__form}>
        <label>
          First Name
          <CommonInput
            type="text"
            placeholder="Alex"
            value={firstName}
            onChange={setFirstName}
          />
        </label>
        <label>
          Last Name
          <CommonInput
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={setLastName}
          />
        </label>
        <label>
          Mobile
          <CommonInput
            type="tel"
            placeholder="+380123456789"
            value={mobile}
            onChange={setMobile}
          />
        </label>
        <AddressFields
          oldData={userAddresses ? userAddresses[activeElement] : undefined}
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
      </form>
    </>
  );
};

export default DeliveryForm;
