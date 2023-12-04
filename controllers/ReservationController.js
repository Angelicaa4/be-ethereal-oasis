import Authentication from '../middleware/Authentication.js';
import ModelReservation from '../models/ModelReservation.js';

export const addReservation = async (req, res) => {
  const user_id = req.userId; // Access the userId from the Authentication middleware
  const { nama, check_in, check_out, room, jumlah_room, total_harga, metode} = req.body;

  console.log(user_id);
  if (!user_id) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  try {
    await ModelReservation.create({
      user_id: user_id,
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

export const getReservation = async (req, res) => {
    const user_id = req.userId; 
  
    if (!user_id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
  
    try {
      const reservations = await ModelReservation.findAll({
        where: {
          user_id: user_id,
        },
      });
  
      return res.status(200).json({ reservations });
    } catch (err) {
      return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  };
  
