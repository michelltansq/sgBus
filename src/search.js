import { Ionicons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList, Image, TouchableHighlight, Alert, Appearance} from 'react-native'

const search = ({navigation}) => {
    const [message, setMessage] = useState(<></>);
    const [searchText, setSearchText] = useState("");
    const [dataReturned, setData] = useState([]);
    const accessData = {user_acc_key: 1111111, username: 'Michell_Tan'}

    const waiting = () => {
        if (Appearance.getColorScheme === 'dark') 
          setMessage(<Image source={require('../assets/loading-dark.gif')} style={styles.waiting}/>)
        else 
          setMessage(<Image source={require('../assets/loading.gif')} style={styles.waiting}/>)
      }

    const getData = async() => {
        if (searchText.length > 4) {
            await fetch(`https://babasama.com/api/get_bus_stop_data?BusStopCode=${searchText}&username=${accessData.username}&accountkey=${accessData.user_acc_key}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setMessage(<></>);
                if (responseJson.output != null) {
                    noDataAlert("Bus Stop Code");
                }
            });
        } else if (searchText > 0) {
            await fetch(`https://babasama.com/api/get_bus_data?ServiceNo=${searchText}&username=${accessData.username}&accountkey=${accessData.user_acc_key}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setMessage(<></>);
                if (responseJson.output != null) {
                    noDataAlert("Bus Number");
                }
            });
        }
    }

    const noDataAlert = (type) =>
    Alert.alert(
      "No Data Found",
      `${type} is not found, please enter another number`,
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );

    return(<View style={styles.container}>
        <View style={styles.searchbg}>
            <View style={styles.textinputContainer}>
            <TextInput style={styles.textinput} placeholder="Search" onChangeText={setSearchText}/>
                <View style={styles.textinputSearchButton}>
                    <TouchableHighlight onPress={() => {
                        waiting();  
                        getData();
                    }}>
                        <Ionicons name="search-outline" size={20}/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <View style={styles.listbg}>
            {message}
            <FlatList style={styles.list} data={dataReturned} renderItem={({item}) => {
                if (searchText.length < 5) {
                    return (
                        <TouchableHighlight onPress={() => navigation.navigate('Bus Route', {BusNumber: item.ServiceNo, accessData: accessData})}>
                            <View style={styles.list}>
                                <Text style={styles.header}>{item.ServiceNo}</Text>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> First Bus Stop: </Text>
                                    <Text style={styles.textbody}>{item.OriginCode}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Last Bus Stop: </Text>
                                    <Text style={styles.textbody}>{item.DestinationCode}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Morning peak hours: </Text>
                                    <Text style={styles.textbody}>{item.AM_Peak_Freq}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Morning non peak hours: </Text>
                                    <Text style={styles.textbody}>{item.AM_Offpeak_Freq}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Evening peak hours: </Text>
                                    <Text style={styles.textbody}>{item.PM_Peak_Freq}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Evening off peak hours: </Text>
                                    <Text style={styles.textbody}>{item.PM_Offpeak_Freq}</Text>
                                </View>
                                <View style={styles.textbox}> 
                                    <Text style={styles.textheader}> Operator: </Text>
                                    <Text style={styles.textbody}>{item.Operator}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                } else {
                    return (
                        <TouchableHighlight onPress={() => navigation.navigate('Bus Stop', {code: item.BusStopCode, accessData: accessData, lat: item.Latitude, long: item.Longitude})}>
                            <View style={styles.list}>
                                <Text style={styles.header}>{item.BusStopCode}</Text>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Bus Stop Name: </Text>
                                    <Text style={styles.textbody}>{item.Description}</Text>
                                </View>
                                <View style={styles.textbox}>
                                    <Text style={styles.textheader}> Road Name: </Text>
                                    <Text style={styles.textbody}>{item.RoadName}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                }
            }}/>
        </View> 
    </View>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    }, searchbg: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, listbg: {
        width: '100%',
        flex: 2,
    }, textinputContainer: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
    }, textinput: {
        borderWidth: 2,
        borderColor: '#cfcfcf',
        width: '78%',
        height: 45,
        backgroundColor: '#ffffff',
        position: 'absolute',
        paddingHorizontal: 15,
    }, textinputSearchButton: {
        alignSelf: 'center',
        marginLeft: '65%'
    }, waiting: {
        maxWidth: '100%',
        resizeMode: 'contain'
    }, list: {
        width: '100%',
        alignSelf: 'center',
    }, header: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
    }, textbox: {
        flexDirection: 'row',
    }, textheader: {
        flex: 1,
        paddingHorizontal: 15, 
        textAlign: 'right',
    }, textbody: {
        flex: 1,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
    }
});

export default search;
