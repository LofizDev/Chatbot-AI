import alanBtn from '@alan-ai/alan-sdk-web'
import React, { useState, useEffect } from 'react'
import { ALAN_KEY, NEWS_VNEXPRESS } from '../../../../utils/Api'
import { timeSince } from '../../../../utils/DataFormatter'
import { scrollToTop, scrollToBottom } from '../../../../utils/VoiceScrolling'

function News() {
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(5)


    // call the news from Vnexpress
    useEffect(() => {
        setLoading(true)
        const getNews = async () => {
            try {
                await fetch(NEWS_VNEXPRESS)
                    .then(res => res.json())
                    .then(data => {
                        const keyId = Object.keys(data.data)[0]
                        setNewsData(data.data[keyId].data)
                        setLoading(false)
                    })
                setLoading(false)
            } 
            catch (error) {
                console.log(error);
            }
        }
        getNews()
    }, [])

    // Voice Button
    const alanKey = ALAN_KEY
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                switch (command) {
                    case 'bottom': return scrollToBottom()
                    case 'top': return scrollToTop()
                    case 'One more time': return handleLoadMore()
                }
            }
        })
    }, [])

    // Handl Load more voice
    function handleLoadMore() {
        setPage(page + 5)
    }


    if (loading === true) return <h2>loading</h2>
    return (
        <div className="news-sidebar" style={{ marginTop: '65px', }}>
            <ul className='list-news'>
                {newsData.slice(0, page).map((item, index) => (
                    <a key={index} href={item?.share_url}>
                        <div className="card mb-3" style={{ border: '0' }} >
                            <div className="row no-gutters">
                                <div className="col-md-3 news-img">
                                    <img src={item?.thumbnail_url} alt="news" />
                                </div>
                                <div className="col-md-9 news-content it">
                                    <div className="card-body">
                                        <h5 className="card-title">{item?.title}</h5>
                                        <h6 className="card-text">{item?.lead}</h6>
                                    </div>
                                    <div className="card-fotterr">
                                        <p className='time-news'> {timeSince(item?.publish_time)}  trước</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </ul>
            <button
                style={{ width: '100%', backgroundColor: '#E5E7EB', border: 0, outline: '0', borderRadius: '12px', fontSize: '17px', padding: '16px 20px' }}
                onClick={() => setPage(page + 5)}
            >
                Xem thêm
            </button>
        </div>
    )
}

export default News