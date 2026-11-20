import { TOKENS, UI_TOKENS } from './styles/tokens.js'
import { SURFACES, UI_SURFACES } from './styles/surfaces.js'
import { BASE, CANDIDATES, READABILITY, LAYOUT } from './styles/components.js'
import { WHALE_MOTION } from './styles/motion.js'
import { SURFACE_MODES, CANDIDATE_MODES } from './styles/themes.js'

/** Cascade order is shared by the composer, conversation and history sheet. */
export const CSS = [
  BASE, TOKENS, SURFACES, SURFACE_MODES, '\n',
  CANDIDATES, WHALE_MOTION, CANDIDATE_MODES, '\n', READABILITY, LAYOUT,
  UI_TOKENS,
  UI_SURFACES,
].join('')
