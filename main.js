
/**
 * Copyright(c) FurryR(凌) @ Simplicity Studio 2023.
 * This program was under the MIT License.
 */
class JSONCache {
  /**
   * 构造 Cache。
   * @param {number} size
   */
  constructor(size) {
    if (typeof size != 'number') throw Error('size must be number')
    if (size <= 0) throw Error('size must be greater than 0')
    if (!Number.isInteger(size)) throw Error('size must be a integer')
    this._size = size
    this._container = new Map()
  }
  /**
   * 获得 key 的缓存。
   * @param {string} key key。
   * @returns {unknown?} 返回 undefined 代表未命中缓存。
   */
  get(key) {
    return this._container.get(key)
  }
  /**
   * 更新 key。
   * @param {string} key key。
   * @param {unknown} value key 对应的值。
   * @return {[string, unknown]} [0] 键; [1] 值
   */
  set(key, value) {
    if (value === undefined) return
    if (this._container.has(key)) return this.get(key)
    if (this._container.size == this._size)
      this._container.delete(this._container.keys().next().value) // drop cache
    this._container.set(key, value)
    return [key, value]
  }
  /**
   * 替换 key。
   * @param {string} oldkey 旧 key。
   * @param {string} newkey 新 key。
   * @param {unknown} value 值。
   * @return {[string, unknown]} [0] 键; [1] 值
   */
  replace(oldkey, newkey, value) {
    if (value === undefined) return
    if (this._container.has(oldkey)) {
      this._container.delete(oldkey)
      this._container.set(newkey, value)
    } else return this.set(newkey, value)
  }
  /**
   * 获得 cache 的大小。
   * @returns {number} cache 的大小。
   */
  get size() {
    return this._size
  }
}
class NotJS {
  /**
   * 构造插件。
   * @param {unknown} runtime 官方未给出解释。
   */
  constructor(runtime) {
    this.cache = new JSONCache(50)
    this.runtime = runtime
    this._formatMessage = runtime.getFormatMessage({
      'zh-cn': {
        'notjs.extensionName': 'Not.js',
        'notjs.title.parse': '解析',
        'notjs.parseJSON': '解析 [json]',
        'notjs.title.type': '类型',
        'notjs.asString': '[json] 作为字符串',
        'notjs.asNumber': '[json] 作为数字',
        'notjs.asBoolean': '[json] 作为布尔值',
        'notjs.getType': '[json] 的类型',
        'notjs.title.member': '成员',
        'notjs.getMember': '[json] 的成员 [member]',
        'notjs.setMember': '设定 [json] 的成员 [member] 为 [value]',
        'notjs.removeMember': '删除 [json] 的成员 [member]',
        'notjs.exists': '[json] 存在成员 [member]?',
        'notjs.length': '[json] 的长度',
        'notjs.keys': '[json] 的全部键',
        'notjs.values': '[json] 的全部值'
      },
      en: {
        'notjs.extensionName': 'Not.js',
        'notjs.title.parse': 'Parse',
        'notjs.parseJSON': 'parse [json]',
        'notjs.title.type': 'Type',
        'notjs.asString': '[json] as string',
        'notjs.asNumber': '[json] as number',
        'notjs.asBoolean': '[json] as boolean',
        'notjs.getType': 'type of [json]',
        'notjs.title.member': 'Member',
        'notjs.getMember': 'get member [member] of [json]',
        'notjs.setMember': 'set member [member] of [json] to [value]',
        'notjs.removeMember': 'remove member [member] of [json]',
        'notjs.exists': 'member [member] exists in [json]?',
        'notjs.length': 'length of [json]',
        'notjs.keys': 'keys of [json]',
        'notjs.values': 'values of [json]'
      }
    })
  }
  /**
   * 格式化消息。
   * @param {string} id
   * @returns {string} 格式化完成的消息。
   */
  formatMessage(id) {
    return this._formatMessage({
      id,
      default: id,
      description: id
    })
  }
  /**
   * 获取插件的信息。
   * @returns {unknown} 插件的信息
   */
  getInfo() {
    return {
      id: 'notJs' /* 扩展 id */,
      name: this.formatMessage('notjs.extensionName') /* 拓展名 */,
      color1: '#8A8A8A' /* 颜色 */,
      blocks: [
        // 解析
        `---${this.formatMessage('notjs.title.parse')}`,
        {
          // 解析 json
          opcode: 'parseJSON',
          blockType: 'reporter',
          text: this.formatMessage('notjs.parseJSON'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        // 类型
        `---${this.formatMessage('notjs.title.type')}`,
        {
          // 变为 string
          opcode: 'asString',
          blockType: 'reporter',
          text: this.formatMessage('notjs.asString'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '""'
            }
          }
        },
        {
          // 变为 number
          opcode: 'asNumber',
          blockType: 'reporter',
          text: this.formatMessage('notjs.asNumber'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '0'
            }
          }
        },
        {
          // 变为 boolean
          opcode: 'asBoolean',
          blockType: 'Boolean',
          text: this.formatMessage('notjs.asBoolean'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: 'true'
            }
          }
        },
        {
          // 取类型
          opcode: 'getType',
          blockType: 'reporter',
          text: this.formatMessage('notjs.getType'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        `---${this.formatMessage('notjs.title.member')}`,
        {
          // 获得成员
          opcode: 'getMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.getMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 设定成员
          opcode: 'setMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.setMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            },
            value: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 删除成员
          opcode: 'removeMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.removeMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 判断成员是否存在
          opcode: 'exists',
          blockType: 'Boolean',
          text: this.formatMessage('notjs.exists'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 获得长度
          opcode: 'length',
          blockType: 'reporter',
          text: this.formatMessage('notjs.length'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 获得键
          opcode: 'keys',
          blockType: 'reporter',
          text: this.formatMessage('notjs.keys'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 获得值
          opcode: 'values',
          blockType: 'reporter',
          text: this.formatMessage('notjs.values'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        }
      ]
    }
  }
  /**
   * 解析 JSON 内部用到的方法。
   * @param {string} json
   * @returns {[string?, unknown?]} [0] 解析后的字符串; [1] 解析后的 json
   */
  _parseJSON(json) {
    let v = this.cache.get(json)
    if (v === undefined) {
      try {
        const p = JSON.parse(json)
        return this.cache.set(JSON.stringify(p), p)
      } catch (_) {
        return []
      }
    }
    return [json, v]
  }
  // 解析
  /**
   * 解析 JSON。
   * @param {string} json json。
   * @returns 解析后的字符串。
   */
  parseJSON(args) {
    const v = this._parseJSON(args.json)[0]
    if (v === undefined) return ''
    return v
  }
  // 类型
  /**
   * 转换为 string。
   * @param {string} json json。
   * @returns {string} 转换后的 string
   */
  asString(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return '' // check
    if (v == null || ['string', 'boolean', 'number'].includes(typeof v)) {
      return String(v)
    } else return JSON.stringify(v)
  }
  /**
   * 转换为 number。
   * @param {string} json json。
   * @returns {number} 转换后的 number。
   */
  asNumber(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return '' // check
    if (['boolean', 'number'].includes(typeof v)) {
      return Number(v)
    } else return NaN
  }
  /**
   * 转换为 boolean。
   * @param {string} json json。
   * @returns {boolean} 转换后的 boolean。
   */
  asBoolean(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return '' // check
    if (['boolean', 'number'].includes(typeof v)) {
      return Boolean(v)
    } else if (v == null) {
      return false
    } else return v.length != 0
  }
  /**
   * 获得 json 类型。
   * @param {string} json json。
   * @returns {string} 类型。
   */
  getType(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return '' // check
    if (v == null) {
      return 'null'
    } else if (['string', 'boolean', 'number'].includes(typeof v)) {
      return typeof v
    } else if (v instanceof Array) {
      return 'array'
    } else return 'object'
  }
  // 成员
  /**
   * 获得 json 成员。
   * @param {string} json json。
   * @param {string} member 成员名。
   * @returns {string} json 内容。
   */
  getMember(args) {
    const v = this._parseJSON(args.json)
    if (v.length == 0) return '' // check
    if (v[1] instanceof Array || typeof v[1] == 'string') {
      // array
      const idx = parseInt(args.member)
      if (v[1][idx] === undefined) return this._parseJSON('null')[0] // check
      return this._parseJSON(v[1][idx])[0]
    } else if (v[1] instanceof Object) {
      // object
      if (v[1][args.member] === undefined) return this._parseJSON('null')[0] // check
      return this._parseJSON(v[1][args.member])[0]
    } else {
      return v[0]
    }
  }
  /**
   * 设定 json 成员。
   * @param {string} json json。
   * @param {string} member 成员名。
   * @param {string} value 值。
   * @returns {string} 变更后的 json 内容。
   */
  setMember(args) {
    const v = this._parseJSON(args.json)
    if (v.length == 0) return '' // check
    if (v[1] instanceof Array) {
      const idx = parseInt(args.member)
      if (isNaN(idx) || idx < 0) return v[0] // check
      const c = this._parseJSON(args.value)[1]
      if (c === undefined) return '' // check
      v[1][idx] = c
    } else if (v[1] instanceof Object) {
      // object
      const c = this._parseJSON(args.value)[1]
      if (c === undefined) return '' // check
      v[1][args.member] = c
    } else {
      return v[0]
    }
    return this.cache.replace(v[0], JSON.stringify(v[1]), v[1])[0]
  }
  /**
   * 删除 json 成员。
   * @param {string} json json。
   * @param {string} member 成员名。
   * @returns {string} 变更后的 json 内容。
   */
  removeMember(args) {
    const v = this._parseJSON(args.json)
    if (v.length == 0) return '' // check
    if (v[1] instanceof Array) {
      const idx = parseInt(args.member)
      if (v[1][idx] !== undefined) {
        if (idx == v[1].length - 1) {
          v[1] = v[1].slice(0, -1)
        } else if (idx == 0) {
          v[1] = v[1].slice(1)
        } else {
          delete v[idx]
        }
      }
    } else if (v[1] instanceof Object) {
      // object
      delete v[1][args.member]
    } else {
      return v[0]
    }
    return this.cache.replace(v[0], JSON.stringify(v[1]), v[1])[0]
  }
  /**
   * 判断 json 成员是否存在。
   * @param {string} json json。
   * @param {string} member member。
   * @returns {boolean} 是否存在。
   */
  exists(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return false // check
    if (v instanceof Array) {
      const idx = parseInt(args.member)
      return v[idx] !== undefined
    } else if (v instanceof Object) {
      // object
      return v[args.member] !== undefined
    }
    return false
  }
  /**
   * 获得 json 的长度。
   * @param {string} json json。
   * @returns {number} json 长度。
   */
  length(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return // check
    if (v instanceof Object || v instanceof Array || typeof v == 'string') {
      return v.length
    } else if (v instanceof Object) {
      return Object.keys(v).length
    }
    return NaN
  }
  /**
   * 获得 json 的键。
   * @param {string} json json。
   * @returns {string} 键。实际上是 JSON Array。
   */
  keys(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return // check
    if (v instanceof Object || v instanceof Array || typeof v == 'string') {
      const d = Object.keys(v)
      return this.cache.set(JSON.stringify(d), d)[0]
    }
    return ''
  }
  /**
   * 获得 json 的值。
   * @param {string} json json。
   * @returns {string} 值。实际上是 JSON Array。
   */
  values(args) {
    const v = this._parseJSON(args.json)[1]
    if (v === undefined) return // check
    if (v instanceof Object || v instanceof Array || typeof v == 'string') {
      const d = Object.values(v)
      return this.cache.set(JSON.stringify(d), d)[0]
    }
    return ''
  }
}

window.tempExt = {
  Extension: NotJS,
  info: {
    name: 'notjs.extensionName',
    description: 'notjs.description',
    extensionId: 'notJs',
    featured: true,
    disabled: false,
    collaborator: 'FurryR @ Simplicity Studio'
  },
  l10n: {
    'zh-cn': {
      'notjs.extensionName': 'Not.js',
      'notjs.description': '次世代的 Gandi JSON 处理器。'
    },
    en: {
      'notjs.extensionName': 'Not.js',
      'notjs.description': 'Next-generation JSON processor for Gandi IDE.'
    }
  }
}
