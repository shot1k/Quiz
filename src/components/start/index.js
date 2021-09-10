import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Select, Row, Col, Modal } from 'antd';
import axios from 'axios';

const { Option } = Select;
var answers = {};

function Start() {

    const [questionData, setQuestionData] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    var count = 0;
    // var correctCount = 0;

    let { question, category, quiz } = useParams();
    let history = useHistory();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
        const correctAnswers = questionData.map((quest) => quest.correct_answer);
        for(let i=0; i<correctAnswers.length; i++){
            if(correctAnswers[i] == answers[i]){
                count++;
            }
        }

        console.log("correctCount", questionData, correctAnswers, answers)
        setCorrectCount(count);
        
    };

    const handleOk = () => {
        setIsModalVisible(false);
        history.push("/");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };




    useEffect(() => {
        async function asyncFunc() {
            // fetch data from a url endpoint
            const data = await axios.get(`https://opentdb.com/api.php?amount=${question}&category=${category}&difficulty=${quiz}`);
            console.log(data.data.results);
            setQuestionData(data.data.results);
        }
        asyncFunc()
    }, [])

    const clickSelect = (e, i) => {
        console.log("clickSelect", e, i)
        answers[i] = e;
        
    }

    const Reset = () => {
        console.log("Reset")
        history.push("/");
    }


    return (
        <div className="App">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    {
                        questionData.map((quest, index) =>
                            <div>
                                <h3>{quest.question}</h3>
                                <br />

                                <Select placeholder="choose" allowClear className="selectWidth" onChange={(e) => clickSelect(e, index)}>
                                    <Option value={quest.correct_answer} key={index}>{quest.correct_answer}</Option>
                                    {
                                        quest.incorrect_answers.map((q) => (
                                            <>
                                                <Option value={q} key={Math.random() * 1000}>{q}</Option>
                                            </>
                                        ))
                                    }
                                </Select>
                                <br /><br />
                            </div>
                        )
                    }
                    {questionData.length == 0? <p>There are no questions in this section</p>: ''}
                {questionData.length == 0? <Button type="primary" onClick={Reset}>Reset</Button> : <Button type="primary" onClick={showModal}>Finish</Button>}
                    <Modal okText="Reset" title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>Your score -  {correctCount}</p>
                    </Modal>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );
}

export default Start;
