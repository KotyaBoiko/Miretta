import { FC } from 'react'
import classes from './home.module.scss'
import { CollectionList } from '@/features/collection/components/collectionList'

const HomePage:FC = () => {
  return (
    <main>
      <section className={classes.home__main}>
        <div className={classes.home__main_top}>
          <h1 className={classes.home__main_logo}>MIRETTA</h1>
        </div>
        <div className={classes.home__main_bottom}>
        </div>
      </section>
          <CollectionList />
    </main>
  )
}

export default HomePage