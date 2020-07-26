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
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Navigation extends Component {
    render(){
        return(
            <TouchableOpacity>
               <FontAwesome name="navicon" size={24} color="#222" />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  });

export default Navigation;