import Authentication from '../middleware/Authentication.js';
import ModelReservation from '../models/ModelReservation.js';


// Controller untuk menambah reservasi
export const addReservation = async (req, res) => {

  const user_id = req.userId; // Mengakses user id yang diambil dari middleware authentication

  const { nama, check_in, check_out, room, jumlah_room, total_harga, metode} = req.body; //mengambil value dari niput pengguna


  //cek apakah user id sudah ter set atau belum
  if (!user_id) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  try {

    //menyimpan data booking
    await ModelReservation.create({
      user_id: user_id, //user id diambil dari req.userId
      nama: nama,
      check_in: check_in,
      check_out: check_out,
      room: room,
      jumlah_room: jumlah_room,
      total_harga: total_harga,
      metode: metode,
    });

    return res.status(201).json({ message: 'Berhasil Reservasi!' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};


// Menampilkan data reservasi berdasarkan id pengguna
export const getReservation = async (req, res) => {

    // Mengakses user id yang diambil dari middleware authentication
    const user_id = req.userId; 

    //cek apakah user id sudah ter set atau belum
    if (!user_id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
  
    try {
      //cek data reservasi berdasarkan user id
      const reservations = await ModelReservation.findAll({
        where: {
          //mengembil data history reservasi oleh user yang sedang login 
          user_id: user_id,
        },
      });
  
      return res.status(200).json({ reservations });
    } catch (err) {
      return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  };
  
