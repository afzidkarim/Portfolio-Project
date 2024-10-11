document.addEventListener("DOMContentLoaded", function() {
    var mobileGif = document.getElementById("mobileGif");
      function toggleGif(display) {
        mobileGif.style.display = display ? "block" : "none";
    }
  
    function isMobile() {
        return /iPhone|iPad|Android/i.test(navigator.userAgent);
    }
  
    function isPortrait() {
        return window.orientation === 0 || window.orientation === 180;
    }
  
    function handleScreenChange() {
        if (isMobile() && window.innerWidth <= 500 && isPortrait()) {
            toggleGif(true);
        } else {
            toggleGif(false);
        }
    }
  
    window.addEventListener("orientationchange", handleScreenChange);
    window.addEventListener("resize", handleScreenChange);
      handleScreenChange(); // Initial check
  });
  
