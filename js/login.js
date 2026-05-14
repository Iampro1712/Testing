// Demo users database (stored in localStorage)
const DEMO_USERS = [
    { email: 'admin@demo.com', password: 'admin123', name: 'Administrador' },
    { email: 'user@demo.com', password: 'user123', name: 'Usuario Demo' }
];

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (isLoggedIn === 'true') {
        showDashboard(userEmail, userName);
    }
}

// Show dashboard
function showDashboard(email, name) {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('dashboard').classList.add('visible');
    document.getElementById('userEmail').textContent = email;
    document.getElementById('userName').textContent = name || 'Usuario';
}

// Show login form
function showLogin() {
    document.getElementById('loginContainer').classList.remove('hidden');
    document.getElementById('dashboard').classList.remove('visible');
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error
function showError(message) {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.textContent = message;
    errorAlert.classList.add('visible');
    setTimeout(() => {
        errorAlert.classList.remove('visible');
    }, 5000);
}

// Show success
function showSuccess(message) {
    const successAlert = document.getElementById('successAlert');
    successAlert.textContent = message;
    successAlert.classList.add('visible');
    setTimeout(() => {
        successAlert.classList.remove('visible');
    }, 3000);
}

// Validate form field
function validateField(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    const value = field.value.trim();

    if (!validationFn(value)) {
        field.classList.add('error');
        field.classList.remove('success');
        error.classList.add('visible');
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        error.classList.remove('visible');
        return true;
    }
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Validate fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid) {
        showError('Por favor ingresa un correo electrónico válido');
        return;
    }

    if (!isPasswordValid) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Find user in demo database
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (user) {
        // Show loading
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="spinner"></span>Iniciando sesión...';

        // Simulate API call
        setTimeout(() => {
            // Save to localStorage if "remember me" is checked
            if (remember) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', user.name);
            }
            localStorage.setItem('isLoggedIn', 'true');

            showSuccess('¡Inicio de sesión exitoso!');
            showDashboard(email, user.name);

            // Reset button
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar Sesión';
        }, 1500);
    } else {
        showError('Credenciales incorrectas. Prueba: admin@demo.com / admin123');
    }
});

// Real-time validation
document.getElementById('email').addEventListener('blur', function() {
    validateField('email', 'emailError', validateEmail);
});

document.getElementById('password').addEventListener('blur', function() {
    validateField('password', 'passwordError', pwd => pwd.length >= 6);
});

