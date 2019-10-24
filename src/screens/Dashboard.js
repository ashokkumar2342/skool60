import React from 'react';
import Moment from 'react-moment';
import { Modal,TouchableHighlight,Picker,ProgressBarAndroid,ToastAndroid,PermissionsAndroid,Alert,PixelRatio,TextInput,Text, View ,Button,StyleSheet,Image,TouchableOpacity,AsyncStorage,ScrollView,FlatList,ActivityIndicator, } from 'react-native';
import { createBottomTabNavigator, createAppContainer,createDrawerNavigator,createStackNavigator,StackNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from "react-native-image-picker";
export const ROOT_URL = 'http://eageskool.com';

class StudentProfile extends React.Component { 
  static navigationOptions = {

    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (
      <Icon name="user" size={20} color="#000" />
    ),
  };
  _getUserId = async() => {
    const userId =await AsyncStorage.getItem('userId');
    
    return userId;
  }
  constructor(props) {
   
    super(props);
    
    this.state = {
      loading: true,
      userId:'',
      url:'',
      dataSource:[],
      classes:[],
      sectionTypes:[],
      addressDetails:[],
      father:[],
      mother:[],
      religions:[],
      categories:[],
     };
     
   }
     componentDidMount(){       
      AsyncStorage.getItem('userId').then((value) => 
       this.setState({ 'userId': value })       
       ) 
       AsyncStorage.getItem('url').then((value) => 
       this.setState({ 'url': value })      
        
       )
       AsyncStorage.getItem('userId', (err, result) => { 
        fetch(this.state.url+'/api/student/details/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson,
           classes: responseJson.classes,
           sectionTypes: responseJson.section_types,
           addressDetails: responseJson.address_details.address,
           religions: responseJson.address_details.address.religions,
           categories: responseJson.address_details.address.categories, 
          })
          if(responseJson.parents[0]!=null){
            this.setState({ 
              father: responseJson.parents[0].parent_info, 
             })
          }
          if(responseJson.parents[1]!=null){
            this.setState({ 
              mother: responseJson.parents[1].parent_info, 
             })
          }
          
           
        })
        .catch(error=>console.log(error)) //to catch the errors if any
       }); 
      }  
   
      _signOutAsync = async () => {
        
        await AsyncStorage.removeItem('isLoggedIn');         
        this.props.navigation.navigate('profile');
      }; 

    render() {
      if (this.state.isLoading) {
        return <View><Text>Loading...</Text></View>;
      }
      return (
        <ScrollView>
        <View style={styles.container}>
             <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: this.state.url+'/api/student/image/'+this.state.userId}}/>

                <Text style={styles.name}>
                {this.state.dataSource.name} 
                </Text>
                <Button title="sign out" onPress={this._signOutAsync} />
               
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.name}>
                  User Id : {this.state.dataSource.username} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Class  : {this.state.classes.name} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Section  : {this.state.sectionTypes.name} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Registration  : {this.state.dataSource.registration_no } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Addmission  : {this.state.dataSource.addmission_no } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  User Id : {this.state.dataSource.username} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Mobile No : {this.state.addressDetails.primary_mobile} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Father's Name: {this.state.father.name} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Father's Mobile No: {this.state.father.mobile} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Mother's Name: {this.state.mother.name} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Mother's Mobile No: {this.state.mother.mobile} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Date Of Birth: {this.state.dataSource.dob} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Category: {this.state.categories.name} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Religion : {this.state.religions.name } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            City  : {this.state.addressDetails.city  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            State   : {this.state.addressDetails.state  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Permanent Address  : {this.state.addressDetails.p_address   } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Permanent Pincode   : {this.state.addressDetails.p_pincode   } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Corespondance  Address : {this.state.addressDetails.c_address   } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Corespondance Pincode   : {this.state.addressDetails.c_pincode   } 
              </Text>
           </View>
            
        </View>
        
        </ScrollView>
      );
    }
  }
