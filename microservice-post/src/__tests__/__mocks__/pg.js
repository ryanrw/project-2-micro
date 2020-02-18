const pg = jest.genMockFromModule("pg")

const __mockData = {
  rows: [],
  get rowCount() {
    return this.rows.length
  },
}

function __clearMockData(__clearMockData) {
  __mockData.rows = []
}

function __mockReturnData(data) {
  if (!Array.isArray(data)) {
    throw new Error("Input data is not an array")
  }

  __mockData["rows"] = data

  return __mockData
}

class Pool {
  constructor(...pgEnv) {}

  async query(..._allQuery) {
    return __mockData
  }
}

pg.__mockReturnData = __mockReturnData
pg.Pool = Pool
pg.__clearMockData = __clearMockData

module.exports = pg
