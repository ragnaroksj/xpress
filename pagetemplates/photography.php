<?php
/*
 Template Name: photography
*/

get_header();

?>

<?php $posts = fetch_page_posts(7)->posts?>
<?php include "photography-content.php"; ?>

<?php get_footer(); ?>