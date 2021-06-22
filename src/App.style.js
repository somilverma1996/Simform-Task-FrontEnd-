import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";

export const AddButtonField = styled.button`
    background-color: #f2f2f2;
    // margin: 20px;
    display: flex!important;
    align-items: center;
    margin: auto!important;
    font-size: 16px;
    font-family: sans-serif;
    color: black;
    border: 1px solid black;
    border-radius: 3px;
    box-shadow: 3px 5px 5px 0px rgba(0,0,0,0.75);
`;

export const Container = styled.div`

`

export const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
