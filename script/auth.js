// auth.js - Manejo de autenticación
import { addUser, userExists, getUsers } from './storage.js';

addEventListener('DOMContentLoaded', () => {
    console.log("auth.js loaded");

    const registerForm = document.querySelector('form');
    
    if (!registerForm) {
        console.error("Formulario no encontrado");
        return;
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const fullName = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorElement = document.getElementById("error-message");

        // Limpiar mensaje de error
        errorElement.textContent = "";
        errorElement.style.color = "red";

        // Validación de campos vacíos
        if (fullName === "" || email === "" || password === "") {
            errorElement.textContent = "Todos los campos son obligatorios";
            console.log("Error: Campos vacíos");
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorElement.textContent = "Por favor ingresa un email válido";
            console.log("Error: Email inválido");
            return;
        }

        // Validación de contraseña
        if (password.length < 6) {
            errorElement.textContent = "La contraseña debe tener al menos 6 caracteres";
            console.log("Error: Contraseña muy corta");
            return;
        }

        // Intentar agregar usuario
        const result = addUser(email, password, fullName);

        if (!result.success) {
            errorElement.textContent = result.message;
            console.log("Error:", result.message);
            return;
        }

        // Éxito
        console.log("Nuevo usuario creado:", result.user);
        console.log("Usuarios totales:", getUsers());

        errorElement.textContent = 'Registro exitoso ✓';
        errorElement.style.color = 'green';
        
        // Limpiar formulario
        registerForm.reset();

        // Redireccionar después de 1 segundo
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    });
});