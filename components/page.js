import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class Page extends Component {
    render(){
        return(
            <View style={this.props.style}>
                <Text>test</Text>
            </View>
        );
    }
}

export default Page;