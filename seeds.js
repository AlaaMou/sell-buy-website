const Post = require("./models/post");
const faker = require("faker");

async function seedPost(req, res, next){
    // remove all existing posts in database
    await Post.remove({})
  
  /*
    for(const i of new Array(40)){
         
       const post = {
           title : faker.lorem.word(),
           condition : 'used',
           location : faker.address.city(),
           price : faker.random.number(),
           description : faker.lorem.text(),
           images      : [
          {
                        url : "https://res.cloudinary.com/dnbwtkpmw/image/upload/v1552845570/travelp/1f54e6d6c9bb494b65b5d208adc5af2c3.jpg",
                        public_id : "travelp/1f54e6d6c9bb494b65b5d208adc5af2c3" }
      ],
           author : {
                    "_id" : "5c8bc9f05470761aea379dd3",
                   "username" : "Alaa"}
           
       };
       
       Post.create(post);
    }
   */
    console.log("40 new posts created")
     
}

module.exports = seedPost;