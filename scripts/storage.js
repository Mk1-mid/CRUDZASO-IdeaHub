// script/storage.js - Funciones para manejar localStorage

// Use project-specific keys for persistence
const USERS_KEY = 'crudzaso_ideahub_users';
const IDEAS_KEY = 'crudzaso_ideahub_ideas';
const SESSION_KEY = 'crudzaso_ideahub_session';

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
    let usersJSON = localStorage.getItem(USERS_KEY);
    
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
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
    const userJSON = localStorage.getItem(SESSION_KEY);
    return userJSON ? JSON.parse(userJSON) : null;
}

export function isLoggedIn() {
    return localStorage.getItem(SESSION_KEY) !== null;
}

// ========== FUNCIONES DE IDEAS ==========

export function getIdeas() {
    let ideasJSON = localStorage.getItem(IDEAS_KEY);
    
    if (ideasJSON === null) {
        console.log("No hay ideas previas");
        return [];
    } else {
        const ideas = JSON.parse(ideasJSON);
        console.log("Ideas existentes:", ideas);
        return ideas;
    }
}

export function saveIdeas(ideas) {
    localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
    console.log("Ideas guardadas en localStorage");
}

export function addIdea(titleOrObj, description, category) {
    const ideas = getIdeas();
    const session = getSession();

    if (!session) {
        return {
            success: false,
            message: 'Debes estar logueado para crear ideas'
        };
    }

    // Soportar llamada con un objeto o con (title, description, category)
    let title = '';
    let desc = '';
    let cat = '';

    if (titleOrObj && typeof titleOrObj === 'object') {
        title = titleOrObj.title || '';
        desc = titleOrObj.description || '';
        cat = titleOrObj.category || titleOrObj.cat || '';
    } else {
        title = titleOrObj || '';
        desc = description || '';
        cat = category || '';
    }

    // Crear nueva idea
    const newIdea = {
        id: Date.now(),
        userId: session.email,
        username: session.fullName,
        userName: session.fullName,
        title: title,
        description: desc,
        category: cat,
        likes: 0,
        comments: 0,
        color: ['cyan', 'purple', 'yellow', 'green', 'pink', 'blue'][Math.floor(Math.random() * 6)],
        createdAt: new Date().toISOString()
    };

    console.log('Nueva idea creada:', newIdea);

    ideas.push(newIdea);
    console.log('Array de ideas actualizado:', ideas);

    saveIdeas(ideas);

    return {
        success: true,
        message: 'Idea creada exitosamente',
        idea: newIdea
    };
}

export function deleteIdea(ideaId) {
    const ideas = getIdeas();
    const id = Number(ideaId);
    const filteredIdeas = ideas.filter(idea => Number(idea.id) !== id);
    
    if (filteredIdeas.length === ideas.length) {
        return { 
            success: false, 
            message: 'Idea no encontrada' 
        };
    }
    
    saveIdeas(filteredIdeas);
    
    return { 
        success: true, 
        message: 'Idea eliminada exitosamente' 
    };
}

export function updateIdea(ideaId, updates) {
    const ideas = getIdeas();
    const id = Number(ideaId);
    const ideaIndex = ideas.findIndex(idea => Number(idea.id) === id);
    
    if (ideaIndex === -1) {
        return { 
            success: false, 
            message: 'Idea no encontrada' 
        };
    }
    
    ideas[ideaIndex] = { ...ideas[ideaIndex], ...updates };
    saveIdeas(ideas);
    
    return { 
        success: true, 
        message: 'Idea actualizada exitosamente', 
        idea: ideas[ideaIndex] 
    };
}

export function getIdeaById(ideaId) {
    const ideas = getIdeas();
    const id = Number(ideaId);
    return ideas.find(idea => Number(idea.id) === id);
}

export function likeIdea(ideaId) {
    const ideas = getIdeas();
    const id = Number(ideaId);
    const idx = ideas.findIndex(i => Number(i.id) === id);

    if (idx === -1) {
        return { success: false, message: 'Idea no encontrada' };
    }

    ideas[idx].likes = (Number(ideas[idx].likes) || 0) + 1;
    saveIdeas(ideas);

    return { success: true, likes: ideas[idx].likes };
}
