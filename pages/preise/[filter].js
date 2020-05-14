// import Link from 'next/link';
import React from 'react'
import App from '../../src/App'
import { host, fetchWrapper } from '../../src/helper/fetch'
import { rx_SsrData } from '../index'


function Preise(props) {
  return <App {...props} />
}

export async function getStaticPaths() {
  return {
    paths: [
      // { params: { filter: 'Waxing' } }
    ],
    fallback: true,
  }
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  if (rx_SsrData.value !== null) {
    return {
      props: {
        ...rx_SsrData.value
      }
    }
  }
  
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()
  const res2 = await fetchWrapper(`${url}/main-categories`)
  const mainCategories = await res2.json()

  rx_SsrData.next({
    sites,
    mainCategories
  })

  return {
    props: {
      sites,
      mainCategories
    }
  }
}

// export async function getInitialProps({ query }) {
//   try {
//     const res = await fetch(`http://localhost/api/posts/${query.postslug}`, {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, cors, *same-origin
//     });
//     const json = await res.json();
//     return { data: json.data };
//   } catch (err) {
//     console.log('err');
//   }
// }

export default Preise
