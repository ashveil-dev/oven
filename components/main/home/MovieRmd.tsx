import { LIGHTBROWN, WHITE } from '@constants/Colors';
import globalState from "@states";
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {
    recommendationWorks: {
        poster: string,
        title: string,
        workId: string
    }[]
}

export default function MovieRmd({ recommendationWorks }: IProps) {
    const router = useRouter();
    const [, setWorkId] = useAtom(globalState.clickedWork)

    const onPress = (workId : string) => () => {
        setWorkId(workId)
        router.navigate('/main/DetailScreen')
    }

    return (
        <View style={styles.container}>
            {
                recommendationWorks.map(({ poster, title, workId }) => (
                    <TouchableOpacity
                        style={styles.movie}
                        key={workId}
                        onPress={onPress(workId)}
                    >
                        <Image style={styles.poster} src={poster} />
                        <Text style={styles.title}>{title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 50,
        minHeight: 200,
        flexWrap: "wrap",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-start",
    },
    movie: {
        margin: 5,
        width: 100,
        height: 180,
        borderRadius: 20,
        backgroundColor: LIGHTBROWN,
        alignItems: "center"
    },
    poster: {
        width: 100,
        height: 150,
        backgroundColor: WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        width: 90,
        height: 20,
        fontSize: 13,
        marginTop: 7,
        fontWeight: 700,
        textAlign: "center",
        fontFamily: "kotra",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    }
})
