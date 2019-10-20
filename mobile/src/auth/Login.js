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
import fetchApi from '../api/Fetch';
import styles from '../../Styles.js';
import Loading from '../components/Loading';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			code: null,
			codeConfirm: '',
			codes: {'NG': '234'},
			confirm:'Send confirmation code',
			errorMessage: '',
			loading: null,
			mobile: null,
			mobilePhone: '',
			msg: null,
			okMessage: '',
			registered: false,
		}
	}

  componentDidMount() {

  }

	/* |Disabled Feature |
  getCountryCodes = async() => {
    let codesList = await fetchApi.fetchNow('get', {'url': 'countryCode'});
    this.setState({ codes: codesList.data });
  }
	*/

	sendConfirmation = async() => {
	//console.log('confirmRequest');
		this.setState({
			loading: <View style={styles.loading}><Loading /></View>,
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
				loading: null,
			});
		} else {
			this.setState({
				errorMessage: 'Unable to complete, Please try again.',
				loading: null,
			});
		}
	}

	signIn = async() => {
		this.setState({
			loading: <View style={styles.loading}><Loading /></View>,
			errorMessage: '',
			okMessage: '',
		});

		if ('234' + parseInt(this.state.mobilePhone) !== this.state.mobile) {
			this.setState({
				errorMessage: 'Resend confirmation code to the changed the number',
				loading: null,
			});
			return;
		}
		if (this.state.codeConfirm != this.state.code) {
			this.setState({
				errorMessage: 'The code you entered is incorrect',
				loading: null,
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

				this.setState({ loading: null });
				//console.log(saveData);
				this.props.navigation.navigate('Home', {'auth': signInRequest.data.data.api_token});
		} else {
			this.setState({
				errorMessage: 'Invalid login or registration credentials',
				loading: null,
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
  return (
		<>
			<View style={styles.mainContent}>
				<View>
					<Text style={styles.font2}>Confirm Your Phone Number</Text>
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
				<Text style={styles.fontOk}>{this.state.okMessage}</Text>
				<Text style={styles.fontE}>{this.state.errorMessage}</Text>
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
			{this.state.loading}
		</>
  );
  }
}

export default Login;
