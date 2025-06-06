import { getRecommendationOttApi, getRecommendationWorksApi } from "@apis/recommendation";
import MainLayout from "@components/layout/MainLayout";
import MovieRmd from "@components/main/home/MovieRmd";
import OttRmd from "@components/main/home/OttRmd";
import PopularMovie from '@components/main/home/PopularMovie';
import { BROWN, ORANGE } from '@constants/Colors';
import globalState from '@states';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const [nickname] = useAtom(globalState.nickname);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [recommendationOtt, setRecommendationOtt] = useState(0);
    const [recommendationWorks, setRecommendationWorks] = useState<{
        poster: string,
        title: string,
        workId: string
    }[]>([]);

    useEffect(() => {
        async function firstLoad() {
            try {
                setRecommendationOtt(await getRecommendationWorksApi());
                setRecommendationWorks(await getRecommendationOttApi())
            } catch (e) {
                if (typeof e === "string") {
                    setErrorMessage(e);
                } else {
                    setErrorMessage("알 수 없는 오류가 발생했습니다.")
                }
            }
        }

        firstLoad();
    }, [])

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setRecommendationWorks(await getRecommendationWorksApi());
        setIsRefreshing(false);
    };

    return (
        <MainLayout>
            <ScrollView
                style={styles.scroller}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            >
                <View style={styles.centralizer}>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>이번달 나에게 맞는 OTT</Text>
                        <OttRmd recommendOtt={recommendationOtt} />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>실시간 인기작</Text>
                        <PopularMovie />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>
                            <Text style={styles.user}>{nickname}</Text> 님 맞춤 추천작
                        </Text>
                        <MovieRmd recommendationWorks={recommendationWorks} />
                    </View>
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    centralizer: {
        alignItems: "center"
    },
    scroller: {
        width: "100%",
    },
    bottom: {
        flexDirection: "column",
        marginTop: 20,
        width: "80%"
    },
    title: {
        fontSize: 25,
        fontWeight: 700,
        fontFamily: "chab",
        color: BROWN,
    },
    user: {
        fontSize: 30,
        color: ORANGE
    }
})