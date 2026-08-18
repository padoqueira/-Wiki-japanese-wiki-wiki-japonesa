import { componentRegistry } from "./quartz/components/registry"
import { ObsidianHtmlCompatibility } from "./quartz/custom/obsidianHtml"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

componentRegistry.setOptionOverrides("explorer", {
  title: "学習ナビゲーション",
  folderDefaultState: "open",
  folderClickBehavior: "link",
  useSavedState: true,
})

componentRegistry.setOptionOverrides("graph", {
  localGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.88,
    repelForce: 0.36,
    centerForce: 0.42,
    linkDistance: 42,
    fontSize: 0.72,
    opacityScale: 1.15,
    showTags: false,
    removeTags: [],
    focusOnHover: true,
    enableRadial: true,
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.45,
    centerForce: 0.28,
    linkDistance: 38,
    fontSize: 0.7,
    opacityScale: 1.1,
    showTags: false,
    removeTags: [],
    focusOnHover: true,
    enableRadial: true,
  },
})

const config = await loadQuartzConfig()
config.plugins.transformers.unshift(ObsidianHtmlCompatibility())

export default config
export const layout = await loadQuartzLayout()
