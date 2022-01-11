import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "../styles/Featured.module.css";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

const Featured = () => {
  return (
    <div className={classes.container}>
      <Swiper
        className={classes.swiper}
        navigation={true}
        effect={"fade"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
      >
        <SwiperSlide className={classes.swiperslide}>
          <div className={classes.text}>Share Your Love For Piizalian!</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperslide}>
          <div className={classes.text}>Share Your Love For Piizalian!</div>
        </SwiperSlide>
        <SwiperSlide className={classes.swiperslide}>
          <div className={classes.text}>Share Your Love For Piizalian!</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Featured;
