import LogOutButton from '@/components/LogOutButton/LogOutButton';
import classes from './logOut.module.scss'
const LogOut = () => {
  return (
      <div className={classes.profile__logout}>
        <h3 className={classes.profile__logout_title}>Are you sure you want to leave?</h3>
        <LogOutButton/>
      </div>
  );
};

export default LogOut;
