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

function enableEdit(fieldId) {
    var field = document.getElementById(fieldId);
    field.disabled = !field.disabled;
    if (!field.disabled) {
        field.focus();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var inputFields = document.querySelectorAll('.editable-field');
    inputFields.forEach(function(field) {
        field.disabled = true;
    });
});

window.onload = function() {
    const userName = getCookie('userName');
    const userPhone = getCookie('userPhone');
    const userApartment = getCookie('userApartment');
    const userBlock = getCookie('userBlock');
    const userEmail = getCookie('userEmail');
    const userPassword = getCookie('userPassword');
    
    if (userName && userPhone && userApartment && userBlock && userEmail && userPassword) {
        const usernameElement = document.querySelector('.username');
        usernameElement.textContent = userName;
        document.getElementById('nome').value = userName;
        document.getElementById('telefone').value = userPhone;
        document.getElementById('apartamento').value = userApartment;
        document.getElementById('bloco').value = userBlock;
        document.getElementById('email').value = userEmail;
        document.getElementById('senha').value = userPassword;
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
