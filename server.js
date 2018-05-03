const express = require('express');
const hbs = require("hbs");
const fs = require('fs');


const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine',"hbs");


app.use((req, res, next)=>{
	let now = new Date().toString();
	let log = `${now} : ${req.method} ${req.url}`;

	console.log(log);
	
	fs.appendFile('Server.log', log + '\n', (err)=>{
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res, next)=>{
// 	res.render("maintenance",{
// 		pageTitle: "Website Under Maintenance!",
// 		sorryMessage: "Sorry. The Monkeys have screwed up! We wuz be right backz."
// 	});
// });

app.use(express.static(__dirname + "/public"));


hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get("/", (req, res)=>{
	// res.send("<h1>Hello Express!</h1>");
	res.render("home", {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to the homepage"
	});
});

app.get("/about", (req, res)=>{
	res.render("about", {
		pageTitle: "About Page",
	});
});

app.get("/bad", (req,res)=>{
	res.send({
		errorMessage: "Error - Cannot handle request"
	});
});

app.listen(3000, ()=>{
	console.log("Server started on port 3000")
});