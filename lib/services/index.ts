export const appUsageCount = async () => {
  // increase app use
  await fetch('/api/app-use', {
    method: 'POST',
  })
    .then(() => console.log('app use increased'))
    .catch((err) => console.log(err))
}

export const saveResponseCopy = async ({
  userId,
  title,
  markdown,
}: {
  userId?: string
  title: string
  markdown: string
}) => {
  const payload = {
    userId,
    title,
    markdown,
  }

  await fetch('/api/app_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export const generateResponse = async (prompt: string) => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  return res
}

export const getProfile = async () => {
  const res = await fetch('/api/user')
  const { data } = await res.json()
  return data
}

export const fetchSavedPromptResponses = async () => {
  const res = await fetch('/api/response')
  const { data } = await res.json()
  return data
}
