const cuerpoTabla = document.getElementById('cuerpo-tabla');
const spinner = document.getElementById('spinner');
const botonAnterior = document.getElementById('boton-anterior');
const botonSiguiente = document.getElementById('boton-siguiente');
const indicadorPagina = document.getElementById('indicador-pagina');

let paginaActual = 1;

// Función para obtener usuarios de la API
async function obtenerUsuarios(pagina) {
  try {
    mostrarCargando(true); // Mostrar spinner
    const respuesta = await fetch(`https://reqres.in/api/users?delay=3&page=${pagina}`);

    if (!respuesta.ok) throw new Error('Error en la solicitud');

    const datos = await respuesta.json();
    renderizarUsuarios(datos.data);
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    alert('No se pudieron cargar los datos. Intenta nuevamente.');
  } finally {
    mostrarCargando(false); // Ocultar spinner
  }
}

// Función para mostrar u ocultar el spinner
function mostrarCargando(mostrar) {
  spinner.style.display = mostrar ? 'block' : 'none';
}

// Función para renderizar los usuarios en la tabla
function renderizarUsuarios(usuarios) {
  cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de agregar los usuarios

  usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.first_name} ${usuario.last_name}</td>
      <td>${usuario.email}</td>
      <td><img src="${usuario.avatar}" alt="${usuario.first_name}" width="50"></td>
    `;
    cuerpoTabla.appendChild(fila); // Agregar cada fila al cuerpo de la tabla
  });
}

// Eventos para los botones de paginación
botonAnterior.addEventListener('click', () => {
  if (paginaActual > 1) {
    paginaActual--;
    actualizarPagina();
  }
});

botonSiguiente.addEventListener('click', () => {
  if (paginaActual < 2) {
    paginaActual++;
    actualizarPagina();
  }
});

// Función para actualizar la página y los controles de navegación
function actualizarPagina() {
  indicadorPagina.textContent = `Página ${paginaActual}`;
  botonAnterior.disabled = paginaActual === 1;
  botonSiguiente.disabled = paginaActual === 2;
  obtenerUsuarios(paginaActual);
}

// Llamada inicial para cargar la primera página de usuarios
obtenerUsuarios(paginaActual);