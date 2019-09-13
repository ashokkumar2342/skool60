
import React, { Component } from 'react';
import { View, Text , Button, TextInput,TouchableOpacity,StyleSheet,Alert,AsyncStorage} from 'react-native';

export class Login extends Component {
	constructor(props) {
	   super(props);
	   this.state = { text: 'Useless Placeholder' };
		state = { username: '',password:'' }
		this.state = { 
      loading: true,
      userId:'',
      rootUrl:'',
			dataSource:[],      
		   }; 
  }
  componentDidMount(){       
    AsyncStorage.getItem('rootUrl').then((value) => 
     this.setState({ 'rootUrl': value })  
     ) 
  }
	static navigationOptions={
		header :null
	}
	 
	 checkLogin = async ()=>{
		 const {username,password}=this.state 
		 fetch(this.state.rootUrl+'/api/login?email='+username+'&password='+password+'')
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
				loading: false,
				dataSource: responseJson
				})   
				if(responseJson.status==1){
					LoginData(responseJson.id,responseJson.role_id)
				}else{
					Alert.alert('Error','Username/password mismatch',[{
					text:'Okey'
				   }])
				}
				
			}) 
	 	
	 	// if (username=='admin' && password=='admin') {
		// 	await AsyncStorage.setItem('isLoggedIn', this.state.dataSource.id);
		// 	await AsyncStorage.setItem('userId', this.state.dataSource.id);
	 	// 	this.props.navigation.navigate('DashboardScreen');
	 	// }else{
        //      Alert.alert('Error','Username/password mismatch',[{
        //      	text:'Okey'
        //      }])
		//  }
		 
	  
		LoginData = async (data,role_id)=>{
		// alert(String(data))
		await	 AsyncStorage.setItem('isLoggedIn', String(1))
		await	 AsyncStorage.setItem('isRoleId', String(role_id))
    await	AsyncStorage.setItem('userId', String(data))
    await	AsyncStorage.setItem('url', 'http://mailin.co.in')
    if (role_id==6) {
      this.props.navigation.navigate('DashboardScreen');
    } else {
      this.props.navigation.navigate('AdminDashboardScreen');
    }
	 		
	 
		
		 }
	 }
	 
  render() {
    return (
      <View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onChangeText={text=> this.setState({username:text})}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
               onChangeText={text=> this.setState({password:text})}
              />  
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.checkLogin()}>Login</Text>
             
           </TouchableOpacity>     
           <TouchableOpacity  >
           <Text  style={styles.buttonTextRight}   onPress={() => this.props.navigation.navigate('ForgotPassword')}>Fogot Password</Text>

           </TouchableOpacity>     
  		</View>

    )
  }
}

const styles = StyleSheet.create({
  container : {
  	backgroundColor:'#455a64',
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'

  },


  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  }, 
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonTextRight: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'right'
  }
});

export default Login