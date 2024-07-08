import db from "../Database/index.js";
import crypto from "crypto";
const mine=(req,res)=>{
  try{
    var query=`select id,balance,curr from transactions where user=? order by id desc`;
    let bal=0;
    let prev=null;
    let prevId=-100;
    var params=[req.body.user];
    db.all(query,params,(err,rows)=>{
      if(err){
        res.status(400).send(err.message);
        return;
      }
      else{
        if(rows.length>0){
          bal=rows[0].balance;
          prev=rows[0].curr;
          prevId=rows[0].id;
        }
        else{
          bal=0;
          prev=null;
          prevId=-100;
        }
        var curr=crypto.randomBytes(20).toString('hex');
        var action=`insert into transactions(user,prev,curr,balance,amount,type) values(?,?,?,?,?,?)`;
        var params=[req.body.user,prev,curr,bal+req.body.amount,req.body.amount,"Mined"];
        db.run(action,params,(err)=>{
          if(err){
            res.status(400).send("Failed to mine!!");
          }
          else{
            var upd=`update transactions set next=? where id=?`;
            var params=[curr,prevId];
            db.run(upd,params,(err)=>{
              if(err){
                console.log(err.message);
              }
              else{
                console.log("Successfully updated previous transaction!!");
                res.status(200).send("Successfully Mined !!");
              }
            })
          }
        });
      }
    });
  }
  catch(err){
    res.status(500).send(err.message);
  }
}
export default mine;