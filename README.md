# SimpleLogin

A modern, responsive login form built with HTML5, CSS3, and vanilla JavaScript — no frameworks or build tools required.

> **Türkçe açıklama için aşağı kaydırın / [Turkish version below](#türkçe)**

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Code Examples](#code-examples)
- [Production Integration](#production-integration)
- [Türkçe](#türkçe)

---

## Demo

Open `index.html` directly in any modern web browser — no server, no installation, no build step needed.

---

## Features

- ✅ **Email & Password Validation** — real-time inline error messages
- ✅ **Remember Me** — persists the user's email address via `localStorage`
- ✅ **Loading State** — button is disabled and shows a spinner during the (simulated) API call
- ✅ **Success / Error Alerts** — Bootstrap-styled feedback banners
- ✅ **Responsive Design** — looks great on mobile, tablet, and desktop
- ✅ **Animated UI** — smooth slide-in entrance animation for the login card
- ✅ **Zero Dependencies** — only Bootstrap 5.3 (loaded from CDN)
- ✅ **Production-Ready Template** — includes a commented-out `fetch`-based API integration snippet

---

## Project Structure

```
SimpleLogin/
├── index.html   # Login page markup (Bootstrap 5 + custom elements)
├── script.js    # Form validation, localStorage helpers, API call logic
└── style.css    # Custom styles — gradient background, animations, responsive layout
```

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No Node.js, Python, or any server required

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ustabar/SimpleLogin.git
   cd SimpleLogin
   ```

2. **Open the app**

   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

   Or simply drag `index.html` into your browser window.

---

## Usage

| Action | How to do it |
|---|---|
| Log in | Enter any valid email and a password with at least 6 characters, then click **Giriş Yap** |
| Remember email | Check the **Beni hatırla** checkbox before logging in |
| Forgot password | Click the **Şifremi unuttum** link (placeholder — wire up your own flow) |
| Sign up | Click the **Kaydol** link (placeholder — wire up your own flow) |

### Validation Rules

| Field | Rule |
|---|---|
| E-posta (Email) | Required · Must match `user@domain.tld` format |
| Şifre (Password) | Required · Minimum 6 characters |

---

## Code Examples

### Form Validation (`script.js`)

The form is validated both on `blur` (when the user leaves a field) and on `submit`. Each field has its own helper function:

```javascript
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.value.trim()) {
        emailInput.classList.add('is-invalid');
        document.getElementById('emailFeedback').textContent = 'E-posta adresi gereklidir.';
        return false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        document.getElementById('emailFeedback').textContent = 'Lütfen geçerli bir e-posta adresi girin.';
        return false;
    } else {
        emailInput.classList.remove('is-invalid');
        return true;
    }
}
```

### Remember Me with `localStorage` (`script.js`)

```javascript
// Save on successful login (when checkbox is checked)
if (rememberMeCheckbox.checked) {
    localStorage.setItem('savedEmail', emailInput.value);
    localStorage.setItem('rememberMe', 'true');
} else {
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('rememberMe');
}

// Restore on page load
function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const rememberMe  = localStorage.getItem('rememberMe');

    if (rememberMe === 'true' && savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}
```

### Simulated API Call (`script.js`)

During development, the `loginUser()` function resolves after an 800 ms delay to simulate network latency:

```javascript
async function loginUser(credentials) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (credentials.email && credentials.password) {
                resolve({
                    success: true,
                    message: 'Giriş başarılı!',
                    token: 'dummy_token_' + Date.now(),
                    user: {
                        id: 1,
                        email: credentials.email,
                        name: credentials.email.split('@')[0]
                    }
                });
            } else {
                resolve({ success: false, message: 'E-posta veya şifre hatalı.' });
            }
        }, 800);
    });
}
```

---

## Production Integration

Replace the simulated `loginUser()` function with the real `fetch`-based implementation (already included as a comment in `script.js`):

```javascript
async function loginUser(credentials) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return { success: true, token: data.token, user: data.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
```

**Expected API contract:**

- **Endpoint:** `POST /api/auth/login`
- **Request body:** `{ "email": "user@example.com", "password": "secret123" }`
- **Success response:** `{ "token": "<jwt>", "user": { "id": 1, "email": "...", "name": "..." } }`
- **Error response:** `{ "message": "Invalid credentials" }` with a non-2xx HTTP status

After a successful login, uncomment the redirect line in `script.js`:

```javascript
// window.location.href = '/dashboard';
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure & semantics |
| CSS3 | — | Custom styles, animations, responsive layout |
| JavaScript (ES6+) | — | Validation, localStorage, async API calls |
| Bootstrap | 5.3.0 (CDN) | UI components & grid system |

---

## License

This project is open-source. Feel free to use, modify, and distribute it.

---

---

## Türkçe

# SimpleLogin

HTML5, CSS3 ve saf JavaScript ile geliştirilmiş modern, duyarlı bir giriş formu — herhangi bir framework veya derleme aracı gerektirmez.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Kod Örnekleri](#kod-örnekleri)
- [Prodüksiyon Entegrasyonu](#prodüksiyon-entegrasyonu)

---

## Özellikler

- ✅ **E-posta ve Şifre Doğrulama** — gerçek zamanlı satır içi hata mesajları
- ✅ **Beni Hatırla** — kullanıcının e-posta adresini `localStorage` ile saklar
- ✅ **Yükleme Durumu** — (simüle edilmiş) API çağrısı sırasında buton devre dışı bırakılır
- ✅ **Başarı / Hata Uyarıları** — Bootstrap stilinde geri bildirim banner'ları
- ✅ **Duyarlı Tasarım** — mobil, tablet ve masaüstünde mükemmel görünür
- ✅ **Animasyonlu Arayüz** — giriş kartı için yumuşak kayma animasyonu
- ✅ **Sıfır Bağımlılık** — yalnızca Bootstrap 5.3 (CDN üzerinden)
- ✅ **Prodüksiyon Hazır Şablon** — `fetch` tabanlı API entegrasyon kodu yorum satırı olarak dahil

---

## Proje Yapısı

```
SimpleLogin/
├── index.html   # Giriş sayfası HTML işaretlemesi (Bootstrap 5 + özel öğeler)
├── script.js    # Form doğrulama, localStorage yardımcıları, API çağrı mantığı
└── style.css    # Özel stiller — degrade arka plan, animasyonlar, duyarlı düzen
```

---

## Kurulum

### Gereksinimler

- Herhangi bir modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- Node.js, Python veya herhangi bir sunucu gerekmez

### Adımlar

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/ustabar/SimpleLogin.git
   cd SimpleLogin
   ```

2. **Uygulamayı açın**

   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

   Ya da `index.html` dosyasını tarayıcı penceresine sürükleyip bırakın.

---

## Kullanım

| İşlem | Nasıl yapılır |
|---|---|
| Giriş yap | Geçerli bir e-posta ve en az 6 karakterli bir şifre girin, ardından **Giriş Yap**'a tıklayın |
| E-postayı hatırla | Giriş yapmadan önce **Beni hatırla** onay kutusunu işaretleyin |
| Şifremi unuttum | **Şifremi unuttum** bağlantısına tıklayın (yer tutucu — kendi akışınızı bağlayın) |
| Kaydol | **Kaydol** bağlantısına tıklayın (yer tutucu — kendi akışınızı bağlayın) |

### Doğrulama Kuralları

| Alan | Kural |
|---|---|
| E-posta | Zorunlu · `kullanici@alan.com` formatında olmalı |
| Şifre | Zorunlu · En az 6 karakter |

---

## Kod Örnekleri

### Form Doğrulama (`script.js`)

Form, hem `blur` olayında (kullanıcı alandan ayrıldığında) hem de `submit` olayında doğrulanır:

```javascript
function validatePassword() {
    const passwordInput = document.getElementById('password');

    if (!passwordInput.value.trim()) {
        passwordInput.classList.add('is-invalid');
        document.getElementById('passwordFeedback').textContent = 'Şifre gereklidir.';
        return false;
    } else if (passwordInput.value.length < 6) {
        passwordInput.classList.add('is-invalid');
        document.getElementById('passwordFeedback').textContent = 'Şifre en az 6 karakter olmalıdır.';
        return false;
    } else {
        passwordInput.classList.remove('is-invalid');
        return true;
    }
}
```

### Hata Gösterme (`script.js`)

```javascript
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
```

---

## Prodüksiyon Entegrasyonu

`script.js` içindeki simüle edilmiş `loginUser()` fonksiyonunu, yorum satırı olarak verilen gerçek `fetch` tabanlı sürümle değiştirin:

```javascript
async function loginUser(credentials) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return { success: true, token: data.token, user: data.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
```

Başarılı girişin ardından `script.js` içindeki yönlendirme satırının başındaki yorum işaretini kaldırın:

```javascript
// window.location.href = '/dashboard';
```
