const{todo}=require("../data/data.js");

//get alltodo

const alltodo=(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            data:todo
        })

    }catch(err){
       res.status(500).json({
        success:false,
        message:"Internal server error",
        error:err.message
       })

    }
}

//get singletodo

const getsingletodo=(req,res)=>{
    try{
        let todoId=parseInt(req.params.id);
        let singletodo=todo.find(t=>t.id===todoId);
        if(!singletodo){
            return res.status(404).json({
                success:false,
                message:`todo not found with id ${todoId}`
            })
        }
        res.status(200).json({
            success:true,
            body:singletodo,
            message:`todo data fetched successfully`
        })

    }catch(err){
            res.status(500).json({
                success:false,
                message:`Something went wrong`,
                error:err.message
            });

    }
}

//Create todo

const createtodo=(req,res)=>{
    try{
        let body=req.body;
        if(!body.title ||
           !body.author ||
           !body.category ||
           !body.content){
            return res.status(400).json({
                success:false,
                message:"Please provide title,author,category,content"
            })
           }
           let newtodo={
            title:body.title,
            author:body.author,
            category:body.category,
            content:body.content,
            id:Date.now()
           };
           todo.push(newtodo);

           res.status(201).json({
            sucess:true,
            data:newtodo
           });

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:err.message
        })

    }
};

const deletetodo=(req, res)=>{
    try{
        let todoId=parseInt(req.params.id)
        let todoIndex=todo.findIndex(t=>t.id===todoId)
        if(todoIndex=== -1){
            return res.status(404).json({
                success:false,
                message:`todo not found with id ${todoId}`
            })
        }
        todo.splice(todoIndex, 1);
        res.status(200).json({
            success:true,
            message:"todo Deleted successfully!!"
        });


    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    };
}

//Updatetodo

const updatetodo=(req,res)=>{
    try{
        let todoId=parseInt(req.params.id);
        let todoIndex=todo.findIndex(t=>t.id===todoId);
        if(todoIndex=== -1){
            return res.status(404).json({
                success:false,
                message:`todo not found with id ${todoId}`
            })
        }
        let updatetodo={
            ...todo[todoIndex],
            ...req.body,
            id:todo[todoIndex].id
        };
        todo[todoIndex]=updatetodo;
        res.status(200).json({
            success:true,
            data:updatetodo
        })

    }catch(err){
      res.status(500).json({
        success:false,
        message:"Internal Sever Error",
        error:err.message
      })
    }
}




module.exports={
    alltodo,
    getsingletodo,
    createtodo,
    deletetodo,
    updatetodo
}
    





