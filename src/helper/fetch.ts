import fetch from 'node-fetch'

const devHost = 'https://cms.herbie-unverpackt.de'
// const devHost = 'https://cms.herbie.com'
// const devHost = 'http://localhost:1337'
const prodHost = 'https://cms.herbie-unverpackt.de'

export const host = () => {
  return process.env.NODE_ENV === 'development' ? devHost : prodHost
}

export const fetchWrapper = async (url: string): Promise<Response> => {
  try {
    const response = await fetch(url)
    return response
  } catch (error) {
    console.log('fetch error', error)
    throw error
  }
}

export interface Formular {
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}

export const postReqeuest = async (data: Formular): Promise<void> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    ...data,
    to: 'info@herbie-unverpackt.de'
  })

  const options = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow' as RequestRedirect
  }

  try {
    const response = await fetch(`/api/sendmail`, options)
    if (!response.ok) throw new Error('error postRequest')
  } catch (error) {
    throw error
  }
}

export const formCreator = (params: {[key: string]: string}): Formular => {

  return ({
    to: 'info@herbie.com',
    replyTo: params.email,
    subject: `Nachricht von ${params.name}`,
    text: params.nachricht,
    html: `
    <div>
      <h1>Kontaktformular Makeover by Mey</h1>
      <div>
        <div>
          <p><bold>Name: ${params.name}</bold></p>
          <p>Email: ${params.email}</p>
          <p>Telefon: ${params.tel}</p>
        </div>
        <div>
          <p>${params.nachricht}</p>
        </div>
      </div>
    </div>`
  })
}
