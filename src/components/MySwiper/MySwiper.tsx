import { FC } from "react";
import { Autoplay, EffectFade, Keyboard, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./mySwiper.module.scss";

type Props = {
  slides: string[];
  options?: string[]
};

const MySwiper: FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[ Autoplay, EffectFade, Keyboard]}
      loop={true}
      // cssMode={true}
      // keyboard={true}
      effect={"fade"}
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

export default MySwiper;
