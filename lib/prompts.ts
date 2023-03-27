export const sendPrompt = async (prompt: string) => {
  try {
    const res = await fetch('api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    console.log('Edge function returned.')

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = res.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      return chunkValue
    }
  } catch (error) {
    return null
  }
}
