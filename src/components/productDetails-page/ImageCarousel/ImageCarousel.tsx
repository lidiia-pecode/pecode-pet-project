'use client';

import Image from 'next/image';

import { useState } from 'react';
import { Box } from '@mui/material';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useResponsive } from '@/hooks/ui/useResponsive';
import { carouselStyles } from './ImageCarousel.styles';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const { isMobile } = useResponsive();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <Box sx={carouselStyles.container}>
      <Box sx={{ position: 'relative' }}>
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation={!isMobile}
          pagination={isMobile ? { clickable: true } : false}
          thumbs={!isMobile ? { swiper: thumbsSwiper } : undefined}
          spaceBetween={10}
          style={{ borderRadius: 8 }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={carouselStyles.mainWrapper}>
                <Image
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  fill
                  style={{ objectFit: 'contain', borderRadius: 8 }}
                  loading='eager'
                  unoptimized
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {!isMobile && (
          <>
            <Box sx={{ ...carouselStyles.decoArrow, left: 5 }}>
              <ArrowBackIosNewIcon fontSize='small' />
            </Box>

            <Box sx={{ ...carouselStyles.decoArrow, right: 5 }}>
              <ArrowForwardIosIcon fontSize='small' />
            </Box>
          </>
        )}
      </Box>

      {!isMobile && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          style={{ marginTop: 12 }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={carouselStyles.thumbImage}>
                <Image
                  src={img}
                  alt={`${title} thumb ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};
