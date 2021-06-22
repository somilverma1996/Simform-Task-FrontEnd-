import Modal from "styled-react-modal";
import styled from "styled-components";

export const StyledModal = Modal.styled`
  width: 40rem;
  height: 25rem;
  padding: 20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export const ModalHeader = styled.div`
  height: 60px;
`;

export const ModalContent = styled.div`
  min-height: calc(23rem - 150px);
`;

export const ModalFooter = styled.footer`
  height: 60px;
`;
export const Row = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const Column = styled.div`
    flex: ${(props) => props.size};
`;


export const Button = styled.button`
  color: white;
  margin: 10px;
  display: flex;
  border: 1px solid black;
  margin-left: auto;
  background-color: black;
  font-size: 18px;
  width: 100px;
  justify-content: center;
  border-radius: 5px;
  font-family: sans-serif;
`;

export const Cancel = styled.a`
  font-size: 16px;
  color: black !important;
  cursor: pointer;
  margin: 10px;
  font-family: sans-serif;
`;

export const TextArea = styled.textarea`
  width: 100%;
  align-items: center;
  ::placeholder {
  }
`;
export const Select = styled.select`
  word-wrap: normal;
  width: 100%;
  height: 30px;
  cursor: pointer;
  ::placeholder {
  }
`;

export const Option = styled.option`
::placeholder {
}
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  font-family: sans-serif;
  ::placeholder {
    font-family: sans-serif
    font-weight: 600px
  }

  `;