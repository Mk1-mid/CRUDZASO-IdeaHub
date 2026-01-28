// ui.js - Manejo de UI, DOM rendering, filtros y listeners

import { getIdeas, getUsers, getSession } from './storage.js';

// ========== VARIABLES GLOBALES ==========

let currentFilters = {
    categories: {
        product: true,
        improvement: true,
        experiment: true,
        other: true
    },
    author: 'all',
    searchTerm: ''
};

// ========== UTILIDADES ==========

export function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// DINAMICALLY connect sidebar user to profile page (quick UX link)
export function renderSidebarUserLink() {
    const userPanel = document.querySelector('.sidebar-user');
    if (!userPanel) return;
    // Ensure the panel looks clickable
    userPanel.style.cursor = 'pointer';
    // Fill with current session data if available (best-effort)
    const session = getSession();
    if (session) {
        const nameEl = document.querySelector('.sidebar-user-name');
        const roleEl = document.querySelector('.sidebar-user-role');
        if (nameEl && session.fullName) nameEl.textContent = session.fullName;
        if (roleEl && session.role) roleEl.textContent = session.role;
    }
    // Attach navigation behavior
    const navigate = () => {
        window.location.href = 'profile.html';
    };
    // Click and keyboard accessibility
    userPanel.addEventListener('click', navigate);
    userPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate();
        }
    });
}

// ========== RENDERIZADO DE IDEAS ==========

export function renderIdeaCard(idea, session) {
    // Normalize category to avoid runtime errors when missing
    const category = (typeof idea.category === 'string') ? idea.category.toLowerCase() : 'other';
    const isOwner = session && session.userId === idea.userId;
    
    const categoryLabels = {
        'product': 'Product',
        'improvement': 'Improvement',
        'experiment': 'Experiment',
        'other': 'Other'
    };
    
    const categoryLabel = categoryLabels[category] || idea.category;
    
    return `
        <div class="idea-card" data-idea-id="${idea.id}" data-category="${category}" data-author-id="${idea.userId}">
            <div class="idea-card-header">
                <span class="idea-category indicator-${category}">${escapeHtml(categoryLabel)}</span>
                ${isOwner ? `
                    <div class="idea-actions">
                        <button class="idea-action-btn" data-action="edit" data-idea-id="${idea.id}" title="Editar">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="idea-action-btn" data-action="delete" data-idea-id="${idea.id}" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                ` : ''}
            </div>
            <div class="idea-card-content">
                <h3 class="idea-title">${escapeHtml(idea.title)}</h3>
                <p class="idea-description">${escapeHtml(idea.description)}</p>
                <div class="idea-footer">
                    <div class="idea-author">
                        <span class="material-symbols-outlined">person</span>
                        <span>${escapeHtml(idea.userName)}</span>
                    </div>
                    <div class="idea-stats">
                        <button class="idea-stat-btn" data-action="like" data-idea-id="${idea.id}">
                            <span class="material-symbols-outlined">thumb_up</span>
                            <span>${idea.likes}</span>
                        </button>
                        <div class="idea-stat">
                            <span class="material-symbols-outlined">chat_bubble</span>
                            <span>${idea.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderIdeas(containerSelector, session) {
    const ideasGrid = document.querySelector(containerSelector);
    if (!ideasGrid) return;
    
    const ideas = getIdeas();
    
    // Aplicar filtros
    const filteredIdeas = ideas.filter(idea => {
        // Filtro por categoría
        const categoryMatch = currentFilters.categories[idea.category.toLowerCase()];
        
        // Filtro por autor
        const authorMatch = currentFilters.author === 'all' || idea.userId === currentFilters.author;
        
        // Filtro por búsqueda
        const searchMatch = currentFilters.searchTerm === '' || 
            idea.title.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
            idea.description.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());
        
        return categoryMatch && authorMatch && searchMatch;
    });
    
    // Mensaje si no hay ideas
    if (filteredIdeas.length === 0) {
        ideasGrid.innerHTML = `
            <div class="no-ideas">
                <span class="material-symbols-outlined">lightbulb_outline</span>
                <p>No hay ideas para mostrar</p>
                <p class="text-sm">Prueba con otros filtros o crea una nueva idea</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por fecha (más recientes primero)
    filteredIdeas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Renderizar
    ideasGrid.innerHTML = filteredIdeas.map(idea => renderIdeaCard(idea, session)).join('');
}

