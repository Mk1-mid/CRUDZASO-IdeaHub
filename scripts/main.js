// Simple frontend data binding for ideas grid (demo)
async function loadIdeas() {
  try {
    const resp = await fetch('/data/ideas.json');
    if (!resp.ok) throw new Error('Failed to fetch ideas');
    const ideas = await resp.json();
    renderIdeas(ideas);
  } catch (e) {
    console.error(e);
  }
}

function renderIdeas(ideas) {
  const container = document.getElementById('ideas-grid');
  container.innerHTML = '';
  ideas.forEach((idea) => {
    const card = document.createElement('article');
    card.className = 'idea-card';
    card.setAttribute('data-id', idea.id);

    // Image block with color variant
    const img = document.createElement('div');
    img.className = `idea-image idea-image-${idea.color}`;
    card.appendChild(img);

    // Content
    const content = document.createElement('div');
    content.className = 'idea-content';

    const category = document.createElement('span');
    category.className = 'idea-category';
    category.textContent = idea.category;
    content.appendChild(category);

    const title = document.createElement('h3');
    title.className = 'idea-title';
    title.textContent = idea.title;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'idea-description';
    desc.textContent = idea.description;
    content.appendChild(desc);

    card.appendChild(content);
    container.appendChild(card);
  });
}

document.getElementById('btn-load-more').addEventListener('click', loadIdeas);
loadIdeas();
