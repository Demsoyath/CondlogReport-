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

window.onload = async function() {
  const userName = getCookie('userName');
  if (userName) {
      const usernameElement = document.querySelector('.username');
      usernameElement.textContent = userName;

      try {
          const response = await fetch('http://localhost:3000/occurrences');
          if (!response.ok) {
              throw new Error('Erro ao buscar ocorrências');
          }
          const occurrences = await response.json();
          console.log('Ocorrências:', occurrences);

          const tableBody = document.querySelector('.reports-table tbody');
          tableBody.innerHTML = '';

          occurrences.forEach(occurrence => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${occurrence.id}</td>
                  <td>${occurrence.name}</td>
                  <td>${occurrence.apartment}</td>
                  <td>${occurrence.block}</td>
                  <td>${occurrence.assunto}</td>
                  <td>${occurrence.status ? occurrence.status : 'Em análise.'}</td>
              `;
              tableBody.appendChild(row);
          });
      } catch (error) {
          console.error('Erro ao buscar ocorrências:', error);
      }
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