// script/storage.js - Funciones para manejar localStorage

// ========== FUNCIONES BÁSICAS ==========

export function saveData(key, value) {
    localStorage.setItem(key, value);
}

export function getData(key) {
    return localStorage.getItem(key);
}

export function removeData(key) {
    localStorage.removeItem(key);
}

export function saveObject(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

export function getObject(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// ========== FUNCIONES DE USUARIOS ==========

export function getUsers() {
    let usersJSON = localStorage.getItem('users');
    
    if (usersJSON === null) {
        console.log("No hay usuarios previos");
        return [];
    } else {
        const users = JSON.parse(usersJSON);
        console.log("Usuarios existentes:", users);
        return users;
    }
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Guardado en localStorage");
}

export function userExists(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

export function addUser(email, password, fullName) {
    const users = getUsers();
    
    // Verificar si ya existe
    if (userExists(email)) {
        return { 
            success: false, 
            message: 'Este email ya está registrado' 
        };
    }
    
    // Crear nuevo usuario
    const newUser = {
        fullName: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
        profiles: [
            {
                id: 1,
                name: 'Perfil 1',
                favorites: []
            }
        ]
    };
    
    console.log("Nuevo usuario creado:", newUser);
    
    users.push(newUser);
    console.log("Array actualizado:", users);
    
    saveUsers(users);
    
    return { 
        success: true, 
        message: 'Usuario registrado exitosamente', 
        user: newUser 
    };
}

export function validateUser(email, password) {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

// ========== FUNCIONES DE SESIÓN ==========

export function saveSession(user) {
    localStorage.setItem('loggedUser', user.email);
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function clearSession() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('currentUser');
}

export function getSession() {
    const userJSON = localStorage.getItem('currentUser');
    return userJSON ? JSON.parse(userJSON) : null;
}

export function isLoggedIn() {
    return localStorage.getItem('loggedUser') !== null;
}