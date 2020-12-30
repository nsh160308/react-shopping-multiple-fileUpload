import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>이제 코딩을 시작해봐!</span>
            </div>
            <div style={{ float: 'right' }}>사이트에 방문해주셔서 감사합니다! by 노승환</div>
        </>
    )
}

export default LandingPage
