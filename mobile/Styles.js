import { StyleSheet } from "react-native"

export default StyleSheet.create({
  bg1: {
    backgroundColor: 'red',
  },
  bg2: {

  },
  body: {
    height: '92%'
  },
  button: {
    borderRadius: 10,
    padding: 12,
  },
  buttonSmall: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  font1: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  font2: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
    padding: 12,
  },
  fontE: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fontOk: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
    height: '8%',
  },
  headerTitle: {
    height: '100%',
    width: '83%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  /*
  menuIcon: {
    height: '100%',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  */
  imageLoading: {
    height: 120,
    width: 155,
    opacity: 1,
  },
  input: {
  borderRadius: 5,
  borderWidth: 1,
  textAlign: 'center',
  fontSize: 15,
  margin: 3,
  padding: 7,
  height: 40,
  },
  inputText: {
    width: '15%',
  },
  inputText2: {
    width: '55%',
  },
  loading: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    zIndex: 9,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tableIndex: {
    height: '50%',
    width: '90%',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  touchable: {
    backgroundColor: '#e9e9e9',
    marginBottom: 30,
    marginTop: 12,
    padding: 8,
  },
  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
    width: '75%',
  },
  window: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
