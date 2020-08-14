/************************************************
 * Class : pros 반환을 위한 컴포넌트(화면 표기 x)
 * 
 * props :
 *
 * 
 * function :
 *  
 ************************************************/
import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

class returnProps extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //값 리턴하기
    returnThis() {
        if(this.props.chooseBtn == 1) {
            //alert("true");
            return true;
        }
        else {
            //alert("false");
            return false;
        }
    }

    render(){
        return(
            <View>
                {this.returnThis()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default returnProps;