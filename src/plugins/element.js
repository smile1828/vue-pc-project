import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Link,
  Icon,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  DatePicker,
  TimeSelect,
  TimePicker,
  Table,
  TableColumn,
  Pagination,
  Tabs,
  TabPane,
  Dialog,
  Tag,
  Loading,
  Message,
  MessageBox
} from 'element-ui'

import './element-variables.scss'

Vue.use(Row).use(Col)
Vue.use(Button).use(Link).use(Icon)
Vue.use(Form).use(FormItem)
Vue.use(Input)
Vue.use(Radio).use(RadioGroup)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Select).use(Option)
Vue.use(DatePicker).use(TimeSelect).use(TimePicker)
Vue.use(Table).use(TableColumn)
Vue.use(Pagination)
Vue.use(Tabs).use(TabPane)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
const { alert, confirm } = MessageBox
Vue.prototype.$alert = alert
Vue.prototype.$confirm = confirm
