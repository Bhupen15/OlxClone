import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, PermissionsAndroid, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/PostSlice';


const Add = ({ onPost }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [photo, setPhoto] = useState<any>(
    {
      assets:
        [
          {
            fileName: "",
            fileSize: 71640,
            height: 1856,
            originalPath: "",
            type: "image/jpeg",
            uri: "",
            width: 1392
          }
        ]
    }
  )
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const OpenCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        if (!result.didCancel) {
          setPhoto(result);
        }

      }
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log('You can use the camera');
        OpenCamera();

      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    };

  }

  const addItem = () => {
    dispatch(addPost({
      name: name,
      price: price,
      desc: desc,
      image: photo.assets[0].uri,
      category: selectedCategory == 0
        ? 'Car' : selectedCategory == 1
          ? 'Bike' : selectedCategory == 2
            ? 'Laptop' : selectedCategory == 3
              ? 'Mobile' : selectedCategory == 4
                ? 'Furniture' : 'House'
    })

    );
    // navigator.navigate('Home');
    onPost();
  };
  return (
    <ScrollView nestedScrollEnabled>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Post</Text>
        </View>
        <TouchableOpacity onPress={() => { requestCameraPermission() }}>
          {photo.assets[0].uri == "" ? (<Image
            source={require('../images/placeholder.jpeg')}
            style={styles.imageView}
          />) :
            (<Image
              source={{ uri: photo.assets[0].uri }}
              style={styles.imageView}
            />)}


        </TouchableOpacity>
        <TextInput
          placeholder="Enter item name"
          style={styles.input}
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          placeholder="Enter item description"
          style={[styles.input, { marginTop: 10 }]}
          value={desc}
          onChangeText={txt => setDesc(txt)}
        />
        <TextInput
          placeholder="Enter item price"
          keyboardType='number-pad'
          style={[styles.input, { marginTop: 10 }]}
          value={price}
          onChangeText={txt => setPrice(txt)}
        />
        <Text style={[styles.title, { marginLeft: 20, marginTop: 20 }]}>Category</Text>

        <TouchableOpacity style={[styles.input, {
          justifyContent: 'center',
          borderColor: selectedCategory == 0 ? 'blue' : 'black'
        }]}
          onPress={() => setSelectedCategory(0)}>
          <Text>Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: selectedCategory == 1 ? 'blue' : 'black' }]}
          onPress={() => setSelectedCategory(1)}>
          <Text>Bike</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: selectedCategory == 2 ? 'blue' : 'black' }]}
          onPress={() => setSelectedCategory(2)}>
          <Text>Laptop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: selectedCategory == 3 ? 'blue' : 'black' }]}
          onPress={() => setSelectedCategory(3)}>
          <Text>Mobile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: selectedCategory == 4 ? 'blue' : 'black' }]}
          onPress={() => setSelectedCategory(4)}>
          <Text>Furniture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.input, { justifyContent: 'center', borderColor: selectedCategory == 5 ? 'blue' : 'black' }]}
          onPress={() => setSelectedCategory(5)}>
          <Text>House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { addItem() }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Post my item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Add

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#000'
  },
  imageView: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginTop: 20
  },
  input: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 20
  },
  button: {
    width: '90%',
    height: 55,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  }

})
