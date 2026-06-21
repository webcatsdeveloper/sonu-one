(function() {
  function initSwipers() {
    console.log('sonu-v2-testi: initSwipers running...');
    const sections = document.querySelectorAll('.v2-testimonial-video-section');
    console.log('sonu-v2-testi: Found testimonial sections:', sections.length);
    sections.forEach(function(section, index) {
      console.log(`sonu-v2-testi: Processing section ${index}`, section);
      // ========= DESKTOP SWIPERS =========
      const reviewsSwiperDesktop = section.querySelector('.v2-reviews-swiper');
      const videoSwiperDesktop = section.querySelector('.v2-video-swiper');
      
      if (reviewsSwiperDesktop) {
        const reviewsSlidesCount = reviewsSwiperDesktop.querySelectorAll('.swiper-slide').length;
        const paginationEl = section.querySelector('.v2-reviews-pagination');
        console.log('sonu-v2-testi: Reviews Swiper Desktop slides count:', reviewsSlidesCount);
        console.log('sonu-v2-testi: Reviews Swiper Desktop pagination element:', paginationEl);

        const reviewsConfig = {
          loop: reviewsSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false,
          autoplay: reviewsSlidesCount > 1 ? {
            delay: 5000,
            disableOnInteraction: false,
          } : false
        };

        if (paginationEl) {
          reviewsConfig.pagination = {
            el: paginationEl,
            clickable: true,
          };
        }

        console.log('sonu-v2-testi: Initializing Reviews Swiper Desktop with config:', reviewsConfig);
        try {
          const sw = new Swiper(reviewsSwiperDesktop, reviewsConfig);
          console.log('sonu-v2-testi: Reviews Swiper Desktop initialized successfully', sw);
        } catch (e) {
          console.error('sonu-v2-testi: Failed to initialize Reviews Swiper Desktop:', e);
        }
      } else {
        console.log('sonu-v2-testi: Reviews Swiper Desktop NOT found in section');
      }

      if (videoSwiperDesktop) {
        const videoSlidesCount = videoSwiperDesktop.querySelectorAll('.swiper-slide').length;
        const nextArrow = section.querySelector('.v2-desktop-video-next');
        const prevArrow = section.querySelector('.v2-desktop-video-prev');

        const videoConfig = {
          loop: videoSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false
        };

        if (nextArrow && prevArrow) {
          videoConfig.navigation = {
            nextEl: nextArrow,
            prevEl: prevArrow,
          };
        }

        new Swiper(videoSwiperDesktop, videoConfig);
      }

      // ========= MOBILE SWIPERS =========
      const reviewsSwiperMobile = section.querySelector('.v2-reviews-swiper-mobile');
      const videoSwiperMobile = section.querySelector('.v2-video-swiper-mobile');

      if (reviewsSwiperMobile) {
        const reviewsSlidesCountMobile = reviewsSwiperMobile.querySelectorAll('.swiper-slide').length;
        const prevArrowMobile = section.querySelector('.v2-mobile-prev-slide');
        const nextArrowMobile = section.querySelector('.v2-mobile-next-slide');

        const reviewsMobileConfig = {
          loop: reviewsSlidesCountMobile > 1,
          slidesPerView: 1,
          watchOverflow: false
        };

        if (prevArrowMobile && nextArrowMobile) {
          reviewsMobileConfig.navigation = {
            nextEl: nextArrowMobile,
            prevEl: prevArrowMobile,
          };
        }

        new Swiper(reviewsSwiperMobile, reviewsMobileConfig);
      }

      if (videoSwiperMobile) {
        const videoSlidesCountMobile = videoSwiperMobile.querySelectorAll('.swiper-slide').length;
        const prevArrowVideoMobile = section.querySelector('.v2-mobile-video-prev');
        const nextArrowVideoMobile = section.querySelector('.v2-mobile-video-next');

        const videoMobileConfig = {
          loop: videoSlidesCountMobile > 1,
          slidesPerView: 1,
          watchOverflow: false
        };

        if (prevArrowVideoMobile && nextArrowVideoMobile) {
          videoMobileConfig.navigation = {
            nextEl: nextArrowVideoMobile,
            prevEl: prevArrowVideoMobile,
          };
        }

        new Swiper(videoSwiperMobile, videoMobileConfig);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwipers);
  } else {
    initSwipers();
  }

  setTimeout(function() {
    const allVideos = document.querySelectorAll('.v2-testimonial-video-section video');
    allVideos.forEach(function(video) {
      video.setAttribute('playsinline', 'true');
      video.muted = true;
      video.play().catch(function(e) {
        console.log('Video autoplay prevented:', e);
      });
    });
  }, 100);
})();