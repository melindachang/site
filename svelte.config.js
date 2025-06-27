import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import vercel from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const sassPath = `${dirname(fileURLToPath(import.meta.url))}/src/lib/scss/`

const config = {
  preprocess: [
    vitePreprocess({
      style: {
        css: {
          preprocessorOptions: {
            scss: {
              charset: false,
              additionalData: `@use "${sassPath}/variables" as *;
                    @use "${sassPath}/breakpoints" as *;`,
            },
          },
        },
      },
    }),
    mdsvex(mdsvexConfig),
  ],
  kit: { adapter: vercel(), alias: { $notes: 'src/notes' } },
  extensions: ['.svelte', '.md'],
}

export default config
