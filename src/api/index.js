import axios from 'axios'

const url = 'https://api.coincap.io/v2'

export async function getAssets() {
  try {
    const res = await axios.get(`${url}/assets?limit=20`)
    return res.data.data // Observa la estructura de la respuesta de CoinCap
  } catch (error) {
    console.error('Error al obtener datos:', error)
    throw error
  }
}

export async function getAsset(coin) {
  try {
    const res = await axios.get(`${url}/assets/${coin}`)
    return res.data.data
  } catch (error) {
    console.error('Error al obtener datos:', error)
    throw error
  }
}

export async function getAssetHistory(coin) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  try {
    const res = await axios.get(
      `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
    )
    return res.data.data
  } catch (error) {
    console.error('Error al obtener datos:', error)
    throw error
  }
}

export async function getMarkets(coin) {
  try {
    const res = await axios.get(`${url}/assets/${coin}/markets?limit=5`)
    return res.data.data
  } catch (error) {
    console.error('Error al obtener datos:', error)
    throw error
  }
}

export async function getExchange(id) {
  try {
    const res = await axios.get(`${url}/exchanges/${id}`)
    return res.data.data
  } catch (error) {
    console.error('Error al obtener datos:', error)
    throw error
  }
}

// function getAssets() {
//   return fetch(`${url}/assets?limit=20`)
//     .then((res) => res.json())
//     .then((res) => res.data)
// }

// export default {
//   getAssets
// }
