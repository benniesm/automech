import React, { Component } from 'react';
import {
  Button,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols
} from 'react-native-table-component';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import multiGet from './store/AsyncStorage/GetItems';
import styles from '../Styles.js';
import fetchApi from './api/Fetch';
import Login from './auth/Login';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
      auth: null,
      m: 'null',
		}
	}

  componentDidMount() {
    this.getProfile();
  }

  goToSignIn() {
    this.props.navigation.navigate('Sign');
  }

  getProfile = async() => {
    const authData = ['id', 'mobile_phone', 'name', 'email', 'api_token'];
    const getData = await multiGet(authData);
    //console.log(getData);
    let userId = getData[0][1];
    let token = getData[4][1];

    let myProfile = await fetchApi.fetchNow(
      'get',
      {'url': 'profile', 'fetchId': userId, 'data': ''}
    );
    if (myProfile.data.hasOwnProperty('api_token') && myProfile.data.api_token === token) {
      this.setState({ auth: true });
    } else {
      this.props.navigation.navigate('Sign');
    }
    //console.log(myProfile.data);
    //console.log({'profileToken': myProfile.data.api_token});
    //console.log({'token': token});
  }

  render() {
    const screens = [
      ['Auto Mech', 'Auto Parts', 'Auto Scan'],
      ['Electronics', 'Body Works', 'Paint'],
      ['Tyres', 'Fuel Station', 'Towing Van'],
    ];

    return this.state.auth === true ?
      (
        <View style={Object.assign({}, styles.window, styles.bg2)}>
          <Table style={styles.tableIndex}>
            <Rows data={screens} />
          </Table>
        </View>
      )
      :
      (
        <View>
  				<TouchableHighlight
  					underlayColor='#cbcbcb'
  					style={styles.touchable}
  					onPress={() => this.goToSignIn()}>
  					<Text style={styles.buttonSmall}>Tap Here To Sign In</Text>
  				</TouchableHighlight>
        </View>
      )
  }
}

export default Index;
