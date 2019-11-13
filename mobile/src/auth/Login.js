import React, { Component } from 'react';
import {
	Picker,
	TouchableHighlight,
	Text,
	TextInput,
	View,Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps
} from '../store/StateDispatch';
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
			confirm: 'Send confirmation code',
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
		if (this.state.mobilePhone === '') {
			this.setState({ errorMessage: 'Type a valid phone number!'});
			return;
		}

	//console.log('confirmRequest');
		this.setState({
			confirm: 'Resend code',
			errorMessage: '',
			okMessage: '',
		});

		let mobile_number = '234' + parseInt(this.state.mobilePhone);

		this.props.loadOn();
		let confirmRequest = await fetchApi.fetchNow(
			'get',
			{'url': 'confirm-code', 'data': 'mobile=' + mobile_number}
		).catch(e => console.console.log(e));
		this.props.loadOff();
		console.log(confirmRequest);

		if (confirmRequest.status === 200) {
			this.setState({
				code: confirmRequest.data.data.code,
				mobile: confirmRequest.data.data.mobile,
				registered: confirmRequest.data.data.registered,
				okMessage: 'Code sent!\nMake sure DND is disabled on your line.',
			});
		} else {
			this.setState({
				errorMessage: 'Unable to complete, Please try again.',
			});
		}
	}

	signIn = async() => {
		if (this.state.mobilePhone === '' || this.state.code === null) {
			this.setState({ errorMessage: 'Provide required information'});
			return;
		}

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

		this.props.loadOn();
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
		this.props.loadOff();

		//console.log(signInRequest);
		if (signInRequest.status === 200
			|| signInRequest.status === 201) {
				//console.log(signInRequest.data.data)
				const data = signInRequest.data.data;
				//console.log(authData);

				if (data.vendor !== null) {
					this.props.vendOn();
				}
				this.props.authenticateUser(data);
				this.setState({
					mobilePhone: '',
					codeConfirm: '',
					confirm: 'Send confirmation code'
				});
				//console.log(this.props.state.auth.profile);

				this.props.navigation.navigate('Home');
		} else {
			this.setState({
				errorMessage: 'Invalid login or registration credentials',
			});
			//console.log(signInRequest);
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
						style={Object.assign(
							{},
							styles.touchable,
							styles.backGray
							)}
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
						<TouchableHighlight
							style={Object.assign(
								{},
								styles.touchable,
								styles.backOrange
								)}
							onPress={() => this.signIn()}>
								<Text style={styles.buttonSmall}>SIGN IN</Text>
						</TouchableHighlight>
					</View>
		    </View>
			</>
	  )
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default Login;
