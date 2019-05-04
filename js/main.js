(function () {
  'use strict';

  var footerElement = document.querySelector('footer');
  var newsLetterElement = document.createElement('div');
  newsLetterElement.className = 'newsletter-panel';
  newsLetterElement.innerHTML = '<span class="close-btn">×</span><h2>Get latest updates in web technologies</h2><p>I write articles related to web technologies, such as design trends, development tools, UI/UX case studies and reviews, and more. Sign up to my newsletter to get them all.</p><form><input name="email" placeholder="Email address"><button>Count me in!</button></form>';

  function diff_minutes(d1, d2) {
    var diff = (d1 - d2.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  function setLastTime() {
    localStorage.setItem('lasttime', new Date().getTime())
  };

  function getLastTime() {
    return localStorage.getItem('lasttime');
  };

  function renderNewsLetterElement() {
    if (diff_minutes(getLastTime(), new Date()) >= 10) {
      footerElement.parentNode.insertBefore(newsLetterElement, footerElement);
      var closeBtnElement = document.querySelector('.close-btn');
      closeBtnElement.addEventListener('click', function (e) {        
        setLastTime();
        newsLetterElement.classList.remove('slide-up');
        setTimeout(function () {
          newsLetterElement.remove();
        }, 1000)
      });
    };
  };

  function scrollEventListener(e) {
    if (!getLastTime() && window.pageYOffset + window.innerHeight >
      footerElement.offsetTop - footerElement.offsetHeight) {
      newsLetterElement.classList.add('slide-up');
    } else if (getLastTime() &&
      diff_minutes(getLastTime(), new Date()) >= 10) {
      localStorage.removeItem('lasttime');
      renderNewsLetterElement();      
    };
  };

  renderNewsLetterElement();
  document.addEventListener('scroll', scrollEventListener);
})();