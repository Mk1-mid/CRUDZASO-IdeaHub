import { getSession, clearSession } from './storage.js';
import { protectPage, logout } from './auth.js';

protectPage();
const session = getSession();

function loadProfile() {
  if (!session) {
    window.location.href = './login.html';
  } else {
    document.getElementById('profile-name').textContent = session.username;
    document.getElementById('profile-role').textContent = session.role;
    document.getElementById('text-contact').textContent = session.email;
    document.getElementById('stats-value').textContent = session.totalIdeas;
  }
}

function renderIdeaCard(idea) {
  const category = idea?.category ?? 'Innovation • AI';
  const title = idea?.title ?? 'AI-Powered Customer Service Chatbot';
  const description = idea?.description ?? 'Next-generation language models applied to internal support tickets.';
  const likes = idea?.likes ?? 24;
  const comments = idea?.comments ?? 8;
  return `
    <div class="idea-card">
      <div class="idea-image idea-image-cyan"></div>
      <div class="idea-content">
        <span class="idea-category">${escapeHtml(category)}</span>
        <h3 class="idea-title">${escapeHtml(title)}</h3>
        <p class="idea-description">${escapeHtml(description)}</p>
        <div class="idea-stats">
          <span class="idea-stat">
            <span class="icon-stat">thumb_up</span>${escapeHtml(String(likes))}
          </span>
          <span class="idea-stat">
            <span class="icon-stat">chat_bubble</span>${escapeHtml(String(comments))}
          </span>
        </div>
      </div>
    </div>
  `;
}

// Mostrar todas las ideas (no usado en profile.js es para el home.js)
// function showAllIdeas() {
//   const ideas = (typeof getAllIdeas === 'function') ? getAllIdeas() : [];
//   const container = document.getElementById('ideas-container');
//   if (!container) return;
//   container.innerHTML = ideas.map(idea => renderIdeaCard(idea)).join('');
// }

function showProfileIdeas() {
  const allIdeas = (typeof getAllIdeas === 'function') ? getAllIdeas() : [];
  const userId = session?.userId;
  const ideas = userId ? allIdeas.filter(idea => idea.userId === userId) : [];

  const container = document.getElementById('ideas-container');
  if (!container) return;
  container.innerHTML = ideas.map(idea => renderIdeaCard(idea)).join('');
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  // En profile.js queremos mostrar solo las ideas del usuario
  showProfileIdeas();
});
