export default function() {
    const ratingPost = (userName, rating) => { return { "userName": userName, "rating": rating }}
    const posts = [
        ratingPost("FlooferLand", 5.0),
        ratingPost("Swarkin", 3.5),
        ratingPost("Lythox", 5.0),
        ratingPost("cr.os", 5.0),
        ratingPost("BoredmanDA", 5.0),
        ratingPost("Saotekin", 5.0),
        ratingPost("skwp", 5.0),
    ]

    // Math!
    let rating = 0;
    posts.forEach(review => {
        rating += review.rating;
    });
    rating /= posts.length;
    rating = rating.toFixed(2);

    return {
        rating: rating,
        count: posts.length,
        posts: posts
    } 
}