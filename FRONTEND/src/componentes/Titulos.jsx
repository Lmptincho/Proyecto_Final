import React from 'react';



function Titulos() {
    const tituloEstilos = {
      textAlign: 'center', // Centrar el texto
      backgroundColor: 'bisque',
      padding: '10px', // Añadir espacio alrededor del título
      borderRadius: '5px', // Agregar bordes redondeados
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra suave
      color: '#333', // Cambiar el color del texto
      fontSize: '24px', // Tamaño del texto
    };
  
    return (
      <div style={tituloEstilos}>
        <h1>Remeras</h1>
      </div>
    );
  }
  
  export default Titulos;