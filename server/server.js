const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
  try {
    const { rows: students } = await db.query("SELECT * FROM students");
    res.send(students);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      iscurrent: req.body.is_current,
      city: req.body.city
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
      "INSERT INTO students(firstname, lastname, is_current, city) VALUES($1, $2, $3, $4) RETURNING *",
      [newStudent.firstname, newStudent.lastname, newStudent.iscurrent, newStudent.city]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await db.query("DELETE FROM students WHERE id=$1", [studentId]);
    console.log("From the delete request-url", studentId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a student
app.put("/api/students/:studentId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId;
  const updatedStudent = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    city: req.body.city,
    iscurrent: req.body.is_current,
  };
  console.log("In the server from the url - the student id", studentId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedStudent
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3, city=$4 WHERE id=${studentId} RETURNING *`;
  const values = [
    updatedStudent.firstname,
    updatedStudent.lastname,
    updatedStudent.iscurrent,
    updatedStudent.city,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// api call to weather app 
app.get("/weather", (req, res) => {
  const params = new URLSearchParams({
    q: req.query.cityName,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/weatherCountry", (req, res) => {
  // console.log(req.query.searchCity);
  // res.send(data)

  const params = new URLSearchParams({
    q: req.query.searchCity,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});


data = {
    "data": {
        "coord": {
            "lon": -122.3321,
            "lat": 47.6062
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 45.52,
            "feels_like": 38.64,
            "temp_min": 42.67,
            "temp_max": 49.23,
            "pressure": 1010,
            "humidity": 76
        },
        "visibility": 10000,
        "wind": {
            "speed": 15.99,
            "deg": 193,
            "gust": 18.99
        },
        "clouds": {
            "all": 100
        },
        "dt": 1680195632,
        "sys": {
            "type": 2,
            "id": 2041694,
            "country": "US",
            "sunrise": 1680184327,
            "sunset": 1680230113
        },
        "timezone": -25200,
        "id": 5809844,
        "name": "Seattle",
        "cod": 200
    }
}