import axios from "@apis/instance";

export default async function getPopularWorksApi() {
    try {
        const response = await axios.get("/popularWorks");

        return response.data;
    } catch(e : any) {
        throw e?.errorMessage ?? "알 수 없는 오류가 발생했습니다."
    }
}