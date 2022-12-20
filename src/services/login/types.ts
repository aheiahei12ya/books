export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  permissions?: string[]
  nickName: string
  userInfo: {
    id: string
  }
}
