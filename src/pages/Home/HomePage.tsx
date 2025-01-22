import { FC } from 'react'
import classes from './home.module.scss'
import { CollectionList } from '@/features/collection/components/collectionList'

import img1 from "@/assets/img/home/iswanto-arif-9wCJn7dvHrs-unsplash.jpg"
import img3 from "@/assets/img/home/rayul-_M6gy9oHgII-unsplash.jpg"
import FadeSlider from '@/components/FadeSlider/FadeSlider'

const slides = [img1, img3];


const HomePage:FC = () => {
  return (
    <main>
      <section className={classes.home_main}>
        <div className={classes.home_main__top}>
          <h1 className={classes.home_main__logo}>MIRETTA</h1>
          <FadeSlider slides={slides}/>
        </div>
        <div className={classes.home_main__bottom}>
        </div>
      </section>
          <CollectionList />
    </main>
  )
}

export default HomePage