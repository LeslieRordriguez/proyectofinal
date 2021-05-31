const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require ('path');
const nodemailer = require ('nodemailer');
require('dotenv').config();

//Nodemailer//
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: process.env.MAIL_USER, // generated ethereal user
     pass: process.env.MAIL_PASS, // generated ethereal password
   },
 });
 transporter.verify().then(()=>{
   console.log("Listo para enviar correo!");
});

//Settings
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({
    extended: false
}));


//Handlebars config
app.engine('.hbs', hbs({
    defaultlayout: "main" ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs"


}))


app.get('/', (_req,res)=>{
    res.render('inicio',{ruta:"/assets/css/inicio.css"});
 })

 app.get(`/nosotros`, (_req,res)=>{
    res.render('nosotros',{ruta:"/assets/css/nosotros.css"});
 })

 app.get('/proyectos', (_req,res)=>{
    res.render('proyectos',{ruta:"/assets/css/proyectos.css"});
 })

 app.get('/formulario', (_req,res)=>{
   res.render('formulario',{ruta:"/assets/css/formulario.css"});
})

 app.get('/contacto', (_req,res)=>{
    res.render('contacto', {ruta:"/assets/css/contacto.css"});
 })

 app.post("/contacto", async (_req, res)=>{
    // send mail with defined transport object
   await transporter.sendMail({
      from: process.env.MAIL_USER, // sender address
      to:process.env.MAIL_USER, // list of receivers
      subject: `${req.body.nombre} Requiere de su atención sobre ${req.body.asunto}`, // Subject line
      html: `<h1>Nombre:${req.body.nombre}</h1>
             <h1>Correo:${req.body.email}</h1>
             <h1>Solicita la siguiente información:</h1>
             <h1>${req.body.mensaje}</h1>` // html body
    });
      res.redirect('/');
   })
   

 app.use((_req,res)=>{
   res.send('404');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(app.get('views')); 
    console.log(`Server at http://localhost:${PORT}`)
})

