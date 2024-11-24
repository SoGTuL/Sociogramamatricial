// Función para cargar los datos almacenados
function cargarDatos() {
    const datosGuardados = localStorage.getItem('sociogramData');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  }
  
  // Función para guardar los datos en el localStorage
  function guardarDatos(datos) {
    localStorage.setItem('sociogramData', JSON.stringify(datos));
  }
  
  // Botón de reset
  document.getElementById('reset').addEventListener('click', () => {
    // Limpiar el localStorage
    localStorage.removeItem('sociogramData');
    
    // Limpiar los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("bien1").value = "";
    document.getElementById("bien2").value = "";
    document.getElementById("bien3").value = "";
    document.getElementById("mal1").value = "";
    document.getElementById("mal2").value = "";
    document.getElementById("mal3").value = "";
    
    // Limpiar el área de la matriz
    document.getElementById('sociograma').innerHTML = '';
    
    alert('Datos reiniciados y campos borrados.');
  });
  
  // Botón de cargar datos
  document.getElementById('cargar').addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value;
    const bien1 = document.getElementById("bien1").value;
    const bien2 = document.getElementById("bien2").value;
    const bien3 = document.getElementById("bien3").value;
    const mal1 = document.getElementById("mal1").value;
    const mal2 = document.getElementById("mal2").value;
    const mal3 = document.getElementById("mal3").value;
  
    const sociogramData = cargarDatos(); // Cargar los datos previos
    const nuevoDato = {
        nombre: nombre,
        bien: [bien1, bien2, bien3],
        mal: [mal1, mal2, mal3]
    };
  
    // Agregar el nuevo dato al array de datos
    sociogramData.push(nuevoDato);
  
    // Guardar todos los datos
    guardarDatos(sociogramData);
  
    // Limpiar los campos para permitir nuevos datos
    document.getElementById("nombre").value = "";
    document.getElementById("bien1").value = "";
    document.getElementById("bien2").value = "";
    document.getElementById("bien3").value = "";
    document.getElementById("mal1").value = "";
    document.getElementById("mal2").value = "";
    document.getElementById("mal3").value = "";
  
    // Mostrar la matriz
    generarMatriz(sociogramData);
    alert('Datos cargados y campos vacíos.');
  });
  
  // Generar matriz visual
  function generarMatriz(datos) {
    const container = document.getElementById('sociograma');
    container.innerHTML = ''; // Limpiar contenido previo
  
    // Crear tabla
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.textAlign = 'center';
  
    // Crear cabecera
    const headerRow = document.createElement('tr');
    const emptyCell = document.createElement('th');
    emptyCell.textContent = ''; // Celda vacía superior izquierda
    headerRow.appendChild(emptyCell);
  
    datos.forEach(d => {
      const headerCell = document.createElement('th');
      headerCell.textContent = d.nombre;
      headerCell.style.border = '1px solid #ccc';
      headerCell.style.padding = '8px';
      headerRow.appendChild(headerCell);
    });
  
    table.appendChild(headerRow);
  
    // Crear filas
    datos.forEach((individuo, rowIndex) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = individuo.nombre;
      nameCell.style.border = '1px solid #ccc';
      nameCell.style.padding = '8px';
      row.appendChild(nameCell);
  
      datos.forEach((_, colIndex) => {
        const cell = document.createElement('td');
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '8px';
  
        // Verificar relaciones
        if (individuo.bien.includes(datos[colIndex].nombre)) {
          cell.textContent = 'A';
          cell.style.color = 'blue';
        } else if (individuo.mal.includes(datos[colIndex].nombre)) {
          cell.textContent = 'R';
          cell.style.color = 'red';
        } else {
          cell.textContent = ''; // Celda vacía si no hay relación
        }
  
        row.appendChild(cell);
      });
  
      table.appendChild(row);
    });
  
    container.appendChild(table); // Agregar la tabla al contenedor
  }
  