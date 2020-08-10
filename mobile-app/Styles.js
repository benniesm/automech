import { StyleSheet } from "react-native"

export default StyleSheet.create({
  allContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
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
  backViolet: {
    backgroundColor: '#FF0089'
  },
  body: {
    height: '92%'
  },
  borderBlack: {
    borderColor: 'black',
    borderWidth: 1
  },
  borderRed: {
    borderColor: 'red',
    borderWidth: 1
  },
  borderWhite: {
    borderColor: 'white',
    borderWidth: 1
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
  displayData: {
    minWidth: '100%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 20
  },
  displayDataIndividual: {
    minWidth: '100%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  displayDataJoin: {
    minWidth: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%'
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
  iconIndex: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  imageLoading: {
    height: 200,
    width: 200,
  },
  imageMenu: {
    height: '100%',
    width: '100%',
    opacity: 0.9,
  },
  indexListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 10
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
  inputTextArea: {
    height: 80,
    width: '80%',
    textAlign: 'left',
  },
  loading: {
    backgroundColor: '#ff0000',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '92%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapForm: {
    height: '18%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  mapView: {
    height: '82%',
    width: '100%'
  },
  mapView2: {
    height: '92%',
    width: '100%'
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
  notificationHide: {
    display: 'none',
      backgroundColor: 'white',
  },
  notificationShow: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: 5
  },
  text: {
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
  textPadded: {
    padding: 10
  },
  textPaddedSmall: {
    padding: 4
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
  textSizeSmallNormal: {
    fontSize: 13,
  },
  touchable: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 15,
    borderRadius: 5
  },
  touchable2: {
    padding: 15,
  },
  touchable3: {
    padding: 3,
    minWidth: 'auto'
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
    height: '92%',
    width: '100%'
  },
});
