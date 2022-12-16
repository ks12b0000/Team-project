import Http from './http';
class WriteHttp extends Http {

    imgUpload = async (formData) => {
        try{
            const {data } = await this.axios.post("image/upload", formData, {headers: {"Content-Type": "multipart/form-data"}})
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    submitWritingForm = async (params) => {
        try {
            const { data } = await this.axios.post("auth/board/write", params);
            return data;
        } catch (err) {
            throw err;
        }
    };
}
export default WriteHttp;