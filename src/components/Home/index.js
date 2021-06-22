import React from "react";
import '../../App.css';
import { AddButtonField } from '../../App.style';
import Modal from "../AddQuestionDialog/index";
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import QuestionForm from "../AddForm/index";

const Home = (props) => {
  console.log(props)
  const [isOpen, setIsOpen] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [name, setName] = React.useState("")
  const toggleModal = (e) => {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  const afterOpen = (e) => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const handleQuestionAdded = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false)
    }, 2000);
  }

  const validateFormName = (data) => {
    console.log(data)
    setName(data)
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        toggleModal={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
        handleQuestionAdded={handleQuestionAdded}>
      </Modal>
      <QuestionForm {...props} validate={validateFormName} />
      <br />
      <div className="text-center">
        <button disabled={!name.length > 0} onClick={toggleModal} class={name.length > 0 ? "btn btn-primary text-center btnAddQues cursor-pointer" : "btn btn-primary text-center btnAddQues cursor-not-allowed " }>Add a question</button>
      </div>
    </>
  )
}

export default Home;