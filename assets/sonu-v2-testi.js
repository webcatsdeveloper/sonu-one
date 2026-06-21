(function() {
  function initSwipers() {
    const sections = document.querySelectorAll('.v2-testimonial-video-section');
    sections.forEach(function(section) {
      // ========= DESKTOP SWIPERS =========
      const reviewsSwiperDesktop = section.querySelector('.v2-reviews-swiper');
      const videoSwiperDesktop = section.querySelector('.v2-video-swiper');
      
      if (reviewsSwiperDesktop) {
        const reviewsSlidesCount = reviewsSwiperDesktop.querySelectorAll('.swiper-slide').length;
        const paginationEl = section.querySelector('.v2-reviews-pagination');

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

        new Swiper(reviewsSwiperDesktop, reviewsConfig);
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