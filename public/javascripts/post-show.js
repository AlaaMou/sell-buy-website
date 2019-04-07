  // Toggle New Review Form 
  $('.new-review-button').on('click', function(){
        if($(this).text() == "Add Review"){
            $(this).text("Cancel") 
        }else{
             $(this).text("Add Review")
        }
    })
    

  // Toggle Edit  Review Form 
  $('.edit-review-button').on('click', function(){
        if($(this).text() == "Edit"){
            $(this).text("Cancel") 
        }else{
             $(this).text("Edit")
        }
    })
    
    
    // reset rating button
    $('.reset-rating').click(function(){
    $(this).siblings('.input-no-rate').click();
    })