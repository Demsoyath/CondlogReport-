function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var scrollToTopButton = document.querySelector('.scroll-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
}

window.onload = function() {
    const userName = getCookie('userName');
    if (userName) {
      const usernameElement = document.querySelector('.username');
      usernameElement.textContent = userName;
      const welcomeMessageElement = document.getElementById('welcomeMessage');
      welcomeMessageElement.textContent = `Bem-vindo de volta, ${userName}!`;
    } else {
      console.error('Erro ao obter nome do usuário');
    }
  };

  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  }