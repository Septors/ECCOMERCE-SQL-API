 const catchError = (res,err) =>{
    console.error(err);
        res.status(500).json({Error: err.message});
};

export default catchError;