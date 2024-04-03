import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomIcon from './CustomIcon';
const Header = () => {
    return (
           <View style={styles.container}>
            <CustomIcon name='menu' size={25}/>
            <View>
                <Text style={styles.text}>HMTea</Text>
            </View>
            <View>
                <Image style={styles.avt} source={require('../assets/app_images/avt_1.png')}/>
            </View>
                
           </View>
    )
          
}

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 55,
        paddingHorizontal:15,
        backgroundColor:'white'

        // backgroundColor:'lightgray'
    },
    text:{
        color: '#2C683F',
        fontSize: 40,
        fontFamily: 'Lobster-Regular',
        alignItems:'center'

    },
    img:{
        top:8,
        right: 10,      
    },
    avt:{
        width:50,
        height:50,
        
    }
})
export default Header;