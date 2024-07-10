import users from "../../UsersData/index.js";

const read=(req,res)=>{
    var query=`select * from users where user=?`;
    var params=[req.params.user];
    users.all(query,params,(err,rows)=>{
        if(err){
            res.status(400).send("Error in fetching users");
        }
        else{
            res.status(200).send(rows);
        }
    });
}

export default read;