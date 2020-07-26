/************************************************
 * Class : 상단 우측 네비게이션 버튼 패널
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Navigation extends Component {
    headerText(){
        if(this.props.mode==='home'){
            return "가치 value 먹자";
          }else if(this.props.mode==='order-list'){
            return "My Orders";
          }else if(this.props.mode==='now-order'){
            return "Now Order";
          }else if(this.props.mode==='talk'){
            return "Talk";
          }else if(this.props.mode==='user'){
            return "My Page";
          }
      }

    render(){
        return(
            <View style={styles.container}>
                <Text
                children={this.headerText()}
                style={styles.header}
                ></Text>
                <TouchableOpacity style={styles.header_button}>
                    <FontAwesome name="navicon" size={24} color="#222" />    
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    //헤더 컨테이너 style
    container: {
        flex: 1.6,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    //상단 헤더부분 style
    header: {
        fontSize: 20,
        marginTop: 25,
    },

    //상단 헤더 메뉴 버튼
    header_button: {
        position: 'absolute',
        top: 25,
        left: 20,
    },
  });

export default Navigation;