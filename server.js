const express = require("express")
const app = express();
const port = 4000;
const axios = require("axios")

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(express.urlencoded())

app.get("/weather", async function (req, res) {
    const apiKey = "2edd2567ab500b4ae0dc47ce48ea8b9c";
    const location = req.query.location;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    
    let weather;
    let error = null;
    try {
        const response = await axios.get(url);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = "Error : something went wrong";
    }
    res.render("index", { weather, error})
});

app.listen(port, function () {
    console.log(`the server is running at port ${port}`)
})