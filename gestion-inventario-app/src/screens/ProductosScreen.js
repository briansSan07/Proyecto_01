import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

function ProductosScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      obtenerProductos();
      const interval = setInterval(obtenerProductos, 2000); // Actualiza cada 5 segundos
      return () => clearInterval(interval); // Limpia el intervalo cuando se sale de la pantalla
    }
  }, [isFocused]);

  const obtenerProductos = () => {
    axios.get('http://192.168.1.85:3001/ver-productos')
      .then(res => setProductos(res.data))
      .catch(err => console.log('Error:', err.message));
  };

  return (
    <View>
      <Button title="Crear Producto" onPress={() => navigation.navigate('CrearProducto')} />
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CrearProducto', { producto: item })}>
            <Text>{item.nombre} - {item.descripcion} - ${item.precio} - {item.cantidad} unidades</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ProductosScreen;
