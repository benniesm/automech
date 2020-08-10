import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../../store/StateDispatch';
import styles from '../../../Styles';
import Header from '../../components/Header';

class AutoLoanContainer extends Component {
  render() {
    return (
    <>
      <Header
        drawer={this.props.navigation.openDrawer}
        page='Auto Loan' />
      <View style={Object.assign({}, styles.window, styles.backRed)}>
        <Text style={Object.assign(
          {},
          styles.textColorWhite,
          styles.textSizeMedium
          )}>
            Coming Soon!
        </Text>
      </View>
    </>
    )
  }
}

const AutoLoan =
  connect(mapStateToProps, mapDispatchToProps)(AutoLoanContainer);

export default AutoLoan;
