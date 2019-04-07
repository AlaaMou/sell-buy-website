
  
  let postForm = document.getElementById('postForm');
  postForm.addEventListener('submit', function(event){
     let imageUploads = document.getElementById('imageUpload').files.length;
     if(imageUploads > 3){
       event.preventDefault();
      alert("You can upload maximum 3 images")
  }  
    
  })
  
