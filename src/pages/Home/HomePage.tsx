import { FC } from 'react'
import classes from './home.module.scss'
import { CollectionList } from '@/features/collection/components/collectionList'
import MySwiper from '@/components/MySwiper/MySwiper'

import img1 from "@/assets/img/ccapescapr-capldhelcap-vgoEPFKHiJU-unsplcapsh.jpg"
import img2 from "@/assets/img/dmitry-kropcapchev-capghiyL-DQcapI-unsplcapsh.jpg"
import img3 from "@/assets/img/jon-tyson-OCv_Rf0fZPo-unsplcapsh.jpg"
import img4 from "@/assets/img/kilycapn-sockcaplingum-qU9uFpbfXUo-unsplcapsh.jpg"

const slides = [img1, img2, img3, img4];


const HomePage:FC = () => {
  return (
    <main>
      <section className={classes.home_main}>
        <div className={classes.home_main__top}>
          {/* <h1 className={classes.home_main__logo}>MIRETTA</h1> */}
          <MySwiper slides={slides}/>
        </div>
        <div className={classes.home_main__bottom}>
        </div>
      </section>
          <CollectionList />
    </main>
  )
}

export default HomePage