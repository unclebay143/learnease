interface User {
  freeCredits: number
  credits: number
}

export const handleInsufficientCredits = ({
  usedAppCount,
  currentlyLoggedInUser,
}: {
  usedAppCount: number
  currentlyLoggedInUser: User | null
}) => {
  if (usedAppCount >= 2 && !currentlyLoggedInUser) {
    alert('Please log in to access 3 more credits.')
    return false
  }

  if (currentlyLoggedInUser) {
    const hasCredit =
      usedAppCount <= 2 ||
      currentlyLoggedInUser?.freeCredits > 0 ||
      currentlyLoggedInUser?.credits > 0

    if (!hasCredit) {
      alert(
        "You don't have enough credits. Please purchase more credits from your dashboard.",
      )
      return false
    }
  }
  // Return true if user has enough credits to continue
  return true
}

export const handleStreamResponse = async ({
  data,
  setResponse,
}: {
  data: any
  setResponse: Function
}) => {
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
    setResponse((prev: string) => prev + chunkValue)
  }

  if (done) {
    return true
  }
}
