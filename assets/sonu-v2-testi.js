(function() {
  function initSwipers() {
    const sections = document.querySelectorAll('.v2-testimonial-video-section');
    sections.forEach(function(section) {
      // ========= DESKTOP SWIPERS =========
      const reviewsSwiperDesktop = section.querySelector('.v2-reviews-swiper');
      const videoSwiperDesktop = section.querySelector('.v2-video-swiper');
      
      if (reviewsSwiperDesktop && videoSwiperDesktop) {
        const reviewsSlidesCount = reviewsSwiperDesktop.querySelectorAll('.swiper-slide').length;
        const videoSlidesCount = videoSwiperDesktop.querySelectorAll('.swiper-slide').length;

        const nextArrow = section.querySelector('.v2-desktop-video-next');
        const prevArrow = section.querySelector('.v2-desktop-video-prev');
        const paginationEl = section.querySelector('.v2-reviews-pagination');

        new Swiper(videoSwiperDesktop, {
          loop: videoSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false,
          navigation: {
            nextEl: nextArrow,
            prevEl: prevArrow,
          }
        });

        new Swiper(reviewsSwiperDesktop, {
          loop: reviewsSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false,
          pagination: {
            el: paginationEl,
            clickable: true,
          }
        });
      }

      // ========= MOBILE SWIPERS =========
      const reviewsSwiperMobile = section.querySelector('.v2-reviews-swiper-mobile');
      const videoSwiperMobile = section.querySelector('.v2-video-swiper-mobile');

      if (reviewsSwiperMobile) {
        const reviewsSlidesCountMobile = reviewsSwiperMobile.querySelectorAll('.swiper-slide').length;
        const prevArrowMobile = section.querySelector('.v2-mobile-prev-slide');
        const nextArrowMobile = section.querySelector('.v2-mobile-next-slide');

        new Swiper(reviewsSwiperMobile, {
          loop: reviewsSlidesCountMobile > 1,
          slidesPerView: 1,
          watchOverflow: false,
          navigation: {
            nextEl: nextArrowMobile,
            prevEl: prevArrowMobile,
          }
        });
      }

      if (videoSwiperMobile) {
        const videoSlidesCountMobile = videoSwiperMobile.querySelectorAll('.swiper-slide').length;
        const prevArrowVideoMobile = section.querySelector('.v2-mobile-video-prev');
        const nextArrowVideoMobile = section.querySelector('.v2-mobile-video-next');

        new Swiper(videoSwiperMobile, {
          loop: videoSlidesCountMobile > 1,
          slidesPerView: 1,
          watchOverflow: false,
          navigation: {
            nextEl: nextArrowVideoMobile,
            prevEl: prevArrowVideoMobile,
          }
        });
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