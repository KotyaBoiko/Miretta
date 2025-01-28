import { FC } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./fadeSlider.module.scss";

type Props = {
  slides: string[];
  options?: string[]
};

const FadeSlider: FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[ Autoplay, EffectFade]}
      loop={true}
      effect={"fade"}
      allowTouchMove={false}
      autoplay={{
        delay: 9500,
        disableOnInteraction: false,
      }}
      style={{ height: "100%" }}
    >
      {slides.map((slide) => {
        return (
          <SwiperSlide key={slide}>
            <img src={slide} alt="slide" className={classes.swiper__img} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FadeSlider;
