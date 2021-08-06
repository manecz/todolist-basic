let obj = new List();

obj.selector = '.showItems';

obj.loadData();


//Add Task
$(document).on('keypress',function(e) {   
    let value = $( '.container input' ).val();
    if (value !== ''){    
        if(e.which == 13) {
            obj.create(value);
            $( '.container input' ).val('');
            //insert();
        } 
    }
    $('#counter').text(updateCounter());
});

//Completed
$('.showItems').on('change', '.item', (e)=>{
    let id = e.currentTarget.id;
    //console.log(obj.list[id]);

    //Modify
    obj.modify(id);

    console.log(e);

    //Toogle classes
    $( e.currentTarget ).toggleClass( "completed" );
    

    $('#counter').text(updateCounter());
});

//Remove Item
$('.showItems').on('click', '.button', (e)=>{
    let id = e.currentTarget.parentNode.id;
    $(e.currentTarget.parentNode).fadeOut(()=>{
        obj.delete(id);
        $('#counter').text(updateCounter());
    });
    
});

const updateCounter = () => {
    let counter = 0;
    let i = 0;
    while(obj.list[i]) {
        if (obj.list[i].isCompleted == 0) {
            counter++;
        }
        i++;
    }
    return counter;
}

$('#counter').text(updateCounter());