import { mainDarkColor, mainLightColor } from "@/assets/styles/_variables";
import { FC, useState } from "react";
import { FreeMode, Navigation, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./cardsSlider.module.scss";

type Props = {
  slides: string[];
};

const CardsSlider: FC<Props> = ({ slides }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": mainDarkColor,
          } as React.CSSProperties
        }
        className={classes.swiper__main}
        navigation={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
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
        className={classes.swiper__thumbs}
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
    </>
  );
};

export default CardsSlider;
