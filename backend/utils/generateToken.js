import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
    jwt.sign({id, role}, process.env.SECRET_TOKEN, {expiresIn: "30d"});
}

export default generateToken;