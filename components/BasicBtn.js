import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';


//컴포넌트 설정: 비슷한 버튼 컴포넌트로 빼기
class BasicBtn extends Component {
    render(){
        return(
            <View>
                <View style={styles.BasicBtn}>
                    <Text style={styles.BasicFont}>Test</Text>
                </View>
            </View>
        );
    }
}

//스타일 시트 설정
const styles = StyleSheet.create({
 //기본 버튼
    BasicBtn: {
        borderColor: '#40E0D0',
        backgroundColor: '#40E0D0',
        borderWidth: 2,
        width: wp('92%'),
        height: wp('10%'),
        borderRadius: 13,
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 18,
    },
    //기본 폰트
    BasicFont: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center",
        fontSize: 18,
        marginTop: -22,
        marginLeft: 20
    },
});

export default BasicBtn;