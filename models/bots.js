const pool = require('../utils/pool.js');

module.exports = class Bots {
    id;
    name;
    sign;
    sweet;
    sassy;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.sign = row.sign;
        this.sweet = row.sweet;
        this.sassy = row.sassy;

    }

     // Crud Methods

     static async insert({ name, sign, sweet, sassy }) {
        const { rows } = await pool.query(
          'INSERT INTO bots (name, sign, sweet, sassy ) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, sign, sweet, sassy]
        );
           
        return new Bots(rows[0]);
      };


    static async find() {
        const { rows } = await pool.query('SELECT * FROM bots')
            return rows.map(row => new Bots(row));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM bots WHERE id=$1', [id]);

        if(!rows[0]) throw new Error(`No bots with id ${id}`);
        return new Bots(rows[0]);
    }

    static async update(id, { name, sign, sweet, sassy }) {
        const { rows } = await pool.query(
            `UPDATE bots
            SET name=$1,
                sign=$2,
                sweet=$3,
                sassy=$4
            WHERE id=$5
            RETURNING *
            `,
            [name, sign, sweet, sassy, id]
        );

        return new Bots(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM bots WHERE id=$1 RETURNING *`, [id]);
        return new Bots(rows[0]);
    }


};
