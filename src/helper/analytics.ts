import ReactGA from 'react-ga'

const __DEV__ = process.env.NODE_ENV === 'development'

export const initAnalytics = () => {
  const mbm = JSON.parse(getCookie('mbm'))
  !__DEV__ && (mbm.analytics === true || mbm.isSet === false) && ReactGA.initialize('UA-167933629-1', { debug: false })
  !__DEV__ && (mbm.analytics === true || mbm.isSet === false) && ReactGA.set({ anonymizeIp: true })
}

export const pageview = (path: string) => {
  const mbm = JSON.parse(getCookie('mbm'))
  !__DEV__ && mbm.analytics === true && ReactGA.pageview(path)
}

function getCookie(cname: string) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
