// profile.js - Render user profile dynamically
import { getSession, getIdeas } from './storage.js';
import { protectPage } from './auth.js';

// Small HTML escape to prevent basic XSS in profile rendering
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Render profile into a container element
export function renderProfile(containerSelector) {
  const container = document.querySelector(containerSelector);
  const session = getSession();
  if (!container) return;
  if (!session) {
    container.innerHTML = '<p>Por favor inicia sesión para ver tu perfil.</p>';
    return;
  }

  const ideas = getIdeas();
  const userIdeas = ideas.filter(i => i.userId === session.email);
  const totalIdeas = userIdeas.length;

  const listItems = userIdeas.map(idea => {
    const cat = (typeof idea.category === 'string') ? idea.category : 'other';
    return `<li>${escapeHtml(idea.title)} — <em>${escapeHtml(cat)}</em> (ID: ${idea.id})</li>`;
  }).join('');

  container.innerHTML = `
    <h2>Perfil de ${escapeHtml(session.fullName)}</h2>
    <p>Email: ${escapeHtml(session.email)}</p>
    <p>Total de ideas creadas: ${totalIdeas}</p>
    <h3>Ideas creadas:</h3>
    <ul>${listItems || '<li>No hay ideas creadas todavía.</li>'}</ul>
  `;
}
// Ensure page protection on load and render profile when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Redirect if not logged in
    protectPage();
    // Render profile into a known container
    renderProfile('#profile-container');
});
