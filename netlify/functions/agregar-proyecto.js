// netlify/functions/agregar-proyecto.js

// Importamos el cliente de Supabase para Node.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
    // Obtenemos las variables de entorno seguras
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    // Creamos un cliente de Supabase con la clave de servicio (que tiene permisos de escritura)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Parseamos los datos que nos envía el formulario desde el frontend
    const proyectoData = JSON.parse(event.body);

    // Insertamos la nueva fila en la tabla 'proyectos'
    const { data, error } = await supabase
        .from('proyectos')
        .insert([
            {
                titulo: proyectoData.titulo,
                descripcion: proyectoData.descripcion,
                url_imagen: proyectoData.url_imagen,
                url_sitio: proyectoData.url_sitio,
            }
        ]);

    if (error) {
        console.error('Error al insertar:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al guardar el proyecto' })
        };
    }

    // Si todo fue bien, devolvemos una respuesta exitosa
    return {
        statusCode: 200,
        body: JSON.stringify({ message: '¡Proyecto guardado con éxito!' })
    };
};