// ========== FILTROS ==========

export function setupCategoryFilters(callback) {
    const categoryCheckboxes = document.querySelectorAll('.categories-list input[type="checkbox"]');
    
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.closest('.category-label');
            const categoryText = label.querySelector('.category-text').textContent.toLowerCase();
            
            currentFilters.categories[categoryText] = e.target.checked;
            
            if (callback) callback();
        });
    });
}

export function setupAuthorFilter(callback) {
    // Crear dropdown de autores si no existe
    let authorFilter = document.getElementById('author-filter');
    
    if (!authorFilter) {
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            const filterWrapper = document.createElement('div');
            filterWrapper.className = 'filter-wrapper';
            filterWrapper.innerHTML = `
                <select id="author-filter" class="author-filter">
                    <option value="all">Todos los autores</option>
                </select>
            `;
            headerActions.insertBefore(filterWrapper, headerActions.firstChild);
            authorFilter = document.getElementById('author-filter');
        }
    }
    
    if (authorFilter) {
        // Poblar con usuarios únicos de las ideas
        const ideas = getIdeas();
        const uniqueAuthors = [...new Set(ideas.map(idea => idea.userId))];
        
        uniqueAuthors.forEach(authorId => {
            const idea = ideas.find(i => i.userId === authorId);
            if (idea && !authorFilter.querySelector(`option[value="${authorId}"]`)) {
                const option = document.createElement('option');
                option.value = authorId;
                option.textContent = idea.userName;
                authorFilter.appendChild(option);
            }
        });
        
        // Listener
        authorFilter.addEventListener('change', (e) => {
            currentFilters.author = e.target.value;
            if (callback) callback();
        });
    }
}

export function setupSearchFilter(inputSelector, callback) {
    const searchInput = document.querySelector(inputSelector);
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.searchTerm = e.target.value;
            if (callback) callback();
        });
    }
}

// ========== NOTIFICACIONES ==========

export function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            display: none;
        `;
        document.body.appendChild(notification);
    }
    
    const colors = {
        success: 'rgba(34, 197, 94, 0.9)',
        error: 'rgba(239, 68, 68, 0.9)',
        info: 'rgba(59, 130, 246, 0.9)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.style.color = 'white';
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ========== MODAL ==========

export function openModal(modalId, formId) {
    const overlay = document.getElementById(modalId);
    const form = document.getElementById(formId);
    
    if (overlay) {
        overlay.classList.add('show');
        if (form) {
            form.reset();
            form.removeAttribute('data-edit-id');
        }
        
        // Cambiar título del modal
        const modalTitle = overlay.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = 'Nueva idea';
        }
        
        // Cambiar texto del botón
        const submitBtn = overlay.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Crear idea';
        }
    }
}

export function closeModal(modalId, formId) {
    const overlay = document.getElementById(modalId);
    const form = document.getElementById(formId);
    
    if (overlay) {
        overlay.classList.remove('show');
        if (form) {
            form.reset();
            form.removeAttribute('data-edit-id');
        }
    }
}

// ========== LISTENERS DE EVENTOS ==========

export function setupModalListeners(modalId, formId, openBtnId, cancelBtnId) {
    const openBtn = document.getElementById(openBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);
    const overlay = document.getElementById(modalId);
    
    // Abrir modal
    if (openBtn) {
        openBtn.addEventListener('click', () => openModal(modalId, formId));
    }
    
    // Cerrar modal
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeModal(modalId, formId));
    }
    
    // Cerrar al hacer clic fuera
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(modalId, formId);
            }
        });
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('show')) {
            closeModal(modalId, formId);
        }
    });
}

// ========== EXPORTAR FILTROS ACTUALES ==========

export function getCurrentFilters() {
    return { ...currentFilters };
}

export function resetFilters() {
    currentFilters = {
        categories: {
            product: true,
            improvement: true,
            experiment: true,
            other: true
        },
        author: 'all',
        searchTerm: ''
    };
}

// Initialize quick sidebar navigation after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderSidebarUserLink();
});
