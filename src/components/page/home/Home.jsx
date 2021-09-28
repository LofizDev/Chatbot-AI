import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { CloudSun, CurrencyBitcoin, MusicNoteBeamed, Newspaper } from 'react-bootstrap-icons'
import './style.scss'
import alanBtn from '@alan-ai/alan-sdk-web'
import News from './news/News'
import Weather from './weather/Weather'
import BoxInfo from './weather/BoxInfo/BoxInfo'
import Music from './music/Music'
import NewBox from './news/newsBox/NewBox'
import {scrollToBottom,scrollToTop} from '../../../utils/VoiceScrolling'
import TableTrade from './bitcoin/tableTrade/TableTrade'
import TableCoin from './bitcoin/TableCoin'
import { ALAN_KEY } from '../../../utils/Api'

function Home() {

    // Get value from Voice and Render Component
    const [voiceData, setVoiceData] = useState(<TableCoin />)
    const [count,setCount] = useState([])
    // Voice Button
    const alanKey = ALAN_KEY
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                switch (command) {
                    case 'Bitcoin': return setVoiceData(<TableCoin /> || <TableTrade />)
                    case 'Weather': return setVoiceData(<Weather /> || <BoxInfo />)
                    case 'News': return setVoiceData(<News /> || <NewBox/>)
                    case 'Music': return setVoiceData(<Music />) 
                    case 'bottom': return scrollToBottom()
                    case 'top': return scrollToTop()
                    default: setVoiceData(<TableCoin />)
                }
            }
        })
    }, [])

 
    
    return (
        <h2 className='homee'>
            <div className="containerr">
                <div id={voiceData.type === News ? 'expand' : ''} className="containerr-left">
                    <div className="containerr-left-top">
                        {/* <div className="left-top-title">
                            <h5>Voice Asistant {count}</h5>
                        </div> */}
                        <div className="left-top-box">
                            <Card onClick={() => setVoiceData(<TableCoin />)}
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
                        {voiceData.type === TableCoin && <TableTrade changeCount={count => setCount(count)} count={count} /> }
                    </div>
                </div>
            </div>
        </h2>
    )
}

export default Home
