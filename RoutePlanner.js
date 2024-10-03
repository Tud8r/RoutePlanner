import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    useFonts,
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  } from "@expo-google-fonts/fredoka";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from 'react-native-elements/dist/helpers';

export default function RoutePlanner(){
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyAygHKhIwi1_vM_V_qBl3RB-L_31GnBkG4';
  const [selectedOption, setSelectedOption] = useState(null);
  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  const transportData = [
    { mode: 'car', time: '15 min', co2: '5.6g CO2', calories: '20 calories' },
    { mode: 'bus', time: '20 min', co2: '1.2g CO2', calories: '50 calories' },
    { mode: 'bicycle', time: '35 min', co2: '0g CO2', calories: '200 calories' },
    { mode: 'walk', time: '50 min', co2: '0g CO2', calories: '300 calories' },
  ];
  
  const originCoords = { lat: 46.769379, lng: 23.590839 };
  const destinationCoords = { lat: 44.426767, lng: 26.102538 };

  const handleOptionPress = (mode) => {
    setSelectedOption(mode);
  };

  return (
    
    <ImageBackground source={require('./assets/star_background.jpg')} style={styles.background}>
    <SafeAreaView style={styles.safeView}>

      <View style={styles.container}>
        <TouchableOpacity style={styles.menuIcon}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Route Planner</Text>
      
      <GooglePlacesAutocomplete
        placeholder='Where are you?'
        fetchDetails={true}
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location;
          console.log('Data:', JSON.stringify(data, null, 2));
          console.log('Details:', JSON.stringify(details, null, 2));
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: styles.inputLoc,
          listView: {
            position: 'absolute',  // Absolute positioning
            top: "78%",  // Adjust this to position dropdown
            left: 0,
            right: 0,
            zIndex: 100,  // Ensure the dropdown is on top
            backgroundColor: 'white',
            borderRadius: 10,  // Rounded corners
            borderColor:"#D3D3D3",
            borderWidth:4,
            marginLeft:"5%",
            marginRight:"5%"
          },
          row:{
            height:50,
          },
          separator:{
            height:0,
            backgroundColor:'black',
            borderWidth:0,
            borderColor:"#D3D3D3"
          },
        }}
        
      />

      <GooglePlacesAutocomplete
      placeholder='Where do you wanna go?'
      fetchDetails={true}
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location;
          console.log('Data:', JSON.stringify(data, null, 2));
          console.log('Details:', JSON.stringify(details, null, 2));
        }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language:'en',
      }}
      styles={{
        textInput:styles.inputDest,
        listView:{
          position:'absolute',
          top: "-22%",  // Adjust this to position dropdown
          left: 0,
          right: 0,
          zIndex: 1000,  // Ensure the dropdown is on top
          backgroundColor: 'white',
          borderRadius: 10,
          borderRadius: 10,  // Rounded corners
          borderColor:"#D3D3D3",
          borderWidth:4,
          marginLeft:"5%",
          marginRight:"5%"
        },
        row:{
          height:50,
        },
        separator:{
          height:0,
          backgroundColor:'black',
          borderWidth:0,
          borderColor:"#D3D3D3"
        },
      }}
      />

      <Text style={styles.question}>How will you get there?</Text>
      
      <View style={styles.transportOptions}>
          {transportData.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === option.mode && styles.selectedOption, // Apply selected styles
              ]}
              onPress={() => handleOptionPress(option.mode)}
              activeOpacity={1} // Set to 1 to disable fade effect
            >
              {/* Icon with White Square */}
              <View style={styles.iconWrapper}>
                <Icon
                  name={
                    option.mode === 'bus'
                      ? 'bus'
                      : option.mode === 'car'
                      ? 'car'
                      : option.mode === 'bicycle'
                      ? 'bicycle'
                      : 'walk'
                  }
                  size={30}
                  color="#001540"
                />
              </View>

              {/* Details */}
              <View style={styles.optionDetails}>
                <Text style={styles.optionText}>{option.time}</Text>
                <Text style={styles.optionSubText}>{option.co2}</Text>
                <Text style={styles.optionSubText}>{option.calories}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      
      {/* Go to Google Maps Button */}
      <TouchableOpacity style={styles.goToMapsButton}>
        <Text style={styles.goToMapsText}>Go to Google Maps 
        <Ionicons name="location-outline" size={25} style={styles.icon}/>
        </Text>
      </TouchableOpacity>

      
    </SafeAreaView>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  background:{
    flex:1,
    resizeMode:"cover"
  },
  menuIcon:{
    alignSelf:"flex-start",
    marginTop:'20%',
    marginLeft:'5%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
      fontFamily: "Fredoka_600SemiBold",
      marginTop:"5%",
      color:"white",
      //marginRight:"30%",
      //marginLeft:"30%",
      textAlign:"center",
      marginBottom:"10%",
      marginLeft:"10%",
      marginRight:"10%"
  },
  selectedOption: {
    backgroundColor: '#D0D9E8',
  },
  inputDest: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 0,
    marginBottom:0,
    fontSize: 16,
    marginTop:"-21%",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderColor:'#D3D3D3',
    borderWidth:4,
    height:60,
    marginLeft:"5%",
    marginRight:"5%"
  },
  inputLoc:{
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 0,
    marginBottom: 15,
    fontSize: 16,
    marginTop:"-4%",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor:'#D3D3D3',
    borderWidth:4,
    height:60,
    marginLeft:"5%",
    marginRight:"5%"
  },
  transportOptions: {
    width: '90%',
    marginBottom: '30%',
    marginTop:"-30%",
    justifyContent:'center',
    alignSelf:'center',
  },
  option: {
    backgroundColor: '#456597',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionDetails: {
    flexDirection: 'row', // Arrange items in a row (side by side)
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
   
  },
  optionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 15, // Space between text elements
    fontFamily:'Fredoka_400Regular',
  },
  optionSubText: {
    color: 'black',
    fontFamily:'Fredoka_400Regular',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 15, // Space between text elements
  },
  
  goToMapsButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',
    marginLeft:"10%",
    marginBottom:"30%",
    marginTop:"-30%"
  },
  goToMapsText: {
    fontFamily:"Fredoka_700Bold",
    color: '#001540',
    fontSize: 18,
  },
  icon:{
    
  },
  question: {
    fontSize: 20,
    fontFamily:"Fredoka_600SemiBold",
    color: '#fff',
    marginBottom: "33%",
    marginTop:"-33%",
    textAlign: 'center',
  },
  iconWrapper: {
    backgroundColor: '#fff',  // White background
    borderRadius: 10,  // Small border radius for square corners
    borderWidth: 0,  // Optional: Add border
  },
});

