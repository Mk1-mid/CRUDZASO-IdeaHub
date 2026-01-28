# 👥 División de Roles - CRUDZASO · IdeaHub

## 📌 Información General

**Proyecto:** CRUDZASO · IdeaHub  
**Equipo:** 4 personas  
**Metodología:** Git Flow + Conventional Commits  
**Repository:** Mk1-mid/CRUDZASO-IdeaHub

---

## 📋 Contrato de Datos (OBLIGATORIO - Todos los roles)

Antes de comenzar, **TODO EL EQUIPO** debe acordar estas estructuras:

### LocalStorage Keys
```javascript
const STORAGE_KEYS = {
  users: 'crudzaso_ideahub_users',
  ideas: 'crudzaso_ideahub_ideas',
  session: 'crudzaso_ideahub_session'
};
```

### Estructura de Usuario
```javascript
{
  id: "string (uuid o timestamp)",
  name: "string",
  email: "string",
  password: "string",
  createdAt: "ISO date string"
}
```

### Estructura de Idea
```javascript
{
  id: "string (uuid o timestamp)",
  title: "string",
  description: "string",
  category: "product | improvement | experiment | other",
  authorId: "string (id del usuario)",
  createdAt: "ISO date string"
}
```

### Estructura de Sesión
```javascript
{
  userId: "string",
  email: "string",
  name: "string"
}
```

---

## 🎯 ROL 1: Authentication Specialist

### 👨‍💻 Responsable de:
- Sistema completo de autenticación (registro y login)
- Manejo de sesiones de usuario
- Helpers de localStorage para todo el equipo
- Protección de páginas privadas

### 📁 Archivos a Desarrollar
```
├── index.html (Login page)
├── register.html (Register page)
└── js/
    ├── auth.js
    └── storage.js
```

### ✅ Tareas Específicas

#### 1. **storage.js** (Prioridad ALTA - Otros dependen de esto)
Crear funciones helper para localStorage:
```javascript
// Exportar constantes
export const STORAGE_KEYS = { ... };

// Funciones de usuarios
export function getUsers() { ... }
export function saveUsers(users) { ... }

// Funciones de ideas
export function getIdeas() { ... }
export function saveIdeas(ideas) { ... }

// Funciones de sesión
export function getSession() { ... }
export function saveSession(session) { ... }
export function clearSession() { ... }
```

#### 2. **register.html**
- Formulario con campos: name, email, password
- Validaciones en tiempo real
- Mensajes de error dinámicos usando `textContent`
- Botón submit con evento manejado por JS
- Link para ir a login

#### 3. **index.html**
- Formulario de login con email y password
- Validaciones
- Mensajes de error
- Redirección a `ideas.html` en éxito
- Link para ir a registro

#### 4. **auth.js**
Implementar las siguientes funciones:
```javascript
// Registro
export function register(name, email, password) {
  // - Validar email único
  // - Crear usuario con ID único
  // - Guardar en localStorage
  // - Retornar success/error
}

// Login
export function login(email, password) {
  // - Verificar credenciales
  // - Crear sesión
  // - Retornar success/error
}

// Logout
export function logout() {
  // - Limpiar sesión
  // - Redirigir a index.html
}

// Verificar sesión
export function checkSession() {
  // - Retornar sesión actual o null
}

// Proteger páginas
export function protectPage() {
  // - Si no hay sesión, redirigir a index.html
}

// Generar ID único
function generateId() {
  // UUID simple o timestamp
}
```

#### 5. **Validaciones Requeridas**
- Email único (no puede haber dos usuarios con el mismo email)
- Campos no vacíos
- Email con formato válido
- Mensajes claros de error en UI

### 🌿 Git Branches
- `feature/storage-helpers`
- `feature/register`
- `feature/login`
- `feature/session-handling`

### 💬 Commits Ejemplo
```
feat: add localStorage helper functions
feat: add user registration form and validation
feat: implement login functionality
feat: add session management and protection
fix: prevent duplicate email registration
refactor: improve auth error handling
```

### 📊 Distribución de Trabajo
- storage.js: 10%
- register.html: 20%
- index.html: 20%
- auth.js: 45%
- Session protection: 5%

