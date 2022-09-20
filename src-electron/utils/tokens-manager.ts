export type Token = {
  provider: string
  accessToken: string
  refreshToken: string
}

export class TokensManager {
  static _tokens: Token[]
  
  static getTokenByProvider(providerName: string) {
    if (!this._tokens) return null
    return this._tokens.find((t:Token) => t.provider === providerName)
  }
  
  static setToken(newToken: Token) {
    if (!this._tokens) {
      this._tokens = [] as Token[]
    }
    this._tokens.push(newToken)
  }
}