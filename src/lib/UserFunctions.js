import { PrismaClient } from "@prisma/client"
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/.%_';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const generateHashPassword = async (length = 8) => {
    return await bcryptjs.hash(generateRandomString(), 10)
}

export const generateUsername = async ({word}) => {
    word = word.replace(/\s/g, '')
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    const username = `${word}${randomNumber}`
    const isExist = !!await prisma.user.findFirst({
        where: {
            username
        }
    }) 
    console.log(username, isExist)

    if (!isExist) return username
    return generateUsername({word})
}

