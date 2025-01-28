import classes from "./footer.module.scss";
import GitHubIcon from "@/assets/icons/GitHub.svg?react";
import GmailIcon from "@/assets/icons/Gmail.svg?react";
import FacebookIcon from "@/assets/icons/Facebook.svg?react";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__top}>
        <h1 className={classes.footer__logo}>MIRETTA</h1>
        <div className={classes.footer__social}>
          <GitHubIcon className={classes.footer__social_icon}/>
          <GmailIcon className={classes.footer__social_icon}/>
          <FacebookIcon className={classes.footer__social_icon} width={32} height={42}/>
        </div>
      </div>
    </footer>
  )
}

export default Footer