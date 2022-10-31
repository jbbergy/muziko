import { Howl, Howler } from 'howler';

export class AudioController {
  private _audioCtx: AudioContext | null
  private _mediaElem: HTMLMediaElement | null
  private _mediaNode: MediaElementAudioSourceNode | null
  private _gainNode: GainNode | null

  constructor(file: string) {

    if (!file) {
      throw `AudioController error : 'file' parameter is mandatory`
    }

    try {
      this._audioCtx = new AudioContext()
      if (!this._audioCtx) throw 'error'
    } catch (error) {
      throw `AudioController error : unable to define AudioContext - ${error}`
    }

    try {
      this._mediaElem = document.createElement('audio')
      if (!this._mediaElem) throw 'error'
      this._mediaElem.src = file
      this._mediaElem.crossOrigin = 'anonymous'
    } catch (error) {
      throw `AudioController error : unable to create HTMLMediaElement - ${error}`
    }

    try {
      this._mediaNode = new MediaElementAudioSourceNode(
        this._audioCtx, {
        mediaElement: this._mediaElem
      })
      if (!this._mediaNode) throw 'error'
    } catch (error) {
      throw `AudioController error : unable to define MediaElementAudioSourceNode - ${error}`
    }

    try {
      this._gainNode = new GainNode(this._audioCtx)
      this.setVolume(0.3)
      if (!this._gainNode) throw 'error'
    } catch (error) {
      throw `AudioController error : unable to define GainNode - ${error}`
    }

    try {
      this._mediaNode.connect(this._gainNode).connect(this._audioCtx.destination)
    } catch (error) {
      throw `AudioController error : unable to create node chain - ${error}`
    }

    this._audioCtx.onstatechange = () => {
      console.log('_audioCtx state', this._audioCtx?.state);
    };
  }

  destroy() {
    console.log('AudioController.destroy()')
    if (this._mediaNode) {
      this._mediaNode.disconnect()
      this._mediaNode = null
    }
    if (this._gainNode) {
      this._gainNode.disconnect()
      this._gainNode = null
    }
    if (this._audioCtx) {
      this._audioCtx.close()
      this._audioCtx = null
    }
    if (this._mediaElem) {
      this._mediaElem.remove()
      this._mediaElem = null
    }
  }

  on(eventName: string, callback: Function) {
    if (!eventName) return
    if (callback) return
    console.log('on', eventName, callback)
    this._mediaElem?.addEventListener(eventName, callback)
  }

  getInstance() {
    return this._audioCtx
  }

  setVolume(value: number) {
    if (!this._audioCtx) return
    if (!this._gainNode) return
    this._gainNode.gain.value = value
    console.log('AudioController.setVolume()', value)
  }

  getIsPaused() {
    return this._audioCtx?.state === 'suspended'
  }

  getIsPlaying() {
    return this._audioCtx?.state === 'running'
  }

  seek(value: number) {
    console.log('TODO: seek(', value, ')')
  }

  pause() {
    if (!this._audioCtx) return
    if (!this._mediaElem) return
    this._audioCtx.suspend()
    console.log('AudioController.pause()')
  }

  play() {
    if (!this._audioCtx) return
    if (!this._mediaElem) return

    if (this.getIsPaused()) {
      this._audioCtx.resume()
    } else {
      this._mediaElem.play()
    }
    console.log('AudioController.play()')
  }

} 