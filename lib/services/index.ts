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
  title: string | undefined
  markdown: string | undefined
  language: string | undefined | null
  level: string | undefined | null
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

export const deleteResponse = async (responseId: string) => {
  const res = await fetch('/api/response/' + responseId, {
    method: 'DELETE',
  })
  const data = await res.json()
  return data.success
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
  language?: string | null
  level?: string | null
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

// Admin
export const fetchUsersCount = async () => {
  const res = await fetch('/api/admin/user')
  const { data } = await res.json()
  return data
}
