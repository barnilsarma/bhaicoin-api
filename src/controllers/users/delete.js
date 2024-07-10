import users from "../../UsersData/index.js";

const del=(req,res)=>{
    var query=`delete from users where user=?`;
    var params=[req.params.user];
    users.run(query,params,(err)=>{
        if(err){
            if(err){
                res.status(500).send(err.message);
            }
            else{
                res.status(200).send("Your account has been successfully deleted!!");
            }
        }
    });
}

export default del;