
  // select the edit form
  let editForm =  document.getElementById('editForm');
  // add listener to the edit form
  editForm.addEventListener('submit', function(event){
    
  // find length of uploaded images
  let imageUploads = document.getElementById('imageUpload').files.length;
  // find total number of exisitng images
  let exisitngImages = document.querySelectorAll('.imageDeleteCheckBox').length;
  // find total number of potential deletions
  let imageDeletions = document.querySelectorAll('.imageDeleteCheckBox:checked').length;
  // find the total number of remaining images
  let total = exisitngImages - imageDeletions + imageUploads ;
  // figue our if the form can be submitted or not
  if(total>3){
    event.preventDefault();
    alert((total-3 >1)  ? "You need to delete " + (total-3 )+ " more "  +" images!" : "You need to delete one more image!")
  }
  
  })
  
  