import React, { Component } from 'react';
import {
	Button,
	Picker,
	TouchableHighlight,
	Text,
	TextInput,
	View,Image
} from 'react-native';
import multiSet from '../store/AsyncStorage/SetItems';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/Redux/StateDispatch';
import fetchApi from '../api/Fetch';
import styles from '../../Styles.js';
import Header from '../components/Header';
import Loading from '../components/Loading';

class LoginContainer extends Component {
	constructor() {
		super();
		this.state = {
			code: null,
			codeConfirm: '',
			codes: {'NG': '234'},
			confirm:'Send confirmation code',
			errorMessage: '',
			mobile: null,
			mobilePhone: '',
			msg: null,
			okMessage: '',
			registered: false,
		}
	}

	/* |Disabled Feature |
  getCountryCodes = async() => {
    let codesList = await fetchApi.fetchNow('get', {'url': 'countryCode'});
    this.setState({ codes: codesList.data });
  }
	*/

	sendConfirmation = async() => {
		this.props.loadOn();

	//console.log('confirmRequest');
		this.setState({
			confirm: 'Resend code',
			errorMessage: '',
			okMessage: '',
		});

		let mobile_number = '234' + parseInt(this.state.mobilePhone);

		let confirmRequest = await fetchApi.fetchNow(
			'get',
			{'url': 'confirm-code', 'data': 'mobile=' + mobile_number}
		).catch(e => console.console.log(e));
		console.log(confirmRequest);

		if (confirmRequest.status === 200) {
			this.setState({
				code: confirmRequest.data.data.code,
				mobile: confirmRequest.data.data.mobile,
				registered: confirmRequest.data.data.registered,
				okMessage: 'Code sent!\nMake sure DND is disabled on your line.',
			});
			this.props.loadOff();
		} else {
			this.setState({
				errorMessage: 'Unable to complete, Please try again.',
			});
			this.props.loadOff();
		}
	}

	signIn = async() => {
		this.props.loadOn();

		this.setState({
			errorMessage: '',
			okMessage: '',
		});

		if ('234' + parseInt(this.state.mobilePhone) !== this.state.mobile) {
			this.setState({
				errorMessage: 'Resend confirmation code to the changed the number',
			});
			this.props.loadOff();
			return;
		}
		if (this.state.codeConfirm != this.state.code) {
			this.setState({
				errorMessage: 'The code you entered is incorrect',
			});
			this.props.loadOff();
			return;
		}

		const url = () => this.state.registered === true ? 'login' : 'register';
		let signInRequest = await fetchApi.fetchNow(
			'post',
			{
				'url': url(),
				'body': {
					mobile_phone: this.state.mobile,
					password : this.state.code,
					password_confirmation: this.state.code
				}
			}
		);
		console.log(signInRequest);
		if (signInRequest.status === 200
			|| signInRequest.status === 201) {
				const authData = [
					['id', signInRequest.data.data.id.toString()],
					['mobile_phone', signInRequest.data.data.mobile_phone],
					['name', signInRequest.data.data.name],
					['email', signInRequest.data.data.email],
					['api_token', signInRequest.data.data.api_token]
				];
				const saveData = multiSet(authData);

				//console.log(saveData);
				this.props.authenticateUser();
				this.props.loadOff();
				this.props.navigation.navigate('Home');
		} else {
			this.setState({
				errorMessage: 'Invalid login or registration credentials',
			});
			this.props.loadOff();
		}
	}

  render() {

	/*|Disabled Feature|
	let codes = Object.values(this.state.codes).sort();
	let countryCodes = countryCodes.map((c) => {
		return <Picker.Item label={c} value={c} />
	});
	*/

  return this.props.state.load.loading === true ?
		<View style={styles.loading}><Loading /></View>
	:
		(
			<>
				<View style={styles.mainContent}>
					<View>
						<Text style={Object.assign(
							{},
							styles.textSizeMedium,
							styles.textColorRed,
							styles.textCenter
							)}>
								Confirm Your Phone Number
							</Text>
					</View>
					<View style={styles.horizontalContent}>
						<Text
			        style={Object.assign({}, styles.input, styles.inputText)}>
							+234
			      </Text>
			      <TextInput
							name='mobilePhone'
							keyboardType='numeric'
							onChangeText={(text) => this.setState({ mobilePhone: text })}
							style={Object.assign({}, styles.input, styles.inputText2)}
			        placeholder='Enter digits, No Symbols'
			        value={this.state.mobilePhone}>
			      </TextInput>
					</View>
					<TouchableHighlight
						underlayColor='#cbcbcb'
						style={styles.touchable}
						onPress={() => this.sendConfirmation()}>
						<Text style={styles.buttonSmall}>{this.state.confirm}</Text>
					</TouchableHighlight>
					<Text style={Object.assign(
						{},
						styles.textSizeSmall,
						styles.textColorGreen,
						styles.textCenter
						)}>
							{this.state.okMessage}
						</Text>
					<Text style={Object.assign(
						{},
						styles.textSizeSmall,
						styles.textColorRed
						)}>
							{this.state.errorMessage}
					</Text>
					<View>
			      <TextInput
							name='codeConfirm'
							keyboardType='numeric'
							onChangeText={(text) => this.setState({codeConfirm: text})}
							style={Object.assign({}, styles.input, styles.inputText3)}
			        placeholder='Enter code here'
			        value={this.state.codeConfirm}>
			      </TextInput>
					</View>
					<View>
						<Button
							title="SIGN IN"
							color="red"
							style={styles.button}
							onPress={() => this.signIn()}
						/>
					</View>
		    </View>
			</>
	  )
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default Login;
