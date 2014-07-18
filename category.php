<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>

<?php $posts = fetch_page_posts(get_query_var('cat'))->posts?>
<?php include "pagetemplates/photography-content.php"; ?>
	
<?php get_footer(); ?>
