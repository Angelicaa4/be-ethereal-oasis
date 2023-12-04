import ModelUser from "../models/ModelUser.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const Register = async(req, res) => {
    const {username, email, password} = req.body;
    if(username === '') return res.status(400).json({message: "Username tidak boleh kosong!"});
    if(email === '') return res.status(400).json({message: "Email tidak boleh kosong!"});
    if(password === '') return res.status(400).json({message: "Password tidak boleh kosong!"});

    try {
        const checkEmail = await ModelUser.findAll({where: {email: email}});
        if(checkEmail[0]) return res.status(409).json({message: "Email sudah terdaftar!"});
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await ModelUser.create({
            username: username,
            email: email,
            password: hashPassword,
        })

        return res.status(201).json({message: "Akun anda berhasil di buat!"});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const Login = async(req, res) => {
    const {username, password} = req.body;
    if(username === '') return res.status(400).json({message: "Username tidak boleh kosong!"});
    if(password === '') return res.status(400).json({message: "Password tidak boleh kosong!"});

    try {
        const checkUsername = await ModelUser.findAll({where: {username: username}})
        if(!checkUsername[0]) return res.status(400).json({message: "Username tidak terdaftar!"});
        const match = await bcrypt.compare(password, checkUsername[0].password);
        if(!match) return res.status(400).json({message: "Password anda salah!"});
        const userId = checkUsername[0].id_user;
        const name = checkUsername[0].username;
        const email = checkUsername[0].email;

        const token = jwt.sign({userId, name, email}, process.env.TOKEN, {expiresIn: "1d"});
        
        await ModelUser.update({token: token}, {where: {id_user: userId}});
        
        const data = {
            userId: userId,
            name: name,
            email: email,
        }
        

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        
        // Optionally, you can include additional data in the same response
        return res.status(200).json({ result: data,
            token: token });
        
    } catch (error) {
        return res.status(500).json({message: error});
    }
}