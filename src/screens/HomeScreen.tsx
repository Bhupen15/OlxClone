import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Add from '../tabs/Add';
import Wishlist from '../tabs/Wishlist';
import User from '../tabs/User';

const HomeScreen = () => {
    const [selectedTab, setSelectedtab] = useState(0);
    return (
        <View style={styles.container}>
            {selectedTab == 0 ? (<Home />) :
                selectedTab == 1 ? (<Search />) :
                    selectedTab == 2 ? (<Add onPost={()=>setSelectedtab(0)}/>) :
                        selectedTab == 3 ? (<Wishlist />) :
                            (<User />)}
            <View style={styles.bottomTabs}>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedtab(0) }}>
                    <Image
                        source={require('../images/home.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 0 ? 'blue' : 'black' }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedtab(1) }}>
                    <Image
                        source={require('../images/search.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 1 ? 'blue' : 'black' }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedtab(2) }}>
                    <Image
                        source={require('../images/add.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 2 ? 'blue' : 'black' }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedtab(3) }}>
                    <Image
                        source={require('../images/heart.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 3 ? 'blue' : 'black' }]}
                    /> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedtab(4) }}>
                    <Image
                        source={require('../images/user.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 4 ? 'blue' : 'black' }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomTabs: {
        width: '100%',
        height: 70,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
    },
    tab: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    tabIcon: {
        width: 30,
        height: 30
    }
})  