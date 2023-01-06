import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthHttp from "../../http/authHttp";
import UserHttp from "../../http/userHttp";

const authHttp = new AuthHttp();
const userHttp = new UserHttp();

const UserInfoChange = (props) => {
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);
    const navigate = useNavigate();

    //input UseRef 설정
    const currentPasswordInput = useRef();
    const idInput = useRef();

    //모달창 ui 변경을 위한 state
    const [IsIdChange, setIsIdChange] = useState(true);
    const [IsEmailChange, setIsEmailChange] = useState(false);
    const [IsPasswordChange, setIsPasswordChange] = useState(false);

    //input값을 위한 state
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [Username, setUsername] = useState("");

    //miniText 표시를 위한 state
    const [CurrentPasswordText, setCurrentPasswordText] = useState("");
    const [IdText, setIdText] = useState("");

    //onFunc 실행전에 체크해야할 것들(현재 비밀번호 체크여부, 아이디 중복확인 체크여부, 이메일 중복확인 체크여부, 비밀번호&비밀번호 확인 일치여부)
    const [CheckCurrentPassword, setCheckCurrentPassword] = useState(false);
    const [CheckUsername, setCheckUsername] = useState(false);

    const onIdChange = () => {
        setIsIdChange(true);
        setIsEmailChange(false);
        setIsPasswordChange(false);
    };

    const onEmailChange = () => {
        setIsEmailChange(true);
        setIsIdChange(false);
        setIsPasswordChange(false);
    };

    const onPasswordChange = () => {
        setIsPasswordChange(true);
        setIsIdChange(false);
        setIsEmailChange(false);
    };

    // 현재 비밀번호 확인 함수
    const onCheckPassword = async (e) => {
        e.preventDefault();

        const body = {
            password: CurrentPassword
        };

        try {
            const res = await authHttp.postCheckPassword(userId, body);
            console.log(res);
            setCurrentPasswordText(res.data.message);
            if (res.data.code === 1000) {
                setCheckCurrentPassword(true);
            }
        } catch (err) {
            console.log(err);
            setCurrentPasswordText(err.response.data.message);
        }

        setTimeout(() => {
            setCurrentPasswordText("");
        }, 5000);
    };

    //아이디 중복체크 실행 함수
    const onCheckUsername = async (e) => {
        e.preventDefault();

        try {
            const res = await userHttp.getCheckUsername(Username);
            console.log(res);
            setIdText(res.data.message);

            if (!res.data.result.isDuplicate) {
                setCheckUsername(true);
            }
        } catch (err) {
            console.log(err);
            setIdText(err.response.data.message);
        }

        setTimeout(() => {
            setIdText("");
        }, 5000);
    };

    //아이디 변경 실행 함수
    const onChangeUsername = async (e) => {
        e.preventDefault();

        const body = {
            updateUsername: Username
        };

        if (!CheckCurrentPassword) {
            currentPasswordInput.current.focus();
            setCurrentPasswordText("비밀번호를 확인해주세요");

            setTimeout(() => {
                setCurrentPasswordText("");
            }, 5000);
        } else if (!CheckUsername) {
            idInput.current.focus();
            setIdText("아이디 중복확인을 실행해주세요");

            setTimeout(() => {
                setIdText("");
            }, 5000);
        } else {
            try {
                const res = await authHttp.putUpdateUsername(userId, body);
                console.log(res);
                alert("아이디 변경이 완료되었습니다. 재로그인 해주세요");

                navigate("/login");
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        }
    };

    return (
        <>
            <MocalBackGround></MocalBackGround>
            <ModalWrap>
                <XButton
                    onClick={() => {
                        props.setIsModal(false);
                    }}
                />
                <TagWrap IsIdChange={IsIdChange}>
                    <TagName onClick={() => onIdChange()} IsChangeOn={IsIdChange}>
                        아이디 변경
                    </TagName>
                    <TagName onClick={() => onEmailChange()} IsChangeOn={IsEmailChange}>
                        이메일 변경
                    </TagName>
                    <TagName onClick={() => onPasswordChange()} IsChangeOn={IsPasswordChange}>
                        비밀번호 변경
                    </TagName>
                </TagWrap>
                {IsIdChange ? (
                    <ContentsWrap margin="70px auto 0 auto">
                        <SubTitle marginBottom="12px">현재 비밀번호</SubTitle>
                        <InputWrap mb="30px">
                            <Input type="password" value={CurrentPassword} onChange={(e) => setCurrentPassword(e.currentTarget.value)} ref={currentPasswordInput} />
                            <InputButton onClick={(e) => onCheckPassword(e)}>확인</InputButton>
                            <MiniText>{CurrentPasswordText}</MiniText>
                        </InputWrap>
                        <SubTitle marginBottom="12px">새 아이디</SubTitle>
                        <InputWrap mb="30px">
                            <Input type="id" value={Username} onChange={(e) => setUsername(e.currentTarget.value)} ref={idInput} />
                            <InputButton onClick={(e) => onCheckUsername(e)}>중복확인</InputButton>
                            <MiniText>{IdText}</MiniText>
                        </InputWrap>
                        <SubmitButton onClick={(e) => onChangeUsername(e)}>아이디 변경하기</SubmitButton>
                    </ContentsWrap>
                ) : (
                    <></>
                )}

                {IsEmailChange ? (
                    <ContentsWrap margin="70px auto 0 auto">
                        <SubTitle marginBottom="12px">현재 비밀번호</SubTitle>
                        <InputWrap mb="30px">
                            <Input />
                            <InputButton>확인</InputButton>
                            {/* <MiniText>현재 비밀번호를 확인해주세요</MiniText> */}
                        </InputWrap>
                        <SubTitle marginBottom="12px">새 이메일</SubTitle>
                        <InputWrap mb="30px">
                            <Input />
                            <InputButton>중복확인</InputButton>
                            {/* <MiniText>이메일 중복확인을 해주세요</MiniText> */}
                        </InputWrap>
                        <SubmitButton>이메일 변경하기</SubmitButton>
                    </ContentsWrap>
                ) : (
                    <></>
                )}

                {IsPasswordChange ? (
                    <ContentsWrap margin="50px auto 0 auto">
                        <SubTitle>현재 비밀번호</SubTitle>
                        <InputWrap mb="20px">
                            <Input />
                            <InputButton>확인</InputButton>
                            {/* <MiniText>현재 비밀번호를 확인해주세요</MiniText> */}
                        </InputWrap>
                        <SubTitle>새 비밀번호</SubTitle>
                        <InputWrap mb="5px">
                            <Input />
                        </InputWrap>
                        <SubTitle>새 비밀번호 확인</SubTitle>
                        <InputWrap mb="20px">
                            <Input />
                            {/* <InputButton>중복확인</InputButton> */}
                            {/* <MiniText>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</MiniText> */}
                        </InputWrap>
                        <SubmitButton>비밀번호 변경하기</SubmitButton>
                    </ContentsWrap>
                ) : (
                    <></>
                )}
            </ModalWrap>
        </>
    );
};

