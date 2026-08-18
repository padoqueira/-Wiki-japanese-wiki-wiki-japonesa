import { ObsidianHtmlCompatibility } from "./quartz/custom/obsidianHtml"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
config.plugins.transformers.unshift(ObsidianHtmlCompatibility())

export default config
export const layout = await loadQuartzLayout()
