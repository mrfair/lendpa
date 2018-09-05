import React, {Component} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Header, Content, Container, Input, Item, Button, Icon } from 'native-base';
import Api from '../functions/Api';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username : null,
      password : null
    }
  }

  _login = () => {
    AsyncStorage.setItem( 'login', JSON.stringify({username : this.state.username, password : this.state.password}) );

    AsyncStorage.getItem( 'login', ( err, val ) => {
      try {
        var v = JSON.parse( val );
        
        Api.get('/memberLogin', v, (o)=>{
          console.error( o );
        })
      } catch (e) {
          return false;
      }
    })
    
  }

  render() {
    return (
      <Container>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 30, alignSelf: 'center' }}>WEBWEEB</Text>
            </View>
            <View style={{ width: 300 }}>
              <Item regular>
                <Input placeholder='อีเมล' 
                  onChangeText={ ( text )=> { 
                    this.setState({ username: text })
                  }}
                />
              </Item>
            </View>
            <View style={{ width: 300 }}>
              <Item style={{ marginTop: 10 }} regular>
                <Input 
                  secureTextEntry={true} 
                  onChangeText={ ( text )=> { 
                    this.setState({ password: text })
                  }}
                  onSubmitEditing={ () => this._login() }
                placeholder='รหัสผ่าน' />
              </Item>
            </View>
            <View style={{ width: 300, marginTop: 10 }}>
              <Button block
                onPress={ ()=> this._login() }
              >
                <Text>เข้าสู่ระบบ</Text>
              </Button>
            </View>
          </View>
      </Container>
    );
  }
}
