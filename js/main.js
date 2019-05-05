(function () {
  'use strict';
  var notificationElement = document.createElement('div');
  notificationElement.classList.add('notification-panel');
  notificationElement.innerHTML = '<div class="row"><p>By accessing and using this website, you acknowledge that you have read and understand our <a href="#">Cookie Policy</a>, <a href="#">Privacy Policy</a>, and our <a href="#">Terms of Service</a>.</p><button>Got it</button></div>';
  var pageHeaderElement = document.querySelector('.page-header');
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

  function initialMargin() {
    pageHeaderElement.style.marginTop = String(notificationElement.offsetHeight + notificationElement.offsetTop) + 'px';
  }

  function renderNotificationElement() {
    pageHeaderElement.parentNode.insertBefore(notificationElement, pageHeaderElement);
    var gotItBtn = document.querySelector('.notification-panel button');
    gotItBtn.addEventListener('click', function (e) {
      notificationElement.style.transition = '1s';
      notificationElement.style.transform = 'translateY(-100%)';
      pageHeaderElement.style.transition = '1s';
      pageHeaderElement.style.marginTop = '0';
      setTimeout(function () {
        notificationElement.remove();
      }, 1000)
    })
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
        }, 1000);
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

  renderNotificationElement();
  renderNewsLetterElement();
  initialMargin();
  window.addEventListener('resize', function (e) {
    initialMargin();
  });
  document.addEventListener('scroll', scrollEventListener);
})();