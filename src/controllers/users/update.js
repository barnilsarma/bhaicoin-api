import users from "../../UsersData/index.js";

const update=(req,res)=>{
    var query=`update users set user=? where user=?`;
    var params=[req.body.newUsername,req.params.currUsername];
    users.run(query,params,(err)=>{
        if(err){
            if(err){
                res.status(500).send(err.message);
            }
            else{
                res.status(200).send("Successfully updated username!!");
            }
        }
    });
}

export default update;