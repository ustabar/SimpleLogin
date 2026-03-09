document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Load saved email if "Remember Me" was checked
    loadSavedCredentials();

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Disable submit button during request
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Giriş yapılıyor...';

        try {
            // Simulate API call
            const response = await loginUser({
                email: emailInput.value,
                password: passwordInput.value
            });

            if (response.success) {
                // Save email if "Remember Me" is checked
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('savedEmail', emailInput.value);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('rememberMe');
                }

                // Show success message
                successMessage.classList.remove('d-none');
                loginForm.reset();
                emailInput.classList.remove('is-invalid');
                passwordInput.classList.remove('is-invalid');

                // Redirect after 2 seconds
                setTimeout(() => {
                    console.log('Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...');
                    // window.location.href = '/dashboard';
                }, 2000);
            } else {
                showError(response.message || 'Giriş başarısız oldu.');
            }
        } catch (error) {
            showError('Bir hata oluştu. Tekrar deneyin.');
            console.error('Login error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });

    // Custom validation
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    passwordInput.addEventListener('blur', function() {
        validatePassword();
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            validateEmail();
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            validatePassword();
        }
    });
});

function validateForm() {
    const form = document.getElementById('loginForm');
    let isValid = true;

    if (!validateEmail()) {
        isValid = false;
    }

    if (!validatePassword()) {
        isValid = false;
    }

    return isValid;
}

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

function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe === 'true' && savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Simulated API call - in production, replace with actual backend endpoint
async function loginUser(credentials) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful login for demo purposes
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
                resolve({
                    success: false,
                    message: 'E-posta veya şifre hatalı.'
                });
            }
        }, 800); // Simulate network delay
    });
}

// For production, replace the loginUser function with:
/*
async function loginUser(credentials) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return {
            success: true,
            token: data.token,
            user: data.user
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
*/