class DashboardScreen extends React.Component { 
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      modalVisible: false,
      userId:'',
      dataSource:[],      
     };     
   }
   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/details/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }    
    
    goToProfile = () =>
    {
      this.props.navigation.navigate('Profile');
    }
    goToAttendance = () =>
    {
      this.props.navigation.navigate('Attendance');
    }
    goToHomework = () =>
    {
      this.props.navigation.navigate('Homework');
    }
    goToEvent = () =>
    {
      this.props.navigation.navigate('Event');
    }
    goToFee = () =>
    {
      this.props.navigation.navigate('Fee');
    }
    goToClassTest = () =>
    {
      this.props.navigation.navigate('ClassTest');
    }
    goToLibrary = () =>
    {
      this.props.navigation.navigate('Library');
    }
    goToMessages = () =>
    {
      this.props.navigation.navigate('Message');
    }
    
    goToRemarks = () =>
    {
      this.props.navigation.navigate('Remarks');
    }
    goToUpload = () =>
    {
      this.props.navigation.navigate('Upload');
    }
    goToDownload = () =>
    {
      this.props.navigation.navigate('Download');
    }
    goToTimeTable = () =>
    {
      this.props.navigation.navigate('TimeTable');
    }
    goToCalendar = () =>
    {
      this.props.navigation.navigate('Calendar');
    }
    goToLeave = () =>
    {
      this.props.navigation.navigate('Leave');
    }
    goToExam = () =>
    {
      this.props.navigation.navigate('Exam');
    }
    goToQuotes = () =>
    {
      this.props.navigation.navigate('Quotes');
    }
  
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColor }) => (
      <Icon name="dashboard" size={20} color="#000" />
    ),
  };

  render() {
    return (
      <ScrollView>
      <View style={styles.container}> 
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToProfile }>
            
             <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/profile/color/50/ffffff'}} />
                <Text style={styles.info} onPress={() => this.goToProfile}>Profile</Text>
              </View>
           </TouchableOpacity>

            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToFee }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/rupee/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToAttendance}>Fee</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToAttendance }> 
              <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/bar-chart/dusk/50/ffffff'}}/>
                <Text style={styles.info} onPress={() => this.goToAttendance}>Attendance</Text>
              </View>
            </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToClassTest }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/rupee/exam/50/28a745'}}/>
                  <Text style={styles.info} onPress={() => this.goToClassTest}>Class Test</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToHomework }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/product/nolan/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToHomework}>Homework</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToEvent }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/event/dusk/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToEvent}>Event</Text>
                </View>
              </TouchableOpacity> 

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToLibrary }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/book/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToLibrary}>Library</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToMessages }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/chat/color/50/28a745'}}/>
                  <Text style={styles.info} onPress={() => this.goToMessages}>Messages</Text>
                </View>
              </TouchableOpacity>  
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToRemarks }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/talk-male/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToRemarks}>Remarks</Text>
                </View>
              </TouchableOpacity> 
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToUpload }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/upload/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToUpload}>Upload</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToDownload }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/download/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToDownload}>Download</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToTimeTable }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/timetable/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToTimeTable}>Time Table</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToCalendar }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/planner/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToCalendar}>Calendar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToLeave }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/leave/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToLeave}>Leave</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToExam }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/exam/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToExam}>Exam</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToQuotes }> 
                <View style={styles.menuBox}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/quote-left/color/50/ffffff'}}/>
                  <Text style={styles.info} onPress={() => this.goToQuotes}>Quotes</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View> 
      </View>
      </ScrollView>
      
    );
  }
  
}
class HomeworkScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[], 
      homWorks:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/student/homework/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            loading: false,
            homWorks: responseJson
          })
        }) 
        .catch(error=>console.log(error)) //to catch the errors if any
        });
    } 
  FlatListItemSeparator = () => {
    return (
      <View style={{
          height: .5,
          width:"100%",
         
    }}
    />
    );
  } 
  renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text style={styles.lightText}>{data.item.created_at} 
 {data.item.homework}</Text></TouchableOpacity>

  static navigationOptions = {
    drawerLabel: 'Homework',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="file-o" size={20} color="#000" />
    ),
  };

  

  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.created_at}</Moment> </Text>
      <Text style={styles.name}>
      
      {this.state.dataSource.homework}  
        </Text>
        
      </View>
      
     
    );
  }
}
class AttendanceScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch('http:/mailin.co.in/api/student/attendance/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Attendance',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="clock-o" size={20} color="#000" />
    ),
  };

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Today : {this.state.dataSource.todayAttendance} </Text>
        <Text style={styles.name}> Total Present : {this.state.dataSource.present}  , Total Absent : {this.state.dataSource.absent} </Text>
     
      </View>
      
     
    );
  }
}
class FeeScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],
      feeUptoSource:[],       
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/last-fee/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
       
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/student/fee-upto/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            loading: false,
            feeUptoSource: responseJson
          })
         
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        });
      
    } 
    
  static navigationOptions = {
    drawerLabel: 'Fee',
    drawerIcon: ({ tintColor }) => ( 
    <Icon name="inr" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Fee Upto Amount : {this.state.feeUptoSource.feeUpto}</Text>
        <Text style={styles.name}> Last Fee Amount : {this.state.dataSource.receipt_amount}</Text>
        <Text style={styles.name}> Last Receipt Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.receipt_date}</Moment> </Text>
        <Text style={styles.name}> Last Receipt No : {this.state.dataSource.receipt_no}</Text>
        
      <Text style={styles.name}>
      
      
      
        </Text>
         
      </View>
      
     
    );
  }
}
class ClassTestScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Class Test',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="file" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.created_at}</Moment> </Text>
      <Text style={styles.name}>
      
      {this.state.dataSource.homework} 
      
        </Text>
      </View>
      
     
    );
  }
}
class EventScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/event/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
  Start Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.start_date}</Moment>  {"\n"}
  End Date :<Moment element={Text} format="DD/MM/YYYY">{data.item.end_date}</Moment> {"\n"}
  Event Title : {data.item.event_name}
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Event',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
  }
class LibraryScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Library',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="book" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.created_at}</Moment> </Text>
      <Text style={styles.name}>
      
      {this.state.dataSource.homework} 
      
        </Text>
      </View>
      
     
    );
  }
}
class MessageScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Message',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="comments" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        
      <Text style={styles.name}>
      
      'message'
      
        </Text>
      </View>
      
     
    );
  }
}
class RemarksScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
Teacher: {data.item.admin.first_name} {"\n"}
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
 
  Remarks: {data.item.remark}
   
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Remarks',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class UploadScreen extends React.Component { 
  static navigationOptions = {
    drawerLabel: 'Upload',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="upload" size={20} color="#000" />
    ),
  }; 
  constructor(props) { 
    super(props);
    this.state = { text: 'Useless Placeholder' };
   state = { 
     name: '',
     nick_name:'', 
     father_name:'', 
     mother_name:'', 
     father_mobile:'', 
     mother_mobile:'', 
     dob:'',
     p_address:'', 
     c_address:'', 
    }
   this.state = { 
     dataSource:[],      
      }; 
    this.state = {
      loading: true,
      userId:'',
      ImageSource: null, 
      data: null,  
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      ) 
     
    } 
 
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
 
        this.setState({
 
          ImageSource: source,
          data: response.data
 
        });
        
      }
    });
  }
 
  uploadImageToServer = () => { 
    RNFetchBlob.fetch('POST', ROOT_URL+'/api/student/image-upload/'+this.state.userId, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
     
      ]).then((resp) => {
 
        var tempMSG = resp.data;
 
        tempMSG = tempMSG.replace(/^"|"$/g, '');
 
        Alert.alert('Upload successfully');
 
      }).catch((err) => {
        Alert.alert('Image Not Upload')
      })
 
  }

  bubmitToServer = () => {
   
    RNFetchBlob.fetch('POST', 'http://eageskool.com/api/student/request-update/1', {
      Authorization: "Bearer access-token",
        'Content-Type': 'multipart/form-data',
      
      
    }, [
        { name: 'name',data: this.state.name},
        { name: 'nick_name',data: this.state.nick_name},
        { name: 'father_name',data: this.state.father_name},
        { name: 'mother_name',data: this.state.mother_name},
        { name: 'father_mobile',data: this.state.father_mobile},
        { name: 'mother_mobile',data: this.state.mother_mobile},
        { name: 'date_of_birth',data: this.state.dob},
        { name: 'p_address',data: this.state.p_address},
        { name: 'c_address',data: this.state.c_address},
     
      ]).then((resp) => { 
        Alert.alert('Upload successfully');
 
      }).catch((err) => {
        Alert.alert('Image Not Upload')
      })
    
    // alert(name)
  }
 
  render() {
    return (
      <ScrollView> 
      <View style={stylesImagePiker.container}>
 
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
          <View style={stylesImagePiker.ImageContainer}>
 
            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={stylesImagePiker.ImageContainer} source={this.state.ImageSource} />
            }
 
          </View>
 
        </TouchableOpacity> 
 
        <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={stylesImagePiker.button} >
 
          <Text style={stylesImagePiker.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
        </TouchableOpacity>
         
        
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={stylesImagePiker.TextLebelStyle}>First Name </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({name:text})}
              />
            <Text style={stylesImagePiker.TextLebelStyle}>Nick Name </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)'  
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="text" 
              onChangeText={text=> this.setState({nick_name:text})}
              />
            <Text style={stylesImagePiker.TextLebelStyle}> Father's Name </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({father_name:text})}
              />
              <Text style={stylesImagePiker.TextLebelStyle}> Mother's Name </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({mother_name:text})}
              />
              <Text style={stylesImagePiker.TextLebelStyle}> Father's Mobile </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({username:text})}
              />
              <Text style={stylesImagePiker.TextLebelStyle}> Mother's Mobile </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({mother_mobile:text})}
              /> 
              <Text style={stylesImagePiker.TextLebelStyle}> Date Of Birth </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({dob:text})}
              /> 
            <Text style={stylesImagePiker.TextLebelStyle}>Parmanent Address </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({p_address:text})}
              /> 
            <Text style={stylesImagePiker.TextLebelStyle}>Corespondance Address </Text> 
            <TextInput style={stylesImagePiker.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              selectionColor="#fff"
              keyboardType="text"
              onChangeText={text=> this.setState({c_address:text})}
              /> 
              
            <TouchableOpacity onPress={this.bubmitToServer} activeOpacity={0.6} style={stylesImagePiker.submitButton} > 
              <Text style={stylesImagePiker.TextStyle}> Submit </Text> 
            </TouchableOpacity>

          </View> 
       </View> 
       
      </View> 
      </ScrollView> 
    );
  }
}
class DownloadScreen extends React.Component { 
  static navigationOptions = {
    drawerLabel: 'Download',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="download" size={20} color="#000" />
    ),
  }; 
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      loading: false,
    };
  }

  actualDownload = (fileUrl) => { 
    this.setState({
      progress: 0,
      loading: true,
      userId:'',
      dataSource:[], 
    });
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DownloadDir + "/path-to-file.png",
      fileCache: true
       })
      .fetch("GET",fileUrl,{
          //some headers ..
        }
      )
      .progress((received, total) => {
        console.log("progress", received / total);
        this.setState({ progress: received / total });
      })
      .then(res => {
        this.setState({
          progress: 100,
          loading: false
        });
        ToastAndroid.showWithGravity(
          "Your file has been downloaded to downloads folder!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
    <Text style={styles.name}>
    Download 
    </Text>
    
  </Text>  

  static navigationOptions = {
    drawerLabel: 'Time Table',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
      <Button onPress={() => this.actualDownload("http://www.africau.edu/images/default/sample.pdf")} title="Download" />
        {this.state.loading ? (
          <ProgressBarAndroid
            styleAttr="Large"
            indeterminate={false}
            progress={this.state.progress}
          />
        ) : null}
     </View>
     
     )}
   
}

 
class TimeTableScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
    <Text style={styles.name}>
    Teacher: {data.item.admin.first_name} {"\n"}
      Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
    
      Remarks: {data.item.remark}
      
    </Text>
  </Text>  

  static navigationOptions = {
    drawerLabel: 'Time Table',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class CalendarScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
Teacher: {data.item.admin.first_name} {"\n"}
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
 
  Remarks: {data.item.remark}
   
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Calendar',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class LeaveScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
  <Text style={styles.name}>
  Teacher: {data.item.admin.first_name} {"\n"}
    Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
  
    Remarks: {data.item.remark}
    
  </Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Leave',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="sign-out" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class ExamScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
  <Text style={styles.name}>
  Teacher: {data.item.admin.first_name} {"\n"}
    Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
  
    Remarks: {data.item.remark}
    
  </Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Exam',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="file" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class QuotesScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/quotes/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.dates}>
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.date}</Moment>  {"\n"} 
</Text>
<Text style={styles.quotes}>"{data.item.discription}"</Text>
</Text>  

  static navigationOptions = {
    drawerLabel: 'Quotes',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="question-circle" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}


 

const MyDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
  },
