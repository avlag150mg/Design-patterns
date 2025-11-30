const langBtn = document.getElementById('langBtn');
const langMessage = document.getElementById('langMessage');

const translations = {
  UA: {
    titleGuest: "Вітаємо, Guest!",
    subtitle: "Будь ласка, зареєструйтесь",
    login: "Логін:",
    email: "Email:",
    password: "Пароль:",
    remember: "Запам'ятати мене",
    register: "Зареєструватися",
    langChanged: "Мова змінена",
    clearBtn: "Очистити всі дані"
  },
  EN: {
    titleGuest: "Welcome, Guest!",
    subtitle: "Please register",
    login: "Login:",
    email: "Email:",
    password: "Password:",
    remember: "Remember me",
    register: "Register",
    langChanged: "Language changed",
    clearBtn: "Clear all data"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  langBtn.textContent = lang === 'UA' ? 'EN' : 'UA';
  document.getElementById('title').textContent = translations[lang].titleGuest;
  document.getElementById('subtitle').textContent = translations[lang].subtitle;
  document.getElementById('loginLabel').textContent = translations[lang].login;
  document.getElementById('emailLabel').textContent = translations[lang].email;
  document.getElementById('passwordLabel').textContent = translations[lang].password;
  document.getElementById('rememberLabel').childNodes[0].textContent = translations[lang].remember;
  document.getElementById('registerBtn').textContent = translations[lang].register;
  document.getElementById('clearBtn').textContent = translations[lang].clearBtn;

  langMessage.textContent = translations[lang].langChanged;
  langMessage.classList.remove('hidden');
  setTimeout(() => langMessage.classList.add('hidden'), 3000);
}

let currentLang = localStorage.getItem('lang') || 'UA';
setLanguage(currentLang);

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'UA' ? 'EN' : 'UA';
  setLanguage(currentLang);
});

const form = document.getElementById('registerForm');
const loginInput = document.getElementById('login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMe = document.getElementById('rememberMe');
const welcomeMessage = document.getElementById('welcomeMessage');

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )'+name+'=([^;]+)'));
  if (match) return match[2];
  return '';
}

if (getCookie('login')) {
  loginInput.value = getCookie('login');
  document.getElementById('title').textContent = `Вітаємо, ${getCookie('login')}!`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const login = loginInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) { alert("Невірний email"); return; }
  if (password.length < 8) { alert("Пароль має бути ≥8 символів"); return; }

  if (rememberMe.checked) {
    document.cookie = `login=${login}; max-age=${7*24*60*60}; path=/`;
  }

  document.getElementById('title').textContent = `Вітаємо, ${login}!`;
  welcomeMessage.textContent = `Привіт, ${login}!`;
  welcomeMessage.classList.remove('hidden');
  setTimeout(() => welcomeMessage.classList.add('hidden'), 3000);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  form.classList.add('fade-out');
  setTimeout(() => {
    localStorage.clear();
    document.cookie.split(";").forEach(c => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    document.getElementById('title').textContent = translations['UA'].titleGuest;
    document.getElementById('subtitle').textContent = translations['UA'].subtitle;
    loginInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    rememberMe.checked = false;
    form.classList.remove('fade-out');
    setLanguage('UA');
  }, 500);
});
