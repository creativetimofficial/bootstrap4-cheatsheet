$(document).ready(function(){
    $('.card.card-collapse').find('.collapse.show').each(function(){
        $(this).parent().addClass('active');
    });



    $('.card.card-collapse').on('click', function(){
        $(this).addClass('active');
    }).on('hidden.bs.collapse', function(){
        $(this).removeClass('active');
    });
});
