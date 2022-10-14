import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { RoutNames } from './routeNames'
import { AboutScreen, HomeScreen } from '../screens'
export const TabNavigator = () => {
    const tab=createBottomTabNavigator();
  return (
    <NavigationContainer>
        <tab.Navigator>
            <tab.Screen name={RoutNames.HomeScreen} component={HomeScreen} />
            <tab.Screen name={RoutNames.AboutScreen} component={AboutScreen} />
        </tab.Navigator>
    </NavigationContainer>
  )
}

