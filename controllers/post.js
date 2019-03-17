
const Post       = require("../models/post");
const {cloudinary} = require("../cloudinary")



module.exports = {
    // Posts index
    async getPosts(req, res, next){
        const posts = await Post.paginate({},{
            page : req.query.page || 1 ,
            sort:     { created : -1 },
            limit : 8
        });
        // for pagination options
        posts.page = Number(posts.page)
        res.render("posts/index", {posts})
    },
    
    // New Post
    newPost(req, res, next){
        res.render("posts/new")
    },
    
    // Create Post
    async createPost(req, res, next){
      
       req.body.post.images = [];
    //   file has been uploaded already to cloudinary by the middleware upload
      for(const file of req.files){
         req.body.post.images.push({
             url : file.secure_url,
             public_id : file.public_id
         })
      }
            
      const  post = await Post.create(req.body.post);
         // flash message  
         req.flash('success', 'New post has been created successfully')
         res.redirect('/posts/' + post._id )    
    },
    // Show Post
    async showPost(req, res, next){
       
            const post = await Post.findById(req.params.id);
            let   title = post.title;
            res.render("posts/show", {post, title})
       
    },
    // Edit Post
    async editPost(req, res, next){
        const post = await Post.findById(req.params.id);
        res.render("posts/edit" , {post})
    },
    // Update Post
    async updatePost(req, res, next){
        // find post by id
        const post =  await Post.findById(req.params.id);
        // check if there's any image for deletion
        if(req.body.deleteImages && req.body.deleteImages.length){
        // assign deleteimages to its own variable
        let deleteImages = req.body.deleteImages;
        // loop over deleteImages
        for(const public_id of deleteImages){
        // delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        // delete image from post.images array
        for(const image of post.images){
            if(image.public_id === public_id){
               let index = post.images.indexOf(image);
               post.images.splice(index, 1);
              }
            }
          }
        }
        // Check if there's new images for upload
        if(req.files){
            // upload images to cloudinary
            for(const file of req.files){
            // add images to post.images array
            post.images.push({
             url : file.secure_url,
             public_id : file.public_id
             })
           }
        }
        // update the post with any new properties
        post.title = req.body.post.title;
        post.condition = req.body.post.condition;
        post.price = req.body.post.price;
        post.location = req.body.post.location;
        post.description = req.body.post.description;
        
        // Save the updated post to the database
        post.save();
        // redirect to show page
        req.flash('success', 'Post has been updated successfully')
        res.redirect("/posts/" + post._id)
    },
    // Delete Post
    async deletePost(req, res, next){
        // find post by id
        let post =  await Post.findById(req.params.id);
        // assign post.images to a variable
        let deleteImages = post.images;
        
        // loop over deleteImages
        for(const image of deleteImages){
            // delete images from cloudinary
         await cloudinary.v2.uploader.destroy(image.public_id);
        }
        // remove post from database
        await post.remove();
        // flash message 
        req.flash('success', 'Post has been deleted successfully')
        res.redirect("/posts")
    }
    
}
