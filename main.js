class Cache {
	/**
	 * 构造 cache
	 */
	constructor(size) {
		if (typeof size != 'number') throw Error('size is number')
		if (size <= 0) throw Error('size must be greater than 0')
		this._size = size
		this._curridx = 0
		this._container = new Array(size)
	}
	get(key) {
		for (const item of this._container) {
			if (item[0] == key) return item[1]
		}
	}
	set(key, value) {
		for (const item of this._container) {
			if (item[0] == key) {
				item[1] = value
				return
			}
		}
		if (this._curridx == this._size - 1) {
			this._curridx = 0 // drop cache
		}
		this._container[this._curridx] = [key, value]
		this._curridx++
	}
	get length() {
		return this._size
	}
}
class NotJS {
  /**
   * 构造插件。
   * @param {unknown} runtime 官方未给出解释。
   */
  constructor(runtime) {
    this.cache = {}
    this.runtime = runtime
    this._formatMessage = runtime.getFormatMessage({
      'zh-cn': {
        'notjs.extensionName': 'Not.js',
        'notjs.parseJSON': '解析 [json]',
        'notjs.asString': '[json] 作为字符串',
        'notjs.asNumber': '[json] 作为数字',
        'notjs.getType': '[json] 的类型'
        // 'ArkosExt.stringEquality': '(区分大小写)[ONE]=[TWO]',
        // 'ArkosExt.directionFromAtoB':
        //   '点x1:[X1]y1:[Y1]朝向点x2:[X2]y2:[Y2]的方向',
        // 'ArkosExt.differenceBetweenDirections': '由方向1[a]到方向2[b]的角度差',
        // 'ArkosExt.distance': '点x1:[X1]y1:[Y1]到点x2:[X2]y2:[Y2]的距离',
        // 'ArkosExt.searchString':
        //   '在[str]中查找[substr]的位置(从位置[pos]开始找)',
        // 'ArkosExt.insertString': '在[str]的第[pos]个字符前插入[substr]',
        // 'ArkosExt.replaceString':
        //   '将[str]中的第[start]个到第[end]个字符,替换为[substr]'
      },
      en: {
        'notjs.extensionName': 'Not.js',
        'notjs.parseJSON': 'parse [json]',
        'notjs.asString': '[json] as string',
        'notjs.asNumber': '[json] as number',
        'notjs.getType': 'type of [json]'
        // 'ArkosExt.stringEquality': '(case sensitive)[ONE]=[TWO]',
        // 'ArkosExt.directionFromAtoB':
        //   'direction from x1:[X1]y1:[Y1]to x2:[X2]y2:[Y2]',
        // 'ArkosExt.differenceBetweenDirections':
        //   'direction[b] minus direction[a]',
        // 'ArkosExt.distance':
        //   'distance between x1:[X1]y1:[Y1]and x2:[X2]y2:[Y2]',
        // 'ArkosExt.searchString': 'position of[substr]in[str],start from[pos]',
        // 'ArkosExt.insertString': 'insert[substr]at[pos]of[str]',
        // 'ArkosExt.replaceString':
        //   'replace from[start]to[end]of[str],with[substr]'
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
        // 解析类
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
        // 类型类
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
        }
        // {
        //   // 判断相等（区分大小写）
        //   opcode: 'strictlyEquals',
        //   blockType: 'Boolean',
        //   text: this.formatMessage('ArkosExt.stringEquality'),
        //   arguments: {
        //     ONE: {
        //       type: 'string',
        //       defaultValue: 'A'
        //     },
        //     TWO: {
        //       type: 'string',
        //       defaultValue: 'a'
        //     }
        //   }
        // },
        // {
        //   // 计算点A到点B的方向
        //   opcode: 'getDirFromAToB',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.directionFromAtoB'),
        //   arguments: {
        //     X1: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     Y1: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     X2: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     Y2: {
        //       type: 'number',
        //       defaultValue: 0
        //     }
        //   }
        // },
        // {
        //   // 计算角b-角a的角度差
        //   opcode: 'differenceBetweenDirections',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.differenceBetweenDirections'),
        //   arguments: {
        //     a: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     b: {
        //       type: 'number',
        //       defaultValue: 0
        //     }
        //   }
        // },
        // {
        //   // 两点距离
        //   opcode: 'disFromAToB',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.distance'),
        //   arguments: {
        //     X1: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     Y1: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     X2: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     Y2: {
        //       type: 'number',
        //       defaultValue: 0
        //     }
        //   }
        // },
        // {
        //   // 查找子字符串，从pos开始
        //   opcode: 'indexof',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.searchString'),
        //   arguments: {
        //     str: {
        //       type: 'string',
        //       defaultValue: 'banana'
        //     },
        //     substr: {
        //       type: 'string',
        //       defaultValue: 'na'
        //     },
        //     pos: {
        //       type: 'number',
        //       defaultValue: 1
        //     }
        //   }
        // },
        // {
        //   // 在字符串中插入子字符串
        //   opcode: 'insertStr',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.insertString'),
        //   arguments: {
        //     str: {
        //       type: 'string',
        //       defaultValue: 'ac'
        //     },
        //     substr: {
        //       type: 'string',
        //       defaultValue: 'b'
        //     },
        //     pos: {
        //       type: 'number',
        //       defaultValue: 2
        //     }
        //   }
        // },
        // {
        //   // 替换字符串中的从..到..的字符串
        //   opcode: 'replaceStr',
        //   blockType: 'reporter',
        //   text: this.formatMessage('ArkosExt.replaceString'),
        //   arguments: {
        //     str: {
        //       type: 'string',
        //       defaultValue: 'ABCDEF'
        //     },
        //     substr: {
        //       type: 'string',
        //       defaultValue: 'XX'
        //     },
        //     start: {
        //       type: 'number',
        //       defaultValue: 3
        //     },
        //     end: {
        //       type: 'number',
        //       defaultValue: 4
        //     }
        //   }
        // },
        // {
        //   //朝..方向旋转..角度
        //   opcode: 'turnDegreesToDir',
        //   blockType: 'command',
        //   text: 'turn[degree]degrees toward direction[dir]',
        //   arguments: {
        //     degree: {
        //       type: 'number',
        //       defaultValue: 0
        //     },
        //     dir: {
        //       type: 'angle',
        //       defaultValue: 0
        //     }
        //   }
        // }
      ]
    }
  }
  // TODO: asNumber
  /**
   * 解析 JSON 内部用到的方法。
   * @param {string} json 
   * @returns {unknown[]} [0] 解析后的 json; [1] 解析后的字符串
   */
  _parseJSON(json) {
    const v = JSON.parse(json)
    const str = JSON.stringify(v)
    this.cache[str] = v
    return [v, str]
  }
  /**
   * 解析 JSON。
   * @param {string} json json。
   * @returns 解析后的字符串。
   */
  parseJSON(args) {
    return this._parseJSON(args.json)[1]
  }
  /**
   * 转换为 string。
   * @param {string} json json。
   * @returns {string} 转换后的 string
   */
  asString(args) {
    return String(this.cache[args.json] || this._parseJSON(args.json)[0])
  }
  /**
   * 获得 json 类型。
   * @param {string} json json。 
   * @returns {string} 类型。
   */
  getType(args) {
    const v = this.cache[args.json] || this._parseJSON(args.json)[0]
    if (v == null) {
      return 'null'
    } else if (['string', 'boolean', 'number'].includes(typeof v)) {
      return typeof v
    } else if (v instanceof Array) {
      return 'array'
    } else return 'object'
  }

  
  strictlyEquals(args) {
    // Note strict equality: Inputs must match exactly: in type, case, etc.
    return args.ONE === args.TWO
  }

