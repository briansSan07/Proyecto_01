import React, { useState, useEffect } from 'react';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const obtenerProductos = () => {
    fetch('http://192.168.1.85:3001/ver-productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  useEffect(() => {
    obtenerProductos();
    const interval = setInterval(obtenerProductos, 2000); // Actualiza cada 20 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando se desmonta el componente
  }, []);

  const seleccionarProducto = producto => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);
    setIdSeleccionado(producto.id);
  };

  const crearProducto = () => {
    if (isNaN(precio) || isNaN(cantidad)) {
      alert('El precio y la cantidad deben ser valores numéricos.');
      return;
    }
  
    fetch('http://192.168.1.85:3001/crear-producto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, precio, cantidad })
    }).then(() => {
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
      obtenerProductos();  // Actualizar lista de productos
    }).catch(err => console.log('Error al crear el producto:', err.message));
  };
  
  const actualizarProducto = id => {
    console.log('Valores antes de la actualización:', { nombre, descripcion, precio, cantidad });

    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || precio === '' || cantidad === '') {
      alert('Por favor, completa todos los campos correctamente. El precio y la cantidad deben ser valores numéricos.');
      return;
    }

    fetch(`http://192.168.1.85:3001/actualizar-producto/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, precio, cantidad })
    })
    .then(() => {
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
      setIdSeleccionado(null); // Desmarca el producto
      obtenerProductos(); // Refresca la lista de productos
    })
    .catch(err => console.log('Error:', err.message));
  };

  const eliminarProducto = id => {
    fetch(`http://192.168.1.85:3001/eliminar-producto/${id}`, {
      method: 'DELETE'
    }).then(() => obtenerProductos());  // Actualizar lista de productos
  };

  return (
    <div>
      <h1>Gestión de Inventario</h1>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <input placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      <input placeholder="Cantidad" value={cantidad} onChange={e => setCantidad(e.target.value)} />
      {idSeleccionado ? (
        <button onClick={() => actualizarProducto(idSeleccionado)}>Actualizar Producto</button>
      ) : (
        <button onClick={crearProducto}>Crear Producto</button>
      )}
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.descripcion} - ${producto.precio} - {producto.cantidad} unidades
            <button onClick={() => seleccionarProducto(producto)}>Editar</button>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventario;