### ⏰ Timeline Sugerido
1. **Día 1-2:** storage.js (SUBIR A DEVELOP RÁPIDO)
2. **Día 3-4:** register.html + validaciones
3. **Día 5-6:** index.html + auth.js
4. **Día 7:** Session protection y documentación

---

## 🎯 ROL 2: Profile & User Experience Specialist

### 👨‍💻 Responsable de:
- Página de perfil de usuario
- Estadísticas personales del usuario
- Visualización de ideas propias
- Experiencia de usuario en el perfil

### 📁 Archivos a Desarrollar
```
├── profile.html
└── js/
    └── profile.js
```

### ✅ Tareas Específicas

#### 1. **profile.html**
Crear estructura HTML con:
- **Header del perfil:**
  - Nombre del usuario
  - Email del usuario
  - Botón "Logout"
  
- **Sección de estadísticas:**
  - Total de ideas creadas
  - Fecha de registro (opcional)
  
- **Lista de ideas del usuario:**
  - Container que se llenará dinámicamente con JS
  - Cada idea debe mostrar: título, descripción, categoría, fecha
  
- **Navegación:**
  - Botón/link para ir a `ideas.html`
  - Header con navegación

#### 2. **profile.js**
Implementar las siguientes funciones:
```javascript
import { getSession, clearSession } from './storage.js';
import { protectPage, logout } from './auth.js';
import { getIdeasByAuthor } from './ideas.js';

// Proteger página al cargar
protectPage();

// Cargar perfil completo
function loadProfile() {
  // - Obtener sesión actual
  // - Cargar info del usuario
  // - Cargar estadísticas
  // - Cargar ideas del usuario
}

// Renderizar información del usuario
function renderUserInfo(user) {
  // - Mostrar nombre con textContent
  // - Mostrar email con textContent
}

// Renderizar estadísticas
function renderUserStats(userId) {
  // - Contar total de ideas del usuario
  // - Mostrar número en UI
}

// Renderizar ideas del usuario
function renderUserIdeas(userId) {
  // - Obtener ideas filtradas por authorId
  // - Crear HTML para cada idea
  // - Insertar en container usando innerHTML
  // - Mostrar botones de edit/delete
}

// Event listeners
function setupEventListeners() {
  // - Botón logout
  // - Botones de edit/delete de ideas
}

// Inicializar al cargar página
document.addEventListener('DOMContentLoaded', loadProfile);
```

#### 3. **Estilos del Perfil**
- CSS específico para profile.html (puede estar en styles.css)
- Cards bonitas para las ideas
- Layout responsive
- Header atractivo del perfil

#### 4. **Interactividad**
- Al hacer click en "Logout", llamar a `auth.logout()`
- Botones de edición/eliminación de ideas (integrar con `ideas.js`)
- Navegación fluida a `ideas.html`

### 🌿 Git Branches
- `feature/profile-page`
- `feature/user-stats`
- `feature/profile-styles`

### 💬 Commits Ejemplo
```
feat: add user profile page structure
feat: implement profile data rendering
feat: add user statistics display
feat: render user's ideas list
style: improve profile page layout
fix: correct user stats calculation
```

### 📊 Distribución de Trabajo
- profile.html estructura: 30%
- profile.js lógica: 45%
- Estilos del perfil: 20%
- Integración y testing: 5%

### ⏰ Timeline Sugerido
1. **Día 1-2:** profile.html estructura básica
2. **Día 3-4:** profile.js con renderizado
3. **Día 5-6:** Estadísticas y lista de ideas
4. **Día 7:** Estilos y pulido final

### 🔗 Dependencias
- Necesita `auth.js` y `storage.js` de **Rol 1**
- Necesita `getIdeasByAuthor()` de **Rol 3**

---

## 🎯 ROL 3: Ideas CRUD Specialist

### 👨‍💻 Responsable de:
- Lógica completa de CRUD de ideas
- Validaciones de permisos (solo autor edita/elimina)
- Funciones de filtrado de ideas
- API interna para manejo de ideas

### 📁 Archivos a Desarrollar
```
└── js/
    └── ideas.js
```

