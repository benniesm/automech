import { StyleSheet } from "react-native"

export default StyleSheet.create({
  backGray: {
    backgroundColor: 'gray',
  },
  backOrange: {
    backgroundColor: 'orange',
  },
  backRed: {
    backgroundColor: 'red',
  },
  backRedPale: {
    backgroundColor: '#FFE0E0'
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
    height: '8%',
  },
  headerIcons: {
    paddingLeft: 20,
    paddingRight: 20
  },
  headerTitle: {
    height: '100%',
    width: '83%',
    display: 'flex',
    flexDirection: 'row',
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
  imageMenu: {
    height: '100%',
    width: '100%',
    opacity: 0.9,
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
  inputText3: {
    width: '80%',
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
  menuFooter: {
    justifyContent: 'center',
    height: '5%',
    backgroundColor: 'red',
    paddingLeft: 10
  },
  menuHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
    borderColor: 'red',
  },
  menuIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10
  },
  menuItems: {
    height: '60%',
    backgroundColor: 'red',
  },
  navItem: {
    borderColor: '#FF7777',
    borderBottomWidth: 1,
    paddingLeft: 35,
    paddingBottom: 10,
    paddingTop: 10
  },
  tableIndex: {
    height: '50%',
    width: '90%',
  },
  text: {
  },
  textPadded: {
    padding: 10
  },
  textCenter: {
    textAlign: 'center',
  },
  textH1: {
    fontSize: 35,
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  textColorBlack: {
    color: 'black',
  },
  textColorGreen: {
    color: 'green',
  },
  textColorRed: {
    color: 'red',
  },
  textColorRedPale: {
    color: '#FFE0E0',
  },
  textColorWhite: {
    color: 'white',
  },
  textSizeMedium: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textSizeMediumNormal: {
    fontSize: 17,
  },
  textSizeSmall: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  touchable: {
    marginBottom: 5,
    marginTop: 10,
    padding: 8,
    borderRadius: 5
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
