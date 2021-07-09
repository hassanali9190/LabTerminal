import React, { useState, useEffect } from 'react';

import {
  Button,
  View,
  Text,
  Ionicons,
  ScrollView,
  TextInput,
  SafeAreaView,
  FontAwesome,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import axios from 'axios';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { Fontisto } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{
          backgroundColor: 'white',

          width: 200,
        }}>
        <Drawer.Screen name="Cars"  component={StackNavigator} />

        <Drawer.Screen name="ManageCarBrands" component={brands} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName={'Cars'}>
      <Stack.Screen
        name="Cars"
        component={users}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Addcar');
              }}
              title="Add Car"
              color="blue"
            />
          ),
        }}
      />

      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen name="Addcar" component={AddCar} />
    </Stack.Navigator>
  );
};

function users({ navigation }) {
  const cars = [
    {
      id: '-MeA6KUqfuxRJH6E_5t-',
      epower: '12c',
      imgi:
        'https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2021/Pilot/Exterior-right/Overview/MY21-Pilot-Feature-Blade-Primary-Exterior-Overview-2x.jpg',
      make: 'Toto',
      model: 'Ghisi',
      myear: '1997',
    },
  ];
  function getData() {
    const options = {
      method: 'GET',

      url: 'https://car-showroom-mad-default-rtdb.firebaseio.com//cars.json',
    };

    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  }

  const showuserdetail = (id) => {
    navigation.navigate('Car Details', {
      id: id,
    });
  };

  const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => openDrawer()}>
        <Icon name="ios-menu" size={32} />
      </TouchableOpacity>

      <Text>{name}</Text>

      <Text style={{ width: 50 }}></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header name="Cars" openDrawer={navigation.openDrawer} />

      <View style={styles.paddings}>
        <Text style={styles.bigBlue}>List of Cars</Text>
        <FlatList
          data={cars}
          renderItem={({ item }) => (
            <View style={{ paddingTop: 10 }}>
              <TouchableOpacity style={styles.appButton}>
                <Text
                  onPress={() => {
                    showuserdetail(item.id);
                  }}
                  style={styles.fortext2}>
                  Epower: {item.epower}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,

    alignItems: 'center',

    backgroundColor: 'yellow',
  },

  paddings: {
    paddingTop: 20,
  },

  bigBlue: {
    color: 'black',

    fontWeight: 'bold',

    fontSize: 30,

    padding: 5,

    borderWidth: 5,

    borderColor: 'black',

    backgroundColor: 'white',
  },

  fortext2: {
    color: 'black',

    fontWeight: 'bold',

    fontSize: 15,

    padding: 5,

    borderWidth: 1,

    borderColor: 'black',

    backgroundColor: 'white',
  },

  header: {
    width: '100%',

    height: 60,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingHorizontal: 20,

    backgroundColor: 'orange',
  },
});

function CarDetails({ route, navigation }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState();
  const [power, setPower] = useState('');
  const [color, setColor] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const options = {
      method: 'GET',

      url:
        'https://car-showroom-mad-default-rtdb.firebaseio.com//cars/-MeA6KUqfuxRJH6E_5t-',
    };

    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <View style={styles2.container}>
      <View style={styles2.paddings}>
        <Text style={styles2.bigBlue}>Car Details</Text>
      </View>

      <View style={styles2.paddings}>
        <Text style={styles2.fortext}>Make: Honda </Text>
      </View>

      <View style={styles2.paddings2}>
        <Text style={styles2.fortext}>Model: Epower 12c </Text>
      </View>

      <View style={styles2.paddings}>
        <Text style={styles2.fortext}>Manufacturing Year : 2019 </Text>
      </View>

      <View style={styles2.paddings}>
        <Text style={styles2.fortext}>Engine Power: 1500cc </Text>
      </View>

      <View style={styles2.paddings}>
        <Text style={styles2.fortext}>Color: Red</Text>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,

    alignItems: 'center',

    backgroundColor: 'yellow' ,
  },

  paddings: {
    paddingTop: 20,
  },

  paddings2: {
    paddingTop: 10,
  },

  bigBlue: {
    color: 'blue',

    fontWeight: 'bold',

    fontSize: 30,

    borderRadius: 10,

    borderWidth: 5,

    borderColor: 'blue',

    backgroundColor: 'white',

    padding: 5,
  },

  fortext: {
    color: 'blue',

    fontWeight: 'bold',

    fontSize: 15,

    borderRadius: 5,

    borderWidth: 1,

    borderColor: 'blue',

    backgroundColor: 'white',

    padding: 5,
  },
});

function brands({ navigation }) {
  const brands = [
    'Toyota',
    'Corolla',
    'Suzuki',
    'BMW',
    'MG',
    'KIA',
    'Mercedes',
  ];

  const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => openDrawer()}>
        <Icon name="ios-menu" size={32} />
      </TouchableOpacity>

      <Text>{name}</Text>

      <Text style={{ width: 50 }}></Text>
    </View>
  );

  return (
    <View style={styles3.container}>
      <Header name="Car Brands" openDrawer={navigation.openDrawer} />
      <View style={styles.paddings}>
        <FlatList
          data={brands}
          renderItem={({ item }) => (
            <View style={{ paddingTop: 10 }}>
              <Text style={styles.fortext2}> {item} </Text>
            </View>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,
    backgroundColor: 'yellow',

    alignItems: 'center',
  },
});

function AddCar({ navigation }) {
  const [make, setMake] = useState();
  const [imgi, setIMG] = useState();
  const [model, setModel] = useState();
  const [myear, setMyear] = useState();
  const [epower, setEpower] = useState();

  function onChangeText(value) {
    console.log(value);
    setIMG(value);
  }
  function onChangeMyear(value) {
    console.log(value);
    setMyear(value);
  }
  function onChangeMake(value) {
    console.log(value);
    setMake(value);
  }
  function onChangeModel(value) {
    console.log(value);
    setModel(value);
  }
  function onChangeEpower(value) {
    console.log(value);
    setEpower(value);
  }
  async function addCar() {
    const obj = {
      make: make,
      imgi: imgi,
      myear: myear,
      model: model,
      epower: epower,
    };
    console.log(obj);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    };
    fetch(
      'https://car-showroom-mad-default-rtdb.firebaseio.com//cars.json',
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
    navigation.replace('Cars');
  }

  return (
    <View style={styles7.container}>
      <Text style={styles7.fortext2}>Add Car </Text>
      <SafeAreaView>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => onChangeText(value)}
            placeholder="Enter Photo URL"
            value={imgi}
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => onChangeMake(value)}
            value={make}
            placeholder="Enter Make"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => onChangeModel(value)}
            value={model}
            placeholder="Enter Model"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => onChangeMyear(value)}
            value={myear}
            placeholder="Enter Manufacturing Year"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => onChangeEpower(value)}
            value={epower}
            placeholder="Enter Engine Power"
            placeholderTextColor="#040000"
          />
        </View>
      </SafeAreaView>
      <View style={styles7.add2}>
        <Button
          title="Add Car"
          color="blue"
          style={styles7.add}
          onPress={addCar}
        />
      </View>
    </View>
  );
}

const styles7 = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,
    backgroundColor: 'yellow',

    alignItems: 'center',
  },

  add2: {
    marginTop: 100,
    marginLeft: 100,
  },
  add: {
    marginTop: 100,
    position: 'absolute',
    left: '10',
  },

  fortext2: {
    color: '#ffffff',

    fontWeight: 'bold',

    fontSize: 40,

    borderRadius: 0,

    borderWidth: 3,

    borderColor: '#E4E102',

    backgroundColor: '#260033',
  },
});
