import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image} from 'react-native';

const PizzaTranslator = () => {
  return (
    
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Image
          style={{width: 50, height: 50, marginTop:10}}
          source={{uri: 'assets/fleche-longue.png'}}
        />
        <View style={styles.card}></View>
        <View style={styles.card}></View>
        <View style={styles.card}></View>
        <View style={styles.card}></View>
        <View style={styles.card}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 168, 107)',
    padding: 10,
    alignItems: 'flex-end',
  },
  card: {
    marginTop: 10,
    width: 350,
    height: 200,
    backgroundColor: 'rgb(0, 0, 0)',
  },
});

export default PizzaTranslator;
