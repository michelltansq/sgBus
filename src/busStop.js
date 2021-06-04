import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableHighlight, Appearance} from 'react-native';
import MapView , { Marker }from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const busStop = ({navigation, route}) => {
  const [busStopData, setBusStopData] = useState([]);
  const accessData = {user_acc_key: 1111111, username: 'Michell_Tan'};

  useEffect(() => {
    (async () => {
      await fetch(`https://babasama.com/api/get_bus_arrival_timing?BusStopCode=${route.params.code}&accountkey=${accessData.user_acc_key}&username=${accessData.username}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setBusStopData(responseJson);
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView style={{width: '100%', height: 200}} region={{
        latitude: route.params.lat,
        longitude: route.params.long,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }}>
        <Marker coordinate={{
          latitude: route.params.lat,
          longitude: route.params.long
        }} title={"bus stop"}/>
      </MapView>
      <FlatList style={{width: '100%'}} data={busStopData} renderItem={({item}) => (
        <TouchableHighlight onPress={() => {
          navigation.navigate('Bus Route', {BusNumber: item.ServiceNo})
        }}>
          <View style={styles.flex}>
            <Text style={styles.number}>{item.ServiceNo}</Text>
            <FlatList style={styles.data} data={item.NextBus} renderItem={({item, index}) => {
              return busModel(item, index);
            }}/>
          </View>
        </TouchableHighlight>
      )}/>
    </View>
  );
};

const busModel = (item, index) => {
  if (Appearance.getColorScheme === 'dark') {
    if (item.Type === "DD") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/doubledeck-dark.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                  <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                  <Image source={require('../assets/doubledeck-dark.png')} style={styles.busIcon}/>
                </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                  <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                  <Image source={require('../assets/doubledeck-dark.png')} style={styles.busIcon}/>
                </View>
      }
    } else if (item.Type === "SD") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck-dark.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck-dark.png')} style={styles.busIcon}/>
              </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck-dark.png')} style={styles.busIcon}/>
              </View>
      }
    } else if (item.Type === "AB") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck-dark.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck-dark.png')} style={styles.busIcon}/>
              </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck-dark.png')} style={styles.busIcon}/>
              </View>
      }
    }
  } else {
    if (item.Type === "DD") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                  <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                  <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
                </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                  <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                  <Image source={require('../assets/doubledeck.png')} style={styles.busIcon}/>
                </View>
      }
    } else if (item.Type === "SD") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
              </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/singledeck.png')} style={styles.busIcon}/>
              </View>
      }
    } else if (item.Type === "AB") {
      switch (index) {
        case 0:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 0, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
              </View>
        case 1:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(255, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
              </View>
        case 2:
          return <View style={[styles.arrival, {backgroundColor: 'rgba(0, 255, 0, 0.5)'}]}>
                <Text style={{fontSize: 18, position: 'absolute', top: 2}}>{item.EstimatedArrival} </Text>
                <Image source={require('../assets/bendydeck.png')} style={styles.busIcon}/>
              </View>
      }
    }
  }
}

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  number: {
    width: '20%',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  arrival: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  icon: {
    justifyContent: 'center',
  },
  data: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  busIcon: {
    width: 50,
    resizeMode: 'contain',
    marginTop: 25
  }
});

export default busStop;
