const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const cors = require('cors');
const {Pool} = require('pg');
const session = require('express-session');
const nodemailer = require('nodemailer');


// Create a transporter using your Gmail account

const emailSender = (userEmail) => {
  const transporter = nodemailer.createTransport({
    tls: {
      rejectUnauthorized: false
    },
    service: 'hotmail', // Use the Gmail service
    auth: {
      user: 'web_dev_services123456@hotmail.com', // Your Gmail address
      pass: 'reanneMoran', // Your Gmail password or an application-specific password
    },
  });
  
  
  const mailOptions = {
    from: 'web_dev_services123456@hotmail.com', // Sender's email address (should match the one in the transporter configuration)
    to: userEmail, // Recipient's email address
    subject: 'Welcome to the Entertainment Web App!',
    html: `
        <html>
        <body>
            <h1>Welcome to the Entertainment Web App!</h1>
            <p>Thank you for registering your account with us. We're excited to have you on board!</p>
            <p>Explore a world of entertainment with our app and enjoy a wide range of content.</p>
            <p>Get started and have fun!</p>
            <p>Sincerely yours,</p>
            <p>Jhonwell Española</p>
        </body>
        </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
     console.error('Error sending email:', error);
     } else {
     console.log('Email sent:', info.response);
     }
    });  
}

const dbConfig = {
  connectionString: 'postgresql://postgres:2zuy5TyWsONptHqxqNco@containers-us-west-79.railway.app:6130/railway',
  host: 'containers-us-west-79.railway.app',
  user: 'postgres',
  port: 6130,
  database: 'railway',
  password: "2zuy5TyWsONptHqxqNco"
}
const con = new Pool(dbConfig)

con.connect((err) => {
  if (err) return;
  console.log("Connected");
})

app.use(cors());
app.use(session({
  name: 'mySessionID',
  secret: 'ashlieKim',
  resave: false,
  saveUninitialized: false,
}))

app.use(express.static('./build'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'home.html'));
})


/* Register Functionality */
app.post("/register-account", (req, res) => {
  const {regEmail, regPass} = req.body; 
    const date = new Date();
  const data = [regEmail, regPass, date];
  con.query(`SELECT * FROM users WHERE email = $1`, [regEmail], (err, result) => {
    if (err) throw err;


    if (result.rows.length > 0) {
      res.json({confirmation: false});
      console.log("email not available");
      return;
    } 

    const sqlQuery = "INSERT INTO users (email, password,  account_date) VALUES ($1, $2, $3)";
    
    req.session.isLogin = true;

    con.query(sqlQuery, data, (err) => {
       if (err) {
         console.log(err);
         res.json({confirmation: false});
         
         return;
       }
      
       res.json({confirmation: true});
  })
  })
})

/* Login Fuctionality */
app.post('/login-check', (req, res) => {
  
  const{logEmail, logPass} = req.body;

  con.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, 
  [logEmail, logPass], 
  (err, result) => {
    if (err) throw err;

    if (result.rows.length > 0) {

      con.query(`SELECT * FROM active_accounts WHERE user_id = $1`, [result.rows[0].id], (err, data) => {

        if (err) throw err;

        if (data.rows.length > 0) {
          con.query("UPDATE active_accounts SET isLogin = true WHERE user_id = $1", [result.rows[0].id], (err) => {
            if (err) throw err;
            res.json({confirmation: true, id: result.rows[0].id});
          })

          return;
        }

      
          con.query(`INSERT INTO active_accounts (islogin, user_id) VALUES ($1, $2)`, ["true", result.rows[0].id], (err) => {
            if (err) throw err;
            res.json({confirmation: true, id: result.rows[0].id});
          })
    
         
        

      });

     return;
    } 

    res.json({confirmation: false});
  })
})

app.post('/login-account', (req, res) => {
  req.session.isLogin = true;
  
  

  res.json({confirmation: true});
})

app.post('/bookmark-check', (req, res) => {

  if (req.session.isLogin) {
    res.json({confirmation: true})
  return;
  }
  
  res.json({confirmation: false});
})

app.post("/bookmark-add", (req, res) => {
  const sql = `UPDATE active_accounts
               SET bookmark_movies = $1
               WHERE user_id = $2`;

  const movArr = req.body.data;
  const placeholders = [movArr.toString().slice(1), req.body.user_id];
  
  con.query(sql, placeholders, (err) => {
    if (err) throw err;
    res.json({confirmation: true})
  })
})

app.post("/retrieve-bookmarks", (req, res) => {
  const sql = `SELECT * FROM active_accounts 
               WHERE user_id = $1`;
  const placeholders = [req.body.id];

  con.query(sql, placeholders, (err, data) => {
    if (err) throw err;

    if (data.rows[0].bookmark_movies) {
      res.json({confirmation: true, arrData: data.rows[0].bookmark_movies});
      return;
    }
    res.json({confirmation: true});

  })
})

/* Logout Account Functionality */
app.post('/logout-account', (req, res) => {
  

  /* 
    UPDATE table_name
    SET column1 = value1, column2 = value2, ...
    WHERE condition;
  */

    con.query("UPDATE active_accounts SET isLogin = false WHERE user_id = $1", [req.body.user_id], (err) => {
      if (err) throw err;
      req.session.isLogin = false;
     
      res.json({confirmation: true});

    })
})

app.post("/google-acc-auth", (req, res) => {
   con.query("SELECT * FROM users WHERE email = $1", [req.body.email], (err, data) => {
    if (err) throw err;

    if (data.rows.length > 0) {
    
      con.query(`SELECT * FROM active_accounts WHERE user_id = $1`, [data.rows[0].id], (err, data2) => {
        if (err) throw err;

        if (data2.rows.length > 0) {
          con.query("UPDATE active_accounts SET isLogin = true WHERE user_id = $1", [data.rows[0].id], 
          (err) => {
            if (err) throw err;
            res.json({confirmation: true, id: data.rows[0].id});
          })
        } 
        
        else {
          con.query(`INSERT INTO active_accounts (islogin, user_id) VALUES ($1, $2)`, ["true", data.rows[0].id], (err) => {
            if (err) throw err;
            res.json({confirmation: true, id: data.rows[0].id});
            
          })
        }

      });
      
      
    } else {
    emailSender(req.body.email);
    res.json({confirmation: false});
    }

    
   })
})

app.listen(PORT, () => console.log("Server is running"));

/* "start": "nodemon index.js && npm install --omit=dev",  */