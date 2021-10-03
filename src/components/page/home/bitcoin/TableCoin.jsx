import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Pagination from './Pagination/Pagination'
import { CRYPTO_LIST_COIN } from '../../../../utils/Api'
import Coin from './Coin/Coin'
function TableCoin() {
  const [coinmarketcap, setCoinmarketcap] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPost = coinmarketcap.slice(indexOfFirstPost, indexOfLastPost)
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  

  // Call api and fetch list Coinmarketcap
  useEffect(() => {
    const fetchListCoin = async () => {
      setLoading(true)
      const res = await axios.get(CRYPTO_LIST_COIN)
      setCoinmarketcap(res.data)
      setLoading(false)
    }

    fetchListCoin()
  }, [])

  return (
    <div className="crypto-tablelist">
      <table className='table-listcoin'>
        <thead>
          <tr>
            <th style={{ padding: "11px 10px 0 17px" }}>#</th>
            <th style={{ textAlign: 'start', paddingRight: '0' }}>Tên</th>
            <th style={{ paddingLeft: '0' }}>Giá</th>
            <th>24h %</th>
            <th>Cao nhất 24h</th>
            <th>Vốn hóa thị trường</th>
          </tr>
        </thead>
        <tbody>
          <Coin coinmarketcap={currentPost} loading={loading} />
        </tbody>
      </table>
          <Pagination 
           paginate={paginate}
           postPerPage={postsPerPage}
           totalPosts ={coinmarketcap.length} />
    </div>

  )
}

export default TableCoin
