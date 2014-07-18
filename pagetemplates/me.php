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
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/resume.html" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page">Resume</a></li>
			<li><a href="<?php echo get_template_directory_uri()."/pagetemplates/contact.php" ?>" class="pure-button pure-button-primary ajaxy ajaxy-page contact-menu" data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' )?>">Contact</a></li>
		</ul>
	</div>
	<div id="content"></div>
</div>

<?php get_footer(); ?>