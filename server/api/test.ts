// server/api/test.ts

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
   const env = Object.fromEntries(
    Object.entries(process.env).map(([key, value]) => [
      key,
      value ? '[SET]' : '[EMPTY]',
    ]),
  )
  return {
    processEnv: {
      NUXT_SITE_TOKEN: process.env.NUXT_SITE_TOKEN,
    },
    env: {
      env : env,
    },

    runtimeConfig: {
      siteToken: config.siteToken,
    },

    cloudflare: {
      available: !!event.context.cloudflare,
      envKeys: event.context.cloudflare?.env
        ? Object.keys(event.context.cloudflare.env)
        : [],
    },
  }
})
