// Mock products data - shared between Home and ProductGrid components

// Products organized by tabs for Home component
export const mockProductsByTab = {
    best: [
        {
            id: 1,
            name: "Shim QADAM",
            brand: "POLO",
            color: "#2563eb",
            tag: "HOT",
            category: "Shimlar",
            description: "Yuqori sifatli velvet materialdan tayyorlangan, qulay va zamonaviy shim. Har qanday faslga mos.",
            price: 295800,
            originalPrice: 348000,
            discount: 15,
            images: [
                "/images/spotlights/pants-cover.jpg",
                "/images/spotlights/shim.jpeg",
                "/images/spotlights/shim2.jpeg"
            ],
            sizes: [
                { size: "S", stock: 10 },
                { size: "M", stock: 15 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
        {
            id: 2,
            name: "Shalvar OD",
            brand: "UrbanFlex",
            color: "#1f2937",
            tag: "HOT",
            category: "Shimlar",
            description: "Qulay va zamonaviy dizaynga ega shalvar. Kun davomida qulay kiyish uchun mo'ljallangan.",
            price: 328000,
            originalPrice: 470000,
            discount: 30,
            images: [
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim4.jpeg"
            ],
            sizes: [
                { size: "S", stock: 8 },
                { size: "M", stock: 12 },
                { size: "L", stock: 15 },
                { size: "XL", stock: 10 }
            ]
        },
        {
            id: 3,
            name: "Kurtka Velvet",
            brand: "NordicWave",
            color: "#dc2626",
            tag: "HOT",
            category: "Kurtkalar",
            description: "Qishki mavsum uchun ideal velvet kurtka. Issiqlik va uslubni birlashtirgan.",
            price: 308000,
            originalPrice: 420000,
            discount: 27,
            images: [
                "/images/spotlights/shoes2.jpeg",
                "/images/spotlights/shoes3.jpeg",
                "/images/spotlights/shoes4.jpeg"
            ],
            sizes: [
                { size: "M", stock: 10 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
        {
            id: 4,
            name: "Keng Shalvar \"Yulduz Bo'l\"",
            brand: "Starline",
            tag: "HOT",
            category: "Shimlar",
            description: "Keng bichimli zamonaviy shalvar. Har qanday tana tuzilmasiga mos tushadi.",
            price: 260000,
            originalPrice: 315000,
            discount: 17,
            images: [
                "/images/spotlights/cover-sh.jpeg",
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim9.jpeg"
            ],
            sizes: [
                { size: "S", stock: 10 },
                { size: "M", stock: 15 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
        {
            id: 5,
            name: "Plashovka (Simple.Club)",
            brand: "Simple Club",
            tag: "HOT",
            category: "Kiyimlar",
            description: "Yengil va qulay plashovka. Kundalik kiyish uchun ideal.",
            price: 301000,
            originalPrice: 350000,
            discount: 14,
            images: [
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim3.jpeg"
            ],
            sizes: [
                { size: "S", stock: 8 },
                { size: "M", stock: 12 },
                { size: "L", stock: 10 }
            ]
        },
        {
            id: 6,
            name: "Kurtka Ayıq",
            brand: "PolarBear",
            tag: "HOT",
            category: "Kurtkalar",
            description: "Qishki mavsum uchun mo'ljallangan issiq kurtka. Yuqori sifatli materialdan tayyorlangan.",
            price: 336000,
            originalPrice: 420000,
            discount: 20,
            images: [
                "/images/spotlights/cover3.webp",
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim.jpeg"
            ],
            sizes: [
                { size: "M", stock: 10 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
    ],
    sale: [
        {
            id: 7,
            name: "Sweatshirt 15/15",
            brand: "PrimeWear",
            color: "#059669",
            tag: "SALE",
            category: "Kiyimlar",
            description: "Qulay va uslubli sweatshirt. Sport uslubi va kundalik kiyish uchun ideal.",
            price: 240000,
            originalPrice: 300000,
            discount: 20,
            images: [
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim6.jpeg"
            ],
            sizes: [
                { size: "S", stock: 10 },
                { size: "M", stock: 15 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
        {
            id: 8,
            name: "Simple Club",
            brand: "Simple Club",
            color: "#ea580c",
            tag: "SALE",
            category: "Shimlar",
            description: "Soddalashtirilgan dizaynga ega shim. Qulay va bardoshli materialdan tayyorlangan.",
            price: 191750,
            originalPrice: 295000,
            discount: 35,
            images: [
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim9.jpeg"
            ],
            sizes: [
                { size: "S", stock: 8 },
                { size: "M", stock: 12 },
                { size: "L", stock: 10 }
            ]
        },
        {
            id: 9,
            name: "Jordan Low Sky",
            brand: "AirBold",
            tag: "SALE",
            category: "Krassovkalar",
            description: "Jordan Low Sky - zamonaviy dizayn va qulaylikni birlashtirgan yuqori sifatli krassovkalar.",
            price: 265000,
            originalPrice: 330000,
            discount: 20,
            images: [
                "/images/spotlights/shoes5.jpeg",
                "/images/spotlights/shoes4.jpeg",
                "/images/spotlights/shoes3.jpeg"
            ],
            sizes: [
                { size: "39", stock: 9 },
                { size: "42", stock: 4 },
                { size: "43", stock: 7 }
            ]
        },
        {
            id: 10,
            name: "Hoodie Classic",
            brand: "UrbanFlex",
            tag: "SALE",
            category: "Kiyimlar",
            description: "Klassik dizaynga ega hoodie. Qulay va uslubli kundalik kiyish uchun ideal.",
            price: 228000,
            originalPrice: 285000,
            discount: 20,
            images: [
                "/images/spotlights/shim9.jpeg",
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim4.jpeg"
            ],
            sizes: [
                { size: "S", stock: 10 },
                { size: "M", stock: 15 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
    ],
    new: [
        {
            id: 11,
            name: "Kargo Shortik",
            brand: "PrimeWear",
            color: "#7c3aed",
            tag: "NEW",
            category: "Shortiklar",
            description: "Yangi dizaynga ega kargo shortik. Qulay va funksional.",
            price: 289000,
            originalPrice: 346000,
            discount: 16,
            images: [
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim3.jpeg"
            ],
            sizes: [
                { size: "S", stock: 10 },
                { size: "M", stock: 15 },
                { size: "L", stock: 12 }
            ]
        },
        {
            id: 12,
            name: "Kurtka Classic",
            brand: "NordicWave",
            tag: "NEW",
            category: "Kurtkalar",
            description: "Klassik dizaynga ega yangi kurtka. Zamonaviy va uslubli.",
            price: 301000,
            originalPrice: 350000,
            discount: 14,
            images: [
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim9.jpeg",
                "/images/spotlights/shim2.jpeg"
            ],
            sizes: [
                { size: "M", stock: 10 },
                { size: "L", stock: 12 },
                { size: "XL", stock: 8 }
            ]
        },
        {
            id: 13,
            name: "Loose Fit T-shirt",
            brand: "CottonEase",
            tag: "NEW",
            category: "Futbolkalar",
            description: "Keng bichimli qulay futbolka. Har qanday kundalik holat uchun ideal.",
            price: 165000,
            originalPrice: 0,
            discount: 0,
            images: [
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim.jpeg",
                "/images/spotlights/shim3.jpeg"
            ],
            sizes: [
                { size: "S", stock: 15 },
                { size: "M", stock: 20 },
                { size: "L", stock: 18 },
                { size: "XL", stock: 12 }
            ]
        },
        {
            id: 14,
            name: "Sneakers Cloud",
            brand: "CloudStep",
            tag: "NEW",
            category: "Krassovkalar",
            description: "Yengil va qulay sneakers. Kun davomida qulay yurish uchun mo'ljallangan.",
            price: 275000,
            originalPrice: 0,
            discount: 0,
            images: [
                "/images/spotlights/shoes5.jpeg",
                "/images/spotlights/shoes4.jpeg",
                "/images/spotlights/shoes3.jpeg"
            ],
            sizes: [
                { size: "39", stock: 10 },
                { size: "40", stock: 12 },
                { size: "41", stock: 8 },
                { size: "42", stock: 15 }
            ]
        },
        {
            id: 15,
            name: "Sneakers Cloud Pro",
            brand: "CloudStep",
            tag: "NEW",
            category: "Krassovkalar",
            description: "Professional darajadagi sneakers. Sport va kundalik yurish uchun ideal.",
            price: 275000,
            originalPrice: 0,
            discount: 0,
            images: [
                "/images/spotlights/shoes6.jpeg",
                "/images/spotlights/shoes3.jpeg",
                "/images/spotlights/shoes4.jpeg"
            ],
            sizes: [
                { size: "40", stock: 10 },
                { size: "41", stock: 12 },
                { size: "42", stock: 8 }
            ]
        },
    ],
}

// Flat array of all products for ProductGrid component (30 products)
export const mockProducts = [
    {
        id: 1,
        name: "Shim QADAM",
        brand: "POLO",
        color: "#2563eb",
        tag: "HOT",
        category: "Shimlar",
        description: "Yuqori sifatli velvet materialdan tayyorlangan, qulay va zamonaviy shim. Har qanday faslga mos.",
        price: 295800,
        originalPrice: 348000,
        discount: 15,
        images: [
            "/images/spotlights/pants-cover.jpg",
            "/images/spotlights/shim.jpeg",
            "/images/spotlights/shim2.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 2,
        name: "Shalvar OD",
        brand: "UrbanFlex",
        color: "#1f2937",
        tag: "HOT",
        category: "Shimlar",
        description: "Qulay va zamonaviy dizaynga ega shalvar. Kun davomida qulay kiyish uchun mo'ljallangan.",
        price: 328000,
        originalPrice: 470000,
        discount: 30,
        images: [
            "/images/spotlights/shim2.jpeg",
            "/images/spotlights/shim3.jpeg",
            "/images/spotlights/shim4.jpeg"
        ],
        sizes: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 15 },
            { size: "XL", stock: 10 }
        ]
    },
    {
        id: 3,
        name: "Kurtka Velvet",
        brand: "NordicWave",
        color: "#dc2626",
        tag: "HOT",
        category: "Kurtkalar",
        description: "Qishki mavsum uchun ideal velvet kurtka. Issiqlik va uslubni birlashtirgan.",
        price: 308000,
        originalPrice: 420000,
        discount: 27,
        images: [
            "/images/spotlights/shoes2.jpeg",
            "/images/spotlights/shoes3.jpeg",
            "/images/spotlights/shoes4.jpeg"
        ],
        sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 4,
        name: "Keng Shalvar \"Yulduz Bo'l\"",
        brand: "Starline",
        tag: "HOT",
        category: "Shimlar",
        description: "Keng bichimli zamonaviy shalvar. Har qanday tana tuzilmasiga mos tushadi.",
        price: 260000,
        originalPrice: 315000,
        discount: 17,
        images: [
            "/images/spotlights/cover-sh.jpeg",
            "/images/spotlights/cover-sh1.jpeg",
            "/images/spotlights/shim9.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 5,
        name: "Plashovka (Simple.Club)",
        brand: "Simple Club",
        tag: "HOT",
        category: "Kiyimlar",
        description: "Yengil va qulay plashovka. Kundalik kiyish uchun ideal.",
        price: 301000,
        originalPrice: 350000,
        discount: 14,
        images: [
            "/images/spotlights/shim6.jpeg",
            "/images/spotlights/shim4.jpeg",
            "/images/spotlights/shim3.jpeg"
        ],
        sizes: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 10 }
        ]
    },
    {
        id: 6,
        name: "Kurtka Ayıq",
        brand: "PolarBear",
        tag: "HOT",
        category: "Kurtkalar",
        description: "Qishki mavsum uchun mo'ljallangan issiq kurtka. Yuqori sifatli materialdan tayyorlangan.",
        price: 336000,
        originalPrice: 420000,
        discount: 20,
        images: [
            "/images/spotlights/cover3.webp",
            "/images/spotlights/cover-sh1.jpeg",
            "/images/spotlights/shim.jpeg"
        ],
        sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 7,
        name: "Sweatshirt 15/15",
        brand: "PrimeWear",
        color: "#059669",
        tag: "SALE",
        category: "Kiyimlar",
        description: "Qulay va uslubli sweatshirt. Sport uslubi va kundalik kiyish uchun ideal.",
        price: 240000,
        originalPrice: 300000,
        discount: 20,
        images: [
            "/images/spotlights/cover-sh1.jpeg",
            "/images/spotlights/shim3.jpeg",
            "/images/spotlights/shim6.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 8,
        name: "Simple Club",
        brand: "Simple Club",
        color: "#ea580c",
        tag: "SALE",
        category: "Shimlar",
        description: "Soddalashtirilgan dizaynga ega shim. Qulay va bardoshli materialdan tayyorlangan.",
        price: 191750,
        originalPrice: 295000,
        discount: 35,
        images: [
            "/images/spotlights/shim3.jpeg",
            "/images/spotlights/shim4.jpeg",
            "/images/spotlights/shim9.jpeg"
        ],
        sizes: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 10 }
        ]
    },
    {
        id: 9,
        name: "Jordan Low Sky",
        brand: "AirBold",
        tag: "SALE",
        category: "Krassovkalar",
        description: "Jordan Low Sky - zamonaviy dizayn va qulaylikni birlashtirgan yuqori sifatli krassovkalar.",
        price: 265000,
        originalPrice: 330000,
        discount: 20,
        images: [
            "/images/spotlights/shoes5.jpeg",
            "/images/spotlights/shoes4.jpeg",
            "/images/spotlights/shoes3.jpeg"
        ],
        sizes: [
            { size: "39", stock: 9 },
            { size: "42", stock: 4 },
            { size: "43", stock: 7 }
        ]
    },
    {
        id: 10,
        name: "Hoodie Classic",
        brand: "UrbanFlex",
        tag: "SALE",
        category: "Kiyimlar",
        description: "Klassik dizaynga ega hoodie. Qulay va uslubli kundalik kiyish uchun ideal.",
        price: 228000,
        originalPrice: 285000,
        discount: 20,
        images: [
            "/images/spotlights/shim9.jpeg",
            "/images/spotlights/shim6.jpeg",
            "/images/spotlights/shim4.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 11,
        name: "Kargo Shortik",
        brand: "PrimeWear",
        color: "#7c3aed",
        tag: "NEW",
        category: "Shortiklar",
        description: "Yangi dizaynga ega kargo shortik. Qulay va funksional.",
        price: 289000,
        originalPrice: 346000,
        discount: 16,
        images: [
            "/images/spotlights/shim4.jpeg",
            "/images/spotlights/shim2.jpeg",
            "/images/spotlights/shim3.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 }
        ]
    },
    {
        id: 12,
        name: "Kurtka Classic",
        brand: "NordicWave",
        tag: "NEW",
        category: "Kurtkalar",
        description: "Klassik dizaynga ega yangi kurtka. Zamonaviy va uslubli.",
        price: 301000,
        originalPrice: 350000,
        discount: 14,
        images: [
            "/images/spotlights/shim6.jpeg",
            "/images/spotlights/shim9.jpeg",
            "/images/spotlights/shim2.jpeg"
        ],
        sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 13,
        name: "Loose Fit T-shirt",
        brand: "CottonEase",
        tag: "NEW",
        category: "Futbolkalar",
        description: "Keng bichimli qulay futbolka. Har qanday kundalik holat uchun ideal.",
        price: 165000,
        originalPrice: 0,
        discount: 0,
        images: [
            "/images/spotlights/shim2.jpeg",
            "/images/spotlights/shim.jpeg",
            "/images/spotlights/shim3.jpeg"
        ],
        sizes: [
            { size: "S", stock: 15 },
            { size: "M", stock: 20 },
            { size: "L", stock: 18 },
            { size: "XL", stock: 12 }
        ]
    },
    {
        id: 14,
        name: "Sneakers Cloud",
        brand: "CloudStep",
        tag: "NEW",
        category: "Krassovkalar",
        description: "Yengil va qulay sneakers. Kun davomida qulay yurish uchun mo'ljallangan.",
        price: 275000,
        originalPrice: 0,
        discount: 0,
        images: [
            "/images/spotlights/shoes5.jpeg",
            "/images/spotlights/shoes4.jpeg",
            "/images/spotlights/shoes3.jpeg"
        ],
        sizes: [
            { size: "39", stock: 10 },
            { size: "40", stock: 12 },
            { size: "41", stock: 8 },
            { size: "42", stock: 15 }
        ]
    },
    {
        id: 15,
        name: "Sneakers Cloud Pro",
        brand: "CloudStep",
        tag: "NEW",
        category: "Krassovkalar",
        description: "Professional darajadagi sneakers. Sport va kundalik yurish uchun ideal.",
        price: 275000,
        originalPrice: 0,
        discount: 0,
        images: [
            "/images/spotlights/shoes6.jpeg",
            "/images/spotlights/shoes3.jpeg",
            "/images/spotlights/shoes4.jpeg"
        ],
        sizes: [
            { size: "40", stock: 10 },
            { size: "41", stock: 12 },
            { size: "42", stock: 8 }
        ]
    },
    {
        id: 16,
        name: "Classic Denim Jacket",
        brand: "DenimCo",
        tag: "HOT",
        category: "Kiyimlar",
        description: "Klassik dizaynga ega denim jaket. Zamonaviy va uslubli.",
        price: 420000,
        originalPrice: 550000,
        discount: 24,
        images: [
            "/images/spotlights/cover3.webp",
            "/images/spotlights/cover-sh1.jpeg"
        ],
        sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 17,
        name: "Sport Tracksuit",
        brand: "SportLine",
        tag: "HOT",
        category: "Kiyimlar",
        description: "Sport uchun mo'ljallangan tracksuit. Qulay va funksional.",
        price: 380000,
        originalPrice: 480000,
        discount: 21,
        images: [
            "/images/spotlights/pants-cover.jpg",
            "/images/spotlights/shim.jpeg"
        ],
        sizes: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 15 },
            { size: "XL", stock: 10 }
        ]
    },
    {
        id: 18,
        name: "Casual Pants",
        brand: "ComfortWear",
        tag: "HOT",
        category: "Shimlar",
        description: "Kundalik kiyish uchun qulay shim. Qulay va bardoshli.",
        price: 290000,
        originalPrice: 360000,
        discount: 19,
        images: [
            "/images/spotlights/shim2.jpeg",
            "/images/spotlights/shim3.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 19,
        name: "Winter Coat",
        brand: "WarmStyle",
        tag: "SALE",
        category: "Kurtkalar",
        description: "Qishki mavsum uchun issiq palto. Yuqori sifatli materialdan tayyorlangan.",
        price: 550000,
        originalPrice: 720000,
        discount: 24,
        images: [
            "/images/spotlights/cover-sh.jpeg",
            "/images/spotlights/cover-sh1.jpeg"
        ],
            sizes: [
                { size: "M", stock: 8 },
                { size: "L", stock: 10 },
                { size: "XL", stock: 6 }
            ]
    },
    {
        id: 20,
        name: "Summer Shorts",
        brand: "BeachWear",
        tag: "SALE",
        category: "Shortiklar",
        description: "Yozgi mavsum uchun qulay shortik. Yengil va nafas olishi yaxshi materialdan.",
        price: 180000,
        originalPrice: 240000,
        discount: 25,
        images: [
            "/images/spotlights/shim4.jpeg",
            "/images/spotlights/shim2.jpeg"
        ],
            sizes: [
                { size: "S", stock: 12 },
                { size: "M", stock: 15 },
                { size: "L", stock: 10 }
            ]
    },
    {
        id: 21,
        name: "Leather Boots",
        brand: "LeatherCraft",
        tag: "SALE",
        category: "Krassovkalar",
        description: "Yuqori sifatli teri etik. Qulay va bardoshli.",
        price: 450000,
        originalPrice: 600000,
        discount: 25,
        images: [
            "/images/spotlights/shoes2.jpeg",
            "/images/spotlights/shoes3.jpeg"
        ],
            sizes: [
                { size: "40", stock: 8 },
                { size: "41", stock: 10 },
                { size: "42", stock: 12 }
            ]
    },
    {
        id: 22,
        name: "Formal Shirt",
        brand: "FormalWear",
        tag: "NEW",
        category: "Futbolkalar",
        description: "Rasmiy holatlar uchun ideal futbolka. Zamonaviy va uslubli.",
        price: 220000,
        originalPrice: 280000,
        discount: 21,
        images: [
            "/images/spotlights/shim6.jpeg",
            "/images/spotlights/shim9.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 23,
        name: "Running Shoes",
        brand: "RunFast",
        tag: "SALE",
        category: "Krassovkalar",
        description: "Yugurish uchun mo'ljallangan krassovkalar. Qulay va bardoshli.",
        price: 320000,
        originalPrice: 400000,
        discount: 20,
        images: [
            "/images/spotlights/shoes4.jpeg",
            "/images/spotlights/shoes5.jpeg"
        ],
        sizes: [
            { size: "39", stock: 10 },
            { size: "40", stock: 12 },
            { size: "41", stock: 8 },
            { size: "42", stock: 15 }
        ]
    },
    {
        id: 24,
        name: "Hoodie Zip",
        brand: "ZipStyle",
        tag: "NEW",
        category: "Kiyimlar",
        description: "Zip bilan hoodie. Qulay va funksional.",
        price: 280000,
        originalPrice: 350000,
        discount: 20,
        images: [
            "/images/spotlights/shim9.jpeg",
            "/images/spotlights/shim6.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 25,
        name: "Wool Sweater",
        brand: "WoolCo",
        tag: "HOT",
        category: "Kiyimlar",
        description: "Yupqa jun kazak. Qishki mavsum uchun ideal.",
        price: 380000,
        originalPrice: 480000,
        discount: 21,
        images: [
            "/images/spotlights/cover-sh1.jpeg",
            "/images/spotlights/shim3.jpeg"
        ],
        sizes: [
            { size: "M", stock: 10 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 26,
        name: "Baseball Cap",
        brand: "CapStyle",
        tag: "SALE",
        category: "Aksessuarlar",
        description: "Klassik dizaynga ega baseball cap. Zamonaviy va uslubli.",
        price: 85000,
        originalPrice: 120000,
        discount: 29,
        images: [
            "/images/spotlights/shim3.jpeg",
            "/images/spotlights/shim4.jpeg"
        ],
            sizes: [
                { size: "One Size", stock: 50 }
            ]
    },
    {
        id: 27,
        name: "Cargo Pants",
        brand: "CargoPro",
        tag: "NEW",
        category: "Shimlar",
        description: "Funksional kargo shim. Qulay va bardoshli.",
        price: 310000,
        originalPrice: 390000,
        discount: 21,
        images: [
            "/images/spotlights/pants-cover2.jpg",
            "/images/spotlights/shim2.jpeg"
        ],
        sizes: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 15 },
            { size: "XL", stock: 10 }
        ]
    },
    {
        id: 28,
        name: "Vintage Jeans",
        brand: "VintageCo",
        tag: "SALE",
        category: "Shimlar",
        description: "Vintage uslubidagi jeans. Zamonaviy va uslubli.",
        price: 350000,
        originalPrice: 450000,
        discount: 22,
        images: [
            "/images/spotlights/shim.jpeg",
            "/images/spotlights/shim2.jpeg"
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 12 },
            { size: "XL", stock: 8 }
        ]
    },
    {
        id: 29,
        name: "Parka Jacket",
        brand: "ParkaStyle",
        tag: "SALE",
        category: "Kurtkalar",
        description: "Qishki mavsum uchun ideal parka. Issiq va bardoshli.",
        price: 520000,
        originalPrice: 680000,
        discount: 24,
        images: [
            "/images/spotlights/cover3.webp",
            "/images/spotlights/cover-sh1.jpeg"
        ],
            sizes: [
                { size: "M", stock: 8 },
                { size: "L", stock: 10 },
                { size: "XL", stock: 6 }
            ]
    },
    {
        id: 30,
        name: "Trainers Pro",
        brand: "TrainPro",
        tag: "NEW",
        category: "Krassovkalar",
        description: "Professional darajadagi trainers. Sport uchun ideal.",
        price: 340000,
        originalPrice: 0,
        discount: 0,
        images: [
            "/images/spotlights/shoes3.jpeg",
            "/images/spotlights/shoes4.jpeg"
        ],
        sizes: [
            { size: "39", stock: 10 },
            { size: "40", stock: 12 },
            { size: "41", stock: 8 },
            { size: "42", stock: 15 }
        ]
    },
]
