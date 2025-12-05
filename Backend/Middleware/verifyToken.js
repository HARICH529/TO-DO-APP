import jwt from 'jsonwebtoken'
const {verify}=jwt

//create a verification middleware
export const verifyToken= (req,res,next)=>{
    //get token from response cookies
    console.log("Cookies are:",req.cookies.token)
    const encryptedtoken=req.cookies.token;
    //if token not found
    if(encryptedtoken===undefined){
        res.json({message:"unauthorized user,please login"})
    }   
    else{
        //verify the token 
        try{
            verify(encryptedtoken,'abcdef')
            //forward request to next
            next();
        }catch(error){
            res.json ({message:"Session Expired,Please Relogin"})
        }
    }
}
