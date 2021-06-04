import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList, TouchableHighlight, RefreshControl, Appearance, SafeAreaView} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import { acc } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

Nearby = ({ navigation }) => {
  const [busStopLocation, setBusStopLocation] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>);
  const accessData = {user_acc_key: 1111111, username: 'Michell_Tan'};

  const waiting = () => {
    if (Appearance.getColorScheme === 'dark') 
      setMessage(<Image source={require('../assets/loading-dark.gif')} style={styles.waiting}/>)
    else 
      setMessage(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>)
  }

  useEffect(() => {
    waiting();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); 
      await fetch(`https://babasama.com/api/get_nearest_bus_stop?accountkey=${accessData.user_acc_key}&username=${accessData.username}&Latitude=${location.coords.latitude}&Longitude=${location.coords.longitude}&amount=10`)
      .then((response) => response.json())
      .then((responseData) => {
        setBusStopLocation (responseData);
        setMessage(<></>);
      })
      .catch(error => console.warn(error));
    })();
  }, []);
 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setBusStopLocation([]);
    waiting();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); 
      let data = await fetch(`https://babasama.com/api/get_nearest_bus_stop?accountkey=${accessData.user_acc_key}&username=${accessData.username}&Latitude=${location.coords.latitude}&Longitude=${location.coords.longitude}&amount=10`)
      .then((response) => response.json())
      .then((responseData) => {
        setBusStopLocation (responseData);
        setMessage(<></>);
        setRefreshing(false);
      })
      .catch(error => console.warn(error));
    })();
  })

  return (
    <View>
      {message}
      <ScrollView refreshControl={
        <RefreshControl refreshing={
          refreshing
        } onRefresh={
          onRefresh
        }/>
      }>
        <FlatList data={busStopLocation} renderItem={({item}) => (
          <TouchableHighlight style={styles.section} onPress={() => navigation.navigate('Bus Stop', {code: item.BusStopCode, lat: item.Latitude, long: item.Longitude})}>
            <View style={styles.flex}>
              <View>
                <Text style={styles.name}>{item.Description}</Text>
                <Text style={styles.information}>{item.BusStopCode} | {item.RoadName}</Text>
              </View>
              <Ionicons style={styles.icon} name={'chevron-forward'} size={20} />
            </View>
          </TouchableHighlight>
        )}/>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0000002E',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  information: {
    fontSize: 14,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
  }, waiting: {
    maxWidth: '100%',
    resizeMode: 'contain'
  }
});

export default Nearby;
