import axios from "@apis/instance";

export async function getRecommendationWorksApi() {
    try {
        const response = await axios.get("/recommendation", {
            params: {
                type : "work"
            }
        });

        return response.data;
    } catch(e : any) {
        return e?.errorMessage ?? "알 수 없는 오류가 발생했습니다.";
    }
}

export async function getRecommendationOttApi() {
    try {
        const response = await axios.get("/recommendation", {
            params: {
                type : "ott"
            }
        });

        return response.data;
    } catch(e : any) {
        return e?.errorMessage ?? "알 수 없는 오류가 발생했습니다.";
    }
}