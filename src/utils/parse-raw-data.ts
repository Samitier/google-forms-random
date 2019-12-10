import { ParsedData } from '@/models/ParsedData'

const HAVE_WANT_SCALE_MAX = 8
const CATEGORIES_MAX = 5

const AGE = 5
const GENDER = 6
const EDUCATION_LEVEL = 7
const STUDY_FIELD = 8
const PROFESSION = 9
const GRATITUDE = [12, 18]
const GROWTH = [18, 27]
const SATISFACTION = [27, 32]
const WELL_BEING = [32, 50]
const MAXIMIZERS = [50, 63]
const HAVE_WANT = [63, 234]
const CATEGORIES = [234, 238]

const ACCOMPLISHMENTS = 63
const POSESSIONS = 93
const INTERPERSONAL = 150
const SKILLS = 195

function sum(array: number[]) {
  return array.reduce((a, b) => a + b)
}

function slice(arr: string[], limits: number[]) {
  return arr.slice(limits[0], limits[1]).map(a => parseInt(a, 10))
}

function get(arr: string[], i: number) {
  return parseInt(arr[i], 10)
}

function getProbabilityOfWantingWhatTheyHave(arr: number[]) {
  let sum = 0
  let total = 0
  for (let i = 0; i < arr.length; i += 3) {
    if (arr[i] === 1 && arr[i + 1] > 0) {
      sum += arr[i + 1] - 1
      total++
    }
  }
  return sum / total / HAVE_WANT_SCALE_MAX
}

function getProbabilityOfHavingWhatTheyWant(arr: number[]) {
  let have = 0
  let haveAndWant = 0
  for (let i = 0; i < arr.length; i += 3) {
    let amount = arr[i + 2] - 1
    if (arr[i] === 1 && arr[i + 1] > 0) {
      amount = arr[i + 1] - 1
      have += amount
    }
    if (amount >= 0) haveAndWant += amount
  }
  return have / haveAndWant
}

function getProbabilityOfWantingPosessions(arr: number[]) {
  let want = 0
  let total = 0
  for (let i = 0; i < arr.length; i += 3) {
    let index = arr[i] === 1 ? i + 1 : i + 2
    if (arr[index] > 0) {
      want += arr[index] - 1
      total++
    }
  }
  return want / (total * HAVE_WANT_SCALE_MAX)
}

function getProbabilityOfHavingPosessions(arr: number[]) {
  let posessions = 0
  let total = 0
  for (let i = 0; i < arr.length; i += 3) {
    if (arr[i] === 1) {
      posessions++
    }
    total++
  }
  return posessions / total
}

function getCategoryPonderation(i: number, categories: number[]) {
  const index = i + HAVE_WANT[0]
  if (index >= ACCOMPLISHMENTS && index < POSESSIONS) return categories[0]
  if (index >= POSESSIONS && index < INTERPERSONAL) return categories[1]
  if (index >= INTERPERSONAL && index < SKILLS) return categories[2]
  return categories[3]
}

function getWeightedProbabilityOfWantingWhatTheyHave(
  arr: number[],
  categories: number[]
) {
  let sum = 0
  let total = 0
  for (let i = 0; i < arr.length; i += 3) {
    const category = getCategoryPonderation(i, categories)
    if (arr[i] === 1 && arr[i + 1] > 0) {
      sum += (arr[i + 1] - 1) * category
      total++
    }
  }
  return sum / total / (HAVE_WANT_SCALE_MAX * CATEGORIES_MAX)
}

function getWeightedProbabilityOfHavingWhatTheyWant(
  arr: number[],
  categories: number[]
) {
  let have = 0
  let haveAndWant = 0
  for (let i = 0; i < arr.length; i += 3) {
    const category = getCategoryPonderation(i, categories)
    let amount = (arr[i + 2] - 1) * category
    if (arr[i] === 1 && arr[i + 1] > 0) {
      amount = (arr[i + 1] - 1) * category
      have += amount
    }
    if (amount >= 0) haveAndWant += amount
  }
  return have / haveAndWant
}

export function parseRawData(rawDataArr = []) {
  const parsedData: ParsedData[] = []

  for (const rawData of rawDataArr) {
    const haveWantData = slice(rawData, HAVE_WANT)
    const categories = slice(rawData, CATEGORIES)
    parsedData.push(
      new ParsedData(
        get(rawData, AGE),
        get(rawData, GENDER),
        get(rawData, EDUCATION_LEVEL),
        get(rawData, STUDY_FIELD),
        get(rawData, PROFESSION),
        sum(slice(rawData, GRATITUDE)),
        sum(slice(rawData, GROWTH)),
        sum(slice(rawData, WELL_BEING)),
        sum(slice(rawData, SATISFACTION)),
        sum(slice(rawData, MAXIMIZERS)),
        getProbabilityOfWantingWhatTheyHave(haveWantData),
        getProbabilityOfHavingWhatTheyWant(haveWantData),
        getProbabilityOfHavingPosessions(haveWantData),
        getProbabilityOfWantingPosessions(haveWantData),
        getWeightedProbabilityOfWantingWhatTheyHave(haveWantData, categories),
        getWeightedProbabilityOfHavingWhatTheyWant(haveWantData, categories)
      )
    )
  }
  console.log(parsedData[2])
  return parsedData
}
