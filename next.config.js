/** @type {import('next').NextConfig} */
const nextConfig = {
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
