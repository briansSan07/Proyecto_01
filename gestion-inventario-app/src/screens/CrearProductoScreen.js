import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

function CrearProductoScreen({ route, navigation }) {
  const producto = route.params?.producto;
  const [nombre, setNombre] = useState(producto ? producto.nombre : '');
  const [descripcion, setDescripcion] = useState(producto ? producto.descripcion : '');
  const [precio, setPrecio] = useState(producto ? producto.precio.toString() : '');
  const [cantidad, setCantidad] = useState(producto ? producto.cantidad.toString() : '');

  const manejarGuardar = () => {
    const data = { nombre, descripcion, precio, cantidad };

    if (producto) {
      // Actualizar producto
      axios.put(`http://192.168.1.85:3001/actualizar-producto/${producto.id}`, data)
        .then(() => {
          navigation.navigate('Productos');
        });
    } else {
      // Crear nuevo producto
      axios.post('http://192.168.1.85:3001/crear-producto', data)
        .then(() => {
          navigation.navigate('Productos');
        });
    }
  };

  const manejarEliminar = () => {
    axios.delete(`http://192.168.1.85:3001/eliminar-producto/${producto.id}`)
      .then(() => {
        navigation.navigate('Productos');
      });
  };

  return (
    <View>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <TextInput placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
      <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} keyboardType="numeric" />
      <Button title="Guardar" onPress={manejarGuardar} />
      {producto && <Button title="Eliminar" onPress={manejarEliminar} />}
    </View>
  );
}

export default CrearProductoScreen;