// Social login (demo)
function socialLogin(provider) {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="spinner"></span>Conectando con ${provider}...`;

    setTimeout(() => {
        // Auto-login with demo user for social login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', `user@${provider}.com`);
        localStorage.setItem('userName', `Usuario ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);

        showSuccess(`¡Iniciaste sesión con ${provider}!`);
        showDashboard(`user@${provider}.com`, `Usuario ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);

        loginBtn.disabled = false;
        loginBtn.textContent = 'Iniciar Sesión';
    }, 1500);
}

// Show signup (demo)
function showSignup() {
    showError('Esta es una versión de demostración. Usa: admin@demo.com / admin123');
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // Reset form
    document.getElementById('loginForm').reset();
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('success', 'error');
    });

    showLogin();
    showSuccess('Sesión cerrada correctamente');
}

// Toggle sidebar on mobile
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Show specific page (placeholder)
function showPage(page) {
    // Update active menu item
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('a').classList.add('active');

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }

    // Page-specific content (demo)
    const content = document.getElementById('dashboardContent');
    if (page === 'analytics') {
        content.innerHTML = `
            <h1 class="page-title">Analytics</h1>
            <p class="page-subtitle">Análisis detallado de tu negocio</p>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon blue"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><div class="stat-info"><h3>45.2K</h3><p>Visitas</p><span class="stat-change positive">↑ 23%</span></div></div>
                <div class="stat-card"><div class="stat-icon green"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div><div class="stat-info"><h3>3.2%</h3><p>Conversión</p><span class="stat-change positive">↑ 0.8%</span></div></div>
                <div class="stat-card"><div class="stat-icon orange"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="stat-info"><h3>2:45</h3><p>Tiempo Promedio</p><span class="stat-change positive">↑ 15%</span></div></div>
                <div class="stat-card"><div class="stat-icon purple"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><div class="stat-info"><h3>68%</h3><p>Rebote</p><span class="stat-change negative">↓ 5%</span></div></div>
            </div>
            <div class="table-card" style="margin-top: 2rem;">
                <div class="table-header"><h3>Fuentes de Tráfico</h3></div>
                <table><thead><tr><th>Fuente</th><th>Visitas</th><th>Conversión</th><th>Estado</th></tr></thead><tbody><tr><td>Google</td><td>18,450</td><td>4.2%</td><td><span class="status active">Activo</span></td></tr><tr><td>Directo</td><td>12,320</td><td>3.8%</td><td><span class="status active">Activo</span></td></tr><tr><td>Facebook</td><td>8,210</td><td>2.1%</td><td><span class="status pending">Pendiente</span></td></tr><tr><td>Instagram</td><td>4,890</td><td>1.5%</td><td><span class="status inactive">Inactivo</span></td></tr></tbody></table>
            </div>
        `;
    } else if (page === 'users') {
        content.innerHTML = `
            <h1 class="page-title">Usuarios</h1>
            <p class="page-subtitle">Gestiona los usuarios de tu plataforma</p>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon blue"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><div class="stat-info"><h3>12,345</h3><p>Total Usuarios</p><span class="stat-change positive">↑ 150 nuevos</span></div></div>
                <div class="stat-card"><div class="stat-icon green"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="stat-info"><h3>10,892</h3><p>Verificados</p><span class="stat-change positive">↑ 89%</span></div></div>
                <div class="stat-card"><div class="stat-icon orange"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div class="stat-info"><h3>1,453</h3><p>Pendientes</p><span class="stat-change">Por verificar</span></div></div>
            </div>
            <div class="table-card" style="margin-top: 2rem;">
                <div class="table-header"><h3>Lista de Usuarios</h3></div>
                <table><thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acción</th></tr></thead><tbody><tr><td>#USR-001</td><td>Juan Pérez</td><td>juan@email.com</td><td>Admin</td><td><span class="status active">Activo</span></td><td><button class="action-btn">Editar</button></td></tr><tr><td>#USR-002</td><td>María García</td><td>maria@email.com</td><td>Usuario</td><td><span class="status active">Activo</span></td><td><button class="action-btn">Editar</button></td></tr><tr><td>#USR-003</td><td>Carlos López</td><td>carlos@email.com</td><td>Usuario</td><td><span class="status pending">Pendiente</span></td><td><button class="action-btn">Editar</button></td></tr></tbody></table>
            </div>
        `;
    } else if (page === 'settings') {
        content.innerHTML = `
            <h1 class="page-title">Configuración</h1>
            <p class="page-subtitle">Personaliza tu experiencia</p>
            <div style="display: grid; gap: 1.5rem; max-width: 600px;">
                <div class="table-card">
                    <div class="table-header"><h3>Perfil</h3></div>
                    <div style="padding: 1.5rem;">
                        <div class="form-group"><label>Nombre</label><input type="text" value="Administrador" style="width:100%;padding:0.75rem;border:2px solid var(--border);border-radius:8px;"></div>
                        <div class="form-group"><label>Email</label><input type="email" value="admin@demo.com" style="width:100%;padding:0.75rem;border:2px solid var(--border);border-radius:8px;"></div>
                        <button class="login-button" onclick="showSuccess('Perfil actualizado')">Guardar Cambios</button>
                    </div>
                </div>
                <div class="table-card">
                    <div class="table-header"><h3>Notificaciones</h3></div>
                    <div style="padding: 1.5rem;">
                        <label class="remember-me" style="display:flex;margin-bottom:1rem;"><input type="checkbox" checked><span>Email de pedidos</span></label>
                        <label class="remember-me" style="display:flex;margin-bottom:1rem;"><input type="checkbox" checked><span>Notificaciones push</span></label>
                        <label class="remember-me" style="display:flex;"><input type="checkbox"><span>Newsletter</span></label>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Default dashboard - reload the original content
        location.reload();
    }
}

// Show alert (demo)
function showAlert(message) {
    showSuccess(message);
}

// Check auth on page load
checkAuth();
