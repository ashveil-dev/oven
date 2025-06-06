import { ORANGE, WHITE } from '@constants/Colors';
import * as Linking from 'expo-linking';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ott = [
    {
        id: 1,
        name: '넷플릭스',
        src: require('../../../img/Netflix.png'),
        url: 'https://www.netflix.com/kr/',
    },
    {
        id: 2,
        name: '티빙',
        src: require('../../../img/Tving.png'),
        url: 'https://www.tving.com/onboarding',
    },
    {
        id: 3,
        name: '웨이브',
        src: require('../../../img/Wavve.png'),
        url: 'https://www.wwave.com/',
    },
    {
        id: 4,
        name: '디즈니플러스',
        src: require('../../../img/DisneyPlus.jpeg'),
        url: 'https://www.disneyplus.com/',
    },
    {
        id: 5,
        name: '쿠팡플레이',
        src: require('../../../img/CoupangPlay.png'),
        url: 'https://www.coupangplay.com/',
    },
    {
        id: 6,
        name: '왓챠',
        src: require('../../../img/Watcha.png'),
        url: 'https://www.watcha.com/',
    },
    {
        id: 7,
        name: '애플티비',
        src: require('../../../img/AppleTv.png'),
        url: 'https://www.tv.apple.com/',
    },
    {
        id: 8,
        name: '애플티비',
        src: require('../../../img/AppleTv.png'),
        url: 'https://www.tv.apple.com/',
    },
    {
        id: 9,
        name: '애플티비',
        src: require('../../../img/AppleTv.png'),
        url: 'https://www.tv.apple.com/',
    },
    {
        id: 10,
        name: '애플티비',
        src: require('../../../img/AppleTv.png'),
        url: 'https://www.tv.apple.com/',
    },
];

interface IProps {
    recommendOtt: number
}

export default function OttRmd({ recommendOtt }: IProps) {
    const onHandleLink = (url: string) => () => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapper} onPress={onHandleLink(ott[recommendOtt - 1].url)}>
                <Image style={styles.logo} source={ott[recommendOtt - 1].src} />
                <Text style={styles.text}>
                    {ott[recommendOtt - 1].name} 바로가기{' '}
                    <Icon name="open-in-new" size={20} />
                </Text >
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 20,
        width: "100%",
        height: 100,
        borderRadius: 20,
        backgroundColor: WHITE
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        margin: 7,
        fontSize: 24,
        fontWeight: 700,
        color: ORANGE,
        fontStyle: "italic",
        fontFamily: "kotra",
        textDecorationLine: "underline",
        transform: [{ skewX: '-10deg' }]
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 20
    },
})