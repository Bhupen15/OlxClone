import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'



const Wishlist = () => {

  const items = useSelector((state: any) => state.wishlist);

  return (
    <View style={styles.container}>
      
      <View style={{ marginTop: 20 }}>
        <FlatList data={items.data} renderItem={({ item, index }) => {
          return (

            <TouchableOpacity style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.price}>{'INR. ' + item.price}</Text>
              </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    </View>
  )
}

export default Wishlist;

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

})