/************************************************
 * Class : 전체 대기중인 주문 목록 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  - 
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

const MENU_CATEGORY = ['치킨', '떡볶이', '피자', '햄버거', '일식', '중식', '한식', '양식', '도시락', '고기', '야식', '디저트'];

class WaitingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            filter: {
                category:[],
                search: '',
                left_order: -1,
            },    
            db_user: this.props.db_user,
            db_order: [],
            db_store: [],

        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                <Text>WaitingList</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default WaitingList;