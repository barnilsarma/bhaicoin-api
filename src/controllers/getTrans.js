import db from "../Database/index.js";

const getUsers = (req, res) => {
  try {
    const sql = 'SELECT * FROM transactions where user=?';
    const params=[req.params.user];
    db.all(sql,params, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
};

export default getUsers;
