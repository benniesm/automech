import React, { Component } from 'react';
import {
	Alert,
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
import fetchRetry from '../functions/FetchRetry';
import uiData from '../assets/data/UiData';
import styles from '../../Styles.js';
import Header from '../components/Header';
import Loading from '../components/Loading';

//const countryCallCodes = require('../assets/data/country-call-codes.json');

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

	sendConfirmation = async() => {
		if (this.state.mobilePhone === '') {
			this.setState({ errorMessage: 'Type a valid phone number!'});
			return;
		}

		this.setState({
			confirm: 'Resend code',
			errorMessage: '',
			okMessage: '',
		});

		let mobile_number = '234' + parseInt(this.state.mobilePhone);

		let confirmRequest = await fetchApi.fetchNow(
			'get',
			{
				'url': 'confirm-code',
				'data': 'mobile=' + mobile_number,
        'props': this.props,
        'info': uiData.notifyPerms
			}
		);

    fetchRetry(confirmRequest, this.sendConfirmation);

		if (confirmRequest.status === 200) {
			this.setState({
				code: confirmRequest.data.data.code,
				mobile: confirmRequest.data.data.mobile,
				registered: confirmRequest.data.data.registered,
				okMessage: 'Code sent!\nMake sure DND is disabled on your line.',
			});
			this.props.screenLogin();
			Alert.alert(confirmRequest.data.data.code.toString());
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
			return;
		}
		if (this.state.codeConfirm != this.state.code) {
			this.setState({
				errorMessage: 'The code you entered is incorrect',
			});
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
				},
        'props': this.props,
        'info': uiData.notifyPerms
			}
		);

    fetchRetry(signInRequest, this.signIn);

		if (signInRequest.status === 200
			|| signInRequest.status === 201) {
				const data = signInRequest.data.data;

				if (data.vendor !== null) {
					this.props.vendOn();
				}
				//console.log(data);
				this.props.authenticateUser(data);
				//console.log(this.props.state.auth);
				this.setState({
					mobilePhone: '',
					codeConfirm: '',
					confirm: 'Send confirmation code'
				});
				this.props.navigation.navigate('Home');
	      //console.log(data);
		} else {
			this.setState({
				errorMessage: 'Invalid login or registration credentials',
			});
		}
	}

  render() {

	/*|Disabled Feature|
	let codes = Object.values(this.state.codes).sort();
	let countryCodes = countryCodes.map((c) => {
		return <Picker.Item label={c} value={c} />
	});
	*/

	let msgs = () => {
		return (
			<>
				<Text style={Object.assign(
					{},
					styles.textSizeSmall,
					styles.textColorWhite,
					styles.textCenter
					)}>
						{this.state.okMessage}
					</Text>
				<Text style={Object.assign(
					{},
					styles.textSizeSmall,
					styles.textColorBlack
					)}>
						{this.state.errorMessage}
				</Text>
			</>
		)
	}

  return this.props.state.load.loading === true ?
		<View style={styles.loading}><Loading /></View>
		:
		this.props.state.auth.confirmSent === false ?
			<View style={Object.assign({}, styles.allContent, styles.backRed)}>
				<View>
					<Text style={Object.assign(
						{},
						styles.textSizeMedium,
						styles.textColorWhite,
						styles.textCenter,
						styles.touchable2
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
						styles.backRed,
						styles.borderWhite
						)}
					onPress={() => this.sendConfirmation()}>
					<Text style={styles.textColorWhite}>{this.state.confirm}</Text>
				</TouchableHighlight>
				{msgs()}
			</View>
			:
			<View style={Object.assign({}, styles.allContent, styles.backRed)}>
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
							styles.backRed,
							styles.borderWhite
							)}
						onPress={() => this.signIn()}>
							<Text style={
								Object.assign(
									{},
									styles.textColorWhite,
									styles.textCenter
								)}>
								Start AutoMech
							</Text>
					</TouchableHighlight>
					{msgs()}
					<TouchableHighlight
						onPress={() => this.props.screenConfirm()}>
						<Text
							style={Object.assign(
								{},
								styles.borderBlack,
								styles.textColorBlack,
								styles.textCenter,
								styles.textSizeSmall,
								styles.touchable
							)}>
								Resend Code
							</Text>
					</TouchableHighlight>
				</View>
	    </View>
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default Login;
