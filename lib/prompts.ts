export const sendPrompt = async (prompt: string) => {
  try {
    const res = await fetch('api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { result } = await res.json()
    return result
  } catch (error) {
    return null
  }
}
