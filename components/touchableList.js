/************************************************
 * Class : 클릭 가능한 세부 주문 목록 요소 컴포넌트
 * 
 * props :
 *  - text : 버튼에 표기할 문자
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


class TouchableText extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: styles.container,
            style_text: styles.text,
        }
    }

    render(){
        return(
            <TouchableOpacity
            style={this.state.style}
            onPress={function(){
                if(this.props.event!==undefined){
                    this.props.event;
                }
            }.bind(this)}
            >
                <Text style={this.state.style_text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#999',
        borderRadius: 25,
        marginRight: 6,
    },
    text: {
        width: 100,
        height: 25,
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
  });

export default TouchableText;