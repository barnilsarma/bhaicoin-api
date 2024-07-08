import db from "../Database/index.js";
import crypto from "crypto";

const send=(req,res)=>{
    try{
        var query1=`select * from transactions where user=? order by id desc`;
        var prevIdSender=-100;
        var params=[req.body.sender];
        db.all(query1,params,(err,rows)=>{
            if(err){
               res.status(400).send(err.message); 
            }
            else{
                if(rows.length>0){
                    if(rows[0].balance>req.body.amount){
                        var current=crypto.randomBytes(20).toString('hex');
                        prevIdSender=rows[0].id;
                        var query2=`insert into transactions(user,prev,curr,balance,amount,type) values(?,?,?,?,?,?)`;
                        var params2=[req.body.sender,rows[0].curr,current,rows[0].balance-req.body.amount,req.body.amount,"Sent"];
                        db.run(query2,params2,(err)=>{
                            if(err){
                                res.status(403).send(err.message);
                            }
                            else{
                                var query3=`update transactions  set next=? where id=?`;
                                var params3=[current,prevIdSender];
                                db.run(query3,params3,(err)=>{
                                    if(err){
                                        res.status(405).send(err.message);
                                    }
                                    else{
                                        var query4=`select * from transactions where user=? order by id desc`;
                                        var params4=[req.body.recipient];
                                        var prevTransRecipient="";
                                        var prevIdRecipient=-100;
                                        db.all(query4,params4,(err,rows4)=>{
                                            if(err){
                                                res.status(406).send(err.message);
                                            }
                                            else{
                                                if(rows4.length>0){
                                                    prevTransRecipient=rows4[0].curr;
                                                    prevIdRecipient=rows4[0].id;
                                                    var query5=`insert into transactions(user,prev,curr,balance,amount,type) values(?,?,?,?,?,?)`;
                                                    var currentRec=crypto.randomBytes(20).toString('hex');
                                                    var params5=[req.body.recipient,prevTransRecipient,currentRec,rows4[0].balance+req.body.amount,req.body.amount,"Received"];
                                                    db.run(query5,params5,(err)=>{
                                                        if(err){
                                                            res.status(407).send(err.message);
                                                        }
                                                        else{
                                                            var query6=`update transactions set next=? where id=?`;
                                                            var params6=[currentRec,prevIdRecipient];
                                                            db.run(query6,params6,(err)=>{
                                                                if(err){
                                                                    res.status(408).send(err.message);
                                                                }
                                                                else{
                                                                    res.status(200).send("Transaction succesfull!!");
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                })
                            }
                        });

                    }
                    else{
                        res.status(401).send("Insufficient Balance");
                    }
                }
                else{
                    res.status(402).send("You have zero Balance");
                }
            }
        });
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

export default send;