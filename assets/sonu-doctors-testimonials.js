document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.doctor-section').forEach(sectionWrapper => {
    // MODAL LOGIC
    const modal = sectionWrapper.querySelector('.modal');
    const closeBtn = sectionWrapper.querySelector('.close');

    sectionWrapper.querySelectorAll('.doctor-card').forEach(card => {
      card.onclick = () => {
        const data = card.querySelector('.modal-data');
        if (!modal || !data) return;

        modal.style.display = 'flex';
        
        // Safety check in case image is missing
        const imgHtml = data.querySelector('img') ? data.querySelector('img').outerHTML : '';
        modal.querySelector('.left').innerHTML = imgHtml;
        
        modal.querySelector('.right').innerHTML = `
          <h3>${data.querySelector('h3').innerText}</h3>
          <p style="font-weight:500; color:#666; margin-bottom: 20px;">${data.querySelector('.role').innerText}</p>
          <p style="line-height:1.6;">${data.querySelector('p:last-child').innerText}</p>
        `;
      }
    });

    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.style.display = 'none';
      };
    }

    // SLIDER LOGIC
    const slider = sectionWrapper.querySelector('.mobile-slider .doctor-wrapper') || sectionWrapper.querySelector('.doctor-wrapper');
    // Find the child progress bar of this section specifically
    const progressBar = sectionWrapper.querySelector('.team-progress-bar-card'); 
    const nextBtn = sectionWrapper.querySelector('.team-next-btn');
    const prevBtn = sectionWrapper.querySelector('.team-prev-btn');

    if(!slider || !progressBar) return;

    const updateProgress = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (prevBtn) {
        if (slider.scrollLeft <= 5) {
          prevBtn.style.opacity = '0.35';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
      }

      if (nextBtn) {
        if (maxScroll <= 0 || slider.scrollLeft >= maxScroll - 5) {
          nextBtn.style.opacity = '0.35';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      }

      if(maxScroll <= 0){
        progressBar.style.width = '100%';
        return;
      }
      const scrollPercent = slider.scrollLeft / maxScroll;
      const minWidth = 15; // Minimum 15% width at scroll 0
      const percent = minWidth + (scrollPercent * (100 - minWidth));
      progressBar.style.width = `${percent}%`;
    };

    slider.addEventListener('scroll', updateProgress);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const card = slider.querySelector('.doctor-card');
        const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
        slider.scrollBy({ left: card.offsetWidth + gap, behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const card = slider.querySelector('.doctor-card');
        const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
        slider.scrollBy({ left: -(card.offsetWidth + gap), behavior: 'smooth' });
      });
    }

    // Small timeout ensures everything is loaded before first calculation
    setTimeout(updateProgress, 100);
  });
});
