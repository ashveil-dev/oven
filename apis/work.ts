import axios from "@apis/instance";

export async function getWorkDetailApi(workId: string) {
    try {
        const response = await axios.get(
            "/work",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                params: { workId }
            }
        )

        return response.data;
    } catch (e: any) {
        throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}

export async function putHeartedApi(workId: string, like: boolean) : Promise<boolean> {
    try {
        const response = await axios.put(
            `/work/${workId}`,
            {
                param: {
                    like,
                }
            }
        )
        return response.status === 200;
    } catch (e : any) {
        throw e.errorMessage ?? "알 수 없는 오류가 발생했습니다"
    }
}

export async function putRatingApi(workId : string, rating : number) {
    try {
        const response = await axios.put(
            `/work/${workId}`,
            {rating}
        )

        return response.status === 200;
    } catch(e : any) {
        throw e.errorMessage ?? "알 수 없는 오류가 발생했습니다"
    }
}