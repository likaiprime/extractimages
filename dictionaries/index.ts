import ar from './ar'
import de from './de'
import en from './en'
import es from './es'
import fr from './fr'
import ja from './ja'
import ko from './ko'
import nl from './nl'
import pl from './pl'
import pt from './pt'
import tw from './tw'
import vi from './vi'
import zh from './zh'

export const dictionaries = {
  ar,
  de,
  en,
  es,
  fr,
  ja,
  ko,
  nl,
  pl,
  pt,
  tw,
  vi,
  zh
} as const;

export type Lang = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries[Lang];

export default dictionaries;