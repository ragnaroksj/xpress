<?php
/*
 Template Name: worklab
*/

get_header();

?>
<style type="text/css">
.filter-panel-item {
    background: none repeat scroll 0 0 #ccc;
    float: left;
    margin: 0 1px 0 auto;
    padding: 20px 25px;
    width: 10px;
    text-transform : uppercase;
}
.filter-panel {
    text-align: center;
    height : 80px;
}
table td{
	padding : 10px 20px;
}
thead{
	background : #ccc;
}
tr{
	border-bottom : 1px solid #ccc;
}
</style>
<script type="text/javascript">
	var ajaxurl = '<?php echo admin_url("admin-ajax.php"); ?>';
</script>
<?php $post = get_post(130); echo do_shortcode( $post->post_content );?>


<?php get_footer(); ?>