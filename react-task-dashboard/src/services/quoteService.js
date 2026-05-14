const QUOTE_API_URL = 'https://api.adviceslip.com/advice'

export async function fetchMotivationalQuote() {
  const response = await fetch(`${QUOTE_API_URL}?t=${Date.now()}`)

  if (!response.ok) {
    throw new Error('Could not fetch quote')
  }

  const data = await response.json()

  return {
    text: data?.slip?.advice || 'Progress is built one small task at a time.',
    author: 'Advice Slip',
  }
}
