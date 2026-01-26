# IdeaHub CSS Stylesheets Documentation

Este conjunto de archivos CSS proporciona estilos completos para la plataforma IdeaHub de CRUDZASO.

## 📁 Archivos CSS Incluidos

### 1. **login.css**
Estilos para la página de inicio de sesión (Login)
- **Tema**: Oscuro con gradiente purple-blue
- **Características**:
  - Efecto glassmorphism en el formulario
  - Gradiente de fondo radial
  - Inputs con iconos Material Symbols
  - Animaciones suaves en hover y focus
  - Diseño responsive

### 2. **main-feed.css**
Estilos para el feed principal de ideas (Tema claro)
- **Tema**: Claro con estilo neobrutalism
- **Características**:
  - Sidebar lateral oscuro
  - Tarjetas con bordes negros y sombras neobrutalism
  - Sistema de categorías con checkboxes
  - Grid responsive de 1/2/3 columnas
  - Botón flotante de acción
  - Imágenes con efecto hover zoom

### 3. **main-feed-dark.css**
Estilos para el feed principal de ideas (Tema oscuro)
- **Tema**: Oscuro con glassmorphism
- **Características**:
  - Tarjetas con efecto glass
  - Colores de acento para categorías
  - Animaciones suaves
  - Búsqueda con focus states elegantes

### 4. **registration-light.css**
Estilos para registro de usuario (Tema claro)
- **Tema**: Claro con gradientes y glassmorphism
- **Características**:
  - Layout de 2 columnas (marketing + formulario)
  - Sección de marketing con ilustración
  - Formulario con efecto glass
  - Indicador de fortaleza de contraseña
  - Botón con gradiente y efecto glow

### 5. **registration-dark.css**
Estilos para registro de usuario (Tema oscuro)
- **Tema**: Oscuro con efectos de luz
- **Características**:
  - Background con gradientes radiales
  - Formas abstractas con blur
  - Validación visual de email
  - Inputs con estados focus elegantes
  - Animación pulse en ilustración

### 6. **user-profile.css**
Estilos para perfil de usuario
- **Tema**: Oscuro premium
- **Características**:
  - Avatar grande con borde gradiente
  - Badge de verificación
  - Tarjeta de estadísticas con efecto glass
  - Grid de iniciativas con hover effects
  - Imágenes con filtro grayscale que se quita en hover
  - Footer con links
  - Header sticky con navegación

## 🎨 Paleta de Colores

### Colores Principales
- **Purple**: `#8b5cf6`, `#a855f7`, `#6366f1`
- **Blue**: `#3b82f6`, `#2563eb`
- **Pink**: `#ec4899`
- **Green**: `#10b981`
- **Charcoal**: `#0a0a0c`, `#1e293b`

### Colores de Categorías
- **Product**: `#10b981` (verde)
- **Improvement**: `#6366f1` (indigo)
- **Experiment**: `#ec4899` (pink)

## 🔧 Características Técnicas

### Efectos Utilizados
1. **Glassmorphism**
   - `backdrop-filter: blur()`
   - Backgrounds semi-transparentes
   - Bordes sutiles

2. **Neobrutalism** (en tema claro del feed)
   - Bordes negros sólidos
   - Sombras desplazadas
   - Colores vibrantes

3. **Gradientes**
   - Lineales y radiales
   - Para backgrounds y texto
   - Efectos de profundidad

### Animaciones
- Transiciones suaves (`transition: all 0.2s ease`)
- Transform en hover
- Pulse animation
- Zoom en imágenes

### Responsive Design
- Mobile first approach
- Breakpoints:
  - `640px` (sm)
  - `768px` (md)
  - `1024px` (lg)
  - `1280px` (xl)

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)

### Prefijos Necesarios
Los archivos incluyen prefijos `-webkit-` para:
- `backdrop-filter`
- `background-clip`

## 🚀 Uso

### Implementación Básica

```html
<!-- Para la página de login -->
<link rel="stylesheet" href="login.css">

<!-- Para el feed principal (tema claro) -->
<link rel="stylesheet" href="main-feed.css">

<!-- Para el feed principal (tema oscuro) -->
<link rel="stylesheet" href="main-feed-dark.css">

<!-- Para registro (tema claro) -->
<link rel="stylesheet" href="registration-light.css">

<!-- Para registro (tema oscuro) -->
<link rel="stylesheet" href="registration-dark.css">

<!-- Para perfil de usuario -->
<link rel="stylesheet" href="user-profile.css">
```

### Fuentes Requeridas

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

### Framework CSS
Estos estilos están diseñados para trabajar con **Tailwind CSS** o pueden usarse de forma independiente.

## 📝 Notas de Personalización

### Variables CSS
Cada archivo define variables CSS en `:root` que pueden ser modificadas:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.2);
  --accent-glow: 0 0 15px rgba(59, 130, 246, 0.5);
  /* ... más variables */
}
```

### Modificación de Colores
Para cambiar los colores de acento, edita las variables en cada archivo o reemplaza los valores hexadecimales directamente.

## ⚡ Optimización

### Rendimiento
- Uso de `transform` en lugar de `margin/padding` para animaciones
- `will-change` implícito en elementos animados
- Transiciones limitadas a propiedades específicas

### Accesibilidad
- Contraste de colores WCAG AA compliant
- Estados focus visibles
- Tamaños de fuente legibles

## 🔄 Versiones

**Versión**: 1.0.0
**Última actualización**: Enero 2026
**Compatibilidad**: HTML5, CSS3

## 📧 Soporte

Para preguntas sobre implementación o personalización, consulta la documentación de IdeaHub o contacta al equipo de desarrollo de CRUDZASO.

---

**© 2024 CRUDZASO Internal Systems. All Rights Reserved.**
