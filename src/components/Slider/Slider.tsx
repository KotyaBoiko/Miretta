import { FC } from "react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./slider.module.scss";

type Props = {
  slides: string[];
  options?: string[]
};

const Slider: FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[ Autoplay, EffectFade, Keyboard]}
      loop={true}
      // cssMode={true}
      // keyboard={true}
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
            <img src={slide} alt="slide" className={classes.swiper_img} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
