import { default as MovieInfoBox, default as MovieInfoText } from "@components/main/detail/MovieInfoBox";
import RatingModal from "@components/main/detail/RatingModal";
import { BEIGE } from "@constants/Colors";
import globalState from "@states";
import { useAtom } from "jotai";
import React from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailScreen = () => {
    const [isModalOpened] = useAtom(globalState.isModal);
    const [detailMovie] = useAtom(globalState.detailMovie);
    const [, setClickedMovie] = useAtom(globalState.clickedWork);

    return (
        <SafeAreaView>
            <ScrollView>
                {isModalOpened && <RatingModal />}
                {detailMovie && <MovieInfoBox />}
                {/* <OttList /> */}
                <MovieInfoText />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: BEIGE
    },
    scroll: {
        width: "100%"
    }
})

export default DetailScreen;