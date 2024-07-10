import users from "../../UsersData/index.js";

const create=(req,res)=>{
    var query=`select * from users where user=?`;
    var params=[req.body.user];
    users.all(query,params,(err,rows)=>{
        if(err){
            res.status(400).send("Error in fetching users!!");
        }
        else{
            if(rows.length>0){
                res.status(401).send("Username already exists!!");
            }
            else{
                var query2=`insert into users(user,email) values(?,?)`;
                var params2=[req.body.user,req.body.email];
                users.run(query2,params2,(err)=>{
                    if(err){
                        res.status(400).send("Error in registering user!!");
                    }
                    else{
                        res.status(200).send("User registered successfully!!");
                    }
                });
            }
        }
    });
}

export default create;