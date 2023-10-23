import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const splash = () => {
  const navigator: any = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigator.navigate('HomeScreen');

    }, 2000)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.logo}>OLX</Text>
      </View>
    </SafeAreaView>
  )
}

export default splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0004FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: "#fff"
  }
})   