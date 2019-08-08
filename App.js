import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, 
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';
import Settings from './src/screens/Settings';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import OtpScreen from './src/screens/OtpScreen';
import Dashboard from './src/screens/Dashboard';
import AdminDashboard from './src/screens/AdminDashboard'; 
const StudentRootStack = createStackNavigator(
  {   
     DashboardScreen: { screen: Dashboard }
  }
);
const AdminRootStack = createStackNavigator(
  {   
     AdminDashboardScreen: { screen: AdminDashboard }
  }
);
const AuthStack = createStackNavigator({
   Login:{ screen:Login}, 
   ForgotPassword:{ screen:ForgotPassword}, 
   OtpScreen:{ screen:OtpScreen}, 
  
  });
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._loadData();
  }
  render() {
    return (
      <View style={styles.container}> 
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
  _loadData = async() => { 
    const isLoggedIn =await AsyncStorage.getItem('isLoggedIn');
    const isRoleId =await AsyncStorage.getItem('isRoleId');
    if (isLoggedIn=='1' && isRoleId == '6') {
      this.props.navigation.navigate('App');
    }
    else if (isLoggedIn=='1') { 
      this.props.navigation.navigate('AppAdmin');
    } else {
      this.props.navigation.navigate('Auth');
    }

   
  }
}
const styles = StyleSheet.create({
  container : { 
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'

  }, 
}); 

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: StudentRootStack,
    AppAdmin: AdminRootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));




