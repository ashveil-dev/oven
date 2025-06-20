import axios from "@apis/instance";

export async function getMyChatRoomsApi() {
    try {
        const response = await axios.get(
            "/chatrooms/my",
          {
            headers: {
                    'Content-Type': `application/json`,
                },
          } )

          return response.data;
    } catch(e : any) {
       throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}