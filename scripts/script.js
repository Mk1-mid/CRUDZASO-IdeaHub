// script/login.js - Lógica de login

import { validateUser, saveSession, getUsers } from './storage.js';

addEventListener('DOMContentLoaded', () => {
    console.log('login.js loaded');

    const loginForm = document.querySelector('form');
    
    if (!loginForm) {
        console.error('Formulario no encontrado');
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Intentando login:', email);

        // Validar campos vacíos
        if (!email || !password) {
            showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor ingresa un email válido', 'error');
            return;
        }

        // Validar credenciales
        const user = validateUser(email, password);

        if (user) {
            console.log('Login exitoso:', user);
            showMessage('¡Bienvenido!', 'success');

            // Guardar sesión
            saveSession(user);

            // Redireccionar
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            console.log('Credenciales incorrectas');
            console.log('Usuarios registrados:', getUsers());
            showMessage('Email o contraseña incorrectos', 'error');
        }
    });
});

function showMessage(message, type) {
    let messageElement = document.getElementById('login-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'login-message';
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 1000;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(messageElement);
    }
    
    if (type === 'success') {
        messageElement.style.background = 'rgba(34, 197, 94, 0.9)';
        messageElement.style.color = 'white';
    } else {
        messageElement.style.background = 'rgba(239, 68, 68, 0.9)';
        messageElement.style.color = 'white';
    }
    
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}
// ============================================
// IDEAS PAGE - Modal Handlers
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const createIdeaBtn = document.getElementById('create_idea');
    const cancelIdeaBtn = document.getElementById('cancel_idea');
    const ideaFormOverlay = document.getElementById('idea_form_overlay');
    const ideaForm = document.getElementById('idea_form');
    
    // Open modal
    if (createIdeaBtn) {
        createIdeaBtn.addEventListener('click', function() {
            if (ideaFormOverlay) {
                ideaFormOverlay.classList.add('show');
            }
        });
    }
    
    // Close modal
    function closeModal() {
        if (ideaFormOverlay) {
            ideaFormOverlay.classList.remove('show');
        }
        // Reset form
        if (ideaForm) {
            ideaForm.reset();
        }
    }
    
    // Cancel button
    if (cancelIdeaBtn) {
        cancelIdeaBtn.addEventListener('click', closeModal);
    }
    
    // Close when clicking outside modal
    if (ideaFormOverlay) {
        ideaFormOverlay.addEventListener('click', function(e) {
            if (e.target === ideaFormOverlay) {
                closeModal();
            }
        });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ideaFormOverlay && ideaFormOverlay.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (ideaForm) {
        ideaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('idea_title').value;
            const description = document.getElementById('idea_description').value;
            const category = document.getElementById('idea_category').value;
            
            // Create idea object
            const idea = {
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                date: new Date().toISOString(),
                likes: 0,
                comments: 0
            };
            
            // Here you would typically save to localStorage or send to a server
            console.log('New idea created:', idea);
            
            // For now, just show a success message
            alert('Idea creada exitosamente!');
            
            // Close modal
            closeModal();
            
            // Optionally, refresh the ideas grid here
            // loadIdeas();
        });
    }
});
