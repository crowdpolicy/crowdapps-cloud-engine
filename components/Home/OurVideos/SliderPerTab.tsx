import ReactPlayer from "react-player/youtube";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { useEffect, useState, useRef } from "react";
import { typeOfSliderPerTab } from "../../../helpers/types/home";

import SwiperCore, { Swiper as SwiperClass } from "swiper";

export default function SliderPerTab(props: typeOfSliderPerTab) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const swiperRef = useRef(null);

  const swiperRef = useRef<SwiperClass | null>(null);

  const handleVideoPlay = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay?.stop();
    }
  };

  const handleVideoPause = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay?.start();
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 max-w-[100vw] md:max-w-2xl  2xl:max-w-[84vw] font-medium">
      {windowWidth < 768 ? (
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          navigation={true}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="flex"
          // ref={swiperRef}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {props.videos.map((video, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center flex-col !w-fit pb-14">
                  <div className="flex justify-center border-none rounded-xl overflow-hidden h-[75%] w-[70vw] ">
                    <ReactPlayer
                      url={video.acf.video_url}
                      width="100%"
                      height="100%"
                      controls
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                    />
                  </div>
                  <p
                    className="max-w-[85%] w-[85%]  text-base text-left pt-2 px-8"
                    dangerouslySetInnerHTML={{
                      __html: video.title.rendered,
                    }}
                  ></p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : windowWidth < 1024 ? (
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          navigation={true}
          spaceBetween={-50}
          slidesPerView={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="flex"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {props.videos.map((video, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center flex-col h-72 w-64 pb-14">
                  <div className="flex justify-center border-none rounded-xl overflow-hidden h-[75%] w-full">
                    <ReactPlayer
                      url={video.acf.video_url}
                      width="100%"
                      height="100%"
                      controls
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                    />
                  </div>
                  <p
                    className="max-w-[85%] w-[85%] text-base pt-2"
                    dangerouslySetInnerHTML={{
                      __html: video.title.rendered,
                    }}
                  ></p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : windowWidth < 1550 ? (
        <div className="my-slider max-w-[95vw] w-[80vw]">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            spaceBetween={-50}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="flex"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {props.videos.map((video, index) => {
              return (
                <SwiperSlide className="w-fit" key={index}>
                  <div className="flex justify-center items-center flex-col h-72 w-64 pb-14">
                    <div className="flex justify-center border-none rounded-xl overflow-hidden h-[75%] w-full">
                      <ReactPlayer
                        url={video.acf.video_url}
                        width="100%"
                        height="100%"
                        controls
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      />
                    </div>
                    <p
                      className="max-w-[80%] w-[80%] text-left text-sm pt-2"
                      dangerouslySetInnerHTML={{
                        __html: video.title.rendered,
                      }}
                    ></p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : windowWidth < 1700 ? (
        <div className="my-slider max-w-[84vw] w-[55vw]">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            spaceBetween={-35}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="flex"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {props.videos.map((video, index) => {
              return (
                <SwiperSlide className="w-fit" key={index}>
                  <div className="flex justify-center xl:justify-start items-start flex-col h-72 w-64 pb-14">
                    <div className="flex justify-center border-none rounded-xl overflow-hidden h-[75%] w-full">
                      <ReactPlayer
                        url={video.acf.video_url}
                        width="100%"
                        height="100%"
                        controls
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      />
                    </div>
                    <p
                      className="max-w-[80%] w-[80%] h-[25%] text-left text-sm pt-2"
                      dangerouslySetInnerHTML={{
                        __html: video.title.rendered,
                      }}
                    ></p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="my-slider max-w-[84vw] w-[55vw]">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            spaceBetween={-40}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="flex"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {props.videos.map((video, index) => {
              return (
                <SwiperSlide className="w-fit" key={index}>
                  <div className="flex justify-center xl:justify-start items-start flex-col h-72 w-64 pb-14">
                    <div className="flex justify-center border-none rounded-xl overflow-hidden h-[75%] w-full">
                      <ReactPlayer
                        url={video.acf.video_url}
                        width="100%"
                        height="100%"
                        controls
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      />
                    </div>
                    <p
                      className="max-w-[80%] w-[80%] h-[25%] text-left text-sm pt-2"
                      dangerouslySetInnerHTML={{
                        __html: video.title.rendered,
                      }}
                    ></p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
