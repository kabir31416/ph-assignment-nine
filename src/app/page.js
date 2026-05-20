"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomePage() {
  const slides = [
    {
      title: "Turn Your Ideas Into Startups",
      description:
        "Discover innovative startup ideas and collaborate with creative minds worldwide.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "Innovation Starts With One Idea",
      description:
        "Share your vision, get feedback, and build something extraordinary.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    {
      title: "Explore Ideas. Build the Future.",
      description:
        "Connect with entrepreneurs and uncover the next big opportunity.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
  ];

  return (
    <main>
      <section className="h-[85vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">


                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                />


                <div className="absolute inset-0 bg-black/55" />


                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-5 text-lg md:text-xl text-gray-200">
                      {slide.description}
                    </p>

                    <Link
                      href="/ideas"
                      className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                    >
                      Explore Ideas
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}