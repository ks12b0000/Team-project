import Http from "./http";

class AuthHttp extends Http {
    // 로그인 여부 확인
    getIsLoggedIn = async () => {
        try {
            const res = await this.axios.get("auth/user/login");
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 마이페이지
    getMypage = async (id) => {
        try {
            const res = await this.axios.get(`auth/user/mypage?user_id=${id}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //현재 비밀번호 확인
    postCheckPassword = async (user_id, params) => {
        try {
            const res = await this.axios.post(`auth/user/check/password/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //아이디 변경
    putUpdateUsername = async (user_id, params) => {
        try {
            const res = await this.axios.put(`auth/user/update/username/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };
}
export default AuthHttp;
