
// Funciones específicas para usuarios
export function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function userExists(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

export function addUser(email, password, fullName) {
    const users = getUsers();
    
  
    if (userExists(email)) {
        return { success: false, message: 'Este email ya está registrado' };
    }
    
  
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
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
}