import './index.css'
import { Form, Input, Button, Select, Row, Col } from 'antd';
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import axios from 'axios';
const { Option } = Select;

function Quize() {
    const [categories, setCategories] = useState([]);
    const [question, setQuestion] = useState(null);
    const [category, setCategory] = useState(null);
    const [quiz, setQuiz] = useState("");

    let history = useHistory();


    useEffect(() => {
        async function asyncFunc() {
            // fetch data from a url endpoint
            const data = await axios.get("https://opentdb.com/api_category.php");
            console.log(data.data.trivia_categories);
            setCategories(data.data.trivia_categories);
        }
        asyncFunc()
    }, [])

    const onQuestionsClick = (e) => {
        setQuestion(e.target.value);
    }
    const onCategoryClick = (e) => {
        setCategory(e);
    }
    const onDifficultyClick = (e) => {
        setQuiz(e);
    }

    const startQuiz = () => {
        history.push(`/start/${question}/${category}/${quiz}`);
    }


    return (
        <div>
            <br />

            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="colCenter">
                        <h3>Number of Questions:</h3>
                        <Input type="number" placeholder="Select a option and change input text above" allowClear className="selectWidth"
                            onChange={onQuestionsClick}
                        >


                        </Input>
                    
                    <br /><br />
                    <h3>Select Category:</h3>
                    <Select placeholder="Select a option and change input text above" allowClear className="selectWidth"
                        onChange={onCategoryClick}
                    >

                        {categories.map((cat, i) =>
                            <Option key={i}>{cat.name}</Option>
                        )};
                    </Select>
                    <br /><br />
                    <h3>Select Difficulty:</h3>
                    <Select placeholder="Select a option and change input text above" allowClear className="selectWidth"
                        onChange={onDifficultyClick}
                    >
                        <Option value="easy">Easy</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="hard">Hard</Option>
                    </Select>
                   
                    <br /><br />
                    <Button type="primary" onClick={startQuiz}>Start Quiz</Button>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>

        </div>
    );
}
export default Quize;