Profile: {
  screen: StudentProfile,
}, 
Homework: {
  screen: HomeworkScreen,
},  
Fee: {
  screen: FeeScreen,
},
Attendance: {
  screen: AttendanceScreen,
},
ClassTest: {
  screen: ClassTestScreen,
},
Event: {
  screen: EventScreen,
},
Library: {
  screen: LibraryScreen,
},
Message: {
  screen: MessageScreen,
},
Remarks: {
  screen: RemarksScreen,
},
Upload: {
  screen: UploadScreen,
},
Download: {
  screen: DownloadScreen,
},
TimeTable: {
  screen: TimeTableScreen,
},
Calendar: {
  screen: CalendarScreen,
},
Leave: {
  screen: LeaveScreen,
},
Exam: {
  screen: ExamScreen,
},
Quotes: {
  screen: QuotesScreen,
},
  
}); 

const Stackcontainer =createStackNavigator({
  
  defaulthome:MyDrawerNavigator,
   
},{  
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions:({navigation})=> {
      return{
        title: ' ',
        /* No more header config here! */
      headerLeft:  <Icon name="bars" style={{ marginLeft: 7 }} size={30} color="#FFF"  onPress={() => { navigation.toggleDrawer() }} />,
      headerRight: <Icon name="home" style={{ marginRight: 7 }}  size={30} color="#FFF"  onPress={() => { navigation.navigate('Dashboard') }} />,
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }
       
    },
    
})

