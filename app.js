// app.js

// 1. Configuración del cliente de Supabase
const SUPABASE_URL = 'URL_DE_TU_PROYECTO'; // ¡Pega tu URL aquí!
const SUPABASE_ANON_KEY = 'TU_ANON_KEY'; // ¡Pega tu clave anónima aquí!

// --- INICIA LA CORRECCIÓN ---
// Usamos el objeto global 'supabase' (del CDN) para crear nuestro cliente
// y lo guardamos en una variable con un nombre diferente.
const supabaseCliente = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// --- TERMINA LA CORRECCIÓN ---

// 2. Elementos del DOM
const proyectosContainer = document.getElementById('proyectos-container');

// 3. Función para obtener y mostrar los proyectos
async function getProyectos() {
    // CORRECCIÓN: Ahora usamos nuestra nueva variable 'supabaseCliente'
    const { data, error } = await supabaseCliente
        .from('proyectos')
        .select('*');

    if (error) {
        console.error('Error al cargar proyectos:', error);
        return;
    }

    // Limpiamos el contenedor por si acaso
    proyectosContainer.innerHTML = '';

    // Por cada proyecto en los datos, creamos su HTML
    data.forEach(proyecto => {
        const proyectoDiv = document.createElement('div');
        proyectoDiv.classList.add('proyecto');
        proyectoDiv.innerHTML = `
            <img src="${proyecto.url_imagen}" alt="${proyecto.titulo}">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <a href="${proyecto.url_sitio}" target="_blank">Ver Proyecto</a>
        `;
        proyectosContainer.appendChild(proyectoDiv);
    });
}

// 4. Llamamos a la función cuando la página carga
getProyectos();

// ... El resto del código para el formulario se mantiene igual ...
// app.js (continuación)

const addProjectForm = document.getElementById('add-project-form');

addProjectForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Obtenemos los valores del formulario
    const nuevoProyecto = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        url_imagen: document.getElementById('url_imagen').value,
        url_sitio: document.getElementById('url_sitio').value,
    };

    // Enviamos los datos a nuestra función sin servidor
    const response = await fetch('/.netlify/functions/agregar-proyecto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProyecto),
    });

    if (response.ok) {
        alert('¡Proyecto añadido!');
        addProjectForm.reset(); // Limpiamos el formulario
        getProyectos(); // Volvemos a cargar los proyectos para ver el nuevo
    } else {
        alert('Error al añadir el proyecto.');
    }
});