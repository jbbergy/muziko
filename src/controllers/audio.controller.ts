import { Howl, Howler } from 'howler';

export class AudioController {
  _howlInstance: Howl|null
  _isPaused = true

  constructor(file:string) {
    this._howlInstance = new Howl({
      src: file,
      html5: Howler.usingWebAudio,
    })
  }

  destroy() {
    this._howlInstance = null
  }

  getInstance() {
    return this._howlInstance
  }

  getIsPaused() {
    return this._isPaused
  }

  setVolume(volume = 30) {
    Howler.volume(volume);
  }

  play() {
    if (!this._howlInstance) return
    this._howlInstance.play()
    this._isPaused = false
  }

  pause() {
    if (!this._howlInstance) return
    this._howlInstance.pause()
    this._isPaused = true
  }

  
  stop() {
    if (!this._howlInstance) return
    if (this._howlInstance.playing() || this._isPaused === true) {
      this._howlInstance.stop()
      this._isPaused = false
    }
  }
} 