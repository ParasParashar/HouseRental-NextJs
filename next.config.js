/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
    experimental:{
        appDir:true,
    },
    images:{
        unoptimized: true,
        domains:[
            'res.cloudinary.com'
        ]
    },
}

module.exports = nextConfig
