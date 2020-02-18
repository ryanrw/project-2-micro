import { Request } from "express"

export interface CustomHeaderReq extends Request {
  headers: {
    "x-user-id": string
    "x-username": string
  }
}
