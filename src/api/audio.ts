import { Howl, Howler } from 'howler';

export class AudioController {
  _howlInstance: Howl|null
  _isPaused = true
  _isPlaying = false
  _instanceId: number | undefined = undefined

  constructor(file: string) {
    const options = {
      src: file,
      html5: Howler.usingWebAudio
    }

    this._howlInstance = new Howl(options)
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

  getIsPlaying() {
    return this._isPlaying
  }

  setVolume(volume = 0.3) {
    Howler.volume(volume);
  }

  play() {
    if (!this._howlInstance) return
    this._instanceId = this._howlInstance.play()
    this._isPaused = false
    this._isPlaying = true
  }

  pause() {
    if (!this._howlInstance) return
    this._howlInstance.pause()
    this._isPaused = true
    this._isPlaying = false
  }

  
  stop() {
    if (!this._howlInstance) return
    if (this._howlInstance.playing() || this._isPaused === true) {
      this._howlInstance.stop(this._instanceId)
      this._isPaused = false
      this._isPlaying = false
    }
  }

  seek(seekTo) {
    if (this._instanceId) {
      this._howlInstance?.seek(seekTo, this._instanceId)
    }
  }

  loop(loop) {
    if (this._instanceId) {
      this._howlInstance?.loop(loop, this._instanceId)
    }
  }
} 