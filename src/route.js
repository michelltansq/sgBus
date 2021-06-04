import React, { Component, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableHighlight, Image, Appearance} from 'react-native'
import MapView , { Marker }from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const route = ({route}) => {
    const [routeData, setRouteData] = useState([]);
    const [message, setMessage] = useState(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>);
    const [map, setMap] = useState(<></>);
    const accessData = {user_acc_key: 1111111, username: 'Michell_Tan'};

    const waiting = () => {
        if (Appearance.getColorScheme === 'dark') 
          setMessage(<Image source={require('../assets/loading-dark.gif')} style={styles.waiting}/>)
        else 
          setMessage(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>)
    }

    const getData = async() => {
        await fetch(`https://babasama.com/api/get_bus_route?ServiceNo=${route.params.BusNumber}&accountkey=${accessData.user_acc_key}&username=${accessData.username}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setRouteData(responseJson);
            setMessage(<></>);
        });
    }

    useEffect(() => {
        getData();
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {message}
            {map}
            <View style={styles.titleContainer}>
                <TouchableHighlight onPress={() => {
                    getData();
                    setMap(<></>);
                    waiting();
                }}>
                    <Ionicons name={'reload-outline'} size={20} />
                </TouchableHighlight>
                <Text style={styles.title}>{route.params.BusNumber}</Text>
                <TouchableHighlight onPress={() => setRouteData(routeData.reverse())}>
                    <Ionicons name={'swap-vertical-outline'} size={20} />
                </TouchableHighlight>
            </View>
            <FlatList style={{width: '100%'}} data={routeData} renderItem={({item}) => (
                <TouchableHighlight onPress={() => 
                    setMap(<MapView style={{width: '100%', height: 200}} region={{
                        latitude: item.Latitude,
                        longitude: item.Longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                      }}>
                        <Marker coordinate={{
                          latitude: item.Latitude,
                          longitude: item.Longitude,
                        }} title={`${item.Description}`}/> 
                      </MapView>)
                } style={styles.datas}>
                    <View style={styles.datas}>
                        <View>
                            <Text>{item.Description}</Text>
                            <Text>{item.RoadName}</Text>
                        </View>
                        <Text>{item.BusStopCode}</Text>
                    </View>
                </TouchableHighlight>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    waiting: {
      maxWidth: '100%',
      resizeMode: 'contain'
    }, datas: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    }, titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingVertical: 30,
        paddingHorizontal: 16
    }, title: {
        textAlign: 'center', 
        fontSize: 36, 
        fontWeight: 'bold',
    }, 
  });
  

export default route;