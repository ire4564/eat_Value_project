/************************************************
 * Class : 위치 안내 컴포넌트
 * 
 * props :
 *
 * 
 * function :
 * - select_btn() : 혼자 먹기, 같이 먹기 버튼 컴포넌트 넣기
 * - put_box(): 박스 자체 컴포넌트
 *  
 ************************************************/
import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { EvilIcons } from '@expo/vector-icons';
import  Btn  from '../components/BasicBtn';
const ICON_COLOR = '#40E0D0';

class locationBox extends Component {
    //혼자 먹기 같이 먹기 선택하기 버튼
    select_btn() {
        var btn_1 = 
        <View>
            <Btn text="혼자 먹을래요"></Btn>
        </View>;

        var btn_2 =
        <View>
            <Btn text="같이 먹을래요"></Btn>
        </View>;

        return [btn_1, btn_2];
    }
    //박스 자체 컴포넌트
    putBox() {
        var Box = 
             <View style={styles.orderlist}>
                    <View style={styles.top_container_style}>
                        {/*위치 안내 타이틀*/}
                        <Text style={styles.title}>위치 안내
                        <Text style={{ fontWeight: 'normal', fontSize: 12 }}>  지도를 클릭하여 자세히 볼 수 있습니다.</Text>
                        </Text>
                    </View>
                       
                    {/*지도 넣기*/}
                    <View style={styles.mapSection}>
                    </View>

                    {/*위치 안내, 버튼 넣기*/}
                    <View style={{ alignContent: "flex-end", marginTop: -145 }}>
                        <View style={styles.up_container} />
                        <View style={{ alignItems: 'center' }}>
                            <EvilIcons
                                name="location"
                                size={25}
                                color={ICON_COLOR}
                                style={styles.icon} />
                            <Text style={styles.locationFont}>대전광역시 유성구 온천2동{"\n"}궁동로 18번길 24</Text>
                        </View>
                    
                    {/*혼자 먹기, 같이 먹기 선택하기 버튼*/}
                    {this.select_btn()}
                    </View>

                </View>
        return Box;
    }

    render(){
        return(
            <View>
              {this.putBox()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: -15,
        marginTop: 15
    },
    //지도 들어갈 곳
    mapSection: {
        width: wp('40%'),
        height: wp('35%'),
        backgroundColor: '#eeeeee',
        marginTop: 10,
        marginLeft: 10
    },
    locationFont: {
        fontWeight: "normal",
        fontSize: 15,
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: -25,
        marginBottom: 5
    },
    //위치 창
    checkLocation: {
        width: wp('90%'),
        height: wp('48%'),
        marginTop: wp('5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    //주문 가게 이름 표시
    title: {
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    //스크롤 뷰
    scrollView: {
        marginHorizontal: 7,
    },
    //주문 가게 이름 표시 바탕
    top_container_style: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    //전체적인 틀
    orderlist: {
        width: wp('90%'),
        height: wp('50%'),
        marginTop: wp('4%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
  });

export default locationBox;