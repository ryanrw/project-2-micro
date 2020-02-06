// Library
import { Pool } from "pg"

// Type and Interface
import {
  SelectOption,
  UpdateOption,
  GenericObject,
  DeleteOption,
} from "query-builder"

export const database = new Pool()

class QueryBuilder {
  insert(table: string, column: string[]) {
    const parameter = this.getParametersFrom(column)
    const data = this.addSpace(column)

    return `INSERT INTO ${table}(${data}) VALUES (${parameter})`
  }

  select(option: SelectOption) {
    const data = this.addSpace(option.data)
    const from = this.addSpace(option.from)

    if (option.where) {
      const where = this.addSpace(option.where)

      return `SELECT ${data} FROM ${from} WHERE ${where}`
    }

    return `SELECT ${data} FROM ${from}`
  }

  update(option: UpdateOption) {
    const set = this.addSpace(option.set)
    const where = this.addSpace(option.where)

    return `UPDATE ${option.table} SET ${set} WHERE ${where}`
  }

  delete(option: DeleteOption) {
    return `DELETE FROM ${option.table} WHERE ${option.where}`
  }

  objectToQuery(option: GenericObject) {
    const keys = Object.keys(option)

    const assignmentQuery = keys.map(key => `${key}=${option[key]}`)
    const parameterizedQuery = keys.map((key, index) => `${key}=$${index + 1}`)

    return [assignmentQuery, parameterizedQuery]
  }

  private getParametersFrom<T>(data: T[]) {
    return data.map((_, index) => `$${index + 1}`)
  }

  private addSpace(data: string[]) {
    const withSpace = this.withSpace
    const withoutSpace = this.withoutSpace

    return data.map((item, index) =>
      index == 0 ? withoutSpace(item) : withSpace(item)
    )
  }

  private withoutSpace(item: string) {
    return `${item}`
  }

  private withSpace(item: string) {
    return ` ${item}`
  }
}

export default new QueryBuilder()
