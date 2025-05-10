const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'shop_sql_application_user',
  password: 'Kl2nsABNMfe71Tcnr2NjwIqXkhXISoiB',
  host: 'dpg-d08cusc9c44c73br1f30-a.oregon-postgres.render.com',
  port: 5432, // default Postgres port
  database: 'shop_sql_application',
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(express.json()); // обов’язково для POST JSON
app.use(cors());

app.get('/bacalia', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.bacalia ORDER BY name',
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/milk', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.milk ORDER BY name',
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/meat', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.meat ORDER BY name',
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/bread', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.bread ORDER BY name',
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/bacalia', async (req, res) => {
  console.log("Помилка при надсиланні даних на сервер: " + req.body);
  
  try {
    const { date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent } = req.body;

    const result = await pool.query(
      'INSERT INTO public.bacalia (date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent]
    );

    res.json(result.rows[0]); // повертаємо новий запис
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/milk', async (req, res) => {
  console.log("Помилка при надсиланні даних на сервер: " + req.body);
  
  try {
    const { date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent } = req.body;

    const result = await pool.query(
      'INSERT INTO public.milk (date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent]
    );

    res.json(result.rows[0]); // повертаємо новий запис
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/meat', async (req, res) => {
  console.log("Помилка при надсиланні даних на сервер: " + req.body);
  
  try {
    const { date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent } = req.body;

    const result = await pool.query(
      'INSERT INTO public.meat (date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent]
    );

    res.json(result.rows[0]); // повертаємо новий запис
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/bread', async (req, res) => {
  console.log("Помилка при надсиланні даних на сервер: " + req.body);
  
  try {
    const { date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent } = req.body;

    const result = await pool.query(
      'INSERT INTO public.bread (date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [date, name, price, percent, price_with_extra, amount, general_price_without_percent, general_price_with_percent]
    );

    res.json(result.rows[0]); // повертаємо новий запис
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});