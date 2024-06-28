const signUpButton = document.getElementById('cadastro-login');
const signInButton = document.getElementById('login');
const container = document.getElementById('container');
const cadastroInputs = document.querySelectorAll('.cadastro-container input');
const loginInputs = document.querySelectorAll('.login-container input');
const cadastroButton = document.getElementById('cadastro-button');
const loginButton = document.getElementById('login-button');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('cadastro-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.getElementById('nome').value;
    const phone = document.getElementById('telefone').value;
    const apartment = document.getElementById('apartamento').value;
    const block = document.getElementById('bloco').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, apartment, block, email, password })
    });

    const result = await response.json();
    const registerMessage = document.getElementById('register-message');
    if (response.ok) {
        registerMessage.textContent = result.message;
        registerMessage.style.color = 'green';
    } else {
        registerMessage.textContent = result.message;
        registerMessage.style.color = 'red';
    }
});

document.getElementById('login-button').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('logininput').value;
  const password = document.getElementById('senhainput').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log('Result:', result);
    if (response.ok) {
      const { name, phone, apartment, block, email, password } = result.user;

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = `userName=${name}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `userPhone=${phone}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `userApartment=${apartment}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `userBlock=${block}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `userEmail=${email}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `userPassword=${password}; expires=${expirationDate.toUTCString()}; path=/`;

      window.location.href = 'LandingScreen.html';
    } else {
      console.error('Erro ao realizar login:', result.message);
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
  }
});
