# Galería de Personajes de Rick and Morty (SPA)

Aplicación web de página única (Single Page Application - SPA) construida con **HTML5**, **CSS3**, **JavaScript Vanilla** (Fetch API con `async/await`) y **Bootstrap 5**, que consume la API pública [The Rick and Morty API](https://rickandmortyapi.com).

Proyecto preparado y optimizado para su despliegue en producción en **Vercel** o para ejecución local en **XAMPP** / Live Server.

---

## 🚀 Características Principales

* **Cuadrícula Responsive (Bootstrap 5)**:
  * 4 tarjetas por fila en pantallas grandes (`col-lg-3`).
  * 2 tarjetas por fila en tabletas (`col-md-6`).
  * 1 tarjeta por fila en dispositivos móviles (`col-12`).
  * Tarjetas con altura idéntica (`h-100` y `d-flex flex-column`) y botón "Detalle" fijado al pie de la tarjeta (`mt-auto`).
* **Indicadores Visuales de Estado**:
  * 🟢 **Verde** para `Alive`.
  * 🔴 **Rojo** para `Dead`.
  * ⚪ **Gris** para `unknown` u otros estados.
* **Ventana Modal de Detalle (Bootstrap Modal)**:
  * Muestra imagen y nombre en la cabecera.
  * Tabla con información completa: ID, Estado (con punto de color), Especie, Género, Tipo (evalúa si está vacío y muestra `"Sin tipo"`), Origen (`origin.name`), Última ubicación (`location.name`), Cantidad de episodios (`episode.length`) y Fecha de creación (`created`) formateada a `dd/mm/aaaa`.
* **Paginación Dinámica**:
  * Botones `<< Anterior` y `Siguiente >>`.
  * Contador central: `Página N de 42` (total obtenido dinámicamente desde `info.pages`).
  * Deshabilitación automática del botón "Anterior" en la página 1 y "Siguiente" en la última página.
* **Manejo Robusto de Errores y Carga**:
  * Verificación de `response.ok` en cada llamada a la API.
  * Indicador de carga (*Spinner*) durante la obtención de datos.
  * Mensaje descriptivo con botón de reintento en caso de fallo de conexión o error HTTP (404/500).

---

## 📁 Estructura del Proyecto

El proyecto está organizado en la raíz principal para garantizar compatibilidad directa con Vercel y servidores web:

```text
├── index.html        # Estructura principal de la SPA con CDN de Bootstrap 5
├── styles.css        # Estilos personalizados y tema oscuro moderno
├── script.js         # Lógica Vanilla JS (fetch, renderizado, modal, paginación)
├── .gitignore        # Archivos ignorados por git
└── README.md         # Documentación completa y guía de despliegue
```

---

## 💻 Ejecución Local

### Opción A: Mediante XAMPP
1. Coloca la carpeta `S14_apiRickandMorty` dentro de `C:\xampp\htdocs\EntornoServidor2026\`.
2. Inicia el módulo **Apache** desde el panel de control de XAMPP.
3. Abre tu navegador y accede a:
   ```text
   http://localhost/EntornoServidor2026/S14_apiRickandMorty/
   ```

### Opción B: Con Live Server o directamente en el navegador
* Abre el archivo `index.html` con la extensión *Live Server* de Visual Studio Code o haz doble clic para abrirlo directamente en cualquier navegador web moderno.

---

## 🌐 Guía de Despliegue en Vercel (Paso a Paso)

Sigue estos pasos para publicar tu aplicación en internet de forma gratuita:

### Paso 1: Inicializar y subir a GitHub
1. Abre una terminal en la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "feat: Galería de personajes de Rick and Morty SPA"
   ```
2. Crea un repositorio público en tu cuenta de GitHub (por ejemplo, `galeria-rickandmorty`).
3. Enlaza y sube tu proyecto:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/galeria-rickandmorty.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Crear cuenta en Vercel
1. Ingresa a [vercel.com](https://vercel.com) y regístrate o inicia sesión con tu cuenta de **GitHub**.
2. Selecciona el plan gratuito (**Hobby**).

### Paso 3: Importar el Repositorio
1. En el panel principal de Vercel (*Dashboard*), haz clic en **Add New...** y luego en **Project**.
2. Autoriza el acceso a tus repositorios y selecciona `galeria-rickandmorty`.

### Paso 4: Configurar y Desplegar
1. En la pantalla de configuración:
   * **Project Name**: Mantén el nombre sugerido o escribe uno de tu preferencia.
   * **Framework Preset**: Selecciona **Other** (la aplicación no requiere compilador).
   * **Root Directory**: Déjalo en `./` (la raíz donde está `index.html`).
   * **Build and Output Settings**: Deja todos los campos vacíos (no requiere comando de construcción).
2. Haz clic en **Deploy**.

### Paso 5: Abrir y Comprobar tu Aplicación
* En segundos, Vercel generará una URL pública terminada en `.vercel.app` (por ejemplo, `https://galeria-rickandmorty.vercel.app`).
* Ábrela en cualquier navegador de escritorio o móvil para verificar las tarjetas, la ventana modal y la paginación.

---

## 🛠️ Solución a Problemas Frecuentes

| Síntoma | Causa / Solución |
| :--- | :--- |
| **Error 404 en Vercel** | Asegúrate de que `index.html` se encuentre en la raíz del repositorio y no dentro de una subcarpeta. |
| **Pide comando de construcción** | En los ajustes de Vercel (*Settings* > *General*), deja vacíos `Build Command` y `Output Directory`. |
| **No cargan estilos o imágenes** | Revisa que los archivos estén enlazados con rutas relativas (`./styles.css`, `./script.js`) y que coincidan exactamente mayúsculas y minúsculas. |
| **No aparecen personajes** | Abre las herramientas de desarrollo (<kbd>F12</kbd> > *Console*) y confirma que la URL `https://rickandmortyapi.com/api/character` tenga acceso sin bloqueos de red o firewall. |
