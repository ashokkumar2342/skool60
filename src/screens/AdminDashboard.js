import React, { Component } from 'react';
import Moment from 'react-moment';
import {TextInput,Picker,Text, View ,Button,StyleSheet,Image,TouchableOpacity,AsyncStorage,ScrollView,FlatList,ActivityIndicator, } from 'react-native';
import { createBottomTabNavigator, createAppContainer,createDrawerNavigator,createStackNavigator,StackNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Toolbar } from 'react-native-material-ui';
import { black } from 'ansi-colors';
export const ROOT_URL = 'http://mailin.co.in';
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
      dataSource:[],
      classes:[],
      sectionTypes:[],
      
     };
     
   }
     componentDidMount(){
      AsyncStorage.getItem('userId').then((value) => 
       this.setState({ 'userId': value })       
       )
       AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/admin/details/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson, 
          
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
       }); 
      }  
   
      _signOutAsync = async () => {
        await AsyncStorage.clear();
         
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
                  source={{uri: ROOT_URL+'/api/admin/image/'+this.state.userId}}/>
                <Text style={styles.name}>
                {this.state.dataSource.first_name} {this.state.dataSource.last_name}
                </Text>
                <Button title="sign out" onPress={this._signOutAsync} />    
            </View>
          </View>
           
           <View style={styles.list}>
            <Text style={styles.name}>
                  Email : {this.state.dataSource.email} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Mobile No : {this.state.dataSource.mobile} 
              </Text>
           </View>
            
            
           <View style={styles.list}>
            <Text style={styles.name}>
                  Date Of Birth: {this.state.dataSource.dob} 
              </Text>
           </View>
         
            
           <View style={styles.list}>
            <Text style={styles.name}>
            City  : {this.state.dataSource.city  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            State   : {this.state.dataSource.state  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Pincode   : {this.state.dataSource.pincode   } 
              </Text>
           </View>
            
        </View>
        
        </ScrollView>
      );
    }
  }
class AdminDashboardScreen extends React.Component { 
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
    <Toolbar
    leftElement="menu"
    centerElement="Searchable"
    searchable={{
      autoFocus: true,
      placeholder: 'Search',
    }}
    rightElement={{
        menu: {
            icon: "more-vert",
            labels: ["item 1", "item 2"]
        }
    }}
    onRightElementPress={ (label) => { console.log(label) }}
  />
    return (
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
      
      <View > 
        <TextInput  style=
        {{
         borderColor: 'gray', borderWidth: 1,
        }}       
        editable = {true}
        maxLength = {40}
        multiline = {true}
        numberOfLines = {8}
        placeholder="Enter Homework"
        onChangeText={text=> this.setState({username:text})}
        value={this.state.text}
      />
     <TouchableOpacity style={styles.loginButtonSection} > 
      <Button onPress={() => doLoginStuff()} 
        style={styles.loginButton}
        title="Save" /> 
      </TouchableOpacity> 
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
    drawerLabel: 'Upload',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="upload" size={20} color="#000" />
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
    <View style={styles.list}>
      <Text style={styles.name}>
         Document Type 
        </Text> 
       <Picker  itemStyle={{ backgroundColor: "white", color: "white", fontFamily:"Ebrima", fontSize:17 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item color="black"  label="Java" value="java" />
          <Picker.Item color="black" label="JavaScript" value="js" />
        </Picker>
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
    screen: AdminDashboardScreen,
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


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  loginTextSection: {
    width: '100%',
    height: '30%',
 },

 loginButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
 },

 inputText: {
    marginLeft: '20%',
    width: '60%'
 },

 loginButton: {
   backgroundColor: 'grey',
   color: 'white'
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
      paddingVertical: 13,
      alignItems: 'center'
      
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
  dates:{
    fontSize:15,
    color:"#FFFFFF",
    fontWeight:'200', 
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
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
    width:120,
    height:110,
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

 