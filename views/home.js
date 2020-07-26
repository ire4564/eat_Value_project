/************************************************
 * Class : 홈 화면 
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
                <Text>Home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //header 부분을 침범해야하는 경우 추가할 style
    up_container: {
        position: 'absolute',
        top: -10,
    },

    //주소 설정 패널 style
    location_container: {

    }
  });

export default Home;