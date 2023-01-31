import { ResolveOptions } from "webpack"

export function buildResolvers(): ResolveOptions {
  return {
    // тут указываются типы расширений файлов, для которых при импорте я не буду указывать расширение. То есть не index.js, а просто index
    extensions: ['.tsx', '.ts', '.js'],
  }
}