### ✅ Tareas Específicas

#### 1. **ideas.js - Funciones CRUD**
Implementar todas las operaciones sobre ideas:

```javascript
import { getIdeas, saveIdeas, getUsers } from './storage.js';
import { getSession } from './storage.js';

// ============ CREATE ============
export function createIdea(title, description, category) {
  // - Validar campos no vacíos
  // - Obtener sesión para authorId
  // - Generar ID único
  // - Crear objeto idea
  // - Agregar a array de ideas
  // - Guardar en localStorage
  // - Retornar success/error
}

// ============ READ ============
export function getAllIdeas() {
  // - Obtener todas las ideas de localStorage
  // - Retornar array
}

export function getIdeaById(id) {
  // - Buscar idea por ID
  // - Retornar idea o null
}

export function getIdeasByAuthor(authorId) {
  // - Filtrar ideas por authorId
  // - Retornar array filtrado
}

export function getIdeasByCategory(category) {
  // - Filtrar ideas por categoría
  // - Retornar array filtrado
}

// ============ UPDATE ============
export function updateIdea(id, title, description, category) {
  // - Obtener sesión actual
  // - Verificar que el usuario sea el autor
  // - Si no es autor, retornar error de permisos
  // - Actualizar campos de la idea
  // - Guardar en localStorage
  // - Retornar success/error
}

// ============ DELETE ============
export function deleteIdea(id) {
  // - Obtener sesión actual
  // - Verificar que el usuario sea el autor
  // - Si no es autor, retornar error de permisos
  // - Eliminar idea del array
  // - Guardar en localStorage
  // - Retornar success/error
}

// ============ PERMISSIONS ============
export function canEditIdea(ideaId, userId) {
  // - Verificar si userId es el autor de la idea
  // - Retornar boolean
}

export function canDeleteIdea(ideaId, userId) {
  // - Verificar si userId es el autor de la idea
  // - Retornar boolean
}

// ============ HELPERS ============
function generateId() {
  // - Generar ID único (timestamp o UUID)
  // - Retornar string
}

function validateIdeaData(title, description, category) {
  // - Validar campos
  // - Retornar boolean o array de errores
}

export function getAuthorName(authorId) {
  // - Buscar usuario por ID
  // - Retornar nombre del autor
  // - Útil para Rol 4 (UI)
}
```

#### 2. **Validaciones Requeridas**
- Título no vacío (mínimo 3 caracteres)
- Descripción no vacía (mínimo 10 caracteres)
- Categoría válida (product, improvement, experiment, other)
- Solo el autor puede editar/eliminar sus ideas
- IDs únicos para cada idea

#### 3. **Manejo de Errores**
Todas las funciones deben retornar objetos con:
```javascript
// Éxito
{ success: true, data: {...}, message: "Operación exitosa" }

// Error
{ success: false, error: "Mensaje de error", message: "Descripción" }
```

#### 4. **Documentación**
Crear comentarios JSDoc para cada función:
```javascript
/**
 * Crea una nueva idea
 * @param {string} title - Título de la idea
 * @param {string} description - Descripción de la idea
 * @param {string} category - Categoría (product|improvement|experiment|other)
 * @returns {Object} - { success, data/error, message }
 */
export function createIdea(title, description, category) { ... }
```

### 🌿 Git Branches
- `feature/ideas-create`
- `feature/ideas-read`
- `feature/ideas-update-delete`
- `feature/ideas-permissions`
- `feature/ideas-filters`

### 💬 Commits Ejemplo
```
feat: add create idea functionality
feat: implement read operations for ideas
feat: add update and delete idea methods
feat: implement permission validation
feat: add filter functions by author and category
fix: correct permission check for edit idea
refactor: improve error handling in CRUD operations
docs: add JSDoc comments to ideas API
```

### 📊 Distribución de Trabajo
- Create: 15%
- Read (+ filtros): 20%
- Update: 20%
- Delete: 15%
- Permisos: 15%
- Validaciones: 10%
- Documentación: 5%

