import dns from "dns"
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../server/config/dbConfig.js";
import User from "../server/models/userModel.js"
import dotenv from "dotenv"

dotenv.config()


const users = [
    {
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "9876543210",
        password: "password123",
        isVendor: false,
        isAdmin: true,
        credits: 100,
    },
    {
        name: "Priya Verma",
        email: "priya@example.com",
        phone: "9876543211",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 5,
    },
    {
        name: "Rahul Singh",
        email: "rahul@example.com",
        phone: "9876543212",
        password: "password123",
        isVendor: true,
        isAdmin: false,
        credits: 25,
    },
    {
        name: "Sneha Patel",
        email: "sneha@example.com",
        phone: "9876543213",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 10,
    },
    {
        name: "Vikram Mehta",
        email: "vikram@example.com",
        phone: "9876543214",
        password: "password123",
        isVendor: true,
        isAdmin: false,
        credits: 50,
    },
    {
        name: "Ananya Gupta",
        email: "ananya@example.com",
        phone: "9876543215",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 15,
    },
    {
        name: "Karan Joshi",
        email: "karan@example.com",
        phone: "9876543216",
        password: "password123",
        isVendor: true,
        isAdmin: false,
        credits: 30,
    },
    {
        name: "Neha Kapoor",
        email: "neha@example.com",
        phone: "9876543217",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 5,
    },
    {
        name: "Rohan Mishra",
        email: "rohan@example.com",
        phone: "9876543218",
        password: "password123",
        isVendor: true,
        isAdmin: false,
        credits: 40,
    },
    {
        name: "Isha Nair",
        email: "isha@example.com",
        phone: "9876543219",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 12,
    },
    {
        name: "Aditya Chauhan",
        email: "aditya@example.com",
        phone: "9876543220",
        password: "password123",
        isVendor: true,
        isAdmin: false,
        credits: 20,
    },
    {
        name: "Meera Desai",
        email: "meera@example.com",
        phone: "9876543221",
        password: "password123",
        isVendor: false,
        isAdmin: false,
        credits: 8,
    },
];

const seedUsers = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`)
        // // Optional: Remove existing users
        // await User.deleteMany();

        let hashedUsers = await Promise.all(
            users.map(async (user) => {
                return {
                    ...user,
                    password: await bcrypt.hash(user.password, 10)
                }
            })
        )

        await User.insertMany(hashedUsers);
        console.log(hashedUsers.length + " Users Insereted!")

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();