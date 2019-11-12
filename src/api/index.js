import * as config from '../consts/app-config'
import configs from './fetch-configs'

export const get = (path, token) => {
  const promise = new Promise((resolve, reject) => {
    const serverPath = `${config.SERVER_URL}:${config.SERVER_PORT}${path}`
    const fetchConfigs = configs('get', null, false, token)
    fetch(serverPath, fetchConfigs).then((response) => {
      if (!response.ok) {
      } 
      else {
        return response.json()
      }
    }).then((data) => {
      console.log(data, 'api data');
      
      return resolve(data)
    }).catch((err) => {
      return reject(err)
    })
  })
  return promise
}

export const post = (path, payload, isMultipart) => {
  const promise = new Promise((resolve, reject) => {
    const serverPath = `${config.SERVER_URL}:${config.SERVER_PORT}${path}`
    const fetchConfigs = configs('post', payload, isMultipart)
    fetch(serverPath, fetchConfigs).then((response) => {
      if (!response.ok) {
        if (response.status == 404) {
          const newResponse = { status: false, msg: 'Requested api not found' }
          return newResponse
        } else if (response.status === 400) {
          throw response
        }
      } else {
        return response.json()
      }
    }).then((data) => {
      return resolve(data)
    }).catch((err) => {
      err.text().then(errMsg => {
        reject(JSON.parse(errMsg))
      })
    })
  })
  return promise
}

export const request = (method, path, payload, isMultipart) => {
  const newPromise = new Promise((resolve, reject) => {
    _request(method, path, payload, isMultipart, (err, response) => {
      if (err) {
        return reject(err)
      }
      return resolve(response)
    })
  })
  return newPromise
}

async function _request (method, path, payload, isMultipart, cb) {
  const serverPath = `${config.SERVER_URL}:${config.SERVER_PORT}${path}`
  const fetchConfigs = configs(method, payload, isMultipart)
  try {
    const response = await fetch(serverPath, fetchConfigs)
    if (!response.ok) {
      if (response.status == 404) {
        return cb(new Error('Request api not found'))
      }
    }
    return cb(null, response.json())
  } catch (err) {
    return cb(err)
  }
}