### ⏰ Timeline Sugerido
1. **Día 1-2:** Create + Read básico
2. **Día 3-4:** Update + Delete
3. **Día 5:** Permisos y validaciones
4. **Día 6:** Filtros (by author, by category)
5. **Día 7:** Documentación y testing

### 🔗 Dependencias
- Necesita `storage.js` de **Rol 1**
- Sus funciones serán usadas por **Rol 2** y **Rol 4**

---

## 🎯 ROL 4: Feed & Filters Specialist

### 👨‍💻 Responsable de:
- Página principal del feed de ideas
- Renderizado dinámico de todas las ideas
- Sistema de filtros (categoría, autor)
- Estilos globales del proyecto
- Integración visual del proyecto completo

### 📁 Archivos a Desarrollar
```
├── ideas.html (Main feed)
├── js/
│   └── ui.js
└── css/
    └── styles.css
```

### ✅ Tareas Específicas

#### 1. **ideas.html - Estructura Principal**
Crear HTML con:

- **Header/Navbar:**
  - Logo/Título del proyecto
  - Link a perfil (`profile.html`)
  - Botón de logout
  - Nombre del usuario en sesión

- **Sección: Crear Nueva Idea**
  - Formulario con:
    - Input: Título
    - Textarea: Descripción
    - Select: Categoría (product, improvement, experiment, other)
    - Botón: "Crear Idea"
  - Mensajes de éxito/error

- **Sección: Filtros**
  - Select: Filtrar por categoría (Todas, Product, Improvement, etc.)
  - Select: Filtrar por autor (Todos, nombres de usuarios)
  - Botón: "Limpiar filtros"

- **Sección: Feed de Ideas**
  - Container `<div id="ideas-container">` que se llenará con JS
  - Mensaje si no hay ideas

#### 2. **ui.js - Renderizado Dinámico**
Implementar funciones de UI:

```javascript
import { getAllIdeas, createIdea, updateIdea, deleteIdea, getAuthorName } from './ideas.js';
import { protectPage, getSession } from './auth.js';

// Proteger página
protectPage();

// ============ RENDERIZADO ============
export function renderIdeas(ideas) {
  // - Limpiar container
  // - Si no hay ideas, mostrar mensaje
  // - Por cada idea, llamar a renderIdeaCard()
  // - Insertar en el DOM con innerHTML
}

function renderIdeaCard(idea) {
  // - Crear HTML de card
  // - Incluir: título, descripción, categoría, autor, fecha
  // - Obtener sesión actual
  // - Si el usuario es el autor:
  //   - Mostrar botones "Editar" y "Eliminar"
  // - Si no es el autor:
  //   - No mostrar botones
  // - Retornar HTML string
}

export function clearIdeasContainer() {
  // - Limpiar el container de ideas
}

// ============ FILTROS ============
export function filterByCategory(category) {
  // - Si category === "all", mostrar todas
  // - Si no, usar getIdeasByCategory()
  // - Re-renderizar con renderIdeas()
}

export function filterByAuthor(authorId) {
  // - Si authorId === "all", mostrar todas
  // - Si no, usar getIdeasByAuthor()
  // - Re-renderizar con renderIdeas()
}

export function resetFilters() {
  // - Resetear selects
  // - Mostrar todas las ideas
}

// ============ FORMULARIOS ============
function handleCreateForm(event) {
  // - Prevenir submit default
  // - Obtener valores del formulario
  // - Validar campos
  // - Llamar a createIdea()
  // - Mostrar mensaje de éxito/error
  // - Limpiar formulario
  // - Re-renderizar ideas
}

function handleEditIdea(ideaId) {
  // - Obtener idea por ID
  // - Llenar formulario con datos
  // - Cambiar botón a "Actualizar"
  // - Al submit, llamar a updateIdea()
}

function handleDeleteIdea(ideaId) {
  // - Confirmar con usuario
  // - Llamar a deleteIdea()
  // - Mostrar mensaje
  // - Re-renderizar ideas
}

// ============ MENSAJES ============
export function showMessage(message, type) {
  // - Crear elemento de mensaje
  // - type: "success" | "error" | "info"
  // - Mostrar por 3 segundos
  // - Eliminar automáticamente
}

// ============ INICIALIZACIÓN ============
function init() {
  // - Cargar todas las ideas
  // - Renderizar ideas
  // - Configurar event listeners
  // - Llenar select de autores
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
```

