<?php
/*
 Template Name: me
*/

get_header();

?>

<div class="container me">
	<div class="list">
		<ul id="menu">
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/me.html" ?>" class=" pure-button pure-button-primary ajaxy ajaxy-page">About Me<a/></li>
			<!--li><a href="<?php echo get_template_directory_uri()."/pagetemplates/experiment.html" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page">JS Experiment</a></li-->
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/resume.html" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page">Resume</a></li>
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/contact.php" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page contact-menu" data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' )?>">Contact</a></li>
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/lab.html" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page">Lab</a></li>
		</ul>
	</div>
	<div id="content">
		<div class="me">
			<p>My name is Jun(Jim) Su. I am from Shanghai, China and now living in New York.</p>
			<br>
			<p>I am a frontend developer and love coding and design. I often use jQuery, underscore to operate the Dom and interactive operation. Require and Backbone help me to construct the JS framework in my project. Moreover, I also write some small applications. I love researching on the latest JS concept, JS pattern and apply them into my project and my personal website. Recently I am trying to integrate ajaxy to strengthen my ajax functionality. Additionally, I use Sass and Less for my different projects. I also try to use OOCSS to optimiaze my css files. I use r.js and grunt to compress my frontend files. I will continue learning because they are too many interesting stuff in the frontend world.</p>
			<br>
			<p>
				As an amateur photographier, I love traveling. I love milkyway, canyon, snow, aroral, thunderstorm. I am interested in timelapse recenlty and plan to make another one if I have a chance. I also love music( New age and trance). My favorite city is San Francisco. I have been there several times. 
			</p>
			<p>Recently I am learning a lot javascript pattern and hope I can transfer from developer to engineer.</p>
		</div>
	</div>
</div>

<?php get_footer(); ?>