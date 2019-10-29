import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../store/Redux/StateDispatch';
import styles from '../../../../Styles.js';
import Header from '../../../components/Header';

class UpdateBasicProfileContainer extends Component {
  constructor(props) {
    super(props);
    const view = this.props.state.page;
    this.state = {
      email: view.email,
      mobile: view.mobile_phone,
      name: view.name,
    }
  }

  sendUpdate = async() => {
    this.props.loadOn();

  }

  render() {
    return (
      <>
        <Header
          drawer={this.props.navigation.openDrawer}
          page='Update User Information' />
        <View style={styles.mainContent}>
          <Text style={Object.assign(
            {},
            styles.textSizeMedium,
            styles.textCenter,
            styles.textPadded
            )}>
              Basic Information
          </Text>
          <Text
            style={Object.assign(
              {},
              styles.input,
              styles.inputText3,
              styles.backGray
            )}>
              {this.state.mobile}
          </Text>
          <TextInput
            name='name'
            onChangeText={(text) => this.setState({name: text})}
            style={Object.assign({}, styles.input, styles.inputText3)}
            placeholder='Your Name'
            value={this.state.name}>
          </TextInput>
          <TextInput
          name='email'
          onChangeText={(text) => this.setState({email: text})}
          style={Object.assign({}, styles.input, styles.inputText3)}
          placeholder='Your Email'
          value={this.state.email}>
        </TextInput>
        <TouchableHighlight
          underlayColor='#cbcbcb'
          style={Object.assign({}, styles.touchable, styles.backOrange)}
          onPress={() => this.sendUpdate()}>
          <Text style={styles.buttonSmall}>Submit</Text>
        </TouchableHighlight>
        </View>
      </>
    )
  }
}

const UpdateBasicProfile =
  connect(mapStateToProps, mapDispatchToProps)(UpdateBasicProfileContainer);

export default UpdateBasicProfile;
