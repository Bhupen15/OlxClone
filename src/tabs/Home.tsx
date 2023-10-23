import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { addToWishlist } from '../redux/WishlistSlice'




const Home = () => {
  const navigator = useNavigation<any>();
const dispatch = useDispatch();
  const items = useSelector((state: any) => state.post)
  console.log("This is image path", items.data.image);
  const DATA = [
    { title: "Car", icon: require('../images/car.png') },
    { title: "Bike", icon: require('../images/bike.png') },
    { title: "Laptop", icon: require('../images/laptop.png') },
    { title: "Mobile", icon: require('../images/mobile.png') },
    { title: "Furniture", icon: require('../images/furniture.png') },
    { title: "House", icon: require('../images/home.png') }
  ]
  return (
    <ScrollView nestedScrollEnabled>
      <View style={styles.container}>
        <Text style={styles.logo}>Olx Clone</Text>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search Items here.." style={styles.input} />
          <Image source={require('../images/search.png')} style={styles.icon} />
        </View>
        <Text style={styles.heading}>What are you looking for ?</Text>
        <View style={{ marginTop: 20 }}>
          <FlatList numColumns={3}
            data={DATA}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.listItem} onPress={() => { navigator.navigate('ItemsByCategory', { category: item.title }) }}>
                  <Text style={{ margin: 7, fontWeight: '900', fontSize: 18 }}>{item.title}</Text>
                  <Image source={item.icon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
              )
            }} />
        </View>
        <Text style={styles.heading}>Posted Items</Text>
        <FlatList data={items.data} renderItem={({ item, index }) => {
          return (

            <TouchableOpacity style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.price}>{'INR. ' + item.price}</Text>
              </View>
              <TouchableOpacity style={styles.wishlist} onPress={()=>{
                    dispatch(addToWishlist(item))
              }}>
                <Image source={require('../images/heart.png')} style={styles.icon} />
              </TouchableOpacity>
            </TouchableOpacity>

          )
        }} />
      </View>
    </ScrollView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'blue',
    marginTop: 20,
    marginLeft: 20
  },
  searchBox: {
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: '86%',
    marginLeft: 10
  },
  icon: {
    width: 24,
    height: 24
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    color: '#000',
    fontWeight: '600',
    marginTop: 40
  },
  listItem: {
    width: Dimensions.get('window').width / 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEDEF8',
    margin: 2
  },
  item: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    marginTop: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,

  },
  itemImage: {
    width: 60,
    heigth: 60,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10
  },
  desc: {
    fontSize: 18,
    marginLeft: 10
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: 'green'
  },
  wishlist: {
    position: 'absolute',
    right: 20,
    top: 20

  }

})