import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import Organization from "../models/Organization.js"

const generateToken = (user) => {
    return jwt.sign(
        {
            userId:user._id,
            organizationId: user.organizationId,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

export const register = async (req, res) => {
    const { name, email, password, organizationName } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const organization = await Organization.create({
        name: organizationName
    })

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        organizationId: organization._id,
        role: "owner"
    })

    organization.ownerId = user._id
    await organization.save()

    res.status(201).json({
        token: generateToken(user)
    })
}
export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        token: generateToken(user)
    })
    } else {
        res.status(401).json({ message: "Invalid credentials" })
    }
}