import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from './../../utils/FileUpload';
/*
Typography => 제목, 본문, 목록 등을 포함한 기본 텍스트 작성
*/
const { TextArea } = Input;

const Continents = [
    {key: 1, value: "아프리카"},
    {key: 2, value: "유럽"},
    {key: 3, value: "아시아"},
    {key: 4, value: "북 아메리카"},
    {key: 5, value: "남 아메리카"},
    {key: 6, value: "호주"},
    {key: 7, value: "남극"}
]

function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)

    //이미지업로드를 위한 state
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const priceChangeHandler = (event) => {
        setPrice(event.target.value);
    }

    const continentChangeHandler = (event) => {
        setContinent(event.target.value);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 여행 상품 업로드 </h2>
            </div>

            <Form>
                {/* 드랍 존 */}
                
                
                <FileUpload />


                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격(원)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button>
                    확인
                </Button>
            </Form>
        </div>



        
    )
}

export default UploadProductPage
