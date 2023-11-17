let Movies= require('../model/Movie');

const getAllMovie = async ()=>
{   return Movies.find();
};

const getMovieById= async (movieId)=>{
    return Movies.findById(movieId);
}



const searchMovieByTitle = async(movieTitle)=>
{
    const movies = await Movies.find({
        title: {
            $regex:movieTitle
        }
    });
    return  movies;
}

const createMovie=async (movie)=>{
    const newMovie=new Movies(movie);
    return newMovie.save();
}

const updateMovie=async (movieId,movie)=>{
    const updateMovie=await Movies.findByIdAndUpdate(movieId,movie,{new:true});
    return updateMovie;
}

const deleteMovie=async (movieId)=>{
    const deleteMovie=await Movies.findByIdAndDelete(movieId);
    return deleteMovie
}

module.exports = {
    getAllMovie,
    getMovieById,
    searchMovieByTitle,
    createMovie,
    updateMovie,
    deleteMovie
}