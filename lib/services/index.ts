export const appUsageCount = async () => {
  // increase app use
  await fetch('/api/app-use', {
    method: 'POST',
  })
    .then(() => console.log('app use increased'))
    .catch((err) => console.log(err))
}

export const saveResponse = async ({
  title,
  markdown,
  language,
  level,
}: {
  title: string
  markdown: string
  language: string
  level: string
}) => {
  const payload = {
    title,
    markdown,
    language,
    level,
  }

  const res = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const { data } = await res.json()
  return data
}

export const getProfile = async () => {
  const res = await fetch('/api/user')
  const { data } = await res.json()
  return data
}

export const updateUserPreference = async ({
  language,
  level,
}: {
  language?: string
  level?: string
}) => {
  const res = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ language, level }),
  })
  const { data } = await res.json()
  return data
}

export const generateResponse = async ({
  prompt,
  language,
  level,
}: {
  prompt: string
  language?: string
  level?: string
}) => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, language, level }),
  })

  return res
}

export const fetchSavedPromptResponses = async () => {
  const res = await fetch('/api/response')
  const { data } = await res.json()
  return data
}

export const handleCreditsPurchase = async (amount: number) => {
  const res = await fetch('/api/credits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })

  if (res.ok) {
    const { data } = await res.json()
    window.location.href = data?.data?.link
  }
}