#### 3. **styles.css - Estilos Globales**
Crear estilos para TODO el proyecto:

- **Reset y variables:**
  ```css
  :root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --background: #your-color;
    --text: #your-color;
  }
  ```

- **Estilos globales:**
  - Body, headers, links
  - Buttons (primary, secondary, danger)
  - Forms (inputs, textareas, selects)
  - Cards de ideas
  - Navbar/Header
  - Mensajes de éxito/error
  - Loading states

- **Layout responsive:**
  - Mobile first
  - Breakpoints para tablet y desktop
  - Grid o Flexbox para cards

- **Específicos por página:**
  - Login/Register forms
  - Ideas feed
  - Profile page

#### 4. **Interactividad**
- Form submit para crear idea
- Clicks en botones edit/delete
- Changes en selects de filtros
- Logout button
- Navegación entre páginas

### 🌿 Git Branches
- `feature/ideas-feed-page`
- `feature/ui-rendering`
- `feature/filters-ui`
- `feature/global-styles`
- `feature/responsive-design`

### 💬 Commits Ejemplo
```
feat: add ideas feed page structure
feat: implement dynamic idea rendering
feat: add create idea form handling
feat: implement category and author filters
feat: add edit and delete idea UI
style: add global CSS styles
style: improve idea cards design
style: add responsive layout
fix: correct filter reset functionality
refactor: improve UI code organization
```

### 📊 Distribución de Trabajo
- ideas.html estructura: 20%
- ui.js renderizado: 30%
- ui.js filtros: 20%
- styles.css global: 25%
- Integración final: 5%

### ⏰ Timeline Sugerido
1. **Día 1:** ideas.html estructura completa
2. **Día 2-3:** ui.js renderizado de ideas
3. **Día 4:** Formulario crear idea
4. **Día 5:** Sistema de filtros
5. **Día 6:** styles.css completo
6. **Día 7:** Responsive y pulido final

### 🔗 Dependencias
- Necesita `auth.js` y `storage.js` de **Rol 1**
- Necesita TODAS las funciones de `ideas.js` de **Rol 3**
- Sus estilos afectan las páginas de **Rol 1** y **Rol 2**

---

## 📊 Resumen de Distribución

| Rol | Páginas HTML | Archivos JS | CSS | Complejidad | Carga |
|-----|--------------|-------------|-----|-------------|-------|
| **Rol 1** | 2 (login, register) | 2 (auth, storage) | - | Alta | 25% |
| **Rol 2** | 1 (profile) | 1 (profile) | Parcial | Media | 25% |
| **Rol 3** | 0 | 1 (ideas) | - | Alta | 25% |
| **Rol 4** | 1 (ideas feed) | 1 (ui) | Total | Media-Alta | 25% |

---

## 🔄 Workflow de Integración

### Fase 1: Setup (Día 1-2)
1. **Todos:** Clone del repositorio
2. **Todos:** Crear branch `develop` desde `main`
3. **Rol 1:** Crear y subir `storage.js` a `develop` (PRIORIDAD)
4. **Todos:** Pull de `develop` para obtener `storage.js`
5. **Todos:** Crear sus feature branches desde `develop`

### Fase 2: Desarrollo Paralelo (Día 3-10)
- **Rol 1:** Trabaja en `feature/register`, `feature/login`, `feature/session-handling`
- **Rol 2:** Trabaja en `feature/profile-page`, `feature/user-stats`
- **Rol 3:** Trabaja en `feature/ideas-crud`, `feature/ideas-permissions`
- **Rol 4:** Trabaja en `feature/ideas-feed`, `feature/filters`, `feature/global-styles`

### Fase 3: Integración (Día 11-13)
1. **Rol 1:** Merge sus features → `develop`
2. **Todos:** Pull de `develop`
3. **Rol 3:** Merge sus features → `develop`
4. **Todos:** Pull de `develop`
5. **Rol 4:** Merge sus features → `develop`
6. **Todos:** Pull de `develop`
7. **Rol 2:** Merge sus features → `develop`

