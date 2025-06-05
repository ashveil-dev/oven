import { putRatingApi } from "@apis/work";
import { BEIGE, BROWN } from "@constants/Colors";
import { FontAwesome } from '@expo/vector-icons';
import globalState from "@states";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function RatingModal() {
    const router = useRouter();
    const [rating, setRating] = useAtom(globalState.rating);
    const [isStared, setIsStared] = useAtom(globalState.isStared);
    const [clickedMovie, setClickedMovie] = useAtom(globalState.clickedWork);
    const [isModalOpened, setIsModalOpened] = useAtom(globalState.isModal);
    const [token, setToken] = useState('');
    const [selectedStars, setSelectedStars] = useState(rating);

    const handleRatingChange = (rating: number) => () => {
        setRating(rating);
    };

    const renderStars = (totalStars: number) => {
        return new Array(totalStars).map(i => (
            <TouchableOpacity key={i} onPress={handleRatingChange(i)}>
                {i <= rating ?
                    <FontAwesome style={styles.star} name="star" size={34} color="black" />
                    : <FontAwesome style={styles.star} name="star-o" size={34} color="black" />
                }
            </TouchableOpacity>
        ))
    }

    const handleSubmitButton = async () => {
        try {
            const isSuccess = await putRatingApi(clickedMovie, rating)
            setIsModalOpened(false);
        } catch (e) {
            if (typeof e === "string") {
                Alert.alert(e);
            } else {
                Alert.alert("알 수 없는 오류가 발생했습니다.")
            }
        }
    }


    return (
        <Modal style={styles.container} animationType="fade">
            <SafeAreaView style={styles.background}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>평점 등록</Text>
                    <View style={styles.stars}>{renderStars(5)}</View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setIsModalOpened(false)}>
                            <Text style={styles.close}>닫기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmitButton}>
                            <Text style={styles.submit}>등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    background: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BEIGE,
    },
    wrapper: {
        width: "80%",
        height: 200,
        borderRadius: 20,
        alignItems: "center",
        position: "relative",
        backgroundColor: 'white',
        margin: 20,
        padding: 35,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 700,
        fontFamily: "chab",
        color: BROWN,
    },
    stars: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    star: {
        margin: 7,
        color: BROWN,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        height: "20%",
        position: "absolute",
        bottom: 0,
    },
    close: {
        fontSize: 20,
        fontWeight: 700,
        color: BROWN,
        fontFamily: "kotra"
    },
    submit: {
        fontSize: 20,
        color: "#ae0c18",
        fontWeight: 700,
        fontFamily: "kotra"
    }
})
