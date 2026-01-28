# CRUDZASO-IdeaHub

Proyecto frontend estático para gestionar ideas (CRUD) — interfaz de ejemplo creada como prototipo.

Estado: Proyecto local estático. Contiene páginas HTML, estilos y scripts JavaScript para autenticación y manejo de ideas mediante un archivo JSON de datos.

Características principales
- Interfaz de registro/login y perfil.
- Gestión de ideas (crear, leer, actualizar, eliminar) almacenadas en `data/ideas.json`.
- Estructura simple para pruebas y prototipado.

Estructura del proyecto
- [ideas.html](ideas.html)
- [index.html](index.html)
- [profile.html](profile.html)
- [register.html](register.html)
- [assets/css/styles.css](assets/css/styles.css)
- [data/ideas.json](data/ideas.json)
- scripts/
	- [scripts/auth.js](scripts/auth.js)
	- [scripts/ideas.js](scripts/ideas.js)
	- [scripts/profile.js](scripts/profile.js)
	- [scripts/script.js](scripts/script.js)
	- [scripts/storage.js](scripts/storage.js)
	- [scripts/ui.js](scripts/ui.js)

Requisitos
- Navegador moderno (Chrome, Edge, Firefox).
- Para una experiencia completa, servir los archivos desde un servidor estático local (no obligatorio, pero recomendado).


Uso básico
- Abrir `index.html` o la ruta raíz del servidor.
- Registrarse/ingresar según la implementación en `scripts/auth.js`.
- Ir a `ideas.html` para ver y gestionar ideas (los datos se leen/escriben en `data/ideas.json`).

Nota importante: para iniciar en la aplicación es necesario **registrarse**; la contraseña debe tener un mínimo de 6 caracteres.

Notas sobre datos
- `data/ideas.json` actúa como fuente de datos del prototipo. En producción se reemplazaría por una API/servidor.

Contribuir
- Hacer fork y crear una rama por cambio: `feature/descripcion`.
- Abrir pull request con descripción clara de los cambios.

Licencia
- No se ha especificado una licencia en este repositorio. Añadir un archivo `LICENSE` si corresponde.

Contacto
- Mantener issues o PRs para sugerencias y correcciones.
