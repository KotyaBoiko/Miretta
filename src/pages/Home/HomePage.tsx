import { FC } from 'react'
import classes from './home.module.scss'
import { CollectionList } from '../../features/collection/collectionList'

const HomePage:FC = () => {
  return (
    <main>
      <section className={classes.home_main}>
        <div className={classes.home_main__top}>
          <h1 className={classes.home_main__logo}>MIRETTA</h1>
        </div>
        <div className={classes.home_main__bottom}>
        </div>
      </section>
          <CollectionList />
    </main>
  )
}

export default HomePage