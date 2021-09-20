import alanBtn from '@alan-ai/alan-sdk-web'
import React, { useState, useEffect } from 'react'
import { timeSince } from './timeSince/TimeFormatter'
import { scrollToTop ,scrollToBottom} from '../../../utils/voiceScrolling'

function News() {
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page,setPage] = useState(5)
    const [loadMore,setLoadMore] = useState(page)

    // call the news from Vnexpress
    useEffect(() => {
        setLoading(true)
        const getNews = async () => {
        await fetch(`https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=${loadMore}&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time`)
                .then(res => res.json())
                .then(data => {
                    const keyId = Object.keys(data.data)[0]
                    setNewsData(data.data[keyId].data)
                    setLoading(false)
                })
            }
            getNews()
        }, [loadMore])

    // Voice AlanAI, Scroll top,Scroll Down,Loadmore
       // Voice Button
       const alanKey = '256491ed94562d19695c224ec956c2032e956eca572e1d8b807a3e2338fdd0dc/stage'
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
        setLoadMore(loadMore +5)
    }


    if (loading === true) return <h2>loading</h2>
    return (
        <div className="news-sidebar" style={{ marginTop: '65px', }}>
            <ul className='list-news'>
                {newsData.map((item,index) => (
                    <a key={index} href={item.share_url}>
                        <div className="card mb-3" style={{ border: '0' }} >
                            <div className="row no-gutters">
                                <div className="col-md-3 news-img">
                                    <img src={item.thumbnail_url} alt="news" />
                                </div>
                                <div className="col-md-9 news-content it">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <h6 className="card-text">{item.lead}</h6>
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
            <button style={{width:'100%', backgroundColor:'#E5E7EB' , border:0,outline:'0', borderRadius:'12px', fontSize:'17px', padding:'16px 20px'}} onClick={() => setLoadMore(loadMore +5)}>Xem thêm</button>
            {loading && <h2>loading</h2>}
        </div>
    )
}

export default News
