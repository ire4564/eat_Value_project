/************************************************
 * Class : 선택 모드에 따른 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import posed from 'react-native-pose';

const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];

const Page = posed.View({
    open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { 
              type: 'spring', 
              stiffness: 500, 
              damping: 100
            },
        }
    },
    closed: {
        y: hp('5%'), 
        opacity: 0
    },
});



class TalkRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            data: this.props.data,
            user : this.props.db_user,
        }
    }

    componentDidMount() {
    this.setState({event: 'open'});
    }
    
    render(){
        return(
            <Page style={[this.props.style, ]} pose={this.state.event}>
                <ScrollView style={styles.main_scroll}>
                    <Text>sdfsdf</Text>
                </ScrollView>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //메인 스크롤 style
    main_scroll: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },
  });

export default TalkRoom;