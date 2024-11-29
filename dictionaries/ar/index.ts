import navigation from './navigation'
import tools from './tools'
import common from './common'
import messages from './messages'
import header from './header'
import home from './home'
import word from './word'
import powerpoint from './powerpoint'
import excel from './excel'
import pdf from './pdf'

const dictionary = {
  navigation,
  tools,
  common,
  messages,
  header,
  home,
  word,
  powerpoint,
  excel,
  pdf
} as const;

export default dictionary;