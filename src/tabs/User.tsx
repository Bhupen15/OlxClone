import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const User = () => {
  return (
    <SafeAreaView>
      <Text style={styles.userInfo}>This is user's page</Text>
    </SafeAreaView>
  )
}

export default User


const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  userInfo:{
    fontSize: 30,
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: 200,
    color: 'black'

  }
})