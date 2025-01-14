import LbpFormRadio from './lbp-form-radio.js'
import { genUUID } from '../../utils/element.js'

const defaultItems = [
  {
    value: '选项A'
  },
  {
    value: '选项B'
  },
  {
    value: '选项C'
  }
]

export default {
  name: 'lbp-form-radio-group',
  props: {
    aliasName: {
      type: String,
      default: `标题演示-${genUUID().slice(0, 6)}`,
      editor: {
        type: 'a-input',
        label: '填写标题',
        require: true
      }
    },
    items: {
      type: Array,
      default: () => defaultItems,
      editor: {
        type: 'lbs-prop-text-enum-editor',
        label: '选项列表',
        require: true,
        defaultPropValue: defaultItems
      }
    },
    type: {
      type: String,
      default: 'radio',
      editor: {
        type: 'a-radio-group',
        label: '选择模式',
        require: true,
        prop: {
          options: [
            { label: '单选', value: 'radio' },
            { label: '多选', value: 'checkbox' }
          ],
          name: 'mode'
        }
      }
    }
  },
  data () {
    return {
      value: this.type === 'radio' ? '' : [],
      uuid: undefined
    }
  },
  computed: {
    value_ () {
      if (this.type === 'radio') {
        return this.value
      } else {
        const value = (Array.isArray(this.value) && this.value) || []
        return value.join(',')
      }
    }
  },
  watch: {
    type (type) {
      this.value = type === 'radio' ? '' : []
    }
  },
  mounted () {
    this.uuid = this.$el.dataset.uuid
  },
  methods: {
    /**
     * @param {String, Number} val radioValue or checkboxValue
     */
    onChange (val) {
      switch (this.type) {
        case 'radio':
          this.toggleRadio(val)
          break
        case 'checkbox':
          this.toggleCheckbox(val)
          break
        default:
          break
      }
    },
    toggleCheckbox (val) {
      const index = this.value.indexOf(val)
      if (index === -1) {
        this.value.push(val)
      } else {
        this.value.splice(index, 1)
      }
    },
    toggleRadio (val) {
      this.value = val
    }
  },
  render () {
    return (
      <div>
        <h3>{this.aliasName}</h3>
        <input type="text" hidden value={this.value_} data-type="lbp-form-input" data-uuid={this.uuid} />
        {
          this.items.map(item => (
            <LbpFormRadio
              vertical
              value={item.value}
              checked={this.value === item.value}
              aliasName={this.aliasName}
              type={this.type}
              onChange={this.onChange}
            >{item.value}
            </LbpFormRadio>
          ))
        }
      </div>
    )
  }
}