const MocalBackGround = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #252525;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
`;

const ModalWrap = styled.div`
    width: 500px;
    height: 540px;
    background-color: #ffffff;
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TagWrap = styled.div`
    width: 81%;
    height: 60px;
    margin: 40px auto 0 auto;
    border-bottom: 2px solid #35c5f0;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-content: space-between;
`;

const TagName = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    color: ${(props) => (props.IsChangeOn ? "#35c5f0" : "#919191")};
    cursor: pointer;
    background-color: ${(props) => (props.IsChangeOn ? "#f5f5f5" : "white")};
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    font-weight: ${(props) => (props.IsIdChange ? "600" : "500")};
`;

const XButton = styled.div`
    width: 17px;
    height: 17px;
    background-image: url(/image/xbutton.png);
    background-size: 17px;
    position: absolute;
    left: 92%;
    top: 4%;
    opacity: 0.5;
    cursor: pointer;
    z-index: 10;
`;

const ContentsWrap = styled.div`
    width: 81%;
    height: 63%;
    margin: ${(props) => props.margin};
`;

const SubTitle = styled.div`
    font-size: 17px;
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: 20px;
    color: #515151;
    font-weight: 500;
`;

const InputWrap = styled.div`
    padding: 10px;
    height: 45px;
    position: relative;
    margin-bottom: ${(props) => props.mb};
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: 1.5px solid #cecece;
    border-radius: 30px;
    outline: none;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 2px;
    padding-left: 20px;
    box-sizing: border-box;
    color: #545454;
    ::placeholder {
        font-size: 16px;
        font-weight: 300;
        letter-spacing: 2px;
        color: #aaaaaa;
    }

    :focus {
        border: 2px solid #ff7252;
    }
`;

const InputButton = styled.div`
    height: 28px;
    width: 78px;
    background-color: #d8d8d8;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, -50%);
    border: 2px solid #35c5f0;
    color: #35c5f0;
    background-color: white;
    font-weight: 700;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #35c5f0;
    }
`;

const MiniText = styled.div`
    font-size: 13px;
    color: #35c5f0;
    font-weight: 600;
    margin-top: 7px;
    margin-left: 10px;
`;

const SubmitButton = styled.div`
    width: 140px;
    height: 40px;
    background-color: #35c5f0;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-left: auto;
    margin-right: 10px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #19b1e0;
    }
`;

export default UserInfoChange;