### Fase 4: Testing y Deploy (Día 14-15)
1. **Todos:** Pruebas en `develop`
2. **Todos:** Fix de bugs en nuevas branches
3. **Code review** en equipo
4. **Merge final:** `develop` → `main`
5. **Deploy:** Configurar GitHub Pages desde `main`

---

## ✅ Checklist General

### Rol 1 - Authentication Specialist
- [ ] `storage.js` con todas las funciones helper
- [ ] `register.html` funcional con validaciones
- [ ] `index.html` (login) funcional
- [ ] `auth.js` completo (register, login, logout, session)
- [ ] Validación de email único
- [ ] Session protection implementada
- [ ] Redirecciones correctas
- [ ] Conventional commits en todas las features

### Rol 2 - Profile & User Experience Specialist
- [ ] `profile.html` con estructura completa
- [ ] `profile.js` con renderizado de datos
- [ ] Mostrar información del usuario
- [ ] Estadísticas (total de ideas)
- [ ] Lista de ideas del usuario
- [ ] Botón logout funcional
- [ ] Navegación a ideas.html
- [ ] Conventional commits en todas las features

### Rol 3 - Ideas CRUD Specialist
- [ ] `ideas.js` con todas las funciones CRUD
- [ ] Crear idea funcional
- [ ] Leer/Obtener ideas funcional
- [ ] Editar idea (solo autor)
- [ ] Eliminar idea (solo autor)
- [ ] Filtrar por categoría
- [ ] Filtrar por autor
- [ ] Validaciones de permisos
- [ ] Documentación JSDoc
- [ ] Conventional commits en todas las features

### Rol 4 - Feed & Filters Specialist
- [ ] `ideas.html` con estructura completa
- [ ] `ui.js` con renderizado dinámico
- [ ] Mostrar todas las ideas
- [ ] Cards de ideas con botones condicionales
- [ ] Formulario crear idea funcional
- [ ] Filtro por categoría funcional
- [ ] Filtro por autor funcional
- [ ] `styles.css` completo y responsive
- [ ] Integración con `ideas.js`
- [ ] Navegación y logout
- [ ] Conventional commits en todas las features

---

## 🚀 Reglas de Oro

### Git Flow
- ✅ **NUNCA** hacer commit directo a `main`
- ✅ **SIEMPRE** trabajar en feature branches
- ✅ **SIEMPRE** mergear features a `develop` primero
- ✅ Hacer `git pull origin develop` diariamente
- ✅ Resolver conflictos inmediatamente

### Conventional Commits
Tipos permitidos:
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `style:` cambios de CSS o visuales
- `refactor:` reestructuración de código
- `docs:` documentación
- `chore:` configuración o herramientas

Ejemplos:
```bash
git commit -m "feat: add user registration form"
git commit -m "fix: prevent duplicate email on register"
git commit -m "style: improve idea card layout"
git commit -m "refactor: split rendering logic into functions"
git commit -m "docs: add JSDoc to ideas.js functions"
```

### Comunicación
- 💬 Daily stand-up (sincrónico o asincrónico)
- 💬 Comunicar bloqueos inmediatamente
- 💬 Code review antes de mergear
- 💬 Documentar decisiones importantes

### Calidad
- ✅ Probar funcionalidad antes de hacer PR
- ✅ Código limpio y comentado
- ✅ Nombres de variables descriptivos
- ✅ No dejar `console.log()` en producción
- ✅ Validar en diferentes navegadores

---

## 📞 Contacto y Soporte

Si tienes dudas sobre tu rol:
1. Revisa este documento primero
2. Consulta con tu equipo
3. Revisa la documentación de JavaScript/localStorage
4. Pregunta al instructor/líder del equipo

---

## 🎯 Objetivo Final

Al completar este proyecto, tendrán:
- ✅ Aplicación web funcional con CRUD completo
- ✅ Experiencia con Git Flow en equipo
- ✅ Portfolio con proyecto desplegado
- ✅ Código limpio y bien documentado
- ✅ Experiencia en trabajo colaborativo real

---

**¡Éxito en el proyecto! 🚀**
