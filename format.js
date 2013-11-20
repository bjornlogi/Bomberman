$(document).ready(function() {
	$('#text').click(function() 
	{
		$('#moreText').toggle(function() 
		{
			var home = '<div class="drop">';	
			home += '<p>Player 1:</p>';		
			home += '<p>° W - Up </p>';
	        home += '<p>° S - Down</p>';
	        home += '<p>° A - Left</p>';
	        home += '<p>° D - Right</p>';
	        home += '<p>° E - Drop Bomb!</p>';
	        home += '<p> - </p>';
	        home += '<p>Player 2:</p>';
	        home += '<p>° I - Up </p>';
	        home += '<p>° K - Down</p>';
	        home += '<p>° J - Left</p>';
	        home += '<p>° L - Right</p>';
	        home += '<p>° U - Drop Bomb!</p>';
	        home += '<p> - </p>';
	        home += '<p>° M - Mute music</p>';        
			home += '</div>';
											
			$('#moreText').html(home);
	});
	});
});