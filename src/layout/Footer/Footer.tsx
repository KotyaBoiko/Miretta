import classes from "./footer.module.scss";
import GitHubIcon from "../../assets/img/icons/GitHub.svg?react";
import GmailIcon from "../../assets/img/icons/Gmail.svg?react";
import FacebookIcon from "../../assets/img/icons/Facebook.svg?react";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_top}>
        <span className={classes.footer_logo}>MIRETTA</span>
        <div className={classes.footer_social}>
          <GitHubIcon className={classes.footer_social__icon}/>
          <GmailIcon className={classes.footer_social__icon}/>
          <FacebookIcon className={classes.footer_social__icon} width={32} height={42}/>
        </div>
      </div>
    </footer>
  )
}

export default Footer