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
  const userPhone = getCookie('userPhone');
  const userApartment = getCookie('userApartment');
  const userBlock = getCookie('userBlock');
  const userEmail = getCookie('userEmail');

  if (userName && userPhone && userApartment && userBlock && userEmail) {
      const usernameElement = document.querySelector('.username');
      usernameElement.textContent = userName;
      document.getElementById('pnome').value = userName;
      document.getElementById('telefone').value = userPhone;
      document.getElementById('email').value = userEmail;
      document.getElementById('apartamento').value = userApartment;
      document.getElementById('bloco-condominio').value = userBlock;
  } else {
      console.error('Erro ao obter dados do usuário');
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

// Function to send form data to the server
document.getElementById('occurrence-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const userId = getCookie('userId'); // Assuming you store user ID in cookies during login
  const assunto = document.getElementById('assunto').value;

  const data = {
      user_id: userId,
      assunto
  };

  try {
      const response = await fetch('http://localhost:3000/ocorrencia', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
          alert('Ocorrência registrada com sucesso!');
          window.location.href = 'LandingScreen.html';
      } else {
          alert('Erro ao registrar ocorrência: ' + result.message);
      }
  } catch (error) {
      console.error('Erro ao registrar ocorrência:', error);
      alert('Erro ao registrar ocorrência.');
  }
});
