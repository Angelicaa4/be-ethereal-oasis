import ModelUser from "../models/ModelUser.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Controller untuk register
export const Register = async(req, res) => {
    const {username, email, password} = req.body;

    //input validator
    if(username === '') return res.status(400).json({message: "Username tidak boleh kosong!"});
    if(email === '') return res.status(400).json({message: "Email tidak boleh kosong!"});
    if(password === '') return res.status(400).json({message: "Password tidak boleh kosong!"});

    try {
        //Cek apakah email sudah terdaftar atau belum
        const checkEmail = await ModelUser.findAll({where: {email: email}});
        //menampilkan pesan ketika email sudah didaftarkan
        if(checkEmail[0]) return res.status(409).json({message: "Email sudah terdaftar!"});

        //jika belum terdaftar maka lanjut

        //membcrypt password sebelum dikirim ke database
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //menyimpan data ke dalam database
        await ModelUser.create({
            username: username,
            email: email,
            password: hashPassword,
        })

        //Menampilkan pesan akun berhasil dibuats
        return res.status(201).json({message: "Akun anda berhasil di buat!"});
    } catch (error) {
        //mereturn pesan error ketika terjadi error
        return res.status(500).json({message: error});
    }
}


//Controller login
export const Login = async(req, res) => {
    //Mengambil value dari input pengguna
    const {username, password} = req.body;

    //validasi input
    if(username === '') return res.status(400).json({message: "Username tidak boleh kosong!"});
    if(password === '') return res.status(400).json({message: "Password tidak boleh kosong!"});


    try {
        //Mencari user berdasarkan username yang cocok
        const checkUsername = await ModelUser.findAll({where: {username: username}})
        if(!checkUsername[0]) return res.status(400).json({message: "Username tidak terdaftar!"});
        //Mencocokkan password
        const match = await bcrypt.compare(password, checkUsername[0].password);
        if(!match) return res.status(400).json({message: "Password anda salah!"});

        //ketika sudah benar maka lanjut
        const userId = checkUsername[0].id_user;
        const name = checkUsername[0].username;
        const email = checkUsername[0].email;

        //membuat token baru untuk user yang login
        const token = jwt.sign({userId, name, email}, process.env.TOKEN, {expiresIn: "1d"});
        
        //mengupdate token pada database
        await ModelUser.update({token: token}, {where: {id_user: userId}});
        
        // mengambil dan menyimpan data ke dalam objek
        const data = {
            userId: userId,
            name: name,
            email: email,
        }
        const userMail = email;
        

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // mengembalikan data dan token
        // token digunakan untuk validasi user yang sedang login
        return res.status(200).json({ result: data,
            token: token, email:userMail });
        
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const Logout = async (req, res) => {
    try {
      // Mengambil token dari header Authorization
      const token = req.headers.authorization.split('Bearer ')[1];
  
      if (!token) {
        return res.status(401).json({ message: "Tidak ada token, pengguna tidak terautentikasi" });
      }
  
      // Me-reset token di database menjadi null
      await ModelUser.update({ token: null }, { where: { token: token } });
  
      return res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

