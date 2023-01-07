export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  permissions?: string[]
  nickName: string
  avatar?: string
  userInfo: {
    id: string
  }
}
