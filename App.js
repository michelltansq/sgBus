import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import busStop from "./src/busStop";
import Nearby from "./src/nearby";
import Search from "./src/search";
import Route from "./src/route";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";

const NearbyStack = createStackNavigator();

NearbyStackScreen = () => {
  return (
    <NearbyStack.Navigator>
      <NearbyStack.Screen name="sgBus" component={Nearby}/>
      <NearbyStack.Screen name="Bus Stop" component={busStop} />
      <NearbyStack.Screen name="Bus Route" component={Route} />
    </NearbyStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <NearbyStack.Screen name="Bus Stop" component={busStop} />
      <NearbyStack.Screen name="Bus Route" component={Route} />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default App = () => {
  return (
      <NavigationContainer>
      <StatusBar style="dark"/>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Nearby') {
                iconName = 'navigate';
              } else if (route.name === 'Search') {
                iconName = 'search-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#BB86FC',
            inactiveTintColor: '#979797',
          }}
        >
          <Tab.Screen name="Nearby" component={NearbyStackScreen} />
          <Tab.Screen name="Search" component={SearchStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
    },
    ellipsisVertical: {
        marginRight: 16,
    },
    search: {
        marginRight: 24,
    }
});
