const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Vehicle = require("./models/Vehicle");

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        // No additional options needed
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const vehicleDocs = [
    {
        make: "Ferrari",
        model: "488 GTB",
        year: 2018,
        color: "Rosso Corsa",
        KMs: 12500,
        VIN: "ZFF87CLC000234567",
        price: 249000,
        images: [
            "https://example.com/ferrari488gtb1.jpg",
            "https://example.com/ferrari488gtb2.jpg",
        ],
    },
    {
        make: "Lamborghini",
        model: "Huracán Performante",
        year: 2019,
        color: "Giallo Belenus",
        KMs: 8000,
        VIN: "ZHWUF7ZF8JLA12345",
        price: 289500,
        images: [
            "https://example.com/huracanperformante1.jpg",
            "https://example.com/huracanperformante2.jpg",
        ],
    },
    {
        make: "Porsche",
        model: "911 GT3 RS",
        year: 2023,
        color: "Lava Orange",
        KMs: 1200,
        VIN: "WP0AF2A99PS123456",
        price: 215000,
        images: [
            "https://example.com/911gt3rs1.jpg",
            "https://example.com/911gt3rs2.jpg",
        ],
    },
    {
        make: "McLaren",
        model: "720S",
        year: 2020,
        color: "Azura Black",
        KMs: 15000,
        VIN: "SBM12ABC456789012",
        price: 295000,
        images: [
            "https://example.com/mclaren720s1.jpg",
            "https://example.com/mclaren720s2.jpg",
        ],
    },
    {
        make: "Audi",
        model: "R8 V10 Performance",
        year: 2021,
        color: "Kemora Gray",
        KMs: 7500,
        VIN: "WUAVVAFR9JN012345",
        price: 199500,
        images: [
            "https://example.com/audir8v10perf1.jpg",
            "https://example.com/audir8v10perf2.jpg",
        ],
    },
    {
        make: "Mercedes-AMG",
        model: "GT R",
        year: 2022,
        color: "Designo Diamond White Metallic",
        KMs: 3000,
        VIN: "WDDXJ8JB6JA123456",
        price: 179000,
        images: [
            "https://example.com/amggt1.jpg",
            "https://example.com/amggt2.jpg",
        ],
    },
    {
        make: "Nissan",
        model: "GT-R Nismo",
        year: 2020,
        color: "Brilliant White Pearl",
        KMs: 11000,
        VIN: "JN1AR5EF8AM123456",
        price: 215000,
        images: [
            "https://example.com/gtr-nismo1.jpg",
            "https://example.com/gtr-nismo2.jpg",
        ],
    },
    {
        make: "Ford",
        model: "Mustang Shelby GT500",
        year: 2021,
        color: "Rapid Red Metallic Tinted Clearcoat",
        KMs: 6500,
        VIN: "1FA6P8CF2M5123456",
        price: 78000,
        images: [
            "https://example.com/shelbygt500-1.jpg",
            "https://example.com/shelbygt500-2.jpg",
        ],
    },
    {
        make: "Chevrolet",
        model: "Corvette Stingray",
        year: 2023,
        color: "Ceramic Matrix Gray Metallic",
        KMs: 2000,
        VIN: "1G1YC2D67N5123456",
        price: 69500,
        images: [
            "https://example.com/corvette-stingray1.jpg",
            "https://example.com/corvette-stingray2.jpg",
        ],
    },
    {
        make: "BMW",
        model: "M8 Competition Coupe",
        year: 2022,
        color: "Frozen Black Metallic",
        KMs: 8800,
        VIN: "WBS8M9C07M5123456",
        price: 149000,
        images: [
            "https://example.com/bmwm8comp1.jpg",
            "https://example.com/bmwm8comp2.jpg",
        ],
    },
    {
        make: "Jaguar",
        model: "F-Type R Coupe",
        year: 2021,
        color: "Caldera Red",
        KMs: 14000,
        VIN: "SAJDA4GX1MC123456",
        price: 109000,
        images: [
            "https://example.com/jaguarftyper1.jpg",
            "https://example.com/jaguarftyper2.jpg",
        ],
    },
    {
        make: "Lexus",
        model: "LC 500",
        year: 2020,
        color: "Structural Blue",
        KMs: 9500,
        VIN: "JTHT3BC64L5123456",
        price: 99000,
        images: [
            "https://example.com/lexuslc5001.jpg",
            "https://example.com/lexuslc5002.jpg",
        ],
    },
    {
        make: "Dodge",
        model: "Challenger SRT Hellcat Redeye",
        year: 2019,
        color: "Go Mango",
        KMs: 18000,
        VIN: "2C3CDXCT2KH123456",
        price: 73000,
        images: [
            "https://example.com/challenger-hellcat1.jpg",
            "https://example.com/challenger-hellcat2.jpg",
        ],
    },
    {
        make: "Acura",
        model: "NSX",
        year: 2022,
        color: "Curva Red",
        KMs: 6000,
        VIN: "19UNC1B04MA123456",
        price: 165000,
        images: [
            "https://example.com/acuransx1.jpg",
            "https://example.com/acuransx2.jpg",
        ],
    },
    {
        make: "Aston Martin",
        model: "DBS Superleggera",
        year: 2021,
        color: "Hyper Red",
        KMs: 4500,
        VIN: "SCFKFBDL8MGS12345",
        price: 319000,
        images: [
            "https://example.com/astonmartindbs1.jpg",
            "https://example.com/astonmartindbs2.jpg",
        ],
    },
    {
        make: "Bentley",
        model: "Continental GT Speed",
        year: 2023,
        color: "Glacier White",
        KMs: 1800,
        VIN: "SCBFR73W2NC123456",
        price: 289000,
        images: [
            "https://example.com/bentleygtspeed1.jpg",
            "https://example.com/bentleygtspeed2.jpg",
        ],
    },
    {
        make: "Maserati",
        model: "MC20",
        year: 2022,
        color: "Giallo Corse",
        KMs: 3200,
        VIN: "ZAM57RRA6N1123456",
        price: 219000,
        images: [
            "https://example.com/maserati-mc201.jpg",
            "https://example.com/maserati-mc202.jpg",
        ],
    },
    {
        make: "Lotus",
        model: "Emira",
        year: 2023,
        color: "Hethel Yellow",
        KMs: 2500,
        VIN: "SF9JC2BC5NT123456",
        price: 92000,
        images: [
            "https://example.com/lotus-emira1.jpg",
            "https://example.com/lotus-emira2.jpg",
        ],
    },
    {
        make: "Alfa Romeo",
        model: "4C Spider",
        year: 2020,
        color: "Rosso Competizione",
        KMs: 10000,
        VIN: "ZAR95900005123456",
        price: 69000,
        images: [
            "https://example.com/alfa-4cspider1.jpg",
            "https://example.com/alfa-4cspider2.jpg",
        ],
    },
    {
        make: "Subaru",
        model: "BRZ",
        year: 2022,
        color: "World Rally Blue Pearl",
        KMs: 7000,
        VIN: "JF1ZCAC13K9123456",
        price: 33000,
        images: [
            "https://example.com/subaru-brz1.jpg",
            "https://example.com/subaru-brz2.jpg",
        ],
    },
    {
        make: "Toyota",
        model: "GR Supra",
        year: 2021,
        color: "Renaissance Red 2.0",
        KMs: 12000,
        VIN: "WZ1DB4CH5MW123456",
        price: 55000,
        images: [
            "https://example.com/toyota-grsupra1.jpg",
            "https://example.com/toyota-grsupra2.jpg",
        ],
    },
    {
        make: "Honda",
        model: "Civic Type R",
        year: 2023,
        color: "Rallye Red",
        KMs: 4000,
        VIN: "SHHFK8G74NU123456",
        price: 42000,
        images: [
            "https://example.com/honda-civictyperprod1.jpg",
            "https://example.com/honda-civictypeprod2.jpg",
        ],
    },
    {
        make: "Mazda",
        model: "MX-5 Miata RF",
        year: 2021,
        color: "Soul Red Crystal Metallic",
        KMs: 9000,
        VIN: "JM1NDAV77M0123456",
        price: 34000,
        images: [
            "https://example.com/mazda-mx5miata1.jpg",
            "https://example.com/mazda-mx5miata2.jpg",
        ],
    },
    {
        make: "Hyundai",
        model: "Veloster N",
        year: 2020,
        color: "Performance Blue",
        KMs: 16000,
        VIN: "KMHTG6AF8MU123456",
        price: 28000,
        images: [
            "https://example.com/hyundai-velostern1.jpg",
            "https://example.com/hyundai-velostern2.jpg",
        ],
    },
];

// Save the documents to the database
Vehicle.insertMany(vehicleDocs)
    .then(() => {
        console.log("Vehicle documents saved successfully");
        mongoose.connection.close(); // Close the MongoDB connection
    })
    .catch((err) => {
        console.error("Error saving vehicle documents:", err);
        mongoose.connection.close(); // Close the MongoDB connection
    });