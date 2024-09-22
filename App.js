import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RoutePlanner = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={28} color="#fff" />
        <Text style={styles.headerText}>Route Planner</Text>
      </View>

      {/* Destination Section */}
      <View style={styles.destinationContainer}>
        <Text style={styles.distanceText}>0 km</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Choose starting point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Choose destination</Text>
        </TouchableOpacity>
      </View>

      {/* Transport Options */}
      <ScrollView>
        <Text style={styles.sectionTitle}>How will you get there?</Text>
        {renderTransportOption('car', '15 min', '1.2 g CO2', '108 calories burned')}
        {renderTransportOption('bus', '15 min', '1.2 g CO2', '108 calories burned')}
        {renderTransportOption('bike', '15 min', '1.2 g CO2', '108 calories burned')}
        {renderTransportOption('walk', '15 min', '1.2 g CO2', '108 calories burned')}
      </ScrollView>


    </View>
  );
};

const renderTransportOption = (iconName, time, co2, calories) => (
  <View style={styles.option}>
    <Icon name={iconName} size={28} color="#fff" />
    <View style={styles.optionDetails}>
      <Text style={styles.optionText}>{time}</Text>
      <Text style={styles.optionText}>{co2}</Text>
      <Text style={styles.optionText}>{calories}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00154F',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 10,
    alignItems: 'center',

    fontWeight: 'bold',
  },
  destinationContainer: {
    backgroundColor: '#3E497A',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3E497A',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E497A',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionDetails: {
    marginLeft: 15,
  },
  optionText: {
    color: '#fff',
  },

});

export default RoutePlanner;
