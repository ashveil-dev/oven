import getPopularWorksApi from "@apis/works";
import { BEIGE, BLACK, LIGHTBROWN, WHITE } from "@constants/Colors";
import globalState from "@states";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PopularMovie() {
    const router = useRouter();
    const [, setClickedWork] = useAtom(globalState.clickedWork)
    const [popularWorks, setPopularWorks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function firstLoad() {
            try {
                setPopularWorks(await getPopularWorksApi());
            } catch(e) {
                setErrorMessage(typeof e === "string" ? e : "알 수 없는 오류가 발생했습니다.");
            }
        }

        firstLoad();
    }, [])

    const onPress = (workId : string) => () => {
        setClickedWork(workId);
        router.navigate("/main/DetailScreen");
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} horizontal={true}>
            {popularWorks.map(({ poster, title, workId }) => (
                    <TouchableOpacity
                        key={workId}
                        style={styles.movie}
                        onPress={onPress(workId)}
                    >
                        {poster ? <Image style={styles.poster} src={poster} /> : <View style={styles.block} />}
                        <Text style={styles.title}>{title}</Text>
                    </TouchableOpacity>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        marginTop: 20,
        borderRadius: 20
    },
    poster: {
        width: 110,
        height: 150,
        backgroundColor: WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    block: {
        width: 100,
        height: 150,
        borderRadius: 20,
        backgroundColor: BEIGE,
    },
    movie: {
        width: 110,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: LIGHTBROWN,
        alignItems: "center"
    },
    title : {
        width : 90,
        height : 30,
        marginTop : 7,
        fontSize : 13,
        fontWeight : 700,
        fontFamily : "kotra",
        textAlign : "center",
        color : BLACK,
        alignItems : "center",
        justifyContent : "flex-start",
    }
})