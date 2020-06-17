
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Share from 'react-native-share';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Swiper from 'react-native-swiper';
import axios from 'axios';
const shareOptions = {
  title: 'Share via',
  message: 'You must try this app',
  url: 'https://play.google.com/',
};
const appColors = {
  gray: '#959595',

};

class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      favourite: 'star-o',
      data: [],
      swiperData: [],
      sliderItems: 0,
    };
  }

  componentDidMount() {
    axios.get('https://run.mocky.io/v3/3a1ec9ff-6a95-43cf-8be7-f5daa2122a34')
      .then((response) => {
        let sliderItems = [];
        Object.entries(response.data.img).map(([item, data]) => {
          console.log(data)
          if (data)
            sliderItems.push(data)
        })


        this.setState({ data: response.data, swiperData: sliderItems, counter: sliderItems.length })
      })
      .catch((error) => {
        alert(error)

      });
  }

  render() {
    const { data } = this.state;
    return (
      <ScrollView >
        <View >
          <Swiper
            style={{ height: 230 }}
            // dotStyle={{  }}
            activeDotStyle={{ borderWidth: 7, borderColor: 'white' }}
            showsPagination={true}
            paginationStyle={{ justifyContent: 'flex-start', marginLeft: 15, marginBottom: -10 }}
            autoplay={true}
            key={this.state.counter}
            dotColor={'grey'}
            activeDotColor={'white'}>
            {this.state.swiperData.map((item, key) => {
              return (
                <Image style={{
                  height: 230, width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={key} source={{ uri: item }} resizeMode={'stretch'} />
              )
            })}
          </Swiper>

        </View>
        <View style={{
          justifyContent: 'space-between', flexDirection: 'row',
          position: 'absolute'
        }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity onPress={() => this.setState({ favourite: "star" })}>
              <FontAwesome
                name={this.state.favourite}
                color="white"
                size={25}
                style={{ marginVertical: 10, marginLeft: 15 }}

              />
            </TouchableOpacity>
            <TouchableOpacity onPress={
              () => Share.open(shareOptions)
            } >
              <SimpleLineIcons
                name='share'
                color="white"
                size={25}
                style={{ marginVertical: 10, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity >
            <Ionicons
              name='ios-arrow-forward'
              color="white"
              size={25}
              style={{ marginVertical: 10, marginRight: 15 }}

            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text style={styles.text}>
            #{data.interest}
          </Text>
          <Text style={styles.textTitle}>
            {data.title}
          </Text>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>

            <Text style={styles.text}>{data.date}</Text>
            <EvilIcons
              name='calendar'
              color={appColors.gray}
              size={15}
              style={{ alignSelf: 'center' , marginRight:10 }}

            />

          </View>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>

            <Text style={styles.text}>{data.address}</Text>
            <SimpleLineIcons
              name='pin'
              color={appColors.gray}
              size={15}
              style={{ alignSelf: 'center', marginRight:10  }}

            />

          </View>
          <View style={styles.bar} />

          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>

            <Text style={styles.textHeader}>{data.trainerName}</Text>
            <Image
              resizeMode={'stretch'}
              style={{
                height: 25, width: 25,
                borderRadius: 25,
                marginRight:10,
                marginTop:3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpsYeaa0d-Z0b8gT_LX-IvIKR54WON6PQJHGESAHfGAYFaboIf&usqp=CAU" }}
            />
          </View>

        </View>
        <Text style={styles.text}>{data.trainerInfo}</Text>
        <View style={styles.bar} />
        <Text style={styles.textTitle}>عن الدوره</Text>
        <Text style={styles.text}>{data.occasionDetail}</Text>
        <View style={styles.bar} />
        <Text style={styles.textTitle}>تكلفه الدوره</Text>
        <View style={styles.viewPrice}>
          <Text style={styles.text}>40</Text>
          <Text style={styles.text}>الحجز العادي</Text>
        </View>
        <View style={styles.viewPrice}>
          <Text style={styles.text}>80</Text>
          <Text style={styles.text}>الحجز المميز</Text>
        </View>
        <View style={styles.viewPrice}>
          <Text style={styles.text}>{data.price}</Text>
          <Text style={styles.text}>الحجز السريع</Text>
        </View>
        <TouchableOpacity style={{ height: 50, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>قم بالحجز الآن</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  text: {
    color: appColors.gray,
    fontSize: 13,
    textAlign: 'right',
    marginVertical: 5,
    marginHorizontal: 10
  },
  textTitle: {
    color: appColors.gray,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 5,
    marginHorizontal: 10
  },
  textHeader: {
    color: appColors.gray,
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'right',
    marginHorizontal: 10
  },
  bar: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#EAEBED'
  },
  viewPrice:{
    flexDirection: 'row',
     justifyContent: 'space-between',
      alignItems: 'center' 
  }
});

export default App;
