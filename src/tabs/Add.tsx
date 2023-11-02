import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, PermissionsAndroid, ScrollView, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { Children, useEffect, useRef, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/PostSlice';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Add = ({ onPost }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { hasPermission, requestPermission } = useCameraPermission()
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
  requestPermission();

  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();
  const device: any = useCameraDevice('front')
  const camera = useRef<Camera>(null);
  const [imageData, setImageData] = useState('');
  const [photoClicked, setPhotoClicked] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  // const requestCameraPermission = async () => {
  //   try {
  // if (Platform.OS == 'ios') {

  //   if (device == null) return console.log('No camera device found in your ios mobile');

  //   return (
  //     <Camera
  //       style={StyleSheet.absoluteFill}
  //       device={device}
  //       isActive={true}
  //     />
  //   ) 

  // }
  // else {


  const checkPermission = async () => {

    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
    if (device == null) { console.log("No camera found") }
    if (camera.current) {
      console.log(camera.current, "this is camera dot current")
      const photo = await camera.current.takePhoto()

      setImageData(photo.path);
      setPhotoClicked(false);
      console.log(photo.path, ">>>>>>>>////////////////////////////////////////<<<<<<<<<<<<<<");
      
    }

 

    // }
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: 'Cool Photo App Camera Permission',
    //     message:
    //       'Cool Photo App needs access to your camera ' +
    //       'so you can take awesome pictures.',
    //     buttonNeutral: 'Ask Me Later',
    //     buttonNegative: 'Cancel',
    //     buttonPositive: 'OK',
    //   },
    // );
    // const OpenCamera = async () => {
    //   const result = await launchCamera({ mediaType: 'photo' });
    //   if (!result.didCancel) {
    //     setPhoto(result);
    //   }

    // }
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    //   console.log('You can use the camera');
    //   OpenCamera();

    // } else {
    //   console.log('Camera permission denied');
    // }

  }

  //   } catch (err) {
  //     console.warn(err);
  //   };

  // } 


  const addItem = () => {
    dispatch(addPost({
      name: name,
      price: price,
      desc: desc,
      image: imageData,
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

        {photoClicked ? (<View style={styles.imageBox}>
          <Camera ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo
          />
          <TouchableOpacity style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#FF0037',
            position: 'absolute',
            bottom: 8,
            alignSelf: 'center'

          }} onPress={() => { checkPermission() }}>
            {
              <Image
                source={{ uri: 'file://' + imageData }}
                style={styles.imageView}
              />}

          </TouchableOpacity>

        </View>) : (
          <View style={{
            width: '90%', borderWidth: 1, alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
            height: 50, marginTop: 20, paddingLeft: 20
          }}>
            {imageData !== '' &&
              (
                <Image source={{ uri: 'file://' + imageData }}
                  style={{ flex: 1, width: '90%', height: 200 }}
                />)
            }
            <TouchableOpacity >
              <Text style={{ marginTop: 5 }} onPress={() => setPhotoClicked(true)}>Click Photo</Text>
            </TouchableOpacity>
          </View>

        )}


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
    width: '85%',
    height: 200,
    alignSelf: 'center',
    marginTop: 60
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
  imageBox: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
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
