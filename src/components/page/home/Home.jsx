import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { CloudSun, CurrencyBitcoin, MusicNoteBeamed, Newspaper } from 'react-bootstrap-icons'
import './style.scss'
import alanBtn from '@alan-ai/alan-sdk-web'
import Bitcoin from './bitcoin/Bitcoin'
import News from './news/News'
import Weather from './weather/Weather'
import BoxInfo from './weather/BoxInfo/BoxInfo'
import Music from './music/Music'
import NewBox from './news/newsBox/NewBox'
import {scrollToBottom,scrollToTop} from '../../utils/voiceScrolling'
import TableTrade from './bitcoin/tableTrade/TableTrade'

function Home() {

    // Get value from Voice and Render Component
    const [voiceData, setVoiceData] = useState(<Bitcoin />)

    // Voice Button
    const alanKey = '256491ed94562d19695c224ec956c2032e956eca572e1d8b807a3e2338fdd0dc/stage'
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                switch (command) {
                    case 'Bitcoin': return setVoiceData(<Bitcoin /> || <TableTrade/>)
                    case 'Weather': return setVoiceData(<Weather /> || <BoxInfo />)
                    case 'News': return setVoiceData(<News /> || <NewBox/>)
                    case 'Music': return setVoiceData(<Music />) 
                    case 'bottom': return scrollToBottom()
                    case 'top': return scrollToTop()
                    default: setVoiceData(<Bitcoin />)
                }
            }
        })
    }, [])
   

    return (
        <h2 className='homee'>
            <div className="containerr">
                <div id={voiceData.type === News ? 'expand' : ''} className="containerr-left">
                    <div className="containerr-left-top">
                        <div className="left-top-title">
                            <h5>Voice Asistant</h5>
                        </div>
                        <div className="left-top-box">
                            <Card onClick={() => setVoiceData(<Bitcoin />)}
                                className='card-item' style={{ width: '18rem' }}>
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
                            <Card onClick={() => setVoiceData(<Weather /> || <BoxInfo />)}
                                className='card-item' style={{ width: '18rem' }}>
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
                            <Card onClick={() => setVoiceData(<News />)}
                                className='card-item' style={{ width: '18rem' }}>
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
                            <Card onClick={() => setVoiceData(<Music />)}
                                className='card-item' style={{ width: '18rem' }}>
                                <Card.Header className='back-icon'>
                                    <MusicNoteBeamed size={19} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Spotify</Card.Title>
                                    <Card.Text>
                                        Try saying :  Music
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    {/* Chart left box */}
                    <div className="containerr-left-bot">
                        {voiceData}
                    </div>
                </div>
                <div id={voiceData.type === News ? 'hide-sidebar' : ''} className="containerr-right">
                    <div className="info-box">
                        {voiceData.type === Weather && <BoxInfo />}
                        {voiceData.type === News && <NewBox/> }
                        {voiceData.type === Bitcoin && <TableTrade/> }
                    </div>
                </div>
            </div>
        </h2>
    )
}

export default Home
