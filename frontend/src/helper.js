// helper.js
import { fakerEN_IN as faker } from '@faker-js/faker'

// Current domain name
export const currentDomain = "http://127.0.0.1:8000/"

// Check if the window width indicates a mobile device
export const isMobile = window.innerWidth < 768;

// Get a lighten shade of provided hex code
export const shadeColor = (color, percent) => {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

// Function to decode a JWT token and get the expiration time in milliseconds
export const getJwtExpiration = (token) => {
    try {
        // Split the token into its parts
        const tokenParts = token.split('.')

        if (tokenParts.length !== 3) {
            throw new Error("Invalid token format")
        }

        // Decode the payload part (second part of the token)
        const payloadBase64 = tokenParts[1]
        const payloadJson = atob(payloadBase64)
        const payload = JSON.parse(payloadJson)

        // Check if the token has the 'exp' field
        if (typeof payload.exp === 'undefined') {
            throw new Error("The token does not contain an 'exp' field.")
        }

        // Convert the expiration time to milliseconds
        const expInMilliseconds = payload.exp * 1000
        return expInMilliseconds
    } catch (error) {
        throw new Error(`Error decoding token: ${error.message}`)
    }
}

// Generate random password of given length
export const generateRandomPassword = (passwordLength) => {
    const length = passwordLength
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let password = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }
    return password
}

// Generate random date from present to given future range
export const generateRandomDateWithinRange = (days) => {
    const today = new Date()
    const oneWeekFromNow = new Date()
    oneWeekFromNow.setDate(today.getDate() + days)
  
    const randomDate = new Date(today.getTime() + Math.random() * (oneWeekFromNow.getTime() - today.getTime()))
    
    // Format the date to mm/dd/yyyy
    const month = String(randomDate.getMonth() + 1).padStart(2, '0')
    const day = String(randomDate.getDate()).padStart(2, '0')
    const year = randomDate.getFullYear()

    // Return the formatted date
    return `${year}/${month}/${day}`
  }

// Generate random user profile
export const generateRandomUserProfile = (jobPositions, countries) => {
    const getRandomElement = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: generateRandomPassword(8),
        contact: faker.phone.number('##########'), // 10 digit number
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode('######'), // 6 digit postal code
        state: faker.location.state(),
        workingFrom: generateRandomDateWithinRange(7), // take days as parameter
        jobPosition: getRandomElement(jobPositions).id,
        country: countries.find(country => country.name.toUpperCase() === "INDIA").id // Putting India as default selection
      }
}
