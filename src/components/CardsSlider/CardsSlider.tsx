import { mainDarkColor } from "@/assets/styles/_variables";
import { FC, useState } from "react";
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./cardsSlider.module.scss";
type Props = {
  slides: string[];
};

const CardsSlider: FC<Props> = ({ slides }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className={classes.slider}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": mainDarkColor,
            "--swiper-pagination-color": mainDarkColor,
          } as React.CSSProperties
        }
        className={classes.slider__main}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide} className={classes.slider__slide}>
              <img src={slide} alt={slide[7]} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        className={classes.slider__thumbs}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        slidesPerView={3}
        freeMode={true}
        scrollbar={{
          enabled: true,
        }}
        modules={[FreeMode, Thumbs, Scrollbar]}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index + slide} className={classes.slider__preview}>
              <img src={slide} alt={slide[6]} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CardsSlider;