const AppContainer = createAppContainer(Stackcontainer);

export default class App extends React.Component {
  static navigationOptions={
    header :null
  }
  render() {
    return <AppContainer />;
  }
}
const stylesImagePiker = StyleSheet.create({
  container : {
  	backgroundColor:'#455a64',
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,

  },

submitButton:{
    width:390,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 2,
    fontSize:16,
},
  inputBox: {
     
    backgroundColor:'rgba(255, 255,255,0.2)',
    
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10, 
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
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   backgroundColor: '#FFF8E1',
  //   paddingTop: 20
  // },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

  },

  TextInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20,
  },

  button: {

    width: '80%',
    backgroundColor: '#1c313a',
    borderRadius: 7,
    marginTop: 20
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  },
  TextLebelStyle: {
    color: '#fff',  
    fontSize:20,
    textAlign: 'left',
  
  }

});
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  ImageContainer: {
    alignItems:"center"
  },
  textStyle: {
    fontWeight:"bold",
    fontSize:30,
    textAlign:"center",
    color:"red",
    marginTop:10
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "70%",
    height: 280,
    marginTop:50,
  },
  button: {
    width: "80%",
    marginTop:20,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  previewImage: {
      width: "100%",
      height: "100%"
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  quotes:{
    fontSize:28,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  dates:{
    fontSize:15,
    color:"#FFFFFF",
    fontWeight:'200', 
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:20,
  },
  textInfo:{
    fontSize:14,
    marginTop:10,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#eaeaea",
    width:115,
    height:105,
    alignItems: 'center',
    justifyContent: 'center',
    margin:7,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  },
  list:{
    paddingVertical: 2,
    margin: 2,
    backgroundColor: "#5d5b5b",
    fontSize:22, 
    padding:5,
    fontWeight:'600',
    
   }
   
});

 