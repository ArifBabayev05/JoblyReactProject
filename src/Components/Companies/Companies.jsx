import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobCard from './Card'
import src from '../../Assets/Images/Logo/src.png'
import Loader from '../Jobs/Loader'

import '../../Assets/Styles/Company/CompanyCard.css';


function Companies() {
  const url = `http://localhost:53410/api/Company/getall`
  const [query, setQuery] = useState("")


  const [products, setProducts] = useState({
    loading: false,
    data: null,
    error: false
  })



  useEffect(() => {
    setProducts({
      loading: true,
      data: null,
      error: false

    })

    axios.get(url)
      .then(response => {
        setProducts({
          loading: false,
          data: response.data,
          error: false
        })

          .catch(() => {
            setProducts({
              loading: false,
              data: null,
              error: true
            })
          })
      })
  }, [url])

  let content = null

  if (products.loading) {
    content = <Loader />
  }

  if (products.error) {
    content = <p>Xəta baş verdi, yenidən yoxlayın.</p>
  }

  if (products.data) {
    content =
      products.data.map((product) =>
        <div key={product.id}>
          <JobCard product={product} />
        </div>
      )

  }

  if (products.data) {
    content =
      products.data.filter(product => {
        if (query === "") {

          return product;

        } else if (product.name.toLowerCase().includes(query.toLowerCase())) {

          return product;
        }
        
      }).map((product) =>
        <div key={product.id}>
          <JobCard product={product} />
        </div>
      ).reverse();
  }

  return (
    <div>
      <div className='d-flex container'>
        <h1 className='text container ' style={{ color: 'var(--pink)', fontWeight: 'normal', fontSize: '35px', alignItems: 'center', display: 'flex' }}>Şirkətlər</h1>
        <form className='searchJob mb-5' style={{ alignItems: 'center', display: 'flex', top: '20px' }}>
          <input className='searchBar mt-2 p-2' onChange={event => setQuery(event.target.value)} type='text'></input>
          <button className='search__submit' type='submit'>
            <img src={src} alt='some value' />
          </button>
        </form>
      </div>

      <div className='row row-cols-1 row-cols-sm-1 row-cols-lg-2 g-4 mx-5'>
            {content}
        </div>
    </div>
  )
}

export default Companies