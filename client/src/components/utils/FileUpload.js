import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload() {

    //여러개의 이미지를 올릴 수 있게 array형태
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        console.log('files', files);
        //FormData객체 생성
        let formData = new FormData();

        /*header에 어떤 특정 헤더값을 추가하고 싶다.*/
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }

        //FormData 객체안에 이미 키가 존재하면 
        //그 키에 새로운 값을 추가하고, 키가 없으면 추가합니다.
        //append(filedName, value);
        for(let i=0; i<files.length; i++) {
            formData.append("file", files[i])
        }
        /*
        formData와 config를 같이 node서버로 보낼때 같이 보내지 않으면 에러가 발생하게 된다. 
        formData안에는 우리가 파일을 업로드했을 때 정보가 append()를 통해서 
        file이라는 이름으로 들어가는 것이고 header에다가 어떠한 타입인지에 대한 
        content-type이란 것을 정의해서 백엔드에서 이 request를 받을 때 
        에러가 없이 받을 수 있게 해주는 것이다.
        */
        Axios.post('/api/product/image',formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log('<front-1>',response.data);
                    //파일 저장이 성공했을 때,
                    //response.data.fileName.forEach(fileName => console.log(fileName));
                    setImages([...Images, ...response.data.fileName])
                } else {
                    alert("파일을 저장하는데 실패했습니다.");
                }
                
            })

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler} multiple>
                {({getRootProps, getInputProps}) => (
                    <div 
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {/* 아이콘은 antd 디자인에서 가져온다. */}
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
            
                        {Images.map((image, index) => (
                            <div key={index}>
                                <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                    src={`http://localhost:5000/uploads/${image}`}
                                />
                            </div>
                        ))}
                
            </div>
        </div>
    )
}

export default FileUpload
