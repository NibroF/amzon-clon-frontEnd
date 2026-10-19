
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const stripe=require("stripe")(process.env.STRIPE_KEY);

const app=express();
app.use(express.json());
app.use(cors({origin: true}));
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success"
    })
})

app.post("/payment/create",async(req,res)=>{
    const total=parseInt(req.query.total);
    if(total>0){
        const paymentIntent=await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        });
        console.log("payment intent",paymentIntent);
        res.status(201).json({clientSecret: paymentIntent.client_secret});
    }else{
        res.status(403).json({
            message:"total musst be grater than 0"
        })
      
    }
});



exports.api=onRequest(app)
