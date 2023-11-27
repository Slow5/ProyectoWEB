const express = require('express')
const multer = require('multer')

const nodemailer = require('nodemailer')

const Post = require('../models/post')
const User = require('../models/User')

const jwt = require('jsonwebtoken');

const MIME_TYPE_MAP = {
    'image/png': 'png', 
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const isValid =  MIME_TYPE_MAP[file.mimetype];
        let error = new Error("extension no valido")
        
        if(isValid){
            error=null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb)=>{
        
        const name = file.originalname.toLowerCase().split('').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];

        cb(null, name + '-' + Date.now() + '-' + ext)
    }
})

const router = express.Router();

//app para mandar datos 
router.post('/signup', async (req, res) =>{
    const {email, password,nombre,apellido,numero, usertype} = req.body;
    const newUser = new User({email, password, nombre, apellido, numero, usertype});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id }, 'secretkey')
    res.status(200).json({token})
});

router.post('/login', async (req, res) => {
    const {nombre, password} = req.body;
    const user = await User.findOne({nombre})
    
    if(!user) return res.status(401).send("the email doesn't exists");
    if(user.password !== password) return res.status(401).send('wrong Password');

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
})

// datos del usuario

// publicaciones

router.post("/posts", multer({storage:storage}).single("image"),(req, res, next) => {

    const url = req.protocol + '://' + req.get("host");

    const post = new Post({
        title: req.body.title, 
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    }); 
    
    post.save().then(createdPost=>{
        res.status(201).json({
            mesaage: 'Publicacion añadida',
            post: {
                ...createdPost,
                id: createdPost._id
            }
        })
    })
});


router.get('/posts', (req, res, next)=>{
    Post.find().then(document=>{
        res.status(200).json({
            message: 'Publicaciones expuestas con exito', 
            posts: document
        });
    });    
});

router.delete('/posts/:id', (req, res, next)=>{
        Post.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
    })
    res.status(200).json({message: 'Comentario eliminado.'});
});

router.put("/:id", multer({storage:storage}).single("image"), (req,res, next)=>{

    let imagePath = req.body.imagePath;

    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }

    const post = new Post({
        _id: req.body.id,
        title:req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Post.updateOne({_id: req.params.id}, post).then (result=>{
        console.log(result);
        res.status(200).json({
            message: 'Actualizacion completa'
        });
    })
})


//actualizar usuario
router.get('/users/:id', (req, res, next)=>{
    User.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post);
            console.log('actualizacion')
        }else{
            res.status(404).json({message: 'Post no encontrado'});
        }    
    });    
});

router.put("/users/:id", multer({storage:storage}).single("image"), (req,res, next)=>{

    let imagePath = req.body.image;

    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }

    const user = new User({
        //_id: req.body.id,
        email: req.body.email, 
        password: req.body.password, 
        apellido: req.body.apellido,
        nombre: req.body.nombre, 
        numero: req.body.numero,
        image: imagePath, 
        usertype: req.body.usertype
    });
    
    User.updateOne({_id: req.params.id}, user).then (result=>{
        console.log(result);
        res.status(200).json({
            message: 'Actualizacion completa'
        });
    })
});

//super usuario
router.post('/type', async (req, res) => {
    const {nombre, password} = req.body;
    const user = await User.findOne({nombre})
    
    if(!user) return res.status(401).send("the email doesn't exists");
    if(user.password !== password) return res.status(401).send('wrong Password');

    const type = user.usertype;
    return res.status(200).json({type});
})

router.post('/emailId', async (req, res) => {
    const {nombre, password} = req.body;
    const user = await User.findOne({nombre})
    
    if(!user) return res.status(401).send("the email doesn't exists");
    if(user.password !== password) return res.status(401).send('wrong Password');

    const id = user.id;
    const nom = user.nombre;
    const gmail = user.email

    return res.status(200).json({id,nom, gmail});
})

//obtener usuarios
router.get('/user', (req, res, next)=>{
    User.find().then(document=>{
        res.status(200).json({
            message: 'usuario', 
            users: document
        });
    });    
});


router.post('/getUser', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const id = user._id
        const gmail = user.email
        const nom = user.nombre
        const apellido = user.apellido
        const numero = user.numero
        const password = user.password
        const tipo = user.usertype

        res.status(200).json({id, gmail, password, nom, apellido,numero, tipo});

    } catch (error) {
        console.error(error);
        res.status(500).json("Error interno del servidor");
    }
});


router.delete("/deleteuser/:id", (req,res,next)=>{
    User.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
    })
    res.status(200).json({mesaage: 'usuario eliminada'})
});

// correo 

router.post('/enviar-correo', async (req, res) => {
    try {
      const { email, clave} = req.body;

      if (!email) {
        return res.status(400).json({ error: 'No se proporcionó una dirección de correo electrónico.' });
      }
      
      const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: 'eduareyesdo567@gmail.com',
          pass: 'fgmt xdbr odfn kfuu',
        },
      })

      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: clave,
        text: "hola",
        html: "<b>Codigo de Verificacion</b>", // html body
      });
  
      console.log('Correo enviado:', info.messageId);
      res.status(200).json({ mensaje: 'Correo enviado con éxito' });
    } catch (error) {
      console.error('Error al enviar el correo:', error.message);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  });
  

module.exports = router