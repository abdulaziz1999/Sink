export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization')?.replace(/^Bearer\s+/, '')
  if (event.path.startsWith('/api/') && token !== useRuntimeConfig(event).siteToken) {
    const config = useRuntimeConfig(event)

    // 2. Jalankan log TERLEBIH DAHULU agar tercatat di Cloudflare
    console.log("=== DEBUG CLOUDFLARE ENV ===")
    console.log("Token yang kamu ketik di browser (token):", token)
    console.log("Token asli dari Header:", getHeader(event, 'authorization'))
    console.log("Token yang dibaca Nuxt Config (siteToken):", config.siteToken)
    console.log("Token langsung dari process.env:", process.env.NUXT_SITE_TOKEN)
    console.log("=============================")
    throw createError({
      status: 401,
      statusText: 'Unauthorized',
    })
  }
  if (token && token.length < 8) {
    throw createError({
      status: 401,
      statusText: 'Token is too short',
    })
  }
})
