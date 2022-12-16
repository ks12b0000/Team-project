import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../until/cookie";
import CategoryHttp from "../../http/categoryHttp";
import axios from "axios";
const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        font-size: 64px;
    }
`;
const categoryHttp = new CategoryHttp();
function Category2() {
    const [Category, setCategory] = useState([]);

    const [state, setState] = useState("");

    return (
        <>
            <Header />
            <Container>
                <div>
                    {/*{getCookie && getCookie("accesstoken")}*/}
                    {Category.map((cate) => (
                        <li key={cate.board_id}>
                            <span>{cate.title}</span>
                            <span>{cate.text}</span>
                        </li>
                    ))}
                </div>
            </Container>
        </>
    );
}
export default Category2;
