var movieService=require('../service/movieService')
const todoService = require("../service/todoService");

const handle = function(func,httpErrorCode)
{
    return async function(req,res,next)
    {
        try
        {
            func(req,res,next).catch(err=> {
                return res.status(httpErrorCode).json({message: err})
            });
        }catch (err)
        {
            console.log("Error is ",err);
            await res.status(httpErrorCode).json({message: err})
        }
    }

}
async function getAllMovieHandler(req,res,next)
{
    const movies = await movieService.getAllMovie();
    if(!movies) throw Error('No movies');
    await res.status(200).json(movies);
}
const getAllMovie = async function (req, res, next) {
    console.log('Movie controller user ',req.user);

    await handle(getAllMovieHandler,400)
    (req,res,next);

}

const getMovieByIdHandler=async (req,res,next)=>{
    const movieId=req.params['movieId'];
    let movie= await movieService.getMovieById(movieId);
    if(!movie)throw Error("can not found movie");
    res.status(200).json(movie)

}

const getMovieById=async (req,res,next)=>{
    console.log('Movie id',req.params['movieId']);

    await handle(getMovieByIdHandler,400)
    (req,res,next);

}

async function createMovie(req,res,next){
    console.log("movie body",req.body)
    try{
        const movie=await movieService.createMovie(req.body);
        if(!movie) throw Error('Cannot save movie');
        await res.status(201).json(movie);
    }
    catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const findMovieByTitle = async function (req,res,next)
{
    let title = req.params['title'];
    try {
        const movies = await movieService.searchMovieByTitle(title);
        if(!movies) throw Error('No movies found');
        await res.status(200).json(movies);

    }catch(err)
    {
        await res.status(404).json({message: err})
    }
}


const updateMovie = async function (req,res,next)
{
    let movieId=req.params['movieId']
    let body=req.body;
    try {
        const movies = await movieService.updateMovie(movieId,body);
        if(!movies) throw Error('cannot update');
        await res.status(200).json(movies);

    }catch(err)
    {
        await res.status(404).json({message: err})
    }
}

const deleteMovie = async function (req,res,next)
{
    let movieId=req.params['movieId']
    try {
        const movies = await movieService.deleteMovie(movieId)
        if(!movies) throw Error('cannot delete');
        await res.status(200).json(movies);

    }catch(err)
    {
        await res.status(404).json({message: err})
    }
}

module.exports = {
    getAllMovie,
    getMovieById,
    createMovie,
    findMovieByTitle,
    updateMovie,
    deleteMovie
}