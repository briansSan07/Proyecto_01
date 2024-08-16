import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductosScreen from '../screens/ProductosScreen';
import CrearProductoScreen from '../screens/CrearProductoScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Productos" component={ProductosScreen} />
        <Stack.Screen name="CrearProducto" component={CrearProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