  numGreaterThen(args) {
    return args.ONE > args.TWO
  }

  getDirFromAToB(args) {
    const { X1, X2, Y1, Y2 } = args
    let a = (Math.atan((X2 - X1) / (Y2 - Y1)) / Math.PI) * 180.0
    if (Y1 < Y2) return a
    if (Y1 > Y2) {
      a += 180
      if (a > 180.0) a -= 360.0
      return a
    }
    if (X2 > X1) return 90
    if (X2 < X1) return -90
    return NaN
  }

  differenceBetweenDirections(args) {
    const { a, b } = args
    let dif = (b - a) % 360
    if (dif > 180) dif -= 360
    return dif
  }

  disFromAToB(args) {
    const { X1, X2, Y1, Y2 } = args
    return Math.sqrt((X1 - X2) * (X1 - X2) + (Y1 - Y2) * (Y1 - Y2))
  }

  indexof(args) {
    const str = Cast.toString(args.str)
    const substr = Cast.toString(args.substr)
    const a = str.indexOf(substr, args.pos - 1)
    if (a === -1) {
      return ''
    }
    return a + 1
  }

  insertStr(args) {
    const str = Cast.toString(args.str)
    const substr = Cast.toString(args.substr)
    let pos = args.pos - 1
    if (pos < 0) {
      pos = 0
    }
    return str.slice(0, pos) + substr + str.slice(pos)
  }

  replaceStr(args) {
    const str = Cast.toString(args.str)
    const substr = Cast.toString(args.substr)
    let start = Cast.toNumber(args.start)
    let end = Cast.toNumber(args.end)
    if (start > end) {
      const t = end
      end = start
      start = t
    }
    if (start < 1) start = 1
    return str.slice(0, start - 1) + substr + str.slice(end)
  }

  turnDegreesToDir(args, util) {
    //
    // util.target.setDirection(util.target.direction + degrees);
    console.log('---util-------------\n', util)
    console.log('---args-------------\n', args)
    console.log('---runtime-------------\n', this.runtime)
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
      'notjson.extensionName': 'Not.js',
      'hcn.description': '优秀的 Gandi JSON 处理器。'
    },
    en: {
      'hcn.extensionName': 'Not.js',
      'hcn.description': 'Next-generation JSON processor for Gandi IDE.'
    }
  }
}
