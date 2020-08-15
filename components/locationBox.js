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
import ReturnProps from '../components/return_props';
import MapView from 'react-native-maps';
const ICON_COLOR = '#40E0D0';
var b1 = false;
var b2 = false;

class locationBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn1_check: false,
            btn2_check: false,
            final_check: 1 //default
        };
    }
    //눌렀을 때 (btn1: 혼자 먹어요)
    _clickBtn1 = () => {
        if(this.state.btn2_check == true){
            //이미 버튼 2가 눌려있을 때
            this.setState({
                btn1_check: true,
                btn2_check: false
            });
        } 
        else if(this.state.btn1_check == false){
            //버튼이 눌려있지 않을 때
            this.setState({
                btn1_check: true,
            });
        } else { 
            //버튼이 눌려있을 때
            this.setState({
                btn1_check: false,
            });
        }
        //혼자 먹을래요 버튼 눌림
        this.setState({
            final_check: 1
        });
        return 1;
    }

    //눌렀을 때 (btn2: 같이 먹어요)
    _clickBtn2 = () => {
        if(this.state.btn1_check == true){
            //이미 버튼 1가 눌려있을 때
            this.setState({
                btn1_check: false,
                btn2_check: true
            });
        }
        else if(this.state.btn2_check == false){
            //버튼이 눌려있지 않을 때
            this.setState({
                btn1_check: false,
                btn2_check: true,
            });

        } else {
            //버튼이 눌려있을 때
            this.setState({
                btn2_check: false,
            });
        }
        //같이 먹을래요 버튼 눌림
        this.setState({
            final_check: 2
        });
        return 2;
    }

    //혼자 먹기 같이 먹기 선택하기 버튼
    select_btn() {
        var btn_1 = 
            <Btn key={"btn1"} text="혼자 먹을래요" clicks={this._clickBtn1} pushBtn={this.state.btn1_check}></Btn>;

        var btn_2 =
            <Btn key={"btn2"} text="같이 먹을래요" clicks={this._clickBtn2} pushBtn={this.state.btn2_check}></Btn>;

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
                        <MapView style={{ flex: 1 }} 
                        initialRegion={{ 
                            latitude: 37.78825, 
                            longitude: -122.4324, 
                            latitudeDelta: 0.0922, 
                            longitudeDelta: 0.0421 
                            }} 
                            > 
                            <MapView.Marker 
                                coordinate={{ 
                                    latitude: 37.78825, 
                                    longitude: -122.4324, 
                                    }} 
                                    /> 
                        </MapView>
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
                            <Text style={styles.locationFont}>{this.props.mylocation}</Text>
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
              <ReturnProps chooseBtn={this.state.final_check}></ReturnProps>
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
        marginRight: 12,
        marginTop: -22,
        marginBottom: 5,
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