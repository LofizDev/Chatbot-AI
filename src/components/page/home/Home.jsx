import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ArrowClockwise, CloudSun, CurrencyBitcoin, Newspaper } from 'react-bootstrap-icons'
import './style.scss'
import alanBtn from '@alan-ai/alan-sdk-web'
import Today from './dateToday/Today'
import Bitcoin from './bitcoin/Bitcoin'
import News from './news/News'
import Weather from './weather/Weather'
import BoxInfo from './weather/BoxInfo/BoxInfo'
function Home() {

    // Get value from Voice and Render Component
    const [voiceData, setVoiceData] = useState(<Bitcoin/>)

    // Voice Button
    const alanKey = '256491ed94562d19695c224ec956c2032e956eca572e1d8b807a3e2338fdd0dc/stage'
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                switch (command) {
                    case 'Bitcoin': return setVoiceData(<Bitcoin />) 
                    case 'Weather': return setVoiceData(<Weather/> || <BoxInfo/>)
                    case 'News':    return setVoiceData(<News/>)
                    case 'GoBack':  return setVoiceData(<Bitcoin/>)
                    default:               setVoiceData(<Bitcoin/>)
                }
            }
        })
    }, [])

    return (
        <h2 className='home'>
            <div className="container">
                <div className="container-left">
                    <div className="container-left-top">
                        <div className="left-top-title">
                            <h5>Voice Asistant</h5>
                        </div>
                        <div className="left-top-box">
                            <Card className='card-item' style={{ width: '18rem' }}>
                                <Card.Header className='bitcoin-icon'>
                                    <CurrencyBitcoin size={19} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Bitcoin</Card.Title>
                                    <Card.Text>
                                        Try saying : Bitcoin Today
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='card-item' style={{ width: '18rem' }}>
                                <Card.Header className='weather-icon'>
                                    <CloudSun size={19} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Weather</Card.Title>
                                    <Card.Text>
                                        Try saying : weather Today
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='card-item' style={{ width: '18rem' }}>
                                <Card.Header className='news-icon'>
                                    <Newspaper size={19} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>News</Card.Title>
                                    <Card.Text>
                                        Try saying : <br /> News Today
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='card-item' style={{ width: '18rem' }}>
                                <Card.Header className='back-icon'>
                                    <ArrowClockwise size={19} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Go Back</Card.Title>
                                    <Card.Text>
                                        Try saying : <br /> Go Back
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    {/* Chart left box */}
                    <div className="container-left-bot">
                        {voiceData}
                    </div>
                </div>
                <div className="container-right">
                    <div className="info-box">
                        {voiceData.type === Weather && <BoxInfo/>}
                    </div>
                </div>
            </div>
        </h2>
    )
}

export default Home
