(function() {
  'use strict';

  let motionQuery = window.matchMedia('(prefers-reduced-motion)'); // MediaQueryList Interface
  const headerHeight = 20; // Adjust for sticky header elements (header height - margin)

  function getScrollDistance(element) {
    const targetOffsetTop = element.offsetTop;
    const scrollDistance = targetOffsetTop - headerHeight;
    return scrollDistance;
  }

  function scrollPosition(value){
    if (motionQuery.matches) {
      /* reduce motion */
      window.scrollTo({ top: value });
    } else {
      window.scrollTo({ top: value, behavior: "smooth" });
    }
  };

  function setFocus(element) {
    if (element.is(":focus")){ 
      return false;
    } else {
      element.attr('tabindex','-1'); // Adding tabindex for elements not focusable
      element.focus();
    };
  }

  function getHash(url) {
    return url.split('#')[1];
  }

  // Listen for click on the document
  document.addEventListener('click', function (event) {
    let path, 
        hash, 
        target, 
        scrollDistance;

    // Early exit if element doesn't have the class
    if (!event.target.classList.contains('hash')) return;

    // Get hash value from url
    path = window.location.href.split('#')[0];
    hash = getHash(event.target.getAttribute("href"));

    if (!hash) return;

    event.preventDefault();  // Prevent default link behavior

    target = document.getElementById(hash);
    scrollDistance = getScrollDistance(target);
    scrollPosition(scrollDistance);

    // Creates State for browser back button 
    if ('history' in window) {
      window.history.pushState('namedAnchor', hash, path + '#' + hash);
    } else {
      window.location = path + '#' + hash;
    }

  })

  // Listen for change on motionQuery
  motionQuery.addListener( function(){
    motionQuery = window.matchMedia('(prefers-reduced-motion)');
  });

  // Handle Hash value on load.
  document.addEventListener('load', function (event) {
    let target,
        scrollDistance,
        hash = getHash(window.location.href);

    if (!hash) return;

    target = document.getElementById(hash);
    scrollDistance = getScrollDistance(target);
    scrollPosition(scrollDistance);

  });


})();