(function() {
  function initSwipers() {
    // ========= DESKTOP: Reviews Swiper and Video Swiper (Independent) =========
    const sections = document.querySelectorAll('.v2-testimonial-video-section');
    sections.forEach(function(section) {
      const reviewsSwiperEl = section.querySelector('.v2-reviews-swiper');
      const videoSwiperEl = section.querySelector('.v2-video-swiper');
      
      if (reviewsSwiperEl && videoSwiperEl) {
        const reviewsSlidesCount = reviewsSwiperEl.querySelectorAll('.swiper-slide').length;
        const videoSlidesCount = videoSwiperEl.querySelectorAll('.swiper-slide').length;

        const nextArrow = section.querySelector('.v2-desktop-video-next');
        const prevArrow = section.querySelector('.v2-desktop-video-prev');
        const paginationEl = section.querySelector('.v2-reviews-pagination');

        // Create the video swiper
        new Swiper(videoSwiperEl, {
          loop: videoSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false,
          navigation: {
            nextEl: nextArrow,
            prevEl: prevArrow,
          }
        });

        // Create the reviews swiper
        new Swiper(reviewsSwiperEl, {
          loop: reviewsSlidesCount > 1,
          slidesPerView: 1,
          watchOverflow: false,
          pagination: {
            el: paginationEl,
            clickable: true,
          }
        });
      }
    });
    
    // ========= MOBILE: Custom Track Slider =========
    const mobileContainers = document.querySelectorAll('.v2-mobile-testimonial-container');
    mobileContainers.forEach(function(mobileContainer) {
      const track = mobileContainer.querySelector('.v2-mobile-testimonial-track');
      const slides = mobileContainer.querySelectorAll('.v2-mobile-testimonial-slide');
      const totalSlides = slides.length;
      let currentIndex = 0;

      const counterDisplay = mobileContainer.querySelector('.v2-mobile-current-index');
      const progressFill = mobileContainer.querySelector('.v2-mobile-indicator-line-fill');

      function updateSlider() {
        if (totalSlides === 0) return;
        
        const translateXValue = -(currentIndex * 100);
        track.style.transform = `translateX(${translateXValue}%)`;
        
        const fillPercentage = ((currentIndex + 1) / totalSlides) * 100;
        
        if (counterDisplay) counterDisplay.textContent = currentIndex + 1;
        if (progressFill) progressFill.style.width = fillPercentage + '%';
      }

      function showSlide(index) {
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        updateSlider();
      }

      mobileContainer.addEventListener('click', function(e) {
        if (e.target.closest('.v2-mobile-next-slide') || e.target.closest('.v2-mobile-video-next')) {
          e.preventDefault();
          showSlide(currentIndex + 1);
        }
        if (e.target.closest('.v2-mobile-prev-slide') || e.target.closest('.v2-mobile-video-prev')) {
          e.preventDefault();
          showSlide(currentIndex - 1);
        }
      });

      updateSlider();

      // Swipe support for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      mobileContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      mobileContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          // Swipe left -> Next slide
          showSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
          // Swipe right -> Prev slide
          showSlide(currentIndex - 1);
        }